/**
 * 生成随机颜色
 * @returns #74a169
 */
function randomColor() {
  return "#" + Math.random().toString(16).substring(2, 8).padEnd(6, "0");
}

/**
 * 生成随机长度字符串
 * @param {*} len 10
 * @returns 2h55qzlyko
 */
function randomString(len) {
  return len <= 11
    ? Math.random()
        .toString(36)
        .substring(2, 2 + len)
        .padEnd(len, "0")
    : randomString(11) + randomString(len - 11);
}

/**
 * 数字金额格式化 ,
 * @param {*} str formatNumber("1000000")
 * @returns 1,000,000
 */
function formatNumber(str) {
  return str.replace(/\B(?=(\d{3})+$)/g, ",");
}

/**
 * 判断是否是PC端
 * @returns {Boolean}
 */
function isPc() {
  var uaInfo = typeof navigator !== "undefined" ? navigator.userAgent : "";
  var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer("MSIE")) return "IE";
  else if (isExplorer("Firefox")) return "Firefox";
  else if (isExplorer("Chrome")) return "Chrome";
  else if (isExplorer("Opera")) return "Opera";
  else if (isExplorer("Safari")) return "Safari";
};

/**
 * 数据类型判断
 * @param {*} obj 需要判断的数据
 * @returns
 */
export const typeOf = (obj) => {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
};

/**
 * 判断数组中是否存在该值（某个值）
 * @param {*} value
 * @param {*} validList
 * @returns
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * 驼峰字符串转连字符
 * @param {*} str
 * @returns "HomePAGE"  => "home-page"
 */
export function camelcaseToHyphen(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * 第一个字符转大写
 * @param {*} str
 * @returns "home_page"  => "Home_page"
 */
export function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

/**
 * 生成随机数
 * @returns
 */
export function randomPwd() {
  return Math.random().toString(36).slice(2);
}

/**
 * 检测设备类型
 * @returns {String}
 */
export const checkDevType = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return "ios";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return "android";
  } else {
    return "pc";
  }
};

/**
 *  过滤非数字字符
 *  fixed保留小数位
 */
export function filterNumber(value, fixed = 2) {
  return value.replace(/\.?|^0/g, "");
}

/**
 *  千位分隔符
 */
export function formatText(str, size = 3, delimiter = ",") {
  let _str = str.toString();
  /*
    如果_size是3
    reg = /\d{1,3}(?=(\d{3})+$)/g
    匹配连续的三个数字，但是这些三个数字不能是字符串的开头1-3个字符
  */
  const reg = new RegExp("\\d{1," + size + "}(?=(\\d{" + size + "})+$)", "g");
  /*
    $0: 匹配的结果
    $1: (-?) 匹配前面的-号
    $2:(\d+)匹配中间的数字
    $3: ((\.\d+)?)匹配小数点后面的数字
  */
  return _str.replace(
    /^(-?)(\d+)((\.\d+)?)$/,
    ($0, $1, $2, $3) => $1 + $2.replace(reg, "$&" + delimiter) + $3
  );
}

/**
 *  延迟函数 防抖debounce
 */
export function debounce(func, delay) {
  let debounce_timer = null;
  return function (...args) {
    if (debounce_timer) {
      clearTimeout(debounce_timer);
    }
    debounce_timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 *  洗牌
 */
export function shuffleArr(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    _arr[i] ^= _arr[j];
    _arr[j] ^= _arr[i];
    _arr[i] ^= _arr[j];
  }
  return _arr;
}

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url = window.location.href) => {
  let arr = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  return arr.reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );
};

/**
 * 休眠 一段时间
 **/
export const sleep = async (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 *  get请求表单序列化
 */
export function param(data) {
  let url = "";
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + encodeURIComponent(value);
  }
  return url ? url.substring(1) : "";
}

/**
 * 将 String, Object, Array 转成 Array
 * {color:"red", height:'89px'}      [ 'color', 'height' ]
 * "color height"       [ 'color', 'height' ]
 */
function convertClass(classes) {
  let newClasses = [];
  if (!classes) return newClasses;
  if (classes instanceof Array) {
    newClasses = newClasses.concat(classes);
  } else if (classes instanceof Object) {
    for (const name in classes) {
      if (classes[name]) newClasses.push(name);
    }
  } else {
    newClasses = newClasses.concat(classes.split(" "));
  }
  return newClasses;
}

/**
 * 校验字符串是否IP地址
 */
function isIpAddr(str) {
  return str.match(/^([0-9]{1,3}\.{1}){3}[0-9]{1,3}$/);
}

/**
 * 获取当前月份的总天数
 * @returns 31
 */
function getMonthDay() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  return days;
}

/**
 * 生成一个24位随机字符串
 * @returns {String}
 */
function randomHex() {
  let str = "0123456789abcd".split("");
  let arr = Array.from({ length: 24 }).map(
    (v) => str[Math.floor(Math.random() * str.length)]
  );
  return arr.join("");
}

/**
 * 生成随机字符串
 * @param {*} len 生成位数
 * @returns
 */
export const randomText = (len = 32) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = chars.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
};

/**
 * 删除对象某个属性
 */
export const deletePrototype = (key, obj) => {
  let newObj = {};
  for (let k in obj) {
    if (key !== k) {
      newObj[k] = obj[k];
    }
  }
  return newObj;
};

/**
 * 随机整数（随机范围内的值）
 * @param {*} min  最小值
 * @param {*} max  最大值
 * @returns {Number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 深拷贝对象
 * @param {*} initalObj
 * @returns {Object}
 */
export const deepClone = (initalObj) => {
  const obj = {};
  if (typeof initalObj !== "object") {
    return initalObj;
  }
  for (const key in initalObj) {
    if (typeof initalObj[key] === "object") {
      //对数组特殊处理
      if (Array.isArray(initalObj[key])) {
        //用map方法返回新数组，将数组中的元素递归
        obj[key] = initalObj[key].map((item) => deepClone(item));
      } else {
        //递归返回新的对象
        obj[key] = deepClone(initalObj[key]);
      }
    } else if (typeof initalObj[key] === "function") {
      //返回新函数
      obj[key] = initalObj[key].bind(obj);
    } else {
      //基本类型直接返回
      obj[key] = initalObj[key];
    }
  }
  return obj;
};

/**
 * 深拷贝对象/数组
 * @param {*} data
 * @returns
 */
export function deepCopy(data) {
  const t = Object.prototype.toString.call(data);
  let o;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === "object") {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 深拷贝对象
 * @param {*} origin
 * @param {*} target
 * @returns
 */
function deepClone(origin, target) {
  var tar = target || {};
  var toStr = Object.prototype.toString;
  var arrType = "[object Array]";

  for (var k in origin) {
    if (origin.hasOwnProperty(k)) {
      // 判断是否为org自己的属性
      if (typeof origin[k] === "object" && origin[k] !== null) {
        tar[k] = toStr.call(origin[k]) === arrType ? [] : {}; // 判断是数组还是对象
        deepClone(origin[k], tar[k]);
      } else {
        // 非object类型则直接赋值
        tar[k] = origin[k];
      }
    }
  }
  return tar;
}

/**
 * JS 两个数的精确乘法
 * @param v1
 * @param v2
 * @returns {number}
 */
export function accurateMethod(v1, v2) {
  var m = 0,
    s1 = v1.toString(),
    s2 = v2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

/**
 * 精确加法
 * @param {*} arg1 参数1
 * @param {*} arg2 参数2
 * @returns
 */
export function addNum(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //既然普通的计算错误，那就改成高精度乘法不久弥补了这个问题
  return (accurateMethod(arg1, m) + accurateMethod(arg2, m)) / m;
}

/**
 * 精确减法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function subtraction(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 日期格式化
 * date--> 可以是 时间戳 和 标准的日期格式
 * fmt 年月日时分秒 --> 'yyyy-MM-dd hh:mm:ss'
 * ex --> format(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * -----> 2018-05-04 17:21:02
 */
export function format(date, fmt) {
  date = new Date(date);
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
}

/**
 * 反格式化时间
 * @param {*} timer
 * @returns
 */
export function reFormatDate(timer) {
  let date = new Date(timer.replace(/-/g, "/")).getTime();
  return date;
}

/**
 *  RGB到十六进制
 */

export const rgbToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

/**
 * UUID生成器
 * 使用crypto API生成符合RFC4122版本4的UUID。
 * // uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'
 */

export const uuid = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

/**
 *  两点之间的距离
 */
export const distance = (
  pos1 = { x0: 0, y0: 0 },
  pos2 = {
    x1: 0,
    y1: 0,
  }
) => Math.hypot(pos2.x1 - pos1.x0, pos2.y1 - pos1.y0);

/**
 *  数组之间的区别
 *   difference([1,2,3], [1,2]) -> [3]
 */
export const difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};

/**
 *  多维数组解构
 *  deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
 */
export const deepFlatten = (arr) =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);

/**
 * 创建字谜(带有重复项)
 * anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
 */
export const anagrams = (str) => {
  if (str.length <= 2) {
    return str.length === 2 ? [str, str[1] + str[0]] : [str];
  }

  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          anagrams(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
};

/**
 *  斐波那契数组生成器
 *  后面的一个数等于前面两个数相加之和
 **/
export const fibonacci = (n) =>
  Array(n)
    .fill(0)
    .reduce(
      (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
      []
    );

/**
 * 最大公约数
 */
export const gcd = (x, y) => (!y ? x : gcd(y, x % y));

/**
 * 组合成包含所有组合的数组
 */
export const powerset = (arr) =>
  arr.reduce((a, v) => a.concat(a.map((r) => [v].concat(r))), [[]]);

/**
 *  随机化数组的顺序
 */
export const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

/**
 * 异步数组 按顺序执行
 * @param {*} arr
 */
export function promiseStep(arr = []) {
  arr.reduce((acc, cur) => acc.then(cur), Promise.resolve());
}

/**
 *  通用版 单一请求 多个Promise同步化
 *  fun  ----> 异步函数
 *  arr  ----> 异步函数需要的参数数组
 *  handler -> 异步函数的回调
 */
export function syncasynFun(fun, arr = [], handler = () => {}) {
  if (typeof fun !== "function") {
    throw new TypeError("第一个参数必须是一个函数-.-");
  }
  if (!Array.isArray(arr)) {
    throw new TypeError("第二个参数必须是数组");
  }
  handler = typeof fun === "function" ? handler : () => {};
  const errors = [];

  function asynFun(index) {
    if (index >= arr.length) {
      return errors.length > 0 ? Promise.reject(errors) : Promise.resolve();
    }

    return fun(arr[index])
      .then((data) => handler(data))
      .catch((err) => {
        errors.push(arr[index]);
        return asynFun(index + 1);
      })
      .then(() => asynFun(index + 1));
  }

  return asynFun(0);
}

/** rem等比适配配置文件 -S */
const baseSize = 37.5; // 基准大小 注意此值要与 postcss.config.js 文件中的 rootValue保持一致
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 375宽的缩放比例，可根据自己需要修改,一般设计稿都是宽750(图方便可以拿到设计图后改过来)。
  const scale = document.documentElement.clientWidth / 375;
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
/** rem等比适配配置文件 -E */

/**拷贝文字（不同设备） -S */
export function copyText(text) {
  const type = checkDevType();
  const input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", text);
  input.style.position = "absolute";
  input.style.top = "-10000px";
  input.style.opacity = "0";
  document.body.appendChild(input);
  //这段代码必须放在前面否则无效
  window.getSelection().removeAllRanges();
  if (type === "ios") {
    const range = document.createRange();
    // 选中需要复制的节点
    range.selectNode(input);
    // 执行选中元素
    window.getSelection().addRange(range);
    if (document.execCommand("copy", false, null)) {
      const successful = document.execCommand("copy"); // 执行浏览器复制命令
      // 移除选中的元素
      window.getSelection().removeAllRanges();
      input.remove();
      if (successful) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    } else {
      return Promise.reject();
    }
  } else {
    // 选取全部文字
    input.setSelectionRange(0, 999999);

    input.select();
    let result = document.execCommand("copy");
    window.getSelection().removeAllRanges();

    input.remove();
    if (result) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
}
/**判断设备 */
function checkDevType() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return "ios";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return "android";
  } else {
    return "pc";
  }
}
/**拷贝（不同设备） -E */

/** 窗口自适应 -S*/
export const refreshRem = () => {
  window.addEventListener("resize", reHtmlSize);
  reHtmlSize();
};
export function reHtmlSize(fontSize) {
  const dpr = Math.round(window.devicePixelRatio);
  const INNER_WIDTH = Math.min(520, window.innerWidth);
  const doc = document.documentElement;
  if (fontSize) {
    doc.setAttribute("dpr", dpr);
    doc.style.fontSize = fontSize + "px";
    return;
  }
  let htmlSize = (Math.max(320, INNER_WIDTH) / 375) * 20;
  // meta.setAttribute('content', `width=device-width,user-scalable=no,initial-scale = ${1/dpr},maximum-scale = ${1/dpr},minimum-scale = ${1/dpr}`)
  doc.setAttribute("dpr", dpr);
  doc.style.fontSize = htmlSize + "px";
  // 给js调用的，某一dpr下rem和px之间的转换函数
  window.rem2px = (v) => parseFloat(v) * htmlSize;
  window.px2rem = (v) => parseFloat(v) / htmlSize;
  window.dpr = dpr;
  window.rem = htmlSize;
}
(() => {
  let lastTime = 0;
  let vendors = ["ms", "moz", "webkit", "o"];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = (callback, element) => {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
})();
/** 窗口自适应 -E */
