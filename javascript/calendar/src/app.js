import MyCalendar from "./components/Calendar";
import { render, update } from "./components/Calendar/render";
import "./components/Calendar/index.scss";

(() => {
  const myCalendar = MyCalendar(handler);
  const oApp = document.querySelector("#app");
  const oYear = document.querySelector(".year");
  const oMonth = document.querySelector(".month");
  const oYearSpan = oYear.querySelector("span");
  const oMonthSpan = oMonth.querySelector("span");
  // 获取当前日期（年/月/日）
  const dateInfo = myCalendar.getDateInfo();

  const init = () => {
    render(...dateInfo);
    bindEvent();
  };

  function render(...args) {
    console.log("-render(...args)-", ...args);
    oApp.appendChild(myCalendar.render(...args));
  }

  function bindEvent() {
    oYear.addEventListener("click", setYear, false);
    oMonth.addEventListener("click", setMonth, false);
  }

  function handler(date) {
    console.log("--handler--", date);
  }

  /**
   * 点击年
   * @param {*} e
   */
  function setYear(e) {
    const tar = e.target;
    const className = tar.className;
    const currentYear = Number(oYearSpan.innerText);

    if (className === "lt" || className === "gt") {
      switch (className) {
        case "lt":
          dateInfo[0] = currentYear - 1;
          break;
        case "gt":
          dateInfo[0] = currentYear + 1;
          break;
        default:
          break;
      }
      console.log("-点击年-dateInfo[0]--", dateInfo[0], dateInfo);
      oYearSpan.innerText = dateInfo[0];
      myCalendar.update(...dateInfo);
    }
  }

  /**
   * 点击月
   * @param {*} e
   */
  function setMonth(e) {
    const tar = e.target;
    const className = tar.className;
    const currentMonth = Number(oMonthSpan.innerText);

    if (className === "lt" || className === "gt") {
      switch (className) {
        // 点击左边
        case "lt":
          dateInfo[1] = currentMonth - 1;
          break;
        // 点击右边
        case "gt":
          dateInfo[1] = currentMonth + 1;
          break;
        default:
          break;
      }
      console.log("---点击月---", dateInfo[1], dateInfo);
      oMonthSpan.innerText = dateInfo[1];
      myCalendar.update(...dateInfo);
    }
  }

  init();
})();
