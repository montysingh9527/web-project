/*
 * @Description: 用户
 * @Date: 2024-01-15 22:13:12
 * @FilePath: \web-project\node-egg-demo\admin-project\src\api\common\user.js
 */
import axios from "src/api/axios_http.js";
// 创建
export const create_user = (params) => {
  return axios.post("/user/create", params);
};

// 获取列表
export const find_list = (params) => {
  return axios.get("/user/list", { params });
};

// 更新
export const update_user = (params) => {
  return axios.post("/user/update", params);
};

// 删除
export const delete_user = (params) => {
  return axios.post("/user/delete", params);
};
