/*
 * @Description: 管理员
 * @Date: 2024-03-24 21:52:54
 * @FilePath: \web-project\node-egg-demo\admin-project\src\api\common\admin.js
 */
import axios from "src/api/axios_http.js";
// 创建
export const create_admin = (params) => {
  return axios.post("/admin/create", params);
};

// 获取列表
export const find_list = (params) => {
  return axios.get("/admin/list", { params });
};

// 更新
export const update_admin = (params) => {
  return axios.post("/admin/update", params);
};

// 删除
export const delete_admin = (params) => {
  return axios.post("/admin/delete", params);
};
