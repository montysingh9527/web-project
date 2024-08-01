/*
 * @Description: json 转成 execl  多语言合并成excel导出
 * @Date: 2024-03-30 00:07:56
 * @FilePath: \web-project\node\execl_export\arr_to_execl.js
 */

// 注意: 如果多语言是 .json结尾, 需要改成 .js 结尾, 然后 module.exports 导出

const colors = require("colors"); // black\red\green\yellow\blue\magenta\cyan\white\gray\grey
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const file_path = path.join(__dirname, "./export/zh_en.xlsx");

const en_file_path = path.join(__dirname, "./export/en.js");
console.log("=====.js文件用module.exports导出===>".red);

// 导入多语言内容
const zh_file_data = require(path.join(__dirname, "./export/zh.js"));
const en_file_data = require(en_file_path);

// console.log("---logs-en_file_path--", en_file_path);

// const zh_file_data = fs.readFileSync(zh_file_path, { encoding: "utf8" });

// console.log("---logs-zh_file_arr--", en_file_data, zh_file_data);

/**  导入Execl格式
 key               zh          en
web_login         登录         Login
web_register      注册         Register
web_username      用户名       UserName
web_password      密码         PassWord
web_home          首页         Home
 */

// 最终数据格式
let jsonData = [
  { key: "login", zh: "登录", en: "Login" },
  { key: "home.0", zh: "首页", en: "Home" },
  { key: "user.username", zh: "用户名", en: "UserName" },
];

// 第一次合并数据
let comput_json_data = [];
// 最终数据
let json_data_result = [];

/**
 * 多语言json数据处理
 * @param {*} objs
 */
function comput_json(objs) {
  Object.entries(objs).map(([key, item]) => {
    const title_name = key.split("_")[0];
    for (let zh_k in item) {
      // 对象数据处理
      if (
        item[zh_k] != null &&
        Object.prototype.toString.call(item[zh_k]) == "[object Object]"
      ) {
        comput_json_objs(comput_json_data, zh_k, title_name, item[zh_k]);
        // 数组数据处理
      } else if (Array.isArray(item[zh_k]) && item[zh_k].length > 0) {
        comput_json_arrs(comput_json_data, zh_k, title_name, item[zh_k]);
      } else {
        comput_json_data.push({
          key: zh_k,
          [title_name]: item[zh_k],
        });
      }
    }
  });
}
/**
 * 对象数据处理
 */
const comput_json_objs = (arr, key, title_name, itemObjs) => {
  for (let k in itemObjs) {
    const key_url = `${key}.${k}`;
    if (itemObjs[k] != null && typeof itemObjs[k] == "object") {
      comput_json_objs(arr, key_url, title_name, itemObjs[k]);
    } else {
      arr.push({
        key: key_url,
        [title_name]: itemObjs[k],
      });
    }
  }
  return arr;
};
/**
 * 数组数据处理
 */
const comput_json_arrs = (arr, key, title_name, itemArrs) => {
  for (let i = 0; i < itemArrs.length; i++) {
    const key_url = `${key}.${i}`;
    if (Array.isArray(itemArrs[i]) && itemArrs[i].length > 0) {
      comput_json_objs(arr, key_url, title_name, itemArrs[i]);
    } else {
      arr.push({
        key: key_url,
        [title_name]: itemArrs[i],
      });
    }
  }
  return arr;
};

/**
 * 合并数据
 * @param {*} datas
 */
function merge_json_data(datas) {
  for (let len = 0; len < datas.length; len++) {
    let data = datas[len];
    // 如果有相同的 key
    const key_same = json_data_result.find((v) => v.key == data.key);
    if (key_same) {
      Object.assign(key_same, data);
    } else {
      json_data_result.push(data);
    }
  }
}

// 第一次处理  导入数据  第一个_前作为键值
comput_json({ zh_file_data, en_file_data });
// 第二次, 合并数据
merge_json_data(comput_json_data);

console.log("---logs-comput_json_data--", json_data_result);

// 将数据转成workSheet
let jsonWorkSheet = XLSX.utils.json_to_sheet(json_data_result);
// 构造workBook
let workBook = {
  SheetNames: ["jsonWorkSheet"],
  Sheets: {
    jsonWorkSheet: jsonWorkSheet,
  },
};

// console.log('---logs-workBook--', workBook);
// 将workBook写入文件
XLSX.writeFile(workBook, file_path);
