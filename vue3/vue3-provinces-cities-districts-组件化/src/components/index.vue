<template>
  <div>
    <selector
      :is-show="isProvinceSelectorShow"
      default-title="请选择 - 省"
      code-key="provinceCode"
      :data="provinces"
      @handle-change="handleProvinceChange"
    ></selector>

    <selector
      :is-show="isCitySelectorShow"
      default-title="请选择 - 市"
      code-key="cityCode"
      :data="state.cities"
      @handle-change="handleCityChange"
    ></selector>

    <selector
      :is-show="isCountySelectorShow"
      default-title="请选择 - 区县"
      code-key="countyCode"
      :data="state.counties"
      @handle-change="handleCountyChange"
    ></selector>
  </div>
</template>

<script setup>
import selector from "./Selector.vue";
import { reactive, computed, toRaw } from "vue";

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["handleSelect"]);

// 格式化城市数据
const provinces = formatData(props.data);

console.log("---logs---", provinces);

const state = reactive({
  cities: null, // 市数据
  counties: null, // 区县数据
  selectedInfo: {
    province: null,
    city: null,
    county: null,
  },
});

// 省是否有数据
const isProvinceSelectorShow = computed(() => !!provinces);
// 市是否有数据
const isCitySelectorShow = computed(() => !!state.cities);
// 区县是否有数据
const isCountySelectorShow = computed(() => !!state.counties);

/**
 * 切换省
 * @param {*} value
 */
const handleProvinceChange = (value) => {
  // 没有选择数据, 置空
  if (!value) {
    state.selectedInfo.province = null;
    state.selectedInfo.city = null;
    state.selectedInfo.county = null;
    state.cities = null;
    state.counties = null;
    return;
  }

  const [code, name] = value.split(":");

  console.log("切换省==>>", code, name);
  state.selectedInfo.province = {
    code,
    name,
  };

  state.cities = provinces[name].cities;
};

/**
 * 切换市
 * @param {*} value
 */
const handleCityChange = (value) => {
  if (!value) {
    state.selectedInfo.city = null;
    state.selectedInfo.county = null;
    state.counties = null;
    return;
  }
  const [code, name] = value.split(":");
  state.selectedInfo.city = {
    code,
    name,
  };
  state.counties = state.cities[name].counties;
};

/**
 * 切换区县
 * @param {*} value
 */
const handleCountyChange = (value) => {
  if (!value) {
    return;
  }

  const [code, name] = value.split(":");
  state.selectedInfo.county = {
    code,
    name,
  };
  // 转换成普通对象
  emit("handleSelect", toRaw(state.selectedInfo));
};

/**
 * 格式化城市数据
 * @param {*} data
 * {
 *  四川省: {
 *      name,
 *      code,
 *      cities: {
 *          成都市: {
 *              name,
 *              code,
 *              counties: {
 *                  锦江区: {
 *                      name,
 *                      code
 *                  }
 *              }
 *          }
 *      }
 *  }
 * }
 */
function formatData(data) {
  return data.reduce((prev1, next1) => {
    next1.cities = next1.cities.reduce((prev2, next2) => {
      next2.counties = next2.counties.reduce((prev3, next3) => {
        prev3[next3.countyName] = next3;
        return prev3;
      }, {});
      prev2[next2.cityName] = next2;
      return prev2;
    }, {});
    prev1[next1.provinceName] = next1;
    return prev1;
  }, {});
}
</script>
