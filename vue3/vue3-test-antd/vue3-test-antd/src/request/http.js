console.log("====import====", import.meta);
// console.log("====BASE_URL===",BASE_URL)
// console.log("====process===", process);

import axios from "axios";
const http = axios.create({
//   baseURL: import.meta.env.VITE_APP_PROXY_HOST,
  // baseURL: "http://192.168.3.14:10003/",
  // baseURL: "/n",
  timeout: 15000, // request timeout
});

// 发起请求之前的拦截器
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
