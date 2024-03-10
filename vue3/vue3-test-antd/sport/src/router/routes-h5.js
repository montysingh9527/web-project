import Vue from 'vue'
import Router from "vue-router";
import { getUrlParameters } from "../assets/js/util";

Vue.use(Router)

import temp1_routes from "./temp1_routes";
import temp2_routes from "./temp2_routes";
import temp3_routes from "./temp3_routes";

let {tmp = ''} = getUrlParameters(window.location.href) || {};

let tmpStorage = localStorage.getItem('tmp')

tmp = ['tmp1', 'tmp2', 'tmp3'].find(t => tmp.includes(t)) || tmpStorage || 'tmp2'

const templates = {
    tmp1: temp1_routes.h5,
    tmp2: temp2_routes.h5,
    tmp3: temp3_routes.h5,
};

const routes = templates[tmp];


localStorage.setItem('tmp', tmp)

const H5_Router = new Router({
    mode: 'hash',
    routes
})

H5_Router.beforeEach((to, from, next) => {
    next();
});

export default H5_Router
