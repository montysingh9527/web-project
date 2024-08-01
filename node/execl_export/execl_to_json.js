/*
 * @Description: execl转成json
 * @Date: 2024-03-30 00:08:45
 * @FilePath: \web-project\node\execl_export\execl_to_json.js
 */
const colors = require("colors"); // black\red\green\yellow\blue\magenta\cyan\white\gray\grey
const fs = require("fs");
const path = require("path");
const excelToJson = require("convert-excel-to-json"); // excel转json

const file_path = path.join(__dirname, "./import/zh_en.xlsx");
const result = excelToJson({
  sourceFile: file_path,
});
const first_key = Object.keys(result)[0];
// 数据内容
const first_result = result[first_key];
// [
//   { A: 'login', B: '登录', C: 'Login' },
//   { A: 'home.0', B: '首页', C: 'Home' },
//   { A: 'user.user_map.wechat', B: '微信', C: 'Wechat Pay' }
// ]
// 头部数据
const result_head = first_result.shift(0); // { A: 'key', B: 'zh', C: 'en' }

// console.log("---logs--xxx-".red, first_key);
console.log("---logs-result--".green, first_result);
console.log("---logs--result_head-".yellow, result_head);

/**
 * 数据处理
 */
const comput_json = (obj, keys, value) => {
  const key = keys.shift();
  if (keys.length === 0) {
    obj[key] = value;
  } else {
    if (!obj[key]) {
      obj[key] = isNaN(keys[0]) ? {} : [];
    }
    comput_json(obj[key], keys, value);
  }
};

const result_data = [{}, {}];

/**
 *  A: 'key', B: 'zh', C: 'en'
 */
first_result.forEach(({ A, B, C }) => {
  const keys = A.split(".");
  comput_json(result_data[0], [...keys], B);
  comput_json(result_data[1], [...keys], C);
});

console.log("---logs---", result_data);

const key_list = Object.entries(result_head)
  .slice(1)
  .reduce((acc, [key, val], idx) => {
    acc[idx] = val;
    return acc;
  }, {});

// 保存路径
const save_json_path = path.join(__dirname, "./import");
result_data.forEach((item, index) => {
  // 保存json
  fs.writeFileSync(
    `${save_json_path}/${key_list[index]}.json`,
    JSON.stringify(item, null, 4)
  );

  // 保存js
  fs.writeFileSync(
    `${save_json_path}/${key_list[index]}.js`,
    `export default ${JSON.stringify(item, null, 4)}`
  );
});
