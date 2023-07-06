/**
 * 创建响应式
 */

import { isObject } from "./utils";
import { proxyHandler } from "./handler";

export function createReactive(data) {
  return createReactiveData(data, proxyHandler);
}

/**
 * 创建响应式数据
 * @param {*} data
 * @param {*} proxyHandler
 * @returns
 */
function createReactiveData(data, proxyHandler) {
  // 如果不是对象，直接返回
  if (!isObject(data)) return data;
  //   new Proxy(target, { get, set })
  return new Proxy(data, proxyHandler);
}
