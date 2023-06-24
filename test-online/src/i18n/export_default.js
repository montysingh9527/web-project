/**
 * Json文件读取，写入
 */
// js中 export default  改为 module.exports = 
// const index = require("../i18n/en-US/index.js")
// console.log(index)
const path = require("path");
const fs = require("fs");
const files = path.join(__dirname, "2023-4-13.json"); // 文件路径
console.log("文件路径===>>>", files);
const fileobj = fs.readFileSync(files, "utf-8"); // 读取文件内容
const filist = JSON.parse(fileobj);

// console.log(filist)
function deepFileObj(listobj, title) {
  let tempObj = {};
  for (let key in listobj) {
    const keys = key.split(".");
    const regx = /\d+/;
    // console.log(keys);
    // console.log(listobj[key]["name"])
    // 1、判断数组是否有多个key，有多个key说明有嵌套
    if (keys.length > 1) {
        // keys[keys.length - 1]
      tempObj[keys[0]] = {
        [keys[1]]: listobj[key]["name"],
      };
    } else {
      tempObj[key] = listobj[key]["name"];
    }
  }
  return tempObj;
}
// const filesJson = deepFileObj(filist);
// console.log("结果==>", filesJson);

// const fileJsonStr = JSON.stringify(filesJson);     // 写入内容必须是 json字符串
// const dateLocale = new Date().toLocaleDateString();   // 获取当前时间  2023/4/13
// // console.log(dateLocale)
// const date = dateLocale.replace(/\//g, "-");  // 格式化时间  2023-4-13
// const filePath = path.join(__dirname);     // 获取当前路径
// fs.writeFileSync(`${filePath}/${date}.json`, fileJsonStr)   // 写入内容
