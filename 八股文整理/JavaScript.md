6. 实现 `new` 的行为
7. 数组扁平化（flat）

---

#### JavaScript类型？原始类型有哪些？引用类型有哪些？

> JavaScript 中值被分为两大类**原始类型（Primitive Types）** 和 **引用类型（Reference Types）**。

- **原始类型（Primitive Types）**

  > 原始类型是**不可变的**、**不可再分的最基本数据类型**，它们是按值（by value）存储和操作的。

  **有 7 种原始类型：**

  | 类型        | 示例                | 说明                                       |
  | ----------- | ------------------- | ------------------------------------------ |
  | `string`    | `'hello'`, `"abc"`  | 文本字符串                                 |
  | `number`    | `42`, `3.14`        | 所有整数与浮点数（包括 `NaN`, `Infinity`） |
  | `bigint`    | `123n`, `BigInt(1)` | 表示任意精度整数（ES2020 引入）            |
  | `boolean`   | `true`, `false`     | 布尔值                                     |
  | `undefined` | `undefined`         | 未赋值的变量默认值                         |
  | `null`      | `null`              | 空值，占位符，表示“没有对象”               |
  | `symbol`    | `Symbol('id')`      | 唯一值，用于对象属性键（ES6 引入）         |

- **引用类型（Reference Types）**

  > 引用类型是通过**引用地址访问的复杂对象**，通常可以包含多个值（属性和方法）。它们存储在堆内存中，通过指针（引用）进行访问。

  **常见引用类型：**

  | 类型       | 示例                | 说明                         |
  | ---------- | ------------------- | ---------------------------- |
  | `Object`   | `{ name: 'Alice' }` | 最基本的引用类型             |
  | `Array`    | `[1, 2, 3]`         | 有序集合                     |
  | `Function` | `function() {}`     | 可执行对象（也是对象）       |
  | `Date`     | `new Date()`        | 日期和时间                   |
  | `RegExp`   | `/abc/`             | 正则表达式                   |
  | `Map`      | `new Map()`         | 键值对集合（键可为任何类型） |
  | `Set`      | `new Set()`         | 值集合（无重复）             |
  | `WeakMap`  | `new WeakMap()`     | 弱引用键值对集合             |
  | `WeakSet`  | `new WeakSet()`     | 弱引用值集合                 |
  | `Promise`  | `new Promise(...)`  | 异步操作结果                 |

---

#### 什么是变量提升（hoisting）？

> **变量（`var`）和函数声明会在其所在作用域内被“提升”到作用域的顶部，在代码执行前进行处理。但这并不是说它们的**实际代码位置改变了，执行代码前的编译阶段**会将声明部分“提前”。**

为什么不会报错？因为变量 `a` 被**提前声明了**

```
console.log(a); // undefined
var a = 5;

相当于下面这样：
var a;          // 提升的部分
console.log(a); // undefined
a = 5;          // 实际赋值
```

- **函数声明也会被提升**

  > 函数声明会整体提升（包括函数体），而变量声明只提升“**声明**”，不提升赋值。

  ```
  sayHi(); // 输出 "Hi"
  
  function sayHi() {
    console.log("Hi");
  }
  ```

- `let` 和 `const` 不存在传统的“变量提升”

  > 虽然它们也被提升，但**不会被初始化**，在声明之前访问会抛出错误： 处于一个“**暂时性死区（TDZ, Temporal Dead Zone）**”

  ```
  console.log(x); // ReferenceError
  let x = 10;
  ```

---

#### var、let、const有什么区别？

> 默认使用 `const`（保证不变性，代码更安全）。
>
> 需要重新赋值时使用 `let`。
>
> 避免使用 `var`

- **1、作用域（Scope）**

  - `var`：**函数作用域**

    - 如果在函数外使用 `var` 声明，则它是**全局变量**。
    - 在块（如 `if`、`for`）中声明的 `var` 会“漏出”到外部作用域。

  - `let` 和 `const`：**块级作用域**

    - 在 `{}` 内部声明的变量只在该块中有效。

    ```
    if (true) {
      var a = 1;
      let b = 2;
      const c = 3;
    }
    console.log(a); // ✅ 1
    console.log(b); // ❌ ReferenceError
    console.log(c); // ❌ ReferenceError
    ```

- **2、变量提升（Hoisting）**

  - `var`：会提升到**函数顶部**，但值不会提升。
  - `let` / `const`：也会提升，但会进入**“暂时性死区”（TDZ）**，在实际声明之前访问会报错。

  ```
  console.log(x); // undefined（因为 var 提升）
  var x = 10;
  
  console.log(y); // ❌ ReferenceError（let 有暂时性死区）
  let y = 20;
  ```

- **3、是否允许重复声明**

  - `var`：允许在同一作用域内重复声明。
  - `let` / `const`：不允许重复声明同名变量。

  ```
  var a = 1;
  var a = 2; // ✅ 没问题
  
  let b = 1;
  let b = 2; // ❌ SyntaxError
  
  const c = 1;
  const c = 2; // ❌ SyntaxError
  ```

- **4、是否允许修改值**

  - `var` / `let`：可以重新赋值。
  - `const`：**不能重新赋值**（但如果是对象，可以修改其属性）。

  ```
  let x = 1;
  x = 2; // ✅
  
  const y = 3;
  y = 4; // ❌ TypeError
  
  const obj = { a: 1 };
  obj.a = 2; // ✅ 修改属性没问题
  ```

##### ✅ 总结建议：

| 特性       | `var`      | `let`      | `const`        |
| ---------- | ---------- | ---------- | -------------- |
| 作用域     | 函数作用域 | 块级作用域 | 块级作用域     |
| 提升       | 有         | 有（TDZ）  | 有（TDZ）      |
| 可重复声明 | 是         | 否         | 否             |
| 可修改值   | 是         | 是         | 否（值不可变） |

---

#### ==` 和 `=== 有什么区别？

> 总是优先使用 `===`，除非你**明确知道**为什么要用 `==`

- `==` 等于（宽松等于）

  - 在比较前会进行**类型转换（type coercion）**，尝试将不同类型的值转换成相同类型再比较

  ```
  0 == '0'        // true，因为 '0' 转成了数字 0
  false == 0      // true，因为 false 转成了数字 0
  null == undefined // true，两个特殊值被认为相等
  ' \t\n' == 0    // true，空白字符串转换为 0
  ```

- `===`（严格等于 / 严格相等）

  - **不进行类型转换**，只有**类型和值都相同**时才为 `true`。
  - 推荐使用，能避免许多隐藏的 bug。

  ```
  0 === '0'       // false，不同类型
  false === 0     // false，不同类型
  null === undefined // false，不同类型
  ' \t\n' === 0   // false，不同类型
  ```

---

#### 什么是作用域？什么是作用域链？

- **作用域类型**
  - 全局作用域：在任何函数之外声明的变量，整个脚本都能访问
  - 函数作用域： `var` 具有函数作用域
  - 块级作用域：使用 `let` 和 `const` 声明的变量，在 `{}` 内部有效（如 if、for 块等）

- **作用域链** （变量查找机制）

  当 JavaScript 引擎在某个作用域内查找变量时：

  1. 先在当前作用域查找；
  2. 找不到就去“上一层”作用域查找；
  3. 一直向上查到全局作用域；
  4. 如果仍找不到，报错：`ReferenceError`。

---

#### 闭包

> 在一个内层函数中访问到其外层函数的作用域

- **特点**： 
  - 函数嵌套函数
  - 内部函数引用了外部函数的变量
  - 外部函数执行后，变量仍被内部函数持有，不被 GC 回收

```
function createCounter() {
  let count = 0;  // 创建的局部变量
  return function () {  // 是内部函数，一个闭包
    count++;         // 使用了父函数中声明的变量
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 输出：1
console.log(counter()); // 输出：2
```

| 用途           | 示例                                    |
| -------------- | --------------------------------------- |
| **数据私有化** | 上面的 `count` 就是私有的，外部访问不了 |
| **函数工厂**   | 根据参数生成“定制化”函数                |
| **保持状态**   | 记住上一次调用的结果                    |
| **模拟封装**   | 类似于面向对象的封装思想                |

**常见误区（for 循环闭包问题）：**

```
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出 3，3，3
  }, 1000);
}
```

因为 `var` 没有块级作用域，所有 `setTimeout` 里的函数“共享”一个 `i`。

✅ 修复方式：使用 `let` 块级作用域 或 闭包

- `let` 会在每次循环中创建一个新的 `i`
- 每个回调函数闭包绑定的是**自己的 i**

```
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);   // 输出：0 1 2
  }, 1000);
}
```

✅ 方法二：用 IIFE（立即执行函数表达式）创建闭包

- 每次循环把当前 `i` 的值传进去
- `j` 成为每个闭包自己的私有变量

```
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);   // 输出：0 1 2
    }, 1000);
  })(i);
}
```

##### 闭包的缺点

- **1、内存泄漏风险**

  > 闭包会引用其外部函数作用域中的变量，如果闭包被长期引用而外部函数已经结束执行，这些变量将无法被垃圾回收，造成内存泄漏。

  ```
  function outer() {
      let largeData = new Array(1000000).fill('data');
      return function inner() {
          console.log(largeData[0]);
      };
  }
  let hold = outer(); // largeData 永远不会被释放
  ```

- **2、变量共享引发 bug（循环闭包陷阱）**

  > 闭包在循环中常常因为变量共享问题导致意料之外的行为。

  ```
  var funcs = [];
  for (var i = 0; i < 5; i++) {
      funcs.push(function () {
          console.log(i); // 输出五次 5，而不是 0~4
      });
  }
  funcs.forEach(fn => fn());
  ```

- **3、性能开销**

  > 频繁创建闭包可能会增加内存开销，尤其在高频执行的场景中。每次调用外部函数都会重新创建一个新的闭包实例，占用更多内存。

- **4、调试困难**

  > 闭包会隐藏变量的来源，尤其是在多层嵌套时，变量作用域链较长，导致调试时很难定位变量的定义和当前值。

- **5、滥用闭包会导致代码复杂**

  > 初学者容易为了“高级感”过度使用闭包，结果使得代码逻辑混乱，增加维护难度。闭包引入的作用域链过深时，代码可读性也大大下降。

---

#### typeof null` 是什么？为什么？

> typeof null // "object"

历史 bug，误将 null 识别为 object

- 那么`null`是什么？
  - `null` 是一个**原始值（primitive）**，代表“空值”或“无值”。
  - 它不是对象，也没有属性或方法。

---

#### instanceof和typeof

- `typeof` 操作符： 用来判断一个值的 **基本类型**。

  - 无法区分数组和对象。
  - 无法判断某个对象是由哪个构造函数创建的。
  - 对于 `null` 会错误地返回 `"object"`。

  ```
  typeof 123           // "number"
  typeof "hello"       // "string"
  typeof true          // "boolean"
  typeof undefined     // "undefined"
  typeof Symbol()      // "symbol"
  typeof BigInt(1)     // "bigint"
  typeof function(){}  // "function"
  typeof null          // "object"  // 特例：这是一个历史遗留问题
  typeof {}            // "object"
  typeof []            // "object"
  ```

- `instanceof` 操作符： 用来判断一个对象是否是某个构造函数的 **实例**（即是否在原型链上）。

  - 只能判断对象，不能用于基本类型：

    > 123 instanceof Number     // false

  ```
  [] instanceof Array          // true
  [] instanceof Object         // true
  new Date() instanceof Date   // true
  new Date() instanceof Object // true
  function Foo() {}
  const f = new Foo();
  f instanceof Foo             // true
  f instanceof Object          // true
  ```

  





























---

#### 深拷贝和浅拷贝

>  浅拷贝只复制引用，嵌套对象会“联动”；深拷贝是彻底复制，互不影响。

- **浅拷贝**：复制对象的**第一层属性值**，**嵌套对象仍是共享引用**
  - `Object.assign()` ：合并对象，浅拷贝
  - `展开运算符 {...obj}` ：拷贝第一层属性
  - `Array.prototype.slice()`： 数组浅拷贝
- **深拷贝**：递归地复制所有层级的属性，**完全独立的副本**
  - `JSON.parse(JSON.stringify(obj))`：会丢失函数、`undefined`、循环引用
  - `使用 lodash.cloneDeep()`： 适用于复杂对象
  - `手写递归函数`： 灵活，但易出错
  - `structuredClone(obj)`：支持 Map、Set、循环引用等

```
const original = {
  name: 'Alice',
  info: { age: 25 }
};

// 浅拷贝
const shallowCopy = { ...original };
shallowCopy.info.age = 30;

console.log(original.info.age); // ❗️变成了 30（共享引用）

// 深拷贝
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.info.age = 40;

console.log(original.info.age); // ✅ 仍然是 30，不受影响
```

##### 简单的浅拷贝

```
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }
    return target;
}
```

##### 简单的深拷贝（不解决栈溢出问题）

```
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      clone[key] = (typeof value === 'object' && value !== null)
        ? deepClone(value)
        : value;
    }
  }
  return clone;
}
```

---

#### 防抖（debounce） 和 节流（throttle） 

> 参考地址（附带演示）：https://segmentfault.com/a/1190000041716880

- **防抖**: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时。（input输入框一直输入文字，在停止输入后，n秒触发一次）。当事件触发时，相应的函数并不会立即触发，而是会等待一定的时间。

  > 用于减少高频事件触发（如 `resize`、`input`、`scroll`、`keyup` 等）导致的性能问题

  - 防抖在连续的事件，只需触发一次回调的**场景**有：
    -  搜索框搜索输入。只需用户最后一次输入完，再发送请求
    - 手机号、邮箱验证输入检测
    - 
      窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

  ```
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  ```

- **节流**: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效。（input输入框一直输入文字，在n秒内触发一次，过n秒后再次触发）。节流函数会按照一定的频率来执行函数。

  > **无论触发多少次事件，只允许在设定的时间间隔内执行一次函数**。

  - 节流在间隔一段时间执行一次回调的**场景**有：
    - 滚动加载，加载更多或滚到底部监听
    - 搜索框，搜索联想功能
    - 频繁点击按钮

  ```
  function throttle(fn, delay) {
    let lastTime = 0;
  
    return function (...args) {
      const now = Date.now();
  
      if (now - lastTime >= delay) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }
  ```

---

#### 解释 JavaScript 的原型链机制。

> **原型链（Prototype Chain）**是对象查找属性时的一种链式结构：如果当前对象没有这个属性，就会沿着它的 `__proto__` 一层层向上找，直到 `null`。

```
Object.prototype.__proto__ === null; // 原型链的尽头
```

- **每个对象都有一个隐藏属性 [[Prototype]]（可以通过 __proto__ 访问）**

  ```
  const obj = {};
  console.log(obj.__proto__ === Object.prototype); // true
  ```

- **函数都有一个 prototype 属性，用于构造对象时赋值给实例的 __proto__**

  ```
  function Person() {}
  const p = new Person();
  console.log(p.__proto__ === Person.prototype); // true
  ```

##### 原型链图示结构

- `p` 是 `Person` 的实例
- `p.__proto__ === Person.prototype`
- `Person.prototype.__proto__ === Object.prototype`

  ```
p --> Person.prototype --> Object.prototype --> null
  ```

| 概念         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `__proto__`  | 每个对象的原型指针，指向其构造函数的 `prototype              |
| `prototype`  | 构造函数的属性，实例会继承它的属性和方法                     |
| 原型链结构   | 查找属性时，沿着 `__proto__` 向上找，直到 `Object.prototype` 或 `null` |
| 属性查找顺序 | 实例对象 → 构造函数原型 → Object.prototype → null            |

---

#### `new`运算符的内部实现过程是怎样的？

> `new Foo()` 的内部过程是：**创建新对象 → 设置原型 → 执行构造函数 → 返回对象（或显式返回值）**
>
> “创建空对象，指向 prototype；构造函数执行，返回值有讲究。”

- 步骤详解：`new Constructor(...args)` 内部执行流程

  ```
  function ConstructorExample(name) {
    this.name = name;
  }
  const obj = new ConstructorExample("Tom");
  ```

  等价于以下五个步骤：

  ```
  function newOperator(Constructor, ...args) {
    // 1️⃣ 创建一个新对象
    const obj = {};
  
    // 2️⃣ 设置新对象的原型 → 指向构造函数的 prototype
    obj.__proto__ = Constructor.prototype;
  
    // 3️⃣ 执行构造函数，把 `this` 绑定到新对象上
    const result = Constructor.apply(obj, args);
  
    // 4️⃣ 如果构造函数返回的是对象（非 null），则返回该对象
    if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
      return result;
    }
  
    // 5️⃣ 否则返回新创建的对象
    return obj;
  }
  ```

- 示例：自己实现 `new`

  ```
  function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype); // 等价于创建对象并设置 __proto__
    const result = fn.apply(obj, args);
    return (result && typeof result === 'object') ? result : obj;
  }
  
  使用：
  function Person(name) {
    this.name = name;
  }
  const p = myNew(Person, "Alice");
  console.log(p.name); // Alice
  ```

- 构造函数返回值的特例

  > 但如果返回的是基本类型，如 `return 123;`，则不会影响最终结果。

  ```
  function Foo() {
    this.name = "Bar";
    return { greeting: "Hello" }; // 👈 返回对象，会替代原始 this
  }
  
  const x = new Foo();
  console.log(x); // { greeting: "Hello" }
  ```

---

#### Object.create(null)` 和 `{} 有什么区别？

| 语法方式              | 结果说明                           |
| --------------------- | ---------------------------------- |
| `const obj = {};`     | 等价于 `const obj = new Object();` |
| `Object.create(null)` | 创建一个**没有原型链的纯净对象**   |

**核心区别详解**

| 比较项                         | `{}`                                 | `Object.create(null)`        |
| ------------------------------ | ------------------------------------ | ---------------------------- |
| 原型                           | `Object.prototype`                   | `null`（无原型）             |
| 是否有原型链                   | ✅ 有                                 | ❌ 没有                       |
| 是否继承基础方法               | ✅ 有 `toString`、`hasOwnProperty` 等 | ❌ 没有任何继承方法           |
| 是否适合用作字典对象           | ⚠️ 有风险，可能 key 冲突              | ✅ 安全，不会意外访问原型属性 |
| 是否可用于 `instanceof Object` | ✅ 是                                 | ❌ 否                         |
| typeof 结果                    | `'object'`                           | `'object'`                   |

- **示例对比**

  - `{}` 会继承原型方法：

    ```
    const a = {};
    console.log(a.toString); // [Function: toString] 来自 Object.prototype
    ```

  - `Object.create(null)` 没有任何继承：

    ```
    const b = Object.create(null);
    console.log(b.toString); // undefined
    ```

- **用途差异**

  - `Object.create(null)`不会污染原型链
  - 使用 `{}`破坏对象原型链结构

---

#### setTimeout(fn, 0) 是立刻执行吗？为什么？

> 答：**不是立刻执行的**。虽然 `setTimeout(fn, 0)` 表面上是“**延迟 0 毫秒**”，但实际上，**它并不会立刻执行，而是会在当前调用栈清空之后、事件循环的下一轮中执行**。

- 为什么不是立刻执行？

  - 这是因为 JavaScript 是**单线程、事件驱动的语言**，由以下两部分组成：

    - **调用栈（Call Stack）**：正在执行的同步代码
    - **任务队列（Task Queue）**：等待执行的异步回调，比如 `setTimeout` 的回调

    ```
    setTimeout(() => console.log("A"), 0);
    console.log("B");
    
    输出：B A
    ```

  - 流程如下：
    1. `setTimeout(..., 0)` 把回调放入**宏任务队列**（Task Queue）
    2. 当前调用栈继续执行 `console.log("B")`
    3. 当前栈清空后，**事件循环（Event Loop）**检查任务队列，执行 `console.log("A")`

- 小实验：更清楚地看异步顺序

  ```
  console.log("1");
  
  setTimeout(() => {
    console.log("2");
  }, 0);
  
  Promise.resolve().then(() => {
    console.log("3");
  });
  
  console.log("4");
  
  输出：
  1
  4
  3   ← 微任务（Promise）先执行
  2   ← 宏任务（setTimeout）后执行
  ```

---

#### Promise的静态方法和实例方法

- **实例方法（在 Promise 对象上调用）**

  - then(onFulfilled, onRejected)

    > 用于处理 Promise 成功（resolved）或失败（rejected）的结果。

    ```
    promise.then(
      value => console.log('成功:', value),
      error => console.error('失败:', error)
    );
    ```

  - catch(onRejected)

    > 是 `.then(null, onRejected)` 的语法糖，用于处理失败。

    ```
    promise.catch(error => console.error('出错:', error));
    ```

  - finally(callback)

    > 无论成功还是失败都会执行，用于做清理操作。

    ```
    promise.finally(() => console.log('操作结束'));
    ```

- **静态方法（在 Promise 构造函数上调用）**

  - Promise.resolve(value)

    > 返回一个状态为 **fulfilled** 的 Promise。

    ```
    Promise.resolve(42).then(val => console.log(val)); // 42
    ```

  - Promise.reject(reason)

    > 返回一个状态为 **rejected** 的 Promise。

    ```
    Promise.reject('出错了').catch(err => console.log(err)); // 出错了
    ```

  - Promise.all(iterable)

    > 接收一个 Promise 数组，**全部成功才成功**，有一个失败就失败。

    ```
    Promise.all([p1, p2, p3])
      .then(results => console.log(results))
      .catch(err => console.error(err));
    ```

  - Promise.race(iterable)

    > 接收一组 Promise，**第一个 settled（成功或失败）的结果即为最终结果**。

    ```
    Promise.race([p1, p2]).then(result => console.log('第一个完成:', result));
    ```

  - Promise.allSettled(iterable)

    > 返回所有 Promise 的执行结果（无论成功或失败）。

    ```
    Promise.allSettled([p1, p2, p3]).then(results => console.log(results));
    ```

  - Promise.any(iterable)

    > 返回第一个 **成功的** Promise，如果全部失败则抛出 `AggregateError`。

    ```
    Promise.any([p1, p2, p3])
      .then(result => console.log('第一个成功的结果:', result))
      .catch(err => console.error('全部失败:', err));
    ```

----

#### `Promise` 是怎么工作的？手写一个简单的 Promise。

> Promise 是一个拥有 `.then()` 方法的对象，它代表一个异步操作的最终完成（fulfilled）或失败（rejected）状态。

**Promise 的三种状态**

| 状态        | 描述                     |
| ----------- | ------------------------ |
| `pending`   | 初始状态，进行中         |
| `fulfilled` | 操作成功，调用 `resolve` |
| `rejected`  | 操作失败，调用 `reject`  |

- **工作原理简要流程**
  - 创建一个 Promise 时，传入一个执行函数 `executor(resolve, reject)`。
  - 调用 `resolve(value)` 表示成功，调用 `reject(error)` 表示失败。
  - Promise 状态一旦改变（fulfilled/rejected），就不可再次修改。
  - `.then()` 和 `.catch()` 用来注册成功/失败的回调。
  - 回调是**异步执行的**（微任务队列）。

**总结**

| 特性             | 描述                                 |
| ---------------- | ------------------------------------ |
| 状态不可变       | 一旦 `resolve` 或 `reject` 就定型    |
| 回调异步执行     | `.then()` 回调总是在微任务队列中执行 |
| 支持链式调用     | 每次 `then()` 返回新 Promise         |
| 捕获错误链式传递 | `catch()` 能捕获前面链中的错误       |

**手写一个简化版 Promise（类 ES6）**: 实现核心功能：状态、回调注册、异步触发

```
class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilled.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejected.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            reject(result);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === 'pending') {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        });

        this.onRejected.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(this.reason);
              reject(result);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
  }
}
```

---

#### 实现 `Promise.all` / `Promise.race`

- **手写 `Promise.all`**

  > 接收一组 Promise，只要有一个失败就整体失败，全部成功才成功。

  ```javascript
  function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completed = 0;
  
      if (promises.length === 0) return resolve([]);
  
      promises.forEach((p, i) => {
        Promise.resolve(p).then(
          value => {
            results[i] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          error => reject(error) // 只要一个失败就 reject
        );
      });
    });
  }
  
  ========使用：=====
  myPromiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]).then(console.log); // [1, 2, 3]
  ```

- **手写 `Promise.race`**

  > 接收一组 Promise，谁最先完成（无论成功或失败）就采用那个结果。

  ```javascript
  function myPromiseRace(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(resolve, reject);
      });
    });
  }
  
  =======使用======
  myPromiseRace([
    new Promise(res => setTimeout(() => res('A'), 300)),
    new Promise(res => setTimeout(() => res('B'), 100))
  ]).then(console.log); // B
  ```

  **对比行为总结**

  | 方法           | 返回条件               | 成功结果         | 失败条件               |
  | -------------- | ---------------------- | ---------------- | ---------------------- |
  | `Promise.all`  | 所有都成功             | 所有结果数组     | 任一失败立即失败       |
  | `Promise.race` | 任一完成（成功或失败） | 最先的 settle 值 | 最先的 settle 为失败时 |

---

#### async/await 本质上是如何工作的？

> `async/await` 是用来更优雅地编写 `Promise` 链的方式，它**不会阻塞线程**，只是让异步代码“看起来”是同步执行的。

> `async/await` 是对 `Promise` 的语法糖，它本质上让**异步代码写起来像同步代码**，但底层还是基于 **Promise + 生成器（Generator-like behavior）+ 微任务队列** 实现的。

**示例：**

```javascript
// 看起来同步
async function fetchData() {
  const res = await fetch('/api');
  const data = await res.json();
  return data;
}

// 等价写法
function fetchData() {
  return fetch('/api')
    .then(res => res.json())
    .then(data => data);
}
```

- **`async/await` 的底层机制**
  1. **async 函数总是返回一个 Promise**
     - 无论你是否手动 return 一个 Promise
     - 如果 return 的是普通值，会自动包装成 `Promise.resolve(value)`
  2. **await 的本质是暂停执行，等待 Promise resolve 后继续执行**
     - 会将代码拆分成多个“阶段”，每个阶段对应一次 `.then()` 执行
     - `await` 后面的表达式必须是 Promise（或能转为 Promise 的值）
  3. **异步流程被“暂停”，但不是阻塞**
     - `await` 会让出执行权，将后续代码封装成回调放到微任务队列中

-  **内部流程图概念化（简化）**

```javascript
async function foo() {
  console.log("1");
  const result = await getData();  // 执行暂停
  console.log("2", result);        // 恢复执行（作为微任务）
}

先输出 1
await 表达式返回 Promise，注册 .then() 回调
当前 foo() 函数挂起，继续执行主线程其他任务
等到 getData() resolve 后，再以微任务方式执行 console.log("2", result)
```

**小结对比：async/await vs Promise**

| 特性     | `Promise`                | `async/await`            |
| -------- | ------------------------ | ------------------------ |
| 可读性   | 回调链 `.then().then()`  | 类同步流程，逻辑清晰     |
| 错误处理 | `.catch()`               | `try/catch`              |
| 返回值   | 手动用 `resolve/reject`  | 自动包装为 Promise       |
| 控制流   | 链式结构，嵌套可能变复杂 | 更接近同步结构，清晰易读 |

---

#### 什么是事件循环（Event Loop）？

> JavaScript 是单线程的 —— 事件循环是**实现并发任务调度的核心机制**
>
> 事件循环是浏览器/Node.js 中的调度机制，用来**管理调用栈、任务队列和微任务队列**，实现非阻塞异步执行。

> “同步先执行，微任务接着清，宏任务排队等下一轮。”

**核心角色**

| 组成部分       | 描述                                                     |
| -------------- | -------------------------------------------------------- |
| **调用栈**     | 存储当前正在执行的同步代码                               |
| **宏任务队列** | 存储如 `setTimeout`、`setInterval`、`DOM事件` 等回调     |
| **微任务队列** | 存储如 `Promise.then()`、`queueMicrotask()` 的回调       |
| **事件循环**   | 持续从队列中取任务执行，只要栈为空就会调度微任务或宏任务 |

**可视化模型图（文字版）**

> 每次事件循环，先清空 **微任务队列**，再执行下一个 **宏任务**

```
┌─────────────┐
│ Call Stack  │ <───── 执行同步代码
└────┬────────┘
     │
     ▼
┌───────────────┐
│ Microtasks    │ ← Promise.then(), queueMicrotask()
└────┬──────────┘
     │
     ▼
┌───────────────┐
│ Macrotasks    │ ← setTimeout, setInterval, I/O
└───────────────┘
```

**示例：微任务优先于宏任务**

```
console.log('1');

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4');

输出结果：
1
4
3
2
```

---

#### 什么是微任务和宏任务？有哪些区别？

> JavaScript 的异步任务分为两类：**微任务**优先，**宏任务**稍后，执行顺序由事件循环调度。

**分类总览**

| 类型       | 常见任务来源                                                 | 说明                                         |
| ---------- | ------------------------------------------------------------ | -------------------------------------------- |
| **宏任务** | `setTimeout`, `setInterval`, `setImmediate`（Node）, `MessageChannel`, UI事件, I/O | 粗粒度任务，每一轮事件循环最多执行一个宏任务 |
| **微任务** | `Promise.then`, `catch`, `finally`, `MutationObserver`, `queueMicrotask` | 细粒度任务，一轮事件循环中**清空所有微任务** |

**执行顺序（很重要）**

- 每一轮事件循环的顺序是：
  - 执行调用栈中的同步代码
  2. 清空微任务队列（所有）
  3. 执行一个宏任务（然后回到第 1 步）

**示例演示**

```
console.log('1');

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4');

输出(原因：同步代码先执行 → 微任务执行 → 宏任务最后执行)： 
1
4
3
2
```

**微任务 vs 宏任务 的区别总结**

| 比较项   | 微任务                           | 宏任务                           |
| -------- | -------------------------------- | -------------------------------- |
| 执行时机 | 当前事件循环结束前立即执行       | 下一轮事件循环开始时执行         |
| 执行顺序 | 每轮循环前 **先清空所有微任务**  | 每轮循环只执行一个宏任务         |
| 示例     | `Promise.then`, `queueMicrotask` | `setTimeout`, `setInterval`, I/O |
| 任务粒度 | 小，执行迅速                     | 大，开销可能更高                 |
| 优先级   | ✅ 高                             | ❌ 低                             |

---

#### 如何实现发布-订阅模式（观察者模式）？

> 发布-订阅模式是一种**事件驱动模型**，允许一个对象（发布者）维护多个订阅者，一旦状态变化就**通知所有订阅者执行回调**。

**三个关键角色**

| 角色     | 职责                                 |
| -------- | ------------------------------------ |
| 发布者   | 触发事件，通知订阅者                 |
| 订阅者   | 注册事件处理函数                     |
| 事件中心 | 维护事件与订阅者列表，负责调度和触发 |

**手写一个简单的发布-订阅系统**

```javascript
class EventEmitter {
  constructor() {
    this.events = {}; // 存储事件及其监听器
  }

  // 订阅
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // 发布
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(...args));
    }
  }

  // 取消订阅
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(fn => fn !== listener);
    }
  }

  // 订阅一次
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}


================使用示例================
const bus = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

bus.on('sayHello', greet);
bus.emit('sayHello', 'Alice'); // Hello, Alice!
bus.off('sayHello', greet);
bus.emit('sayHello', 'Bob'); // 没有输出
```

**发布-订阅 vs 观察者的区别？**

> 观察者模式是点对点，发布订阅是广播式的中介者结构。

| 模式          | 特点                                        |
| ------------- | ------------------------------------------- |
| 观察者模式    | 观察者直接依赖被观察者（如 Vue 响应式系统） |
| 发布-订阅模式 | 中间有一个事件中心（Event Bus），更彻底解耦 |

**应用场景**

- Vue / React 组件通信（非父子）
- Node.js 的 `EventEmitter`
- 浏览器 DOM 事件
- 消息队列 / 状态管理系统（如 Redux middleware）

---

#### ES6+ 有哪些你常用的新特性？

- `let` 和 `const`
- 箭头函数 `()=>`
- 解构赋值（Destructuring）
- 模板字符串（Template Literals）
- 默认参数
- 展开运算符（...）
- `Promise` 异步处理
- async/await
- `Map` 和 `Set`
- 类（`class`）
- 可选链（Optional Chaining）`?.` & 空值合并运算符 `??`
- 模块化 `import / export`

---

#### 如何让一个对象变成不可变对象（immutable）？

> 让一个对象**不可变（immutable）的常见方式主要有三种，视需求场景从浅冻结**到**深冻结**，再到**结构共享的 immutable 库**

- **使用 `Object.freeze()`（浅冻结）**

  - `Object.freeze()` 可以让一个对象变得**不可扩展、不可修改、不可删除**，但**只作用于第一层属性**。

  ```
  const obj = { name: "Alice", info: { age: 25 } };
  Object.freeze(obj);
  
  obj.name = "Bob";           // ❌ 无效
  obj.info.age = 30;          // ✅ 有效（因为 info 是引用类型）
  obj.newProp = "test";       // ❌ 无效
  ```

   ⚠️ 注意

  - 是**浅冻结**：嵌套对象仍然可以被修改。
  - 不支持旧浏览器的严格限制。
  - `strict mode` 下会抛出错误；非严格模式下默默失败。

- **实现深冻结（Deep Freeze）**

  > 利用递归对对象的每一层调用 `Object.freeze()` 实现彻底不可变。

  ```
  function deepFreeze(obj) {
    if (obj && typeof obj === "object") {
      Object.freeze(obj);
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === "object" && !Object.isFrozen(obj[key])) {
          deepFreeze(obj[key]);
        }
      });
    }
    return obj;
  }
  
  // 使用
  const user = deepFreeze({
    name: "Tom",
    info: {
      age: 30,
      address: {
        city: "Beijing"
      }
    }
  });
  
  user.info.age = 40;               // ❌ 无效
  user.info.address.city = "SH";    // ❌ 无效
  ```

---

#### 什么是模块化？介绍下 ES6 模块和 CommonJS 的区别。

- **什么是模块化？**

  > 模块化就是将一个大的程序划分为多个**相互依赖但功能独立**的文件（模块），每个模块只负责自己的一部分逻辑。

  - **模块具备：**
    - **封装性**：变量/函数不会污染全局作用域；
    - **复用性**：一个模块可被多个地方引入；
    - **依赖管理**：通过模块系统清晰表示依赖关系。

**ES6 模块（`ESM`） vs CommonJS 模块**

| 特性             | CommonJS                                | ES6 Module（ESM）                     |
| ---------------- | --------------------------------------- | ------------------------------------- |
| 引入语法         | `const x = require('x')`                | `import x from 'x'`                   |
| 导出语法         | `module.exports = ...` 或 `exports.xxx` | `export default ...`、`export const`  |
| 加载机制         | **同步加载**（运行时加载）              | **静态加载**（编译时加载）            |
| 是否动态导入     | 不能直接动态导入模块                    | 可用 `import()` 动态导入              |
| 导出是否拷贝     | **值拷贝**（赋值拷贝）                  | **值引用**（实时绑定）                |
| this 指向        | 顶层 `this === module.exports`          | 顶层 `this === undefined`（严格模式） |
| 是否支持循环依赖 | 支持，返回部分加载内容                  | 支持，返回引用，能避免死锁            |
| 是否支持浏览器   | ❌ 仅支持 Node.js                        | ✅ 原生支持浏览器                      |

- **示例对比**

  - CommonJS 示例（Node.js 使用）

    ```
    // a.js
    const name = 'Tom';
    module.exports = { name };
    
    // b.js
    const a = require('./a');
    console.log(a.name); // 'Tom'
    ```

  - ES6 模块示例（现代浏览器、ESBuild、Webpack 等）

    ```
    // a.js
    export const name = 'Tom';
    
    // b.js
    import { name } from './a.js';
    console.log(name); // 'Tom'
    ```

- **加载机制的关键区别**

  - **CommonJS 是运行时加载**：文件执行时 `require` 才被执行。
  - **ES6 是编译时加载（静态分析）**：加载前就知道依赖关系，能更好地做 Tree Shaking（按需打包）。

- **使用场景总结**

  | 场景                    | 推荐模块系统            |
  | ----------------------- | ----------------------- |
  | Node.js 开发（老项目）  | CommonJS                |
  | 前端开发（现代框架）    | ES6 Module              |
  | Node.js（ESM 现代模式） | ES6 Module              |
  | 动态按需加载            | ES6 Module + `import()` |
  | 想使用 Tree Shaking     | ES6 Module              |

- **特别说明：Node.js 支持 ES6 模块吗？**

  是的，Node.js 支持 ES6 模块，但需满足：

  - 文件后缀必须是 `.mjs` 或
  - `package.json` 中添加 `"type": "module"`

  ```
  {
    "type": "module"
  }
  ```

---

#### `call`、`apply` 和 `bind` 

> ✅ 用 `bind` 创建一个带固定 `this` 的函数（如 React、事件回调中）
>
> ✅ 用 `apply` 快速传参：`Math.max.apply(null, arr)`
>
> ✅ 用 `call` 快速借用方法：`[].slice.call(arguments)`

**对比总结表：**

| 特性         | `call`                       | `apply`            | `bind`                         |
| ------------ | ---------------------------- | ------------------ | ------------------------------ |
| 是否立即调用 | ✅ 是                         | ✅ 是               | ❌ 否（返回新函数）             |
| 参数形式     | 逗号分隔                     | 数组形式           | 逗号分隔，可预设参数           |
| 典型应用场景 | 函数继承、手动调用、参数清晰 | 批量传参、数组展开 | 回调中固定 `this`、函数柯里化  |
| 返回值       | 函数结果                     | 函数结果           | 新函数（绑定了 `this` 和参数） |

- **`call` 示例与使用场景**

  - 示例：改变 `this` 并调用函数

    ```
    function sayHello(greeting) {
      console.log(`${greeting}, I'm ${this.name}`);
    }
    const person = { name: 'Alice' };
    sayHello.call(person, 'Hi'); // Hi, I'm Alice
    ```

  - **使用场景：**

    - 函数借用（继承）：

      ```
      function Animal(name) {
        this.name = name;
      }
      
      function Dog(name) {
        Animal.call(this, name); // 借用构造函数
        this.type = 'Dog';
      }
      
      const dog = new Dog('Buddy');
      console.log(dog.name); // Buddy
      ```

    - 类数组转数组（也可以用 `slice`）：

      ```
      function example() {
        const args = Array.prototype.slice.call(arguments);
        console.log(args);
      }
      
      example(1, 2, 3); // [1, 2, 3]
      ```

  - **实现 `call`**

    ```
    Function.prototype.myCall = function (context, ...args) {
      context = context || globalThis; // null/undefined 时默认全局对象
      const fn = Symbol(); // 避免属性冲突
      context[fn] = this;  // this 是当前函数
      const result = context[fn](...args); // 执行函数
      delete context[fn];   // 清理
      return result;        // 返回结果
    };
    ```

- **`apply` 示例与使用场景**

  - 示例：参数以数组传入

    ```
    function introduce(language, level) {
      console.log(`I'm ${this.name}, my ${language} is ${level}`);
    }
    
    const user = { name: 'Bob' };
    
    introduce.apply(user, ['JavaScript', 'Advanced']);
    // I'm Bob, my JavaScript is Advanced
    ```

  - 使用场景：

    - 数组参数展开调用函数（`Math.max`、`Math.min`）：

      ```
      const numbers = [3, 5, 7, 1];
      const max = Math.max.apply(null, numbers);
      console.log(max); // 7
      ```

    - 跨语言调用（可用于函数代理）：

      ```
      function sum(a, b, c) {
        return a + b + c;
      }
      
      const args = [1, 2, 3];
      console.log(sum.apply(null, args)); // 6
      ```

  - **实现 `apply`**

    ```
    Function.prototype.myApply = function (context, args) {
      context = context || globalThis;
      const fn = Symbol();
      context[fn] = this;
      const result = Array.isArray(args) ? context[fn](...args) : context[fn]();
      delete context[fn];
      return result;
    };
    ```

- `bind` 示例与使用场景

  - 示例：返回一个绑定了 `this` 的新函数

    ```
    const user = {
      name: 'Eve',
      say() {
        console.log(`Hi, I'm ${this.name}`);
      }
    };
    
    const fn = user.say;
    fn(); // undefined, 因为 this 丢失
    
    const boundFn = user.say.bind(user);
    boundFn(); // Hi, I'm Eve
    ```

  - 使用场景：

    - 延迟执行函数但保持 this 指向

      ```
      const button = {
        text: 'Submit',
        click() {
          console.log(`${this.text} clicked`);
        }
      };
      
      setTimeout(button.click.bind(button), 1000);
      // Output: Submit clicked
      ```

    - 函数柯里化 / 预设参数：

      ```
      function multiply(a, b) {
        return a * b;
      }
      
      const double = multiply.bind(null, 2);
      console.log(double(4)); // 8
      ```

  - **实现 `bind`**

    > `bind` 不会立即执行函数，而是返回一个新的函数，且可以**延迟调用并保持上下文绑定**，还要考虑 `new` 情况。

    ```
    Function.prototype.myBind = function (context, ...args1) {
      const fn = this;
    
      return function boundFn(...args2) {
        // 如果使用 new，则 this 应该是新对象而不是绑定的 context
        if (this instanceof boundFn) {
          return new fn(...args1, ...args2);
        }
        return fn.apply(context, [...args1, ...args2]);
      };
    };
    ```

---

#### 实现 `instanceof`

> A instanceof B  其本质是判断：在 `A` 的原型链上是否能找到 `B.prototype`
>
> B.prototype 是否存在于 A.__proto__、A.__proto__.__proto__... 这一链条上

**手写 `instanceof` 函数**

```
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false;

  let proto = Object.getPrototypeOf(left); // 等价于 left.__proto__

  while (proto) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

使用：console.log(myInstanceof([], Array));        // true
```

---











