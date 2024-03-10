import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/routes-pc'
import store from './store'
import FastClick from 'fastclick'
import Vant from 'vant';
import { Lazyload } from 'vant';
import '@vant/touch-emulator';
import './assets/css/index.less'
import 'vant/lib/index.css';
import {getWebConfig} from "./axios/user";

document.appversion = process.env.VUE_APP_VERSION

FastClick.attach(document.body)
Vue.use(Vant);

Vue.use(Lazyload, {
    lazyComponent: true,
    attempt: 1
});



FastClick.attach(document.body)

Vue.config.productionTip = true

// const APP = new Vue({
//     router,
//     store,
//     render: h => h(App)
// })
//
// APP.$mount('#app')

getWebConfig()
    .then(res => {
        sessionStorage.setItem('projectConfig', JSON.stringify(res))
        new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app')

    })
    .catch(err => console.log(err))

