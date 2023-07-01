/**
 * Array.from
 */

let obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 4,
};
// length 决定了Array.from最终返回的新数组的长度,裁剪掉或补齐(undefined)
let newArr = Array.from(obj);
// console.log(newArr); // [ 1, 2, 3, undefined ]
// console.log(newArr.length); // 4

// obj -> 伪装 -> 类似于数组的一种伪类型 -> 不是JS的类型
let obj1 = {
  0: 1,
  1: 2,
  length: 0,
  push: [].push,
};

obj1.push(4);
// console.log(obj1); // { '0': 4, '1': 2, push: [Function: push], length: 1 }

// ========================Array.from========================================
/**
 * [
 *  {
 *      studentId: No.1,
 *      order: 0,
 *  },
 * {
 *      studentId: No.2,
 *      order: 1
 * }
 * ]
 */
let obj2 = {
  0: 1,
  1: 2,
  length: 2,
};
// 方式一
const data = Array.from(obj2).map((item, index) => {
  return {
    studentId: "No." + item,
    order: index,
  };
});
// console.log(data); // [ { studentId: 'No.1', order: 0 }, { studentId: 'No.2', order: 1 } ]
// 方式二
const data2 = Array.from(
  obj2,
  function (item, index) {
    return {
      // studentId: "No." + item,
      studentId: this.prefix + item,
      order: index,
    };
  },
  {
    prefix: "No.",
  }
);
// console.log(data2); // [ { studentId: 'No.1', order: 0 }, { studentId: 'No.2', order: 1 } ]

// ============================稀松数组======================
// empty -> null undefined    类型和值
const arr = [1, , , 2, , 3, , 6, 7, 8, , , 9];
arr.find((item) => {
  //   console.log(item); // 1 undefined undefined 2 undefined 3 undefined 6 7 8 undefined undefined 9
});

const item = arr.find((item, index) => {
  return index === 1;
});
// console.log(item); //  undefined

arr.forEach((item) => {
  //   console.log(item); // 1 2 3 6 7 8 9
});

Array.from.length; // Array.from 函数的形参的长度
// console.log(Array.from.length); // 1   Array.from(undefined)

let obj3 = {
  a: 1,
  b: 2,
  c: 3,
  length: 3,
};
// console.log(Array.from(obj3)); //[ undefined, undefined, undefined ]
