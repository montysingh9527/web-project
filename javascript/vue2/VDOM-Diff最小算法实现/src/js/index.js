import { createElement, render, renderDOM } from "./virtualDom";
import domDiff from "./domDiff";
import doPatch from "./doPatch";

// 虚拟节点结构树
const vDom = createElement(
  "ul",
  {
    class: "list",
    style: "width: 300px; height: 300px; background-color: orange;",
  },
  [
    createElement(
      "li",
      {
        class: "item",
        "data-index": 0,
      },
      [createElement("p", { class: "text" }, ["第1个列表项"])]
    ),
    createElement("li", { class: "item", "data-index": 1 }, [
      createElement("p", { class: "text" }, [
        createElement("span", { class: "title" }, ["第2个列表项"]),
      ]),
    ]),
    createElement("li", { class: "item", "data-index": 2 }, ["第3个列表项"]),
  ]
);

const vDom2 = createElement(
  "ul",
  {
    class: "list-wrap",
    style: "width: 300px; height: 300px; background-color: orange;",
  },
  [
    createElement(
      "li",
      {
        class: "item",
        "data-index": 0,
      },
      [createElement("p", { class: "title" }, ["特殊列表项"])]
    ),
    createElement("li", { class: "item", "data-index": 1 }, [
      createElement("p", { class: "text" }, []),
    ]),
    createElement("div", { class: "item", "data-index": 2 }, ["第3个列表项"]),
  ]
);

console.log("---logs--111-", vDom);
console.log("---logs--vDom2-", vDom2);
// render: 将 虚拟节点vDom 转换为 真实节点rDom
const rDom = render(vDom);
// 通过renderDom渲染真实节点到视图
renderDOM(rDom, document.getElementById("app"));

// 调用Diff算法，比较两个虚拟节点的差异
const patches = domDiff(vDom, vDom2);
// 给真实Dom打补丁
doPatch(rDom, patches);
console.log("---patches---", patches);

console.log("---logs--222-", rDom);
