/*
 * @Description:
 * @Date: 2023-11-13 00:21:45
 * @FilePath: \web-project\node\index.js
 */
const fs = require("fs");
const path = require("path");

fs.writeFile(
  "./example.json",
  JSON.stringify("这是文字--11-222", null, 4),
  "utf8",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been written.");
  }
);

const fileList = ["test", "test1", "test2"]

try {
  fileList.forEach(item=>{
    fs.mkdirSync(item, { recursive: true })
  })
  console.log('-创建目录成功-');
} catch (error) {
  console.log('---logs--创建目录失败-',error);
}

console.log('---logs---', path.resolve(__dirname));


