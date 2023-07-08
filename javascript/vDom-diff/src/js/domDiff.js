import { ATTR, TEXT, REPLACE, REMOVE } from "./patchTypes";

let patches = {},
  vnIndex = 0;

function domDiff(oldVDOM, newVDom) {
  let index = 0;
  vNodeWalk(oldVDOM, newVDom, index);
  return patches;
}

function vNodeWalk(oldNode, newNode, index) {
  let vnPatch = [];
  if (!newNode) {
    vnPatch.push({
      type: REMOVE,
      index,
    });
    // 如果节点是字符串
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    // 新节点和旧节点不一致
    if (oldNode !== newNode) {
      vnPatch.push({
        type: TEXT,
        text: newNode,
      });
    }
  } else if (oldNode.type === newNode.type) {
    const attrPatch = attrsWalk(oldNode.props, newNode.props);
    if (Object.keys(attrPatch).length > 0) {
      vnPatch.push({
        type: ATTR,
        attrs: attrPatch,
      });
    }
    // 子节点
    childrenWalk(oldNode.children, newNode.children);
  } else {
    vnPatch.push({
      type: REPLACE,
      newNode,
    });
  }

  if (vnPatch.length > 0) {
    patches[index] = vnPatch;
  }
}

/**
 * 属性打补丁
 * @param {*} oldAttrs
 * @param {*} newAttrs
 */
function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {};
  for (let key in oldAttrs) {
    // 修改属性
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key];
    }
  }

  for (let key in newAttrs) {
    // 新增
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }
  console.log("---attrPatch--", attrPatch);
  return attrPatch;
}

function childrenWalk(oldChildren, newChildren) {
  oldChildren.map((c, idx) => {
    vNodeWalk(c, newChildren[idx], ++vnIndex);
  });
}

export default domDiff;
