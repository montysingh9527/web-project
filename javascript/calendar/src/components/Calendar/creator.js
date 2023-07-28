/**
 * 创建节点
 */

import { WEEK_DAYS } from "./config";
import {
  getLastMonthRestDays,
  getMonthDayCount,
  getNextMonthRestDays,
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
 * 创建时间节点
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

  const dateTrArr = createDateTrs(6);

  const lastMonthRestDaysTD = createRestDaysTD(lastMonthRestDays);
  const nextMonthRestDaysTD = lastMonthRestDays(nextMonthRestDays);

  return {
    lastMonthRestDays,
    currentMonthDayCount,
    nextMonthRestDays,
  };
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

function createRestDaysTD(restDays) {
  return restDays.map((item) => {
    const oTd = document.createElement("td");
    oTd.className = "day rest-day";
    oTd.innerText = item;

    return oTd;
  });
}
