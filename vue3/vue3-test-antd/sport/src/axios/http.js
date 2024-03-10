import axios from 'axios'
import Cookie from 'js-cookie'
import {getItem, setItem, update} from "./IndexDB"
import { param } from '../assets/js/util'
import qs from 'qs'
import Event from "../event"

const defaultOptions = {
    loading: true,               // 是否loading
    cache: false,                // 是否本地缓存数据
    cacheTime: 1000 * 60 * 10000,   // 默认数据缓存10分钟
    version: 1, // 版本号
    autoAlertErr: false  // 公共拦截错误 弹框
}

const API = process.env.NODE_ENV === 'development' ? '/api' : sessionStorage.getItem('base_api_url') || window.base_api_url;
// const API = process.env.NODE_ENV === 'development' ? 'http://test10.fhptdev.com' : sessionStorage.getItem('base_api_url') || window.base_api_url;
const reg = new RegExp(`^${API}`, 'g')

let httpTimer = null
function clearHttpTimer() {
    if (httpTimer) {
        clearTimeout(httpTimer)
        httpTimer = null
    }

    Event.$emit('loading', {loading: false, text: ''})
}

// 设置全局axios默认值
axios.defaults.timeout = 20 * 1000 // 10s的超时验证
axios.defaults.baseURL = API
axios.defaults.withCredentials = true // 允许访问cookie

// 发起请求之前
axios.interceptors.request.use((config) => {
    const headers = config.headers || {}
    if (headers.loading === true) {
        clearHttpTimer()

        httpTimer = setTimeout(() => {
            Event.$emit('loading', {loading: true, text: ''})
        }, 100)
    }

    headers['Accept'] = '*/*';
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    if(Cookie.get('logintoken')) {
        headers['auth-token'] = Cookie.get('loginsessid');
    }

    return config
}, (err) => {
    console.log('全局请求错误拦截--->', err)
    return Promise.reject(err)
})

//返回状态判断
axios.interceptors.response.use((res) => {
    const headers = res.config.headers
    if (headers.loading === true) {
        clearHttpTimer()
    }

    if (res.status === 200) {
        // 这里可以做全局响应错误拦截'
        let result = res.data
        // 后台接口返回有code字段的 拦截到不是'0' 直接弹框报错 默认状态
        // if(result.hasOwnProperty('code') && result.code != 0 && headers.autoAlertErr){
        //     // 弹框报错
        //     window._UG.ugAlert(result.msg)
        // }

        // 无需验证result, null 0 false 皆为有效返回值
        // 如果需要缓存
        if (headers.cache) {
            const regUrl = res.config.url.replace(reg, '')
            const cacheData = {
                // data: result.data,
                data: result,
                time: new Date().getTime(),
                version: 1,
                url: regUrl // 去掉/api开头的字符
            }

            if (headers.needUpdate === true) {
                update(cacheData)
            } else {
                setItem(cacheData)
                    .then()
                    .catch(err => console.log(err))
            }
        }

        return result
    }
}, (error) => {

    clearHttpTimer()

    return Promise.reject(error)
})


export default {
    post: async (url, params = {}, options = defaultOptions) => {
        const xToken = Cookie.get('logintoken');      //Post默认请求附带x-token
        if(xToken && url !== '/mobile/user/loginedto') {
            params['x-session-token'] = xToken
        }

        const option = {...defaultOptions, ...options}
        params = qs.stringify({...params, isVue: 1});
        let postConfig = {
            url,
            data: params,
            method: 'POST',
            headers: {
                loading: option.loading,
                // 后台接口返回有code字段的 拦截到不是'0' 直接弹框报错 默认状态
                autoAlertErr: option.autoAlertErr
            }
        }

        if (option.cache) {
            let res = await IndexDBMiddleware(url, option)
            if (res && res.status === 200) return Promise.resolve(res.data.data)
            else if (res && res.status === 405) { // 数据过期
                postConfig.headers = {...postConfig.headers, cache: true, needUpdate: true}
                return axios(postConfig)
            } else {
                postConfig.headers = {...postConfig.headers, cache: true}
                return axios(postConfig)
            }
        }
        return axios(postConfig)
    },

    get: async (url, params = {}, options = defaultOptions) => {
        const option = { ...defaultOptions, ...options }

        if (Object.keys(params).length > 0) {
            url = url + '?' + param(params)
        }

        let getConfig = {
            url,
            params: {},
            method: 'GET',
            headers: {
                loading: option.loading,
                // 后台接口返回有code字段的 拦截到不是'0' 直接弹框报错 默认状态
                autoAlertErr: option.autoAlertErr
            }
        }

        if (option.cache) {
            let res = await IndexDBMiddleware(url, option)

            if (res && res.status === 200) return Promise.resolve(res.data.data);
            else if (res && res.status === 405) {
                getConfig.headers = {...getConfig.headers, needUpdate: true, cache: true}
                return axios(getConfig)
            }
            else {
                getConfig.headers = {...getConfig.headers, cache: true}
                console.log(11111111)
                return axios(getConfig)
            }
        }

        return axios(getConfig)
    }
}

//浏览器数据库中间件
async function IndexDBMiddleware(url, options) {
    if (sessionStorage.getItem('disabledCache') === '1') {
        return Promise.resolve({status: 500, msg: '该浏览器不支持indexDB'})
    }
    url = url.replace(reg, '')
    let result = await getItem(url)

    return new Promise((resolve) => {
        if (result && result.status === 200) {
            const { data } = result
            const now = new Date().getTime()

            // 如果本地数据库数据版本小于线上版本 或者 超过了过期时间 抛错
            if (data && data.data && data.version < options.version) {
                resolve({ status: 500, msg: '版本小于线上版本' })
            } else if (data && data.data && now - data.time > options.cacheTime) {
                // deleteItem(data.url)
                resolve({ status: 405, msg: '数据已过期'})
            }
            resolve({ status: 200, data: data, msg: '获取成功' })
        } else {
            resolve({ status: 404, msg: '没有找到该数据' })
        }
    })
}





