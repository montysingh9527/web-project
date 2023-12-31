import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/resets.css";
import "./assets/css/index.css";
import "./assets/js/common";

createApp(App).use(store).use(router).mount("#app");
