<template>
  <div>
    <!-- 省 -->
    <select v-if="isProvinceSelectorShow" @change="handleProvinceChange">
      <option value="">请选择 - 省</option>
      <option
        v-for="(info, index) in provinces"
        :value="`${info.provinceCode}:${info.provinceName}`"
        :key="index"
      >
        {{ info.provinceName }}
      </option>
    </select>
    <!-- 市 -->
    <select v-if="isCitySelectorShow" @change="handleCityChange">
      <option value="">请选择 - 市</option>
      <option
        v-for="(info, idx) in state.cities"
        :value="`${info.cityCode}:${info.cityName}`"
        :key="idx"
      >
        {{ info.cityName }}
      </option>
    </select>
    <!-- 区县 -->
    <select v-if="isCountySelectorShow" @change="handleCountyChange">
      <option value="">请选择 - 区县</option>
      <option
        v-for="(info, x) in state.counties"
        :value="`${info.countyCode}:${info.countyName}`"
        :key="x"
      >
        {{ info.countyName }}
      </option>
    </select>
  </div>
</template>
<script setup>
import cityData from "./city.js";
import { reactive, computed, toRaw } from "vue";

// 格式化城市数据
const provinces = formatData(cityData);

console.log("---logs---", provinces);

const state = reactive({
  cities: null, // 市数据
  counties: null, // 区县数据
  selectedInfo: {
    /**
     * {
     *  name: xxx,
     *  code: xxx
     * }
     */
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
 * @param {*} e
 */
const handleProvinceChange = (e) => {
  const { value } = e.target;
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
 * @param {*} e
 */
const handleCityChange = (e) => {
  const { value } = e.target;
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
 * @param {*} e
 */
const handleCountyChange = (e) => {
  const { value } = e.target;
  if (!value) {
    return;
  }

  const [code, name] = value.split(":");
  state.selectedInfo.county = {
    code,
    name,
  };
  // 转换成普通对象
  const data = toRaw(state.selectedInfo);
  console.log("--选择数据-data---", data);
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
