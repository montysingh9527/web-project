<script setup>
import CoursePanel from "./CoursePanel.vue";
import data from "./data.js";
import vCoursePanel from "./vCoursePanel.js"; // 自定义指令
import { ref } from "vue";
/**
 * 列：weekday
 * 行：timeSlot
 *
 * 策略模式：
 * {
 *  1-5: chinese / english / math
 * }
 */
const cellData = ref({
  "1-1": "chinese",
  "2-5": "english",
  "3-3": "math",
});

let targetCell = null;

function handleDragEnd(target) {
  if (targetCell) {
    // console.log("---targetCell---", targetCell.dataset);
    const weekday = targetCell.dataset.weekday;
    const timeSlot = targetCell.dataset.timeSlot;
    const prop = `${weekday}-${timeSlot}`;
    console.log("坐标-weekday--timeSlot-", weekday, timeSlot, prop);

    console.log("--cellData.value--", cellData.value);
    // 检查当前项没有数据，则添加
    if (!cellData.value[prop]) {
      const key = target.dataset.key;
      cellData.value[prop] = key;
    }
  }
}

function handleDragOver(e) {
  // 去除拖拽默认行为（去除回弹效果）
  e.preventDefault();
}

function handleDragEnter(e) {
  e.preventDefault();
  const tar = e.target;
  const tagName = tar.tagName.toLowerCase();
  targetCell = tagName !== "td" ? null : tar;
}
</script>

<template>
  <div class="board">
    <div class="left">
      <course-panel
        v-for="({ name }, key) in data.courses"
        :key="key"
        :course-key="key"
        :course-name="name"
        @handle-drag-end="handleDragEnd"
      ></course-panel>
    </div>
    <div class="right" @dragover="handleDragOver" @dragenter="handleDragEnter">
      <table border="1">
        <tr>
          <th>时间段 / 星期</th>
          <th v-for="(weekday, index) of data.weekday" :key="index">
            {{ weekday }}
          </th>
        </tr>
        <tr v-for="(timeSlot, index) of data.time_slot" :key="index">
          <th>{{ timeSlot }}</th>
          <td
            v-for="weekday in 7"
            :key="weekday"
            :data-weekday="weekday"
            :data-time-slot="index"
          >
            <template v-if="cellData[`${weekday}-${index}`]">
              <course-panel
                :course-name="
                  data.courses[cellData[`${weekday}-${index}`]].name
                "
                :course-key="cellData[`${weekday}-${index}`]"
                v-course-panel="{
                  cellData,
                  weekday,
                  timeSlot: index,
                }"
              ></course-panel>
              {{ cellData[`${weekday}-${index}`] }}--{{ `${weekday}-${index}` }}
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" src="./app.scss" scoped />
