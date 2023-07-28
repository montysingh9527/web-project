import MyCalendar from "./components/Calendar";
import { render, update } from "./components/Calendar/render";
import "./components/Calendar/index.scss";

(() => {
  const myCalendar = MyCalendar();
  const oApp = document.querySelector("#app");
  // 获取当前日期（年/月/日）
  const dateInfo = myCalendar.getDateInfo();

  const init = () => {
    render(...dateInfo);
  };

  function render(...args) {
    console.log("-render(...args)-", ...args);
    oApp.appendChild(myCalendar.render(...args));
  }

  init();
})();
