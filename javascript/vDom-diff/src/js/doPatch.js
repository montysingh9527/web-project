import { ATTR, TEXT, REPLACE, REMOVE } from "./patchTypes";
import { setAttrs, render } from "./virtualDom";
import Element from "./Element";

let finalPatches = {},
  rnIndex = 0;

function doPatch(rDom, patches) {
  finalPatches = patches;
  rNodeWalk(rDom);
}

function rNodeWalk(rNode) {
  const rnPatch = finalPatches[rnIndex++],
    childNodes = rNode.childNodes;

  [...childNodes].map((c) => {
    rNodeWalk(c);
  });

  if (rnPatch) {
    // 打补丁
    patchAction(rNode, rnPatch);
  }
  return rnPatch;
}

function patchAction(rNode, rnPatch) {
  rnPatch.map((p) => {
    switch (p.type) {
      case ATTR:
        for (let key in p.attrs) {
          const value = p.attrs[key];
          if (value) {
            setAttrs(rNode, key, value);
          } else {
            rNode.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        rNode.textContent = p.text;
        break;
      case REPLACE:
        // p.newNode 如果是Element 构造出来的, 重新执行render
        const newNode =
          p.newNode instanceof Element
            ? render(p.newNode)
            : document.createTextNode(p.newNode);
        // 将节点替换
        rNode.parentNode.replaceChild(newNode, rNode);
        break;
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
