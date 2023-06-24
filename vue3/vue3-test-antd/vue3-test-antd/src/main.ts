import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupAntd } from "@/libs/antd"
import "@/assets/css/index.scss"

const app = createApp(App)
// app.use(antd);
app.use(store)
app.use(router)
app.mount('#app')


function setupPlugins() {
    // 注册全局常用的ant-design-vue组件
    setupAntd(app);
    // // 引入静态资源
    // setupAssets();
    // // 注册全局自定义组件,如：<svg-icon />
    // setupCustomComponents(app);
    // // 注册全局方法，如：app.config.globalProperties.$message = message
    // setupGlobalMethods(app);
}

setupPlugins()