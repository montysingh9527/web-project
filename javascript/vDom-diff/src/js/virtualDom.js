import Element from "./Element";

function createElement(type, props, children) {
  return new Element(type, props, children);
}

/**
 * 判断节点类型
 * @param {*} node
 * @param {*} prop
 * @param {*} value
 */
function setAttrs(node, prop, value) {
  switch (prop) {
    case "value":
      if (
        node.tagName.toLocaleLowerCase() === "input" ||
        node.tagName.toLocaleLowerCase() === "textarea"
      ) {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(prop, value);
      break;
  }
}

/**
 * 渲染节点
 * @param {*} vDom
 */
function render(vDom) {
  const { type, props, children } = vDom,
    el = document.createElement(type);
  console.log("---logs--children-", children);

  for (let key in props) {
    setAttrs(el, key, props[key]);
  }

  children?.map((c) => {
    c = c instanceof Element ? render(c) : document.createTextNode(c);
    el.appendChild(c);
  });
  return el;
}

function renderDOM(rDom, rootEl) {
  rootEl.appendChild(rDom);
}

export { createElement, render, setAttrs, renderDOM };
