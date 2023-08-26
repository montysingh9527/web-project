import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupAntd } from "@/libs/antd"
import "@/assets/css/index.scss"

import './assets/main.css'

/** swiper样式 */
import 'swiper/css';            // 基础样式
import 'swiper/css/navigation';    // 左右切换按钮样式
import 'swiper/css/pagination'; // 分页样式
// import 'swiper/css/scrollbar';   // 滚动条样式
const app = createApp(App)

app.use(createPinia())
app.use(router)

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

app.mount('#app')
