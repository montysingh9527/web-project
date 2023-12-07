import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";
import store from "./store";
import ant from "./utils/ant";
import "amfe-flexible";
import "@/assets/css/base.css";
import "vant/lib/index.css";
import "@/utils/rem";
import "./assets/css/index.css"
import lazyload from './directive/index.js'
import { Lazyload } from 'vant';


// \[data-v.+\]
import $ from "jquery";
window.$ = $;

const app = createApp(App);


app.use(router);
app.use(store);
app.use(ant);
app.use(lazyload);
app.use(Lazyload);
app.mount("#app");
