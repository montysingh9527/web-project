// https://segmentfault.com/q/1010000043535778
// https://segmentfault.com/a/1190000020357367
// https://github.com/Tickly/vue-i18n-generator/blob/master/src/models/Node.js

// 参考： https://www.xiabingbao.com/post/javascript/obj-flat-parse-rfd1sd.html
/**
 * json文件转换成对象
 * 全是对象，没有数组
 */

/**
zh.json 文件
{
    "home": "首页",
    "route": {
        "documentation": "文档"
    },
    "introduction": {
        "guide": "引导页",
        "perm": {
            "permission": "权限测试页",
            "pagePerm": {
                "pagePermission": "页面权限",
                "directivePermission": "指令权限"
            },
            "icons": "图标"
        }
    }
}
 */

const path = require("path");
const fs = require("fs");
const files = path.join(__dirname, "zh/zh.json"); // 文件路径
const fileobj = fs.readFileSync(files, "utf-8"); // 读取文件内容
const filist = JSON.parse(fileobj); // 格式化

/**
方式一、
{
  home: '首页',
  'route.documentation': '文档',
  'introduction.guide': '引导页',
  'introduction.perm.permission': '权限测试页',
  'introduction.perm.pagePerm.pagePermission': '页面权限',
  'introduction.perm.pagePerm.directivePermission': '指令权限',
  'introduction.perm.icons': '图标'
}
 */
function deepObj(listobj, title) {
  let tempObj = {};
  for (let key in listobj) {
    // 用 . 连接
    let prefix = `${title ? title + "." : ""}` + `${key}`;
    // 判断是否是对象
    if (typeof listobj[key] == "object") {
      // 合并对象   prefix连接的键
      Object.assign(tempObj, deepObj(listobj[key], prefix));
    } else {
      tempObj[prefix] = listobj[key];
    }
  }
  return tempObj;
}
const dees = deepObj(filist);
console.log(dees);

/**
方式二、
{
  home: { key: 'home', name: '首页', en: 'US' },
  'route.documentation': { key: 'route.documentation', name: '文档', en: 'US' },
  'introduction.guide': { key: 'introduction.guide', name: '引导页', en: 'US' },
  'introduction.perm.permission': { key: 'introduction.perm.permission', name: '权限测试页', en: 'US' },
  'introduction.perm.pagePerm.pagePermission': {
    key: 'introduction.perm.pagePerm.pagePermission',
    name: '页面权限',
    en: 'US'
  },
  'introduction.perm.pagePerm.directivePermission': {
    key: 'introduction.perm.pagePerm.directivePermission',
    name: '指令权限',
    en: 'US'
  },
  'introduction.perm.icons': { key: 'introduction.perm.icons', name: '图标', en: 'US' }
}
*/
function deepFileObj(listobj, title) {
  let tempObj = {};
  for (let key in listobj) {
    // 用 . 连接
    let prefix = `${title ? title + "." : ""}` + `${key}`;
    // 是否对象
    if (typeof listobj[key] == "object") {
      // 合并对象
      Object.assign(tempObj, deepFileObj(listobj[key], prefix));
    } else {
      // 键
      tempObj[prefix] = {
        key: prefix,
        name: listobj[key],
        en: "US",
      };
    }
  }
  return tempObj;
}
const filesJson = deepFileObj(filist);
console.log(filesJson);
