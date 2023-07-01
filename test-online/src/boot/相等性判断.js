/**
 * JS中相等性的判断
 */

/**
 * ES6 版本,四种相等判断的算法
 * 全等 ===
 * 等于 ==
 * 零值相等  -0 === +0
 * 同值相等  -0 !== +0    NaN === NaN
 */

// JS中提供有关相等判断的操作方法
// 严格相等  === strict Equality
// 非严格(抽象/非约束) 相等 == Loose(自由的,不受限制的) Equality
// Object.is(v1, v2)  ES6 新的API,判断两个参数是否是同一个值

// === 严格相等
// 不进行隐式类型转换 - 类型相同/值也相同
// 1==="1"  // false
// 1===2    // false

let obj = {}
// obj === obj    // true
// {} === {}      // false

// 两个NaN 或者是NaN跟其它值都不相等
// NaN === NaN   // false
// NaN === undefined  // false
// +0 === -0      // true
// +Infinity === -Infinity    // true
// +Infinity === -Infinity    // false

// 如何定义变量a      
let a ;
// console.log(a !== a)   // false

// 非严格相等  Abstract equality
// 隐式类型转换 -> 等式两边都有可能被转换
// 转换以后还是用严格相等来进行比较

// toPrimitive(A) 通过尝试调用 A 的 A.toString() 和 A.valueOf()方法, 将参数A转换为原始值(Primitive).

// 任何对象都与 undefined null 不相等


