import { isObject, hasOwnProperty, isEqual } from "../shared/utils";
import { reactive } from "./reactive";

const get = createGetter(),
  set = createSetter();
// deleteProperty = createDeleteProperty();

function createGetter() {
  return function get(target, key, receiver) {
    // Reflect: get/set 会返回一个值
    const res = Reflect.get(target, key, receiver);
    // return target[key] 等于 return res
    console.log("响应式获取：" + target[key]);

    // 如果是一个对象，则递归设置新值为响应式
    if (isObject(res)) {
      return reactive(res);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    // 判断该值是否需要修改  存在判断
    const isKeyExist = hasOwnProperty(target, key),
      // 保存旧值
      oldValue = target[key],
      res = Reflect.set(target, key, value, receiver);
    // console.log("响应式设置：" + key + "==" + value + "-" + target.length);

    if (!isKeyExist) {
      console.log("响应式新增：" + value);
    } else if (!isEqual(value, oldValue)) {
      console.log("响应式修改：" + key + "=" + value);
    }
    return res;
  };
}

// function createDeleteProperty() {}

const mutableHandler = {
  get,
  set,
  //   get: function (target, key, receiver) {},
  //   set: function (target, key, value, receiver) {},
  // deleteProperty
};

export { mutableHandler };
