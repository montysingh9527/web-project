import { compileTemplate } from "./compile";

// 模板池（存放模板）
let domNodePool = [];

export function createApp(options) {
  for (let option in options) {
    switch (option) {
      // 类型组件
      case "components":
        initComponent(options[option]);
        break;
      default:
        break;
    }
  }
  return {
    mount,
  };
}

/**
 * 初始化组件
 * @param {*} components
 */
function initComponent(components) {
  // 组件是数组
  for (let component of components) {
    let [template, state] = component();

    const node = compileTemplate(template, state);

    domNodePool.push(node);
    console.log("--template, state---", template, state);
  }
}

/**
 * 获取#app节点
 * @param {*} el
 */
function mount(el) {
  const app = document.querySelector(el);
  const oFrag = document.createDocumentFragment();
  domNodePool.forEach((node) => {
    oFrag.appendChild(node);
  });
  app.appendChild(oFrag);
  console.log("--mount---", app);
  console.log("-模板池-domNodePool---", domNodePool);
}
