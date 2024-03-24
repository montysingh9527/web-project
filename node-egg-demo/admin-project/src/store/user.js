/*
 * @Description: 用户信息
 * @Date: 2024-03-23 21:04:43
 * @FilePath: \web-project\node-egg-demo\admin-project\src\store\user.js
 */
import { defineStore } from "pinia";
import { ref } from "vue";
export default defineStore(
  "user",
  () => {
    // 用户信息
    const userInfo = ref(null);
    // 用户token
    const userToken = ref(null);

    // 设置用户信息
    const set_userInfo = (userData) => {
      userInfo.value = userData.user;
      userToken.value = userData.info;
    };

    // 删除用户信息
    const del_userInfo = () => {
      userInfo.value = null;
      userToken.value = null;
    };
    return {
      userInfo,
      userToken,
      set_userInfo,
      del_userInfo,
    };
  },
  {
    persist: true, // 存储到LocalStorage
  }
);
