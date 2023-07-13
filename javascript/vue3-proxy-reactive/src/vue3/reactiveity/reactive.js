import { isObject } from "../shared/utils";
import { mutableHandler } from "./mutableHandler";

/**
 * 创建响应式对象
 * @param {*} target
 * @return {*} 
 */
function reactive(target) {
  // console.log(target)
  return createReactiveObject(target, mutableHandler);
}

/**
 * 创建响应式对象
 * @param {*} target 被观察对象
 * @param {*} baseHandler 基本回调
 * @return {*} 
 */
function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }
  // 设置Proxy代理对象
  const proxy = new Proxy(target, baseHandler);
  // 返回被代理的对象
  return proxy;
}



// Proxy+Reflect原理：拦截对象的读取和设置操作，并在操作前后进行相应的处理
//  - 针对整个对象target进行劫持 
/**
 * new Proxy(target, {
 *   get (target, key, receiver) {
 *   },
 *   set (target, key, value, receiver) {
 *   }
 * })
 */

// 区别defineProperty - 针对某一对象的一个属性key进行劫持
/**
 * Object.defineProperty(target, key, {
 * get() {},
 * set(newValue) {},
})
 */


/**
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    return res;
  },

  set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver);
    target[key] = value;
    return res;
  },
});
*/

// Object.getPrototypeOf -> Reflect
// Reflect = {
//     get,
//     set,
// }

export { reactive };
