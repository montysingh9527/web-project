/*
 * @Description:
 * @Date: 2024-01-06 23:04:24
 * @FilePath: \web-project\node-egg-demo\admin-project\src\router\index.js
 */
import { createRouter, createWebHistory } from "vue-router";
import routers from "src/router/routers.js";

const router = createRouter({
  history: createWebHistory("#"),
  routes: routers,
});

router.beforeEach((to, from, next)=>{
  // console.log('---logs--to-',to, from);
  document.title = to.meta.title;
  next();
})

export default router;
