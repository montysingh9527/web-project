/**
 * Json文件读取，写入
 */

const path = require("path");
const fs = require("fs");
const files = path.join(__dirname, "zh/index.json"); // 文件路径
const fileobj = fs.readFileSync(files, "utf-8"); // 读取文件内容
const filist = JSON.parse(fileobj); // 格式化

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
// console.log(filesJson);

const fileJsonStr = JSON.stringify(filesJson);     // 写入内容必须是 json字符串
const dateLocale = new Date().toLocaleDateString();   // 获取当前时间  2023/4/13
// console.log(dateLocale)
const date = dateLocale.replace(/\//g, "-");  // 格式化时间  2023-4-13
const filePath = path.join(__dirname);     // 获取当前路径
fs.writeFileSync(`${filePath}/${date}.json`, fileJsonStr)   // 写入内容