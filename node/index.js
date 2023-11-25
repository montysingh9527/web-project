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

const fileList = ["test", "test1", "test2"];

try {
  fileList.forEach((item) => {
    const data = fs.mkdirSync(item, { recursive: true });
    console.log("---logs-data--", data);
  });
  console.log("-创建目录成功-");
} catch (error) {
  console.log("---logs--创建目录失败-", error);
}

console.log('--path-logs---', path.resolve(__dirname));

console.log("-目录是否存在: statSync--logs--", fs.statSync("test"),"--333--", fs.statSync("test").isDirectory(),"--444--", fs.statSync("test/test.text"),"--555--",  fs.statSync("test/test.text").isDirectory());
console.log('-目录是否存在: existsSync--logs---',fs.existsSync("test"), fs.existsSync("test/test.text"));

setInterval(() => {
  // 获取文件信息
  const text_size = fs.statSync("test/test.text");
  const text1_size = fs.statSync("test1/test1.text");
  console.log('-size--logs---',text_size.size, text1_size.size);
  // 文件大小 < 500
  if (text_size.size < 500) {
    fs.appendFileSync(
      "test/test.text",
      `test-${Math.floor(Math.random() * 100)} \n`
    );
  }
  if (text1_size.size < 500) {
    fs.writeFileSync(
      "test1/test1.text",
      `test1-${Math.floor(Math.random() * 100)} \n`
    ,{ encoding: 'utf8', flag: 'a' });
  }
}, 1000);

/**
 * 判断文件夹是否存在
 */
if(!fs.existsSync("test3")){
  // 不存在, 则创建
  fs.mkdirSync("test3")
  fs.appendFileSync(
    "test3/test3.text",
    `test3-${Math.floor(Math.random() * 100)} \n`
  );
}

