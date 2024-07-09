/*
 * @Description:
 * @Date: 2023-12-27 13:37:06
 * @FilePath: \web-project\node-egg-demo\admin-project\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "src/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // pinia持久化存储
import { i18n } from "src/i18n/index.js";
import { Quasar, Notify, Dialog, LocalStorage, SessionStorage } from "quasar"; // 导入 Quasar
import "quasar/dist/quasar.css"; // 导入 Quasar 样式
// import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css"; // 导入字体图标
import "@quasar/extras/material-icons/material-icons.css"; // 导入字体图标
// import "base_src/quasar/icon-set/fontawesome-v5.js"

import { setupUtils } from "src/boot/utils.js";
// 实例化 pinia 容器
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(i18n);
app.use(Quasar, {
  plugins: [Notify, Dialog, LocalStorage, SessionStorage],
  // iconSet: iconSet,
  // extras: [
  //   'material-icons',
  //   'mdi-v7',
  //   'ionicons-v4', // last webfont was available in v4.6.3
  //   'eva-icons',
  //   'fontawesome-v6',
  //   'themify',
  //   'line-awesome',
  //   'bootstrap-icons'
  // ],
  // framework: {
  //   iconSet: 'material-icons', // 你可以选择 'material-icons'、'mdi-v5' 等
  //   // ...
  // },
});

function setupPlugins() {
  // 注册全局常用的utils插件
  setupUtils(app);
  // // 引入静态资源
  // setupAssets();
  // // 注册全局自定义组件,如：<svg-icon />
  // setupCustomComponents(app);
  // // 注册全局方法，如：app.config.globalProperties.$message = message
  // setupGlobalMethods(app);
}

setupPlugins();

app.mount("#vite-app");
