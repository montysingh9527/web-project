import { axiosPost } from "../libs/http";

/**
 * 获取日数据
 * @param {*} date
 * @returns
 */
function getDayData(date) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: "/api/calendar/day",
      data: { date },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/**
 * 获取月份数据
 * @param {*} yearMonth
 * @returns
 */
function getMonthData(yearMonth) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: "/api/calendar/month",
      data: {
        "year-month": yearMonth,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/**
 * 获取年份数据
 * @param {*} year
 * @returns
 */
function getYearData(year) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: "/api/calendar/year",
      data: {
        year,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

export { getDayData, getMonthData, getYearData };
