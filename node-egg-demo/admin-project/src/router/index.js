/*
 * @Description:
 * @Date: 2024-01-06 23:04:24
 * @FilePath: \web-project\node-egg-demo\admin-project\src\router\index.js
 */
import { createRouter, createWebHistory } from "vue-router";
import routers from "src/router/routers.js";
import useUserInfo from "src/store/user.js";

const router = createRouter({
  history: createWebHistory("#"),
  routes: routers,
});

router.beforeEach((to, from, next) => {
  const useUser = useUserInfo();
  const userToken = useUser.userToken;
  // 不是登录页 没有token
  if (to.name != "login" && !userToken?.token) {
    next({ name: "login" });
  }
  document.title = to.meta.title;
  next();
});

export default router;
