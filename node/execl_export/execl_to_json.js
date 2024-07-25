/*
 * @Description: execl转成json
 * @Date: 2024-03-30 00:08:45
 * @FilePath: \web-project\node\execl_export\execl_to_json.js
 */
const colors = require('colors');  // black\red\green\yellow\blue\magenta\cyan\white\gray\grey
const fs = require("fs");
const path = require("path");
const excelToJson = require("convert-excel-to-json"); // excel转json

const file_path = path.join(__dirname, "./import/zh_en.xlsx");
const result = excelToJson({
  sourceFile: file_path,
});
const first_key = Object.keys(result)[0];
const first_result = result[first_key]

const result_head = first_result.shift(0);



console.log('---logs--xxx-'.red,first_key);
console.log("---logs-result--".green, first_result);
console.log('---logs--result_head-'.yellow, result_head);


