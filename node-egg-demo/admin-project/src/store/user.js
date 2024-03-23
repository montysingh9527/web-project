/*
 * @Description: 用户信息
 * @Date: 2024-03-23 21:04:43
 * @FilePath: \web-project\node-egg-demo\admin-project\src\store\user.js
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import { LocalStorage } from "quasar";
export default defineStore(
  "user",
  () => {
    const userInfo = ref(
      JSON.parse(LocalStorage.getItem("userInfo"))?.user || null
    );
	const userToken = ref(null)

	// 设置用户信息
    const set_userInfo = (userData) => {
		console.log('--设置用户信息-logs-userData--',userData);
      userInfo.value = userData.user;
	  userToken.value = userData.token;
    };

	// 删除用户信息
    const del_userInfo = () => {
      userInfo.value = null;
    };
    return {
      userInfo,
      set_userInfo,
      del_userInfo,
    };
  },
  {
    persist: true, // 存储到LocalStorage
  }
);
