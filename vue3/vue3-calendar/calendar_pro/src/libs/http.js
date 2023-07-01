import axios from "axios";
import qs from "qs";
import { JUHE_APPKEY } from "../configs/keys";


const BASTURL = "http://127.0.0.1:7001";
/**
 * 封装axios请求 post
 * @param {*} options 
 */
function axiosPost(options) {
  console.log("======ops====",options)
  axios({
    url: BASTURL + options.url,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      ...options.data,
      key: JUHE_APPKEY,
    }),
  })
    .then((res) => {
      options.success(res.data);
    })
    .catch((err) => {
      options.error(err);
    });
}

/**
 * 封装axios请求 get
 * @param {*} options 
 */
function axiosGet(options) {
  axios(BASTURL + options.url + "&key=" + JUHE_APPKEY)
    .then((res) => {
      options.success(res.data);
    })
    .catch((err) => {
      options.error(err);
    });
}

export { axiosPost, axiosGet };
