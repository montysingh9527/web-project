/**
 * 模板渲染  DOM操作
 */

// 需要排除的节点
const customTags = ["if", "for"];

// 匹配{}内的 内容
const reg_single_bracket = /\{(.*?)\}/g;
// 匹配{{}}内的 内容
const reg_double_bracket = /\{\{(.*?)\}\}/g;

/**
 * 创建DOM 节点，渲染模板
 * @param {*} template
 * @param {*} data
 */
export function compileTemplate(template, data) {
  template = replaceVar(template, data, reg_double_bracket);

  const _node = document.createElement("div");
  _node.innerHTML = template;
  return compileNode(_node, data);
}

function compileNode(node, data) {
  // 获取到所有节点
  const allNodes = node.querySelectorAll("*");
  // 循环节点
  allNodes.forEach((item) => {
    // 获取标签名称
    const tagName = item.tagName.toLowerCase();
    // 如果是v-for
    if (customTags.includes(tagName)) {
      replaceNode(item, tagName, data);
    }
    // console.log(tagName);
  });

  // Node.nodeType只读属性表示的是该节点的类型。  1:一个元素节点，例如 <p> 和 <div>。
  return [...node.childNodes].find((item) => item.nodeType === 1);
}

/**
 * v-for替换节点
 * @param {*} node 节点
 * @param {*} tag 标签名
 * @param {*} data 数据
 */
function replaceNode(node, tag, data) {
  const dataKey = node.getAttribute("data");
  const className = node.className;
  const realTag = node.getAttribute("tag");

  switch (tag) {
    case "for":
      vFor(node, data, dataKey, className, realTag);
      break;
    // case "if":
    //     break;
    default:
      break;
  }
}

/**
 *  v-for 处理
 * @param {*} node
 * @param {*} data
 * @param {*} dataKey
 * @param {*} className
 * @param {*} realTag
 */
function vFor(node, data, dataKey, className, realTag) {
  console.log("---data[dataKey]--", data[dataKey]);
  const oFrag = document.createDocumentFragment();
  data[dataKey].forEach((item) => {
    const el = document.createElement(realTag);
    el.className = className ? className : "";
    el.innerHTML = replaceVar(node.innerHTML, item, reg_single_bracket);
    console.log("-渲染的节点-el---", el);
    oFrag.appendChild(el);
  });
  // Node.parentNode 返回指定的节点在 DOM 树中的父节点。
  // Node.replaceChild() 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点
  node.parentNode.replaceChild(oFrag, node);
}

/**
 * 节点字符替换
 * @param {*} html
 * @param {*} data
 * @param {*} reg
 * @returns
 */
function replaceVar(html, data, reg) {
  return html.replace(reg, (node, key) => {
    const obj = {};
    key = key.trim();
    return (obj[key] = data[key]);
  });
}
