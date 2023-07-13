import { ATTR, TEXT, REPLACE, REMOVE } from "./patchTypes";
import { setAttrs, render } from "./virtualDom";
import Element from "./Element";

let finalPatches = {}, // 全局补丁
  rnIndex = 0;

/**
 * 为真实Dom打补丁
 * @param {*} rDom 真实Dom
 * @param {*} patches 补丁对象
 */
function doPatch(rDom, patches) {
  finalPatches = patches;
  rNodeWalk(rDom);
}

/**
 * 真实节点遍历
 * @param {*} rNode
 */
function rNodeWalk(rNode) {
  const rnPatch = finalPatches[rnIndex++], // 获取真实节点的补丁
    childNodes = rNode.childNodes; // 获取真实节点的子节点
  // 递归遍历子节点
  [...childNodes].map((c) => {
    rNodeWalk(c);
  });

  if (rnPatch) {
    // 打补丁
    patchAction(rNode, rnPatch);
  }
  return rnPatch;
}

/**
 * 打补丁
 * 类似 vDom->rDom 过程
 * @param {*} rNode 当前节点
 * @param {*} rnPatch 当前节点的补丁
 */
function patchAction(rNode, rnPatch) {
  rnPatch.map((p) => {
    switch (p.type) {
      case ATTR:
        for (let key in p.attrs) {
          const value = p.attrs[key];
          if (value) {
            // 为真实节点设置属性
            setAttrs(rNode, key, value);
          } else {
            // 删除属性
            rNode.removeAttribute(key);
          }
        }
        break;
      // 文本补丁
      case TEXT:
        rNode.textContent = p.text;
        break;
      // 替换补丁
      case REPLACE:
        // p.newNode 如果是Element 构造出来的, 重新执行render
        const newNode =
          p.newNode instanceof Element
            ? // 渲染为真实节点
              render(p.newNode)
            : // 渲染为文本节点
              document.createTextNode(p.newNode);
        // 将当前节点替换为新节点
        rNode.parentNode.replaceChild(newNode, rNode);
        break;
      // 删除补丁
      case REMOVE:
        rNode.parentNode.removeChild(rNode);
        break;
      default:
        break;
    }
  });
}

export default doPatch;

// vNode = virtual Node
// vnPatch = virtual Node patch
// rNode = real Node
// rnPatch = real Node patch
