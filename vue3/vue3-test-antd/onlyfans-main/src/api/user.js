import request from '@/utils/request'

//注册
export function regUser(data) {
    return request({
        url: '/api/user/regUser',
        method: 'post',
        data: data
    })
}

//用户-登录
export function loginUser(data) {
    return request({
        url: '/api/user/loginUser',
        method: 'post',
        data: data
    })
}


//用户-手机登录
export function loginByPhone(data) {
    return request({
        url: '/api/user/loginByPhone',
        method: 'post',
        data: data
    })
}


//用户-绑定手机
export function bindPhone(data) {
    return request({
        url: '/api/user/bindPhone',
        method: 'post',
        data: data
    })
}


//用户-修改密码
export function updatePwd(data) {
    return request({
        url: '/api/user/updatePwd',
        method: 'post',
        data: data
    })
}


//用户-获取信息
export function getUserInfo(data) {
    return request({
        url: '/api/user/getUserInfo',
        method: 'post',
        data: data
    })
}

//用户-发送验证码
export function sendCode(data) {
    return request({
        url: '/api/user/sendCode',
        method: 'post',
        data: data
    })
}
//用户-获取收藏
export function getUserFav(data) {
    return request({
        url: '/api/user/getUserFav',
        method: 'post',
        data: data
    })
}
//用户-更新收藏
export function updateUserFav(data) {
    return request({
        url: '/api/user/updateUserFav',
        method: 'post',
        data: data
    })
}
//用户-更新资料
export function updateUserInfo(data) {
    return request({
        url: '/api/user/updateUserInfo',
        method: 'post',
        data: data
    })
}
//用户-心跳发送
export function senHt(data) {
    return request({
        url: '/api/user/senHt',
        method: 'post',
        data: data
    })
}
//用户-上传头像
export function uploadUserHead(headers,data) {
    return request({
        url: '/api/upload/uploadUserHead',
        method: 'post',
        headers:headers,
        data: data
    })
}
//用户-钻石支付
export function coinPay(data) {
    return request({
        url: '/api/user/coinPay',
        method: 'post',
        data: data
    })
}
//用户-购买记录
// export function getUserFav(data) {
//     return request({
//         url: '/api/user/getUserFav',
//         method: 'post',
//         data: data
//     })
// }
