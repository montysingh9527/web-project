// console.log(typeof 123); //  number
// console.log(typeof "123"); // string
// console.log(typeof true); //  boolean
// console.log(typeof function () {}); //function
// console.log(typeof undefined); // undefined
// console.log(typeof null); // object
// console.log(typeof []); // object
// console.log(typeof {}); //object
// console.log(typeof /\abc/); //object

// console.log([] instanceof Array); // true
// console.log([] instanceof Object); // true
// console.log({} instanceof Object); // true
// console.log("" instanceof Object); // false

function myInstanceof(target, type) {
  type = type.prototype;
  target = target.__proto__;

  while (true) {
    if (target === null) {
      return false;
    }
    if (target === type) {
      return true;
    }
    target = target.__proto__;
  }
}

class Test {}
const test = new Test();

console.log(myInstanceof(test, Test)); // true
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true