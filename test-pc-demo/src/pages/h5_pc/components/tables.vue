<template>
  <div class="lan-table">
    名称:<input type="text" @input="searchName($event)" /> 域名:<input
      type="text"
      @input="searchDomain($event)"
    />
    <input type="checkbox" @change="changeTbs($event)" />通过
    <table border="1" cellpadding="0">
      <tr>
        <th
          @click="clickSort('id')"
          :class="[isIdSort ? 'time-th1' : 'time-th']"
        >
          ID
        </th>
        <th>名称</th>
        <th>
          <span>时间</span>
          <span
            @click="clickSort('time')"
            :class="[isTimeSort ? 'time-th1' : 'time-th']"
          ></span>
        </th>
        <th>域名</th>
        <th>结果</th>
      </tr>
      <tr v-for="(tdtab, idx) in tables" :key="idx">
        <td>{{ tdtab.id }}</td>
        <td>{{ tdtab.name }}</td>
        <td>{{ compendTime(tdtab.time) }}</td>
        <td>{{ tdtab.domain }}</td>
        <td>{{ tdtab.tbs == 1 ? "通过" : "异常" }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, toRefs, markRaw, watch } from "vue";
const props = defineProps({
  tabledata: Array,
});

const { tabledata } = toRefs(props);
// const tablesold = markRaw(props.tabledata)
const tables = ref(tabledata.value);

// 搜索名称
const searchName = (event) => {
  const inputValue = event.target.value;
  tables.value = tabledata.value;
  tables.value = tables.value.filter((item) => {
    if (item.name.includes(inputValue)) {
      return item;
    }
  });
  console.log("输入中....");
};

// 搜索域名
const searchDomain = (event) => {
  const inputValue = event.target.value;
  tables.value = tabledata.value;
  tables.value = tables.value.filter((item) => {
    if (item.domain.includes(inputValue)) {
      return item;
    }
  });
};

// 结果
const changeTbs = (event) => {
  const istab = event.target.checked;
  if (istab) {
    tables.value = tables.value.filter((item) => {
      const isitem = item.tbs == 1 ? true : false;
      if (isitem == istab) {
        return item;
      }
    });
  } else {
    tables.value = tabledata.value;
  }
};

// 排序
const isIdSort = ref(false);   // id排序
const isTimeSort = ref(false); // 时间排序

const clickSort = (type) => {
    if(type == "id"){
        isIdSort.value = !isIdSort.value;
        sorttables(isIdSort.value, "id")
    }else if(type == "time"){
        isTimeSort.value = !isTimeSort.value;
        sorttables(isTimeSort.value, "time")
    }
  console.log("排序===");

};

function sorttables(istrue, type) {
    tables.value = tables.value.sort((a, b) =>
        istrue ? a[type] - b[type] : b[type] - a[type]
  );
}


watch(tables.value, (newVal, oldVal) => {
  console.log("=====", newVal, oldVal);
});

const compendTime = (time) => {
  return new Date(time).toLocaleString();
};
</script>

<style scoped lang="scss">
.lan-table {
  table {
    margin: 100px auto;
    // width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    border-color: #000;
  }
  th,
  td {
    text-align: center;
  }
  th {
    height: 60px;
  }
  td {
    height: 50px;
  }
  .time-th::after {
    content: "\1F863";
    color: #31d3f0;
  }
  .time-th1::after {
    content: "\1F861";
    color: #ff0000;
  }
}
</style>
