/**
 * Object
 */

// function Array   Object -> 引用值 -> Object.prototype
let obj = {};
obj.a = 1;
let newObj = new Object(obj);
// console.log(newObj === obj); // true

let arr = [1, 2, 3, 4];
let newArr = new Object(arr);
// console.log(arr === newArr); // true

let newArr2 = new Array(arr, 3, 4, 5);
// console.log(newArr2); // [ [ 1, 2, 3, 4 ], 3, 4, 5 ]

let a = 1; // 原始值
let newA = new Number(a);
// console.log(newA === a); //  false
// console.log(newA); // 引用值

/**
 * Object.keys()
 * Object.getOwnPropertyNames()     忽略描述符 - enumerable: false
 */
let obj1 = {
  a: 1,
  b: 2,
  c: 3,
};

// console.log(Object.keys(obj1)); // [ 'a', 'b', 'c' ]
// console.log(Object.getOwnPropertyNames(obj1)); // [ 'a', 'b', 'c' ]

Object.defineProperty(obj1, "b", {
  enumerable: false,
});

// console.log(Object.keys(obj1)); // [ 'a', 'c' ]
// 忽略描述符 - enumerable: false
// console.log(Object.getOwnPropertyNames(obj1)); // [ 'a', 'b', 'c' ]



let obj2 = {
  get a() {
    return Math.random() >= 0.5 ? 1 : 0;
  },
};
const round = Object.getOwnPropertyDescriptor(obj2, "a").get;
// console.log(round); // [Function: get a]


let obj3 = {};
Object.defineProperty(obj, "a", {
    get() {
        return "get a";
    }
})

obj.__defineGetter__("a",function() {
    return "get a";
})

// console.log(obj.a)   // get a