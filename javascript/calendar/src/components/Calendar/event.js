/**
 * 事件绑定
 */

let target = null;
export default (container, handler) => {
  container.addEventListener("click", handleClick.bind(null, handler), false);
};

function handleClick(...args) {
  const [handler, e] = args;
  const tar = e.target;
  const className = tar.className;
  // 判断是否可点击
  if (className.includes("current-day")) {
    if (target) {
      target.className = target.className.replace(" selected", "");
    }
    target = tar;
    tar.className += " selected";
    handler && handler(tar.dataset.date);
  }
}
