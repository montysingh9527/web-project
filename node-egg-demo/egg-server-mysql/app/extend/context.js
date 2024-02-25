/*
 * @Description:
 * @Date: 2023-12-28 18:02:45
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\extend\context.js
 */
"use strict";
const httpCode = require("../utils/http-code");

module.exports = {
  // response通用返回
  returnBody({ data = null, code = 200, msgcode, status = 200 }) {
    this.status = status;
    msgcode = msgcode ? msgcode : code;
    this.body = {
      code,
      message: httpCode[msgcode] ? httpCode[msgcode] : "success",
      data,
    };
  },
  async checkValidate(datas, path) {
    try {
      // 校验规则, 如果沒有新建文件则不校验
      let validate = Object.assign({}, datas);
      return await this.validate(path, validate);
    } catch (error) {
      console.log(error);
      return true;
    }
  },
  toInt(str) {
    if (typeof str === "number") return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
};
