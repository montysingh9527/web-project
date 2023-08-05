// import * as path from 'node:path';
// import { readFileSync } from 'node:fs'
// import { join } from 'node:path'

const path = require("path");
const fs = require("fs");

console.log("---logs--11-", path.join(__dirname, "../src"));
console.log("---logs--22-", path.resolve(__dirname, "../src/ht.html"));

(() => {
  const url = path.resolve(__dirname, "../src/ht.html");
  // 要插入的<script>标签内容
  const scriptTagContent = '<script src="./test.js"></script>';

  // 要插入的位置（例如，插入在<head>标签内）
  const insertPosition = "</head>";

  // 读取index.html文件
  fs.readFile(url, "utf8", (err, data) => {
    if (err) {
      return console.error("Error reading file:", err);
    }

    // 在index.html内容中查找要插入的位置
    const insertIndex = data.indexOf(insertPosition);

    if (insertIndex === -1) {
      return console.error("Insert position not found in the file.");
    }

    // 在指定位置插入<script>标签
    const modifiedContent =
      data.slice(0, insertIndex) + scriptTagContent + data.slice(insertIndex);
      
    // 写回修改后的内容到index.html文件
    fs.writeFile(url, modifiedContent, "utf8", (err) => {
      if (err) {
        return console.error("Error writing file:", err);
      }
      console.log("Script tag has been inserted successfully!");
    });
  });
})();
