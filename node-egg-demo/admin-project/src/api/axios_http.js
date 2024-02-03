/*
 * @Description: axios 请求封装
 * @Date: 2024-01-15 22:00:26
 * @FilePath: \web-project\node-egg-demo\admin-project\src\api\common\axios_http.js
 */
import axios from "axios";
import { Notify, useQuasar } from "quasar";
console.log("====import====", import.meta.env);
console.log("====BASE_URL===", BASE_URL);
const http = axios.create({
  //   baseURL: import.meta.env.VITE_APP_PROXY_HOST,
  // baseURL: "http://192.168.3.14:10003/",
  // baseURL: "/n",
  baseURL: BASE_URL + "/admin",
  timeout: 15000,
});

// 发起请求之前的拦截器
http.interceptors.request.use(
  (config) => {
    console.log("--发起请求之前的拦截器-logs---", config);
    config.headers["token"] = "xxxx";
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    console.log("-响应拦截器--logs--res-", res, "==res==", res.config.url);
    if (
      res.config?.url.endsWith("create") ||
      res.config?.url.endsWith("update") ||
      res.config?.url.endsWith("delete")
    ) {
      Notify.create({
        message: res.data?.msg || "response error",
        position: "top",
        color: "teal",
        timeout: 3000,
      });
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
