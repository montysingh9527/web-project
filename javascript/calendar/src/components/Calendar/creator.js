/**
 * 创建节点
 */

import { WEEK_DAYS } from "./config";
import {
  getLastMonthRestDays,
  getMonthDayCount,
  getNextMonthRestDays,
  getDateInfo,
  getFormatDate,
} from "./utils";
/**
 * 创建星期节点
 * @returns
 */
export function createWeekDaysNode() {
  const oTr = document.createElement("tr");
  oTr.className = "week-day";

  oTr.innerHTML = WEEK_DAYS.map((day) => `<th>${day}</th>`).join("");
  return oTr;
}

/**
 * 创建时间面板
 * @param {*} year
 * @param {*} month
 */
export function createDateNode(year, month) {
  // 获取当月前面剩余几天
  const lastMonthRestDays = getLastMonthRestDays(year, month);
  // 获取当月天数
  const currentMonthDayCount = getMonthDayCount(year, month);
  // 获取当月后面剩余几天
  const nextMonthRestDays = getNextMonthRestDays(year, month);
  // 创建tr节点 （6行）
  const dateTrArr = createDateTrs(6);
  // 当月前面的天数（置灰）
  const lastMonthRestDaysTD = createRestDaysTD(lastMonthRestDays);
  // 当月天数
  const currentMonthDaysTD = createCurrentDaysTD(
    currentMonthDayCount,
    year,
    month
  );
  // 当月后面剩余天数（置灰）
  const nextMonthRestDaysTD = createRestDaysTD(nextMonthRestDays);

  // 将整个面板展示天数合并
  const tdArr = [
    ...lastMonthRestDaysTD,
    ...currentMonthDaysTD,
    ...nextMonthRestDaysTD,
  ];
  // 计步器
  let index = 0;
  dateTrArr.forEach((tr) => {
    // 一列是7天
    for (let i = 0; i < 7; i++) {
      tr.appendChild(tdArr[index]);
      index++;
    }
  });

  return dateTrArr;
}

/**
 * 创建节点
 * @param {*} count 数量
 * @returns
 */
export function createDateTrs(count) {
  const trArr = [];
  for (let i = 0; i < count; i++) {
    const oTr = document.createElement("tr");
    trArr.push(oTr);
  }
  return trArr;
}

/**
 * 生成TD节点
 * @param {*} restDays
 * @returns
 */
function createRestDaysTD(restDays) {
  return restDays.map((item) => {
    const oTd = document.createElement("td");
    oTd.className = "day rest-day";
    oTd.innerText = item;
    return oTd;
  });
}

/**
 * 生成日期节点（30天30个节点）
 * @param {*} currentDayCount  当月天数
 * @param {*} year  年
 * @param {*} month  月
 * @returns
 */
function createCurrentDaysTD(currentDayCount, year, month) {
  let tdArr = [];
  const [currentYear, currentMonth, currentDate] = getDateInfo();
  for (let i = 1; i <= currentDayCount; i++) {
    const oTd = document.createElement("td");
    // 如果是当天，则添加current类
    if (currentYear === year && currentMonth === month && currentDate === i) {
      oTd.className = "day current-day current";
    } else {
      oTd.className = "day current-day";
    }
    oTd.innerText = i;
    oTd.setAttribute("data-date", getFormatDate(year, month, i));
    tdArr.push(oTd);
  }
  return tdArr;
}

/**
 * 创建年/月 切换
 * @param {*} year 
 * @param {*} month 
 * @returns 
 */
export function createControlArea(year, month) {
  const oArea = document.createElement("div");
  oArea.className = "control-area";

  oArea.innerHTML = `
        <span class="control-btn btn-year-lt">&lt;&lt;</span>
        <span class="control-btn btn-month-lt">&lt;</span>
            <span class="control-show">
                <span class="control-title">
                    <span class="title-year">${year}</span>年
                </span>
                <span class="control-title">
                    <span class="title-month">${month}</span>月
                </span>
            </span>
        <span class="control-btn btn-month-lt">&gt;</span>
        <span class="control-btn btn-year-lt">&gt;&gt;</span>
    `;
  return oArea;
}
