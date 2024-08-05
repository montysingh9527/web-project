/*
 * @Description: json 转成 execl  多语言合并成excel导出 (优化版: 对象的形式, 数据填充, 数据为空)
 * @Date: 2024-03-30 00:07:56
 * @FilePath: \web-project\node\execl_export\arr_to_execl_plus.js
 */

// 注意: 如果多语言是 .json结尾, 需要改成 .js 结尾, 然后 module.exports 导出

const colors = require("colors"); // black\red\green\yellow\blue\magenta\cyan\white\gray\grey
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const file_path = path.join(__dirname, "./export_plus/files");

const en_file_path = path.join(__dirname, "./export_plus/en.json");
console.log("=====.js文件用module.exports导出===>".red);

// 导入多语言内容
const zh_file_data = require(path.join(__dirname, "./export_plus/zh.json"));
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

// 导入多语言数据
const file_data_objs = {
  zh: zh_file_data,
  en: en_file_data,
};
// 多语言键对象  { zh: '', en: '' } , 用于如果语言""没值也显示键
const key_file_objs = Object.keys(file_data_objs).reduce(
  (acc, cur) => ((acc[cur] = ""), acc),
  {}
);

// 对象数据 {"login": { key: "login", zh: "登录", en: "Login" },"home.0": { key: "home.0", zh: "首页", en: "" }, }
let obj_json_data = {};
// 最终导出excel数据
let json_data_result = [];
// 没有空数据(填充空数据)
let json_arr_null = [];
// 没有值的数据
let key_arr_null = [];

/**
 * 多语言json数据处理
 * @param {*} objs
 */
function comput_json(objs) {
  Object.entries(objs).map(([key, item]) => {
    const title_name = key;
    for (let zh_k in item) {
      // 对象数据处理
      if (
        item[zh_k] != null &&
        Object.prototype.toString.call(item[zh_k]) == "[object Object]"
      ) {
        comput_json_objs(obj_json_data, zh_k, title_name, item[zh_k]);
        // 数组数据处理
      } else if (Array.isArray(item[zh_k]) && item[zh_k].length > 0) {
        comput_json_arrs(obj_json_data, zh_k, title_name, item[zh_k]);
      } else {
        obj_json_data[zh_k] = {
          key: zh_k,
          ...key_file_objs,
          ...obj_json_data[zh_k],
          [title_name]: item[zh_k],
        };
      }
    }
  });
}
/**
 * 对象数据处理
 */
const comput_json_objs = (objs, key, title_name, itemObjs) => {
  for (let k in itemObjs) {
    const key_url = `${key}.${k}`;
    if (itemObjs[k] != null && typeof itemObjs[k] == "object") {
      comput_json_objs(objs, key_url, title_name, itemObjs[k]);
    } else {
      objs[key_url] = {
        key: key_url,
        ...key_file_objs,
        ...objs[key_url],
        [title_name]: itemObjs[k],
      };
    }
  }
};
/**
 * 数组数据处理
 */
const comput_json_arrs = (objs, key, title_name, itemArrs) => {
  for (let i = 0; i < itemArrs.length; i++) {
    const key_url = `${key}.${i}`;
    if (Array.isArray(itemArrs[i]) && itemArrs[i].length > 0) {
      comput_json_objs(objs, key_url, title_name, itemArrs[i]);
    } else {
      objs[key_url] = {
        key: key_url,
        ...key_file_objs,
        ...objs[key_url],
        [title_name]: itemArrs[i],
      };
    }
  }
};

/**
 * 合并数据
 * @param {*} datas
 */
function merge_json_data(datas) {
  for (let key in datas) {
    json_data_result.push(datas[key]);
  }
}

/**
 * 空字符填充
 * @param {*} data
 */
function comput_arr_null(data) {
  data.forEach((item) => {
    let objs = {};
    let item_objs = { ...item };
    // 获取所有语言的字段
    const keys_list = Object.keys(item).filter((key) => key != "key");
    // 找出第一个非空的翻译作为参考
    let key_not_null = keys_list.find((key) => item[key]);
    if (key_not_null) {
      keys_list.forEach((key) => {
        if (!item[key]) {
          objs[key] = item[key_not_null];
        }
      });
    }
    json_arr_null.push({ ...item, ...objs });
    // 删除没有值的字段
    keys_list.forEach((key) => {
      if (item_objs[key]) {
        delete item_objs[key];
      }
    });
    key_arr_null.push(item_objs);
  });
  //   return data;
}

// 对象数据
comput_json(file_data_objs);
// 数组数据
merge_json_data(obj_json_data);
// 数据填充, 数据为空
comput_arr_null(json_data_result);


console.log("---logs-comput_json_data--", json_data_result);

// 对象
fs.writeFileSync(
  `${file_path}/zh_en_obj.json`,
  JSON.stringify(obj_json_data, null, 4)
);

// 数组
fs.writeFileSync(
  `${file_path}/zh_en_arr.json`,
  JSON.stringify(json_data_result, null, 4)
);

// 没有值则填充值, 优先中文
fs.writeFileSync(
  `${file_path}/zh_en_not-null.json`,
  JSON.stringify(json_arr_null, null, 4)
);

// 保存没有值的数据
fs.writeFileSync(
  `${file_path}/zh_en_null.json`,
  JSON.stringify(key_arr_null, null, 4)
);

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
XLSX.writeFile(workBook, file_path + "/zh_en.xlsx");
