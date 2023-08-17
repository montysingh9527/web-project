/**
 * 复写index.html 替换变量
 */

import fs from "node:fs";
import path from "node:path";
// 引入配置项
import { index_config } from "../config/index-html.js";
// 获取index.html路径
// const index_path = new URL('../vue3-vite/index.html', import.meta.url).pathname
const index_path = path.join(process.cwd(), "vue3-vite/index.html");
console.log("---index.html-文件路径--", index_path);

function html_inject() {
  try {
    // 读取index.html内容
    const htmldata = fs.readFileSync(index_path, "utf8");
    // 匹配出 <%= initDate %> 中的内容替换
    const regs = /\<\%\= (.*?) \%\>/g;
    // 替换字符
    const newhtml = htmldata.replace(regs, function (node, key) {
      for (let keys in index_config) {
        if (keys == key) {
          return index_config[keys];
        }
      }
    });
    // 复写index.html 内容
    fs.writeFileSync(index_path, newhtml, "utf8");
    // fs.writeFileSync(index_path, JSON.stringify(newhtml));
    console.log("--index.html文件变量替换成功。--");
  } catch (error) {
    console.error("---index.html文件复写出错---");
    process.exit(1);
  }
}

html_inject();
