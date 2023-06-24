function _addZero(value) {
  return value < 10 ? "0" + value : value;
}

/**
 * 获取年月日
 * @param {*} type
 * @returns
 */
function getIconDate(type) {
  const date = new Date();
  switch (type) {
    case "day":
      return _addZero(date.getDate().toString());
    case "month":
      return _addZero((date.getMonth() + 1).toString());
    case "year":
      return date.getFullYear().toString().substring(2);
  }
}

/**
 * 格式化日期
 * @param {*} date
 * @param {*} type
 * @returns
 */
function formatChasDate(date, type) {
  const _arr = date.split("-");
  switch (type) {
    case "day":
      return `${_arr[0]}年${_arr[1]}月${_arr[2]}日`;
    case "month":
      return `${_arr[0]}年${_arr[1]}月`;
    case "year":
      return `${_arr[0]}年`;
    default:
      return `${_arr[0]}年${_arr[1]}月${_arr[2]}日`;
  }
}

/**
 * 格式化日期
 * @param {*} data
 * @param {*} key
 * @returns
 */
function mapForChsDate(data, key) {
  return data.map((item) => {
    item[key] = formatChasDate(item[key]);
    return item;
  });
}

/**
 * 格式化日期
 * @param {*} field
 * @returns
 */
function getNowDate(field) {
  const date = new Date();

  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  switch (field) {
    case "day":
      return `${year}-${month}-${day}`;
    case "month":
      return `${year}-${month}`;
    case "year":
      return `${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

export { getIconDate, formatChasDate, mapForChsDate, getNowDate };
