import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import H5Router from './router/routes-h5'
import PcRouter from './router/routes-pc'
import store from './store'
import FastClick from 'fastclick'
import Vant from 'vant';
import {Lazyload} from 'vant';
import {refreshRem} from './assets/js/refresh'
import {i18n} from './language';
import VueI18n from 'vue-i18n';
import * as utils from './assets/js/util';

document.appversion = process.env.VUE_APP_VERSION

FastClick.attach(document.body)
Vue.config.productionTip = true
// Vue.prototype
Vue.use(Vant);
Vue.use(VueI18n);

Vue.use(Lazyload, {
    lazyComponent: true,
    attempt: 1
});

Vue.prototype.$utils = utils;

function initialApp() {
    if (window.innerWidth <= 768) {
        refreshRem()
        new Vue({
            i18n,
            router: H5Router,
            store,
            render: h => h(App),
        }).$mount('#app')
    } else {
        document.documentElement.style.fontSize = '20px';
        new Vue({
            i18n,
            router: PcRouter,
            store,
            render: h => h(App),
        }).$mount('#app')
    }
}

initialApp();





