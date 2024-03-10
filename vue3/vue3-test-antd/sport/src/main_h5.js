import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/routes-h5'
import store from './store'
import FastClick from 'fastclick'
import Vant from 'vant';
import { Lazyload } from 'vant';

import './assets/css/mobile.less'
// import 'vant/lib/index.css';

document.appversion = process.env.VUE_APP_VERSION

FastClick.attach(document.body)

Vue.config.productionTip = true

import { refreshRem } from './assets/js/refresh'
import {getWebConfig} from "./axios/user";



Vue.use(Vant);

Vue.use(Lazyload, {
    lazyComponent: true,
    attempt: 1
});

// const APP = new Vue({
//     router,
//     store,
//     render: h => h(App),
// })

refreshRem()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
