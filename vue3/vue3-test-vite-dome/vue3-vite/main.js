import { createApp } from "vue";
import App from "./App.vue";
import router from 'src/router/index'; 

import { Quasar } from 'quasar'; // 导入 Quasar
import 'quasar/dist/quasar.css'; // 导入 Quasar 样式

const app = createApp(App);

app.use(router);
app.use(Quasar);

console.log("---APP---", app);

app.mount("#app");
