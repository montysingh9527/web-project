/*
 * @Description:
 * @Date: 2023-12-28 18:02:45
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\extend\context.js
 */
"use strict";

module.exports = {
  /**
   * 成功返回的状态
   * @param {*} param
   */
  api_success({ code = 200, msg = "成功", data = {} }) {
    this.body = {
      data,
      message: msg,
      code,
      success: true,
    };
  },
  /**
   * 失败返回的状态
   * @param {*} param
   */
  api_error({ code = 999, msg = "失败", data = {} }) {
    this.body = {
      data,
      message: msg,
      code,
      success: false,
    };
  },

  /**
   * 校验参数
   * @param {*} datas
   * @param {*} path
   * @returns
   */
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
  /**
   * 整数
   * @param {*} str
   * @returns
   */
  toInt(str) {
    if (typeof str === "number") return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
  /**
   * 随机生成用户名
   * @param {*} n
   * @returns
   */
  random(n = 10) {
    const arr = ["4", "5", "6", "7", "_", "+", "a", "b", "z", "p", "X", "Z"];
    let str = "";
    for (let i = 0; i < n; i++) {
      let id = Math.ceil(Math.random() * 10);
      str += arr[id];
    }
    return str;
  },
};
