/**
 * 获取当月的第一天是星期几
 * @param {*} year 2023（2023年）
 * @param {*} month 6（6月）
 * @returns 4（星期四）
 */
function getFirstWeekDay(year, month) {
  // 获取一年中第几月第几天     month是0-11
  const date = new Date(year, month - 1, 1);
  // getDay() 方法根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天
  return date.getDay();
}

/**
 * 获取当月天数
 * @param {*} year 2023
 * @param {*} month 6
 * @returns 30 （30天）
 */
function getMonthDayCount(year, month) {
  const date = new Date(year, month, 0);
  // 返回一个指定的日期对象为一个月中的哪一日（从 1--31）
  return date.getDate();
}

/**
 * 获取当月前面剩余几天  （每月前面置灰的天数）
 * @param {*} year 2023
 * @param {*} month 6
 * @returns [28, 29, 30, 31]
 */
function getLastMonthRestDays(year, month) {
  // 获取当月的第一天是星期几
  const days = getFirstWeekDay(year, month);
  // 获取当月天数
  let lastDate = getMonthDayCount(year, month - 1);
  const restDays = [];

  while (restDays.length < days) {
    restDays.unshift(lastDate--);
  }

  return restDays;
}

/**
 * 获取当月后面剩余几天  （每月后面置灰的天数）
 * @param {*} year 2023
 * @param {*} month 6
 * @returns [1, 2, 3, 4, 5, 6, 7, 8]
 */
function getNextMonthRestDays(year, month) {
  // 获取当月的第一天是星期几
  const lastMonthRestDayCount = getFirstWeekDay(year, month);
  // 获取当月天数
  const currentMonthDayCount = getMonthDayCount(year, month);
  // 42个单元格
  const nextMonthRestDayCount =
    42 - (lastMonthRestDayCount + currentMonthDayCount);
  let restDays = [];

  for (let i = 1; i <= nextMonthRestDayCount; i++) {
    restDays.push(i);
  }

  return restDays;
}
