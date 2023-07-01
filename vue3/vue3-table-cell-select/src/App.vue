<template>
  <div class="container">
    <!-- 使用自定义指令 -->
    <table border="1" v-cell-select="weekdayTimeData">
      <tr>
        <th rowspan="2">星期/时间</th>
        <th colspan="12">00:00 - 12:00</th>
        <th colspan="12">12:00 - 24:00</th>
      </tr>
      <tr>
        <th v-for="n in 24">{{ n - 1 }}</th>
      </tr>
      <tr v-for="n in 7" :data-weekday="n - 1">
        <th class="weekday-title">{{ weekdayTitle[n - 1] }}</th>
        <td v-for="m in 24" :data-time="m - 1"></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
/**
 * 数据结构：
 * {
 *  0:[0, 1, 2, 3]
 * }
 *
 * 星期一: 00:00, 01:00, 02:00, 03:00
 */
import vCellSelect from "./vCellSelect"; // 自定义指令
import { reactive } from "vue";

const weekdayTimeData = reactive([]);

const weekdayTitle = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  tr {
    height: 50px;
  }
  td {
    width: 50px;
    &.target {
      background-color: rgb(252, 156, 249);
    }
  }
  .weekday-title {
    width: 100px;
  }
}
</style>

















