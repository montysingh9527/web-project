/**
 * 处理多个盒子点击事件
 * 使点击盒子显示到最上层
 */
// const oBoxList1 = document.querySelectorAll(".box");
const oBoxList = document.getElementsByClassName("box");  // 获取到的是类数组
export default {
  elFocus(el) {
    [...oBoxList].forEach((box) => {
      box.style.zIndex = 0;
    });

    el.style.zIndex = 1;
  },
};
