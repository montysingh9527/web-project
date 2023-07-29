/**
 * 页面渲染
 */

import {
  createWeekDaysNode,
  createDateNode,
  createControlArea,
} from "./creator";

/**
 * 页面渲染
 * @param {*} container
 * @returns
 */
export function render(container) {
  const oTable = document.createElement("table");
  const oTHead = document.createElement("thead");
  const oTBody = document.createElement("tbody");
  const weekDayNode = createWeekDaysNode();

  oTable.className = "my-calendar-table";
  oTBody.className = "my-calendar-body";

  return function (year, month) {
    const dateTrs = createDateNode(year, month);
    // 创建年/月节点
    const controlArea = createControlArea(year, month);
    oTHead.appendChild(weekDayNode);
    container.appendChild(oTHead);

    dateTrs.forEach((tr) => {
      oTBody.appendChild(tr);
    });

    oTable.appendChild(oTHead);
    oTable.appendChild(oTBody);
    // 添加年月节点
    container.appendChild(controlArea);
    container.appendChild(oTable);
    return container;
  };
}

/**
 * 更新节点
 * @param {*} year
 * @param {*} month
 */
export function update(year, month) {
  let oTBody = document.querySelector(".my-calendar-body");
  const dateTrs = createDateNode(year, month);
  oTBody.innerHTML = "";

  dateTrs.forEach((tr) => {
    oTBody.appendChild(tr);
  });
}
