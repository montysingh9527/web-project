import { isObject } from "../shared/utils";
import { mutableHandler } from "./mutableHandler";

function reactive(target) {
  // console.log(target)
  return createReactiveObject(target, mutableHandler);
}

function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }
  // 设置Proxy代理
  const proxy = new Proxy(target, baseHandler);
  return proxy;
}

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
