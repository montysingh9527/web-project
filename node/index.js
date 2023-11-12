/*
 * @Description:
 * @Date: 2023-11-13 00:21:45
 * @FilePath: \web-project\node\index.js
 */
const fs = require("fs");

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
