/**
 * new Proxy(target, { get, set })
 * get、set方法分离
 *
 * Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
 * 语法：
 * var p = new Proxy(target, {
 *        get: function(target, property, receiver) {},
 *        set: function(target, property, value, receiver) {}
 *    });
 *
 * Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get
 * 语法：
 * Reflect.get(target, propertyKey[, receiver])
 * Reflect.set(target, propertyKey, value[, receiver])
 */

import { createReactive } from "./reactive";
import { isObject } from "./utils";

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    // 如果是对象，将res变成响应式
    if (isObject(res)) {
      return createReactive(res);
    }
    return res;
  };
}

function createSetter() {
  return function (target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  };
}

export const proxyHandler = {
  get,
  set,
};
