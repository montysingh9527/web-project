/**
 * 随机整数
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

/**
 * 删除对象某个属性
 */
export const deletePrototype = (key, obj) => {
    let newObj = {}
    for (let k in obj) {
        if (key !== k) {
            newObj[k] = obj[k]
        }
    }
    return newObj
}

/**
 * 休眠 一段时间
 **/
export const sleep = async time => new Promise(resolve => setTimeout(resolve, time))

/**
 *  get请求表单序列化
 */
export function param(data) {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value)
    }

    return url ? url.substring(1) : ''
}

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url = window.location.href) => {
    let arr = url.match(/([^?=&]+)(=([^&]*))/g) || []
    return arr.reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {})
}

export function getCookiesKey() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);

    return keys || []
}

/**
 *  洗牌
 */
export function shuffleArr(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        _arr[i] ^= _arr[j]
        _arr[j] ^= _arr[i]
        _arr[i] ^= _arr[j]
    }
    return _arr
}

/**
 *  延迟函数
 */
let debounce_timer = null

export function debounce(func, delay) {

    return function (...args) {
        if (debounce_timer) {
            clearTimeout(debounce_timer)
        }
        debounce_timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

/**
 *  千位分隔符
 */

export function formatText(str, size = 3, delimiter = ',') {
    let _str = str.toString()

    /*
      如果_size是3
      reg = /\d{1,3}(?=(\d{3})+$)/g
      匹配连续的三个数字，但是这些三个数字不能是字符串的开头1-3个字符
    */
    const reg = new RegExp('\\d{1,' + size + '}(?=(\\d{' + size + '})+$)', 'g')
    /*
      $0: 匹配的结果
      $1: (-?) 匹配前面的-号
      $2:(\d+)匹配中间的数字
      $3: ((\.\d+)?)匹配小数点后面的数字
    */
    return _str.replace(/^(-?)(\d+)((\.\d+)?)$/, ($0, $1, $2, $3) => ($1 + $2.replace(reg, '$&' + delimiter) + $3))
}

/**
 *  过滤非数字字符
 *  fixed保留小数位
 */

export function filterNumber(value, fixed = 2) {
    return value.replace(/\.?|^0/g, '')
}

// 判断设备类型
export function isPC() { //是否为PC端
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function window_close(url, blank) {
    if (navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Chrome") > -1) {
        window.location.href = url;
        window.open(url, url).close();
    } else {
        window.opener = null;
        window.open("", "_self");

    }
}

/**
 * 创建字谜(带有重复项)
 * anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
 */
export const anagrams = str => {
    if (str.length <= 2) {
        return str.length === 2 ? [str, str[1] + str[0]] : [str]
    }

    return str.split('').reduce((acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), [])
}

/**
 *  斐波那契数组生成器
 *  后面的一个数等于前面两个数相加之和
 **/
export const fibonacci = n =>
    Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), [])

/**
 * 最大公约数
 */
export const gcd = (x, y) => !y ? x : gcd(y, x % y);

/**
 * 组合成包含所有组合的数组
 */
export const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]])

/**
 *  随机化数组的顺序
 */
export const shuffle = arr => arr.sort(() => Math.random() - 0.5)


/**
 *  RGB到十六进制
 */

export const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

/**
 * UUID生成器
 * 使用crypto API生成符合RFC4122版本4的UUID。
 * // uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'
 */

export const uuid = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )


/**
 *  两点之间的距离
 */
export const distance = (pos1 = {x0: 0, y0: 0}, pos2 = {
    x1: 0,
    y1: 0
}) => Math.hypot(pos2.x1 - pos1.x0, pos2.y1 - pos1.y0);

/**
 *  数组之间的区别
 *   difference([1,2,3], [1,2]) -> [3]
 */
export const difference = (a, b) => {
    const s = new Set(b)
    return a.filter(x => !s.has(x))
}

/**
 *  多维数组解构
 *  deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
 */
export const deepFlatten = arr => arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), [])


/**
 * 日期格式化
 * date--> 可以是 时间戳 和 标准的日期格式
 * fmt 年月日时分秒 --> 'yyyy-MM-dd hh:mm:ss'
 * ex --> format(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * -----> 2018-05-04 17:21:02
 */

export function format(date, fmt) {
    date = new Date(date)
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
}

export function reFormatDate(timer) { //反格式化时间
    let date = new Date(timer.replace(/-/g, '/')).getTime();
    return date
}

// 異步數組 順步執行
export function promiseStep(arr = []) {
    arr.reduce((acc, cur) => acc.then(cur), Promise.resolve())
}

/**
 *  通用版 单一请求 多个Promise同步化
 *  fun  ----> 异步函数
 *  arr  ----> 异步函数需要的参数数组
 *  handler -> 异步函数的回调
 */
export function syncasynFun(fun, arr = [], handler = () => {
}) {
    if (typeof fun !== 'function') {
        throw new TypeError('第一个参数必须是一个函数-.-')
    }
    if (!Array.isArray(arr)) {
        throw new TypeError('第二个参数必须是数组')
    }
    handler = typeof fun === 'function' ? handler : () => {
    }
    const errors = []

    function asynFun(index) {
        if (index >= arr.length) {
            return errors.length > 0 ? Promise.reject(errors) : Promise.resolve()
        }

        return fun(arr[index])
            .then(data => handler(data))
            .catch(err => {
                errors.push(arr[index])
                return asynFun(index + 1)
            })
            .then(() => asynFun(index + 1))
    }

    return asynFun(0)
}

if (/(Android)/i.test(navigator.userAgent)) {
    // 这里写安卓设备执行代码
}

// 检测设备类型
export const checkDevType = () => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) {
        return 'android'
    } else {
        return 'pc'
    }
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

/**
 * JS 两个数的精确乘法
 * @param v1
 * @param v2
 * @returns {number}
 */
export function accurateMethod(v1, v2) {
    var m = 0, s1 = v1.toString(), s2 = v2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 精确加法
export function addNum(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //既然普通的计算错误，那就改成高精度乘法不久弥补了这个问题
    return (accurateMethod(arg1, m) + accurateMethod(arg2, m)) / m;
}

// 精确减法
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
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


export const deepClone = (initalObj) => {
    const obj = {};
    if (typeof initalObj !== 'object') {
        return initalObj
    }

    for (const key in initalObj) {
        if (typeof initalObj[key] === 'object') {
            //对数组特殊处理
            if (Array.isArray(initalObj[key])) {
                //用map方法返回新数组，将数组中的元素递归
                obj[key] = initalObj[key].map(item => deepClone(item))
            } else {
                //递归返回新的对象
                obj[key] = deepClone(initalObj[key]);
            }
        } else if (typeof initalObj[key] === 'function') {
            //返回新函数
            obj[key] = initalObj[key].bind(obj);
        } else {
            //基本类型直接返回
            obj[key] = initalObj[key];
        }
    }

    return obj;
}


// 设置首页主体内容高度
export function setWindowScrollContentHeight(domList) {
    let height = 0;
    domList.forEach(item => {
        if (item !== null) {
            height += item.clientHeight;
        }
    })
    Array.from(document.querySelectorAll('.index-continaer')).forEach(item => {
        item.style.height = `${window.innerHeight - height}px`;
    })
}

export function toCurrency(c = '¥') {
    if (c === 'CNY') {
        return {
            siteCurrency: '¥',   //￥
            siteCurrency1: '元'
        }
    } else if (c === 'VND') {
        return {
            siteCurrency: '₫',   //￥
            siteCurrency1: '₫'
        }
    } else if (c === 'INR') {
        return {
            siteCurrency: '₹',   //￥
            siteCurrency1: '₹'
        }
    } else if (c === 'THB') {
        return {
            siteCurrency: '฿',   //￥
            siteCurrency1: '฿'
        }
    } else if (c === 'MYR') {
        return {
            siteCurrency: 'RM',   //￥
            siteCurrency1: 'RM'
        }
    } else if (c === 'IDR') {
        return {
            siteCurrency: 'IDR',   //￥
            siteCurrency1: 'IDR'
        }
    } else if (c === 'JPY') {
        return {
            siteCurrency: '¥',   //￥
            siteCurrency1: '¥'
        }
    } else {
        return {
            siteCurrency: '¥',   //￥
            siteCurrency1: '¥'
        }
    }
}