/*
 * @Description:
 * @Date: 2024-01-11 16:36:36
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\app\extend\context.js
 */
module.exports = {
  // 成功返回的状态
  api_success({ msg = "成功", code = "000000", result = {} }) {
    this.response.body = {
      result,
      msg,
      code,
      success: true,
    };
  },
  // 失败返回的状态
  api_error({ msg = "失败", code = "999999", result = {} }) {
    this.response.body = {
      result,
      msg,
      code,
      success: false,
    };
  },

  // 随机生成用户名
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
