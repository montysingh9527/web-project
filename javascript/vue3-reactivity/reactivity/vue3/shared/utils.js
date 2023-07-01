const reg_check_str = /^['|"].+?['|"]$/;
const reg_str = /['|"]/g;

/**
 * 判断是否为Object
 * @param {*} value
 * @returns Boolean
 */
function isObject(value) {
  return typeof value === "object" && value !== null;
}

/**
 * 判断对象是否有该属性
 * @param {*} target
 * @param {*} key
 * @returns Boolean
 */
function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

/**
 * 判断新值和旧值是否相等
 * @param {*} newValue
 * @param {*} oldValue
 * @returns Boolean
 */
function isEqual(newValue, oldValue) {
  return newValue === oldValue;
}

/**
 * 生成随机数
 * @returns
 */
function randomNum() {
  return new Date().getTime() + parseInt(Math.random() * 10000);
}

/**
 * 类型判断
 * @param {*} str 
 * @returns 
 */
function checkType(str) {
  if (reg_check_str.test(str)) {
    return str.replace(reg_str, "");
  }
  switch (str) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      break;
  }
  return Number(str);
}

export { isObject, hasOwnProperty, isEqual, randomNum, checkType };
