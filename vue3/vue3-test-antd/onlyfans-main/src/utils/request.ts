import { Dialog, showNotify } from 'vant'
import MD5 from "js-md5";
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
// axios.defaults.baseURL = '/n'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['appId'] = 'E705D026E3B01F8E4BEC4EA9CC77F157'

const myHttp = axios.create({
    baseURL: import.meta.env.VITE_APP_PROXY_HOST as string,
    // baseURL: "http://192.168.3.14:10003/",
    // baseURL: "/n",
    timeout: 15000 // request timeout
})
// 发起请求之前的拦截器
myHttp.interceptors.request.use(
    (config) => {
        config.headers["token"] = JSON.parse(localStorage.getItem('userDetail'))?.id ? Encrypt(JSON.parse(localStorage.getItem('userDetail')).id) : ''

        // 请求体校验 无特殊参数则不传参数 保留公共参数即可
        let req = config.data ? config.data : {}
        // 拼接公共参数
        var data = { ...req, timeStamp: Math.round(new Date().getTime()/1000).toString(), "devType": 3 }

        if (config.method === "post") {
            // key 排序
            const arr = Object.keys(data).sort()
            // console.log(arr)
            var obj = ""
            // 拼接字符串
            arr.map((el) => {
                obj += el + "=" + data[el] + "&"
            })
            //去掉多余 &
            obj = obj.substring(0, obj.length - 1)
            obj = obj + "E705D026E3B01F8E4BEC4EA9CC77F157"
            // md5 加密
            obj = MD5(obj).toUpperCase().substring(8, 24)
            config.headers["sign"] = obj
            // 参数AES 加密
            config.data = { data: Encrypt(JSON.stringify(data)) }
        }


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
            showNotify({ type: 'warning', message: msg })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            showNotify({ type: 'warning', message: msg })
            return Promise.reject(msg)
        } else {
            if (res.data.result) res.data.result = res.data.result ? JSON.parse(Decrypt(res.data.result)) : false
            return res.data
        }
    },
    (error) => {
        console.error('err' + error)
        if (error.message) {
            showNotify({ type: 'warning', message: error.message })
        }
        return Promise.reject(error)
    }
)

export default myHttp
// export { myHttp, apiUrl };

export const getCryptImg = async(url)=> {
    // console.log(url);
    
    // if(url.indexOf('http')==-1){
    //     url = import.meta.env.VITE_APP_RESOURCE_HOST + url
    // }
    if(url.indexOf('.gif')!==-1){
        return url
    }
    const res = await axios({
        // baseURL: import.meta.env.VITE_APP_PROXY_HOST as string,
        // baseURL: 'https://v2pics2.shxfxj.com/',
        method: 'get',
        url: url,
        // params, // get 请求时带的参数
        timeout: 15000,
        responseType: 'arraybuffer',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    // console.log(res);

    var unitArray = new Uint8Array(res.data);
    unitArray = unitArray.subarray(2, unitArray.length);
    var binary = ""
    unitArray.forEach(el => {
        binary += String.fromCharCode(el)
    })
    var base64 = btoa(binary)
    let baseUrl = "data:image/png;base64," + base64;

    return baseUrl

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
