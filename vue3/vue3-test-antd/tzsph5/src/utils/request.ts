import { Dialog, Notify } from 'vant'
import axios from 'axios'
import { getToken } from './auth'
import store from '../store'
import router from '../router'
import { Encrypt, Decrypt } from './crypto'
const apiUrl = {
    checkPermissions: '/d/access/check', //检测用户权限
    getBrand: '/d/m/merchant/getinfo' //品牌设定
}

function getQueryString(name: string): number {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) return Number(unescape(r[2]))
    return 0
}

const errorCode = {
    401: '认证失败，无法访问系统资源',
    403: '当前操作没有权限',
    404: '访问资源不存在',
    default: '系统未知错误,请反馈给管理员'
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['appId'] = 'B97B42EC240530109D904EBCDD968829'

const myHttp = axios.create({
    baseURL: import.meta.env.VITE_APP_PROXY_HOST as string,
    // baseURL: "http://192.168.3.14:10003/",
    timeout: 15000 // request timeout
})
// 发起请求之前的拦截器
myHttp.interceptors.request.use(
    (config) => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        if (getToken() && !isToken) {
            config.headers.token = getToken()
        }
        
        if (config.data) {
            config.data.timeStamp = new Date().getTime()
            let enData = Encrypt(JSON.stringify(config.data))
            config.data = { data: enData }
        }

        // if (!token && window.location.href.indexOf("/login") == -1) {
        //   window.location.href = "/login";
        // }
        // 防止post请求参数无法传到后台
        // if ((config.method === "post" || config.method === "put") && config.headers["Content-Type"] !== "multipart/form-data") {
        //   config.data = qs.stringify(config.data); // 传递参数要将参数序列化, 使用了qs插件
        // }
        return config
    },
    (error) => Promise.reject(error)
)
// 响应拦截器
myHttp.interceptors.response.use(
    (res) => {
        // 未设置状态码则默认成功状态
        const code = res.status || 200
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode.default

        if (code === 401) {
            store.dispatch('user/LogOut').then(() => {
                router.push('/login')
            })
        } else if (code === 500) {
            Notify({ type: 'warning', message: msg })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            Notify({ type: 'warning', message: msg })
            return Promise.reject(msg)
        } else {
            if (res.data.result) res.data.result = res.data.result ? JSON.parse(Decrypt(res.data.result)) : false
            return res.data
        }
    },
    (error) => {
        console.error('err' + error)
        if (error.message) {
            Notify({ type: 'warning', message: error.message })
        }
        return Promise.reject(error)
    }
)

export default myHttp
// export { myHttp, apiUrl };

export const getCryptImg = async(url)=> {
    // // console.log(url);
    
    if(url.indexOf('http')==-1){
        url = import.meta.env.VITE_APP_RESOURCE_HOST + url
    }
    const res = await axios({
        baseURL: import.meta.env.VITE_APP_PROXY_HOST as string,
        method: 'get',
        url: '/api/img/' + window.btoa(url) + '.data',
        // params, // get 请求时带的参数
        timeout: 15000,
        responseType: 'arraybuffer',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    // // console.log(res);

    const imgUrl = 'data:image/png;base64,' + arrayBufferToBase64(res.data)

    // // console.log(imgUrl);
    
    
    return imgUrl
}
//转换图片编码
function arrayBufferToBase64(buffer) {
    let binary = ''
    let bytes = new Uint8Array(buffer)
    bytes = bytes.subarray(2, bytes.length)
    let len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    // // console.log(window.btoa(binary));

    return window.btoa(binary)
}

// getCryptImg("http://qlres.zchancheng.com/user/2022-03-15/upload_POSENE_1647348871723.webp")
// getCryptImg("http://77888.0712360.com/mdcm/images/covers/2021/10/8a49681d4ee9126-240x180.jpg")
