import tpl from "./info.tpl";

const oApp = document.querySelector("#app");

const info = {
  name: "张三",
  age: 67,
  career: "张德帅",
  hobby: "旅行、钢琴",
};

console.log("---info---", info);

oApp.innerHTML = tpl(info);
