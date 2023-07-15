##### Object

> function、Array、Object 都属于引用值类型，它们最终都要继承 Object.prototype ，即它们的 “祖宗” 都是 Object

```
({} + {}).length // 30
([] + []).length // 0
(function () {}).length // 0
[1, 2, 3].map(parseInt)  // [1, NaN, NaN]

let obj = {}
obj.a = 1;
let newObj = new Object(obj);
console.log(newObj === obj); // true

let arr1 = [1, 2, 3, 4]
let newArr1 = new Object(arr1)
console.log(arr1 === newArr); // true

let arr2 = [1, 2, 3, 4]
let newArr2 = new Array(arr2)  // new Array(args) 是将 args 作为数组元素放入新数组中
console.log(arr2 === newArr2);  // false
console.log(newArr2)  //  [[1, 2, 3, 4]]
```

###### Number、String 类型属于原始值，其他原始值还有 Boolean、Null、Underfined；

> 原始值是固定不可变的，而字符串的 length 属性是继承自 String 类型的。

```
let a = 1;
a.b = 2;
console.log(a.b); // undefined

var str = '123'
str.length = 1
str.a = 'hhhh'
console.log(str.length, str.a); // 3 undefined

如果使用 new Number() 呢？
var b = 1; // 原始值
var newNum = new Number(b)  // 引用值
console.log(newNum === b); // false
newNum.a = 123
console.log(newNum); //  Number {1, a: 123}
// new Number() 与 new Object() 一样，都是创建一个引用值。
```

##### Array.from 理解类数组

> Array.from：允许在 JavaScript 集合(如: 数组、类数组对象、或者是字符串、map 、set 等可迭代对象) 上进行有用的转换。

```

let obj = { 0: 1, 1: 2, 2: 3, length: 2};
let newArr = Array.from(obj);
console.log(newArr); // > (2) [1, 2]  // length 决定了 Array.from 最终返回的新数组长度，需要剪裁掉。（如果不足则补undefind）

let obj1 = { a: 0, b: 1, C: 2, length: 3 }
let newArr1 = Array.from(obj1)
console.log(newArr1); // > [undefined,undefined,undefined]   // 找不到“0”、“1”、“2”

Array.from.length   // 1  必传一个参数，且第一个参数必须是 类数组或可迭代对象
```

###### Array.from(obj, function() {}) 类数组第二个参数

```
const newArr = Array.from({0: 1, 1: 2, length: 2,},
        function (item, index) {
          return {
            student: "No." + item,
            order: index,
          };
        }
      );
console.log(newArr); // [{order:0,student:No.1},{order:1,student:No.2}]

Array.from({length: 3}, (_,i)=> i) // [0, 1, 2]
Array.from(Array(3).keys(), (_,i)=> i) // [0, 1, 2]
Array.from(Array(3).keys(), (_,i)=> "") // ['', '', '']
```
