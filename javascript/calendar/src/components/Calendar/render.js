/**
 * 页面渲染
 */

import { createWeekDaysNode, createDateNode } from "./creator";

/**
 * 页面渲染
 * @param {*} container
 * @returns
 */
export function render(container) {
  const oTHead = document.createElement("thead");
  const oTBody = document.createElement("tbody");
  const weekDayNode = createWeekDaysNode();
  oTBody.className = "my-calendar-body";
  return function (year, month) {
    const dateTrs = createDateNode(year, month);
    oTHead.appendChild(weekDayNode);
    container.appendChild(oTHead);

    dateTrs.forEach((tr) => {
      oTBody.appendChild(tr);
    });

    container.appendChild(oTHead);
    container.appendChild(oTBody);
    return container;
  };
}

export function update(year, month) {
  let oTBody = document.querySelector(".my-calendar-body");
  const dateTrs = createDateNode(year, month);
  oTBody.innerHTML = "";

  dateTrs.forEach((tr) => {
    oTBody.appendChild(tr);
  });
}
