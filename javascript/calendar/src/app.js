import MyCalendar from "./components/Calendar";
import { render, update } from "./components/Calendar/render";

(() => {
  const myCalendar = MyCalendar();
  const oApp = document.querySelector("#app");
  const dateInfo = myCalendar.getDateInfo();

  const init = () => {
    render(...dateInfo);
  };

  function render(...args) {
    oApp.appendChild(myCalendar.render(...args));
  }

  init();
})();
