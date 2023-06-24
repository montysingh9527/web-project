import { randomNum, checkType } from "../shared/utils";

const reg_onClick = /onClick\="(.*?)\"/g;
const reg_fnName = /^(.*?)\(/;
const reg_arg = /\((.*?)\)/;

/**
 * eventPool = [];
 * {
 *  flag: 随机数 随机字符串
 *  handler：事件处理函数的字符串
 *  type：click
 * }
 */

let eventPool = [];

export function eventFormat(template) {
  return template.replace(reg_onClick, function (node, key) {
    // console.log(node, key);
    const _flag = randomNum();
    eventPool.push({
      flag: _flag,
      handler: key.trim(),
      type: "click",
    });
    console.log("---eventPool---", eventPool);
    return `data-dom="${_flag}"`;
  });
}

/**
 * 事件绑定
 * @param {*} methods
 */
export function bindEvent(methods) {
  const allElements = document.getElementsByTagName("*");
  let oItem = null;
  let _flag = 0;

  eventPool.forEach((event) => {
    for (let i = 0; i < allElements.length; i++) {
      oItem = allElements[i];
      const _flag = parseInt(oItem.dataset.dom);

      if (event.flag === _flag) {
        oItem.addEventListener(
          event.type,
          function () {
            // "add(2)";
            // methods["add"](2)
            const fnName = event.handler.match(reg_fnName)[1];
            const arg = checkType(event.handler.match(reg_arg)[1]);
            methods[fnName](arg);
          },
          false
        );
      }
    }
  });
}
