import axios from "axios";
import qs from "qs";

function axiosPost(options) {
  axios({
    url: options.url,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      ...options.data,
      key: "JUHE_APPKEY",
      testType: "rand",
    }),
  })
    .then((res) => {
      options.success(res.data);
    })
    .catch((err) => {
      options.error(err);
    });
}


export {
    axiosPost
}