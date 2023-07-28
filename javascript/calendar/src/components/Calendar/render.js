import { createWeekDaysNode, createDateNode } from "./creator";

export function render(container) {
  const oTHead = document.createElement("thead");
  const oTBody = document.createElement("tbody");
  const weekDayNode = createWeekDaysNode();

  return function (year, month) {
    oTHead.appendChild(weekDayNode);
    container.appendChild(oTHead);

    console.log(createDateNode(year, month))
    return container;
  };
}

export function update() {}
