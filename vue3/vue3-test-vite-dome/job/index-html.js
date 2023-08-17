/**
 * 复写index.html 替换变量
 * 插入script脚本
 */

import fs from "node:fs";
import path from "node:path";
// 引入配置项
import { index_config } from "../config/index-html.js";
// 获取index.html路径
// const index_path = new URL('../vue3-vite/index.html', import.meta.url).pathname
const index_path = path.join(process.cwd(), "vue3-vite/index.html");
console.log("---index.html-文件路径--", index_path);
// 要插入的script脚本路径
// const script_test_path = path.join(process.cwd(), "job/test.js");
const script_test_path = new URL("./test.js", import.meta.url).pathname;

function html_inject() {
  try {
    // script脚本
    const script_test = `<script src="${script_test_path}"></script>`;
    // 读取index.html内容
    const htmldata = fs.readFileSync(index_path, "utf8");
    // 在index.html找到要插入script的位置
    const headIdx = htmldata.indexOf("</head>");
    // 插入<script>标签
    const scriptContent =
      htmldata.slice(0, headIdx) + script_test + htmldata.slice(headIdx);
    // 匹配出 <%= initDate %> 中的内容替换
    const regs = /\<\%\= (.*?) \%\>/g;
    // 替换字符
    const newhtml = scriptContent.replace(regs, function (node, key) {
      for (const keys in index_config) {
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
    console.error("\x1b[31m%s\x1b[0m", "---index.html文件复写出错---");
    process.exit(1);
  }
}

html_inject();
