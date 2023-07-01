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

export { isObject, hasOwnProperty, isEqual };
