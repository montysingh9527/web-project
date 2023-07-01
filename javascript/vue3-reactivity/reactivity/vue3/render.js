import { eventFormat, stateFormat, bindEvent } from "./index";

/**
 * 模板渲染/事件绑定
 * @param {*} param
 * @param {*} DOM
 */
export function useDOM({ template, state, methods }, DOM) {
  DOM.innerHTML = render(template, state);
  bindEvent(methods);
}

/**
 * 模板渲染
 * @param {*} template
 * @param {*} state
 * @returns
 */
export function render(template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);
  return template;
}

/**
 * 更新dom
 * @param {*} statePool
 * @param {*} key
 * @param {*} value
 */
export function update(statePool, key, value) {
  const allElements = document.getElementsByTagName("*");
  let oItem = null;
  //   console.log("---render--statePool--",statePool)
  statePool.forEach((item) => {
    console.log("-----item.state---", item);
    if (item.state[item.state.length - 1] === key) {
      for (let i = 0; i < allElements.length; i++) {
        oItem = allElements[i];
        const _flag = parseInt(oItem.dataset.dom);

        if (item.flag === _flag) {
          oItem.innerHTML = value;
        }
      }
    }
  });
}
