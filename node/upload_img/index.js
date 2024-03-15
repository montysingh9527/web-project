/*
 * @Description: 图片下载
 * @Date: 2024-03-15 22:00:57
 * @FilePath: \web-project\node\upload_img\index.js
 */
const fs = require("fs");
const path = require("path");
const axios = require("axios");
// 图片存放路径
const imgPath = path.join(__dirname, "img/");
console.log("---logs-imgPath--", imgPath);
const url =
  "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/523/523-bigskin-1.jpg";
const baseurl =
  "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503-mobileskin-1.jpg";

const samll_img =
  "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg";

const get_img = async (url, idx) => {
  const res = await axios.get(url, {
    responseType: "arraybuffer", // 特别注意，需要加上此参数
  });
  //   console.log("---logs--res-", res.data);
  await fs.writeFileSync(imgPath + `hero${idx}.png`, res.data);
};
const get_all = async () => {
  // url
  let big_bg = "";
  // 错误后更换url
  let isShow = true;
  // 错误次数
  let is_error = 0;
  for (let i = 1; i < 30; i++) {
    try {
      if (isShow) {
        big_bg = `https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/50${i}/50${i}-bigskin-1.jpg`;
      } else {
        big_bg = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/50${i}/50${i}-smallskin-1.jpg`;
      }
      await get_img(big_bg, i + is_error);
    } catch (error) {
      console.error("---logs--错误次数-", is_error);
      if (is_error < 3) {
        is_error++;
        i = 1;
        isShow = false;
      }
    }
  }
};

get_all();
