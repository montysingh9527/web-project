/**
 * 一道引发思考的[作用域间的纠葛] 笔试题
 * 预编译
 * 
 * 
 * 总结：
 * 从test内部出发 -> 全局
 * test函数局部作用域 ——>
 *  局部有没有这个东西 ——> 没有 ——> 找参数
 * test函数参数作用域 ——> 
 *  参数有没有这个东西 ——> 没有 ——> 找全局
 * 全局作用域
 */

// ===========第一题=====S==========
/**
var x = 1;
function test(
  x,
  y = function () {
    x = 3;
    console.log("第一题====>", x);
  }
) {
  console.log("第一题====>", x);   // 预编译第三步：形实参相统一 X => undefined
  var x = 2;
  y();              // 参数作用域y执行 -> 参数作用域x -> 3
  console.log("第一题====>", x);   // test局部作用域 x => 2
}

test();
console.log("第一题====>", x);   // 全局作用域 x => 1
*/
// 输出：
// undefined
// 3
// 2
// 1
// ===========第一题=======E=========

// ===========第二题=====S==========
/**
var x = 1;
function test(
  x,
  y = function () {
    x = 3;
    console.log("2====>", x);
  }
) {
  console.log("2====>", x);   // 预编译第三步：形实参相统一 X => undefined
//   var x = 2;
  y();              // 参数作用域y执行 -> 参数作用域x -> 3
  console.log("2====>", x);   // 参数作用域 x => 3
}

test();
console.log("2====>", x);   // 全局作用域 x => 1
 */
// 输出：
// undefined
// 3
// 3
// 1
// ===========第二题=======E=========

// ===========第三题=====S==========
/**
var x = 1;
function test(
  a,
  y = function () {
    x = 3;
    console.log("3==3==>", x);
  }
) {
  console.log("3==3==>", x);   // 预编译第2步：保存局部变量x到AO => undefined
  var x = 2;
  y();              // 全局作用域 x -> 3
  console.log("3==3=>", x);   // 局部作用域 x => 2
}

test();
console.log("3===3=>", x);   // 通过参数y函数执行将全局的 x => 3
 */
// 输出：
// undefined
// 3
// 2
// 3
// ===========第三题=======E=========

// ===========第四题=====S==========
/**
var x = 1;
function test(
  x = 4,
  y = function () {
    x = 3;
    console.log("4==4==>", x);
  }
) {
  console.log("4==4==>", x); // 预编译第3步：形实参相统一  x => 4
  var x = 2;
  y(); // 参数y执行 -> 参数 x -> 3
  console.log("4==4=>", x); // 局部作用域 x => 2
}

test();
console.log("4===4=>", x); // 全局作用域 x => 1
*/
// 输出：
// 4
// 3
// 2
// 1
// ===========第四题=======E=========

// ===========第五题=====S==========
var x = 1;
function yy() {
  x = 3;
  console.log("5==5==>", x);
}

function test(x, y = yy) {
  console.log("5==5==>", x); // 预编译第3步：形实参相统一  x => undefined
  var x = 2;
  y();                      // 相当于定义在全局的yy函数引用执行 -> 全局的 x -> 3
  console.log("5==5==>", x); // 局部作用域 x => 2
}

test();
console.log("5==5==>", x); // yy函数引用执行 -> 全局作用域 x => 3
// 输出：
// undefined
// 3
// 2
// 3
// ===========第五题=======E=========
