import $http from './http'
// import S from './crypto_params.js'
import Cookie from "js-cookie"

export function getUserBalance() {
    const url = '/mobile/game/getMoney.do'
    return $http.get(url, {}, {loading: false, cache: false})
}

export function getAutoLogin(data = {}) {
    const url = '/chat/appcheck'
    return $http.post(url, data, {loading: false, cache: false})
}

//init接口数据
export function getInitData(data = {}) {
    const url = '/mobile/api/init.do'
    return $http.post(url, data, {loading: false})
}

//usermsg数据
export function getUserMsg(data = {}) {
    const url = '/mobile/game/getUserMsg.do'
    return $http.post(url, data, {loading: false})
}

export function register(data = {}) {
    // let url = '?c=user&a=reg'
    let url = '/mobile/user/reg.do'

    // // 加密处理
    // const keyStr = S.randomHex()
    //
    // url += '&checkSign=true'
    //
    // data = S.encryption(data, keyStr)

    console.log('data', data)
    return $http.post(url, data, {loading: false, cache: false})
}

// export function login(data = {}) {
//     let url = '/chat/register'
//
//     // 加密处理
//     const keyStr = S.randomHex()
//
//     url += '&checkSign=true'
//
//     data = S.encryption(data, keyStr)
//
//
//     return $http.post(url, data, {loading: false, cache: false})
// }

export function userLogin(data = {}) {
    const url = '/mobile/user/loginedto'
    return $http.post(url, data, {loading: true})
}

//退出登录
export function exitLogin(data = {}) {
    const xtoken = Cookie.get('logintoken');
    const url = `/mobile/user/logout/?x-session-token=${xtoken}`
    return $http.get(url, data, {loading: true})
}

// 获取系统配置
export function getWebConfig(data = {}) {
    const xtoken = Cookie.get('loginsessid');
    const url = `/mobile/config/confignew.js?x-session=${xtoken}`
    return $http.get(url, data, {loading: false})
}

//修改登录密码
export function setNewPwd(data = {}) {
    const url = '/mobile/safe/setPasswd.do';
    return $http.post(url, data, { loading: false })
}

//修改已经设置过取款密码
export function setCoinPwd(data = {}, loading = false, cache = false) {
    const url = '/mobile/safe/setCoinPwd.do';
    return $http.post(url, data, { loading, cache })
}

//修改未设置过取款密码
export function setFundPwd(data = {}, loading = false, cache = false) {
    const url = '/mobile/user/setFundPwd.do';
    return $http.post(url, data, { loading, cache })
}

// 获取充值配置
export async function getThirdPay() {
    const url = '/config/getThirdPay';
    return $http.get(url, {}, {loading: false});    //2019/05/30
}

// 获取充值配置
export async function getUserRechCfg() {
    const url = '/mobile/Userrech/getUserRechCfg.do';
    return $http.get(url, {}, {loading: false});
}

// 在线充值
export async function onlinePay(data) {

    // userrech/onlinePay.do?thirdPayId=17&amount=1000
    // thirdPayId=908&amount=1000

    const url = '/userrech/onlinePay.do?' + param(data);
    console.log('url', url)
    return $http.post(url, {isVue: 1}, {loading: true});
}

// 获取优惠活动列表
export function getPromote(data = {}) {
    const url = '/Config/getPromote';
    return $http.get(url, data, {loading: false})
}
