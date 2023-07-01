import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";
import store from "./store";
import ant from "./utils/ant";
import "amfe-flexible";
import "tailwindcss/tailwind.css"
import "vant/lib/index.css";
import "@/utils/rem";
import "./assets/css/index.css"
import lazyload from './directive/index.js'
import { Lazyload } from 'vant';

// Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

import Header from './components/Header.vue'
import Loading from './components/Loading.vue'

// \[data-v.+\]
import $ from "jquery";
window.$ = $;

const app = createApp(App);


app.use(router);
app.use(store);
app.use(ant);
// app.use(vuetify);
app.use(lazyload);
app.use(Lazyload);
app.component('Header', Header)
app.component('Loading', Loading)
app.mount("#app");
