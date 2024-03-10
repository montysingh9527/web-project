// 公共路由 全局钩子处理
import Vue from 'vue'
import Router from 'vue-router'
import {getUrlParameters} from "../assets/js/util";
import temp1_routes from "./temp1_routes";
import temp2_routes from "./temp2_routes";
import temp3_routes from "./temp3_routes";

Vue.use(Router)

const templates = {
	// 默认 模板路由
	tmp1: temp1_routes.pc,

	// 仿365 模板路由
	tmp2: temp2_routes.pc,

	// 新版
	tmp3: temp3_routes.pc
};

let {tmp = ''} = getUrlParameters(window.location.href);

let tmpStorage = localStorage.getItem('tmp')

tmp = ['tmp1', 'tmp2', 'tmp3'].find(t => tmp.includes(t)) || tmpStorage || 'tmp2'

const routes = templates[tmp]

localStorage.setItem('tmp', tmp)

export default new Router({
	mode: 'hash',
	routes
})
