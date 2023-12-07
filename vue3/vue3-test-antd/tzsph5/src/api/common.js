import request from '@/utils/request'

//首页-轮播图
export function getBanner(data) {
    return request({
        url: '/api/h5/getBanner',
        method: 'post',
        data: data
    })
}

//首页-栏目列表
export function getIndexCol(data) {
    return request({
        url: '/api/h5/getIndexCol',
        method: 'post',
        data: data
    })
}

//视频-分类列表
export function getVideoCategory(data) {
    return request({
        url: '/api/getVideoCategory',
        method: 'post',
        data: data
    })
}

//视频-专题列表
export function getVideoZtList(data) {
    return request({
        url: '/api/h5/getVideoZtList',
        method: 'post',
        data: data
    })
}

//视频列表-首页栏目
export function getVideoByIndexCol(data) {
    return request({
        url: '/api/h5/getVideoByIndexCol',
        method: 'post',
        data: data
    })
}

//视频列表-按分类
export function getVideoListByCategory(data) {
    return request({
        url: '/api/getVideoListByCategory',
        method: 'post',
        data: data
    })
}

//视频列表-搜索
export function searchVideo(data) {
    return request({
        url: '/api/searchVideo',
        method: 'post',
        data: data
    })
}

//视频列表-按专题
export function getVideoByZt(data) {
    return request({
        url: '/api/h5/getVideoByZt',
        method: 'post',
        data: data
    })
}

//视频列表-按演员
export function listVideoByActor(data) {
    return request({
        url: '/api/listVideoByActor',
        method: 'post',
        data: data
    })
}

//视频列表-按id数组
export function listVideoByIds(data) {
    return request({
        url: '/api/listVideoByIds',
        method: 'post',
        data: data
    })
}

//其它-获取系统配置
export function getConfig(data) {
    return request({
        url: '/api/getConfig',
        method: 'post',
        data: data
    })
}

//其它-演员列表
export function getActorList(data) {
    return request({
        url: '/api/getActorList',
        method: 'post',
        data: data
    })
}

//其它-演员列表-ID数组
export function listActorByIds(data) {
    return request({
        url: '/api/listActorByIds',
        method: 'post',
        data: data
    })
}

//首页-获取标签
export function getTag(data) {
    return request({
        url: '/api/h5/getTag',
        method: 'post',
        data: data
    })
}

//视频详情
export function getVideoInfo(data) {
    return request({
        url: '/api/getVideoInfo',
        method: 'post',
        data: data
    })
}

//商品-VIP商品
export function getVipItem(data) {
    return request({
        url: '/api/getVipItem',
        method: 'post',
        data: data
    })
}
//商品-钻石
export function getCoinItem(data) {
    return request({
        url: '/api/getCoinItem',
        method: 'post',
        data: data
    })
}

//支付-支付通道
export function getChannelList(data) {
    return request({
        url: '/api/getChannelList',
        method: 'post',
        data: data
    })
}

//支付-状态查询
export function checkOrderStatus(data) {
    return request({
        url: '/api/pay/checkOrderStatus',
        method: 'post',
        data: data
    })
}

//支付-下单
export function toPay(data) {
    return request({
        url: '/api/pay/toPay',
        method: 'post',
        data: data
    })
}

//支付-下单
export function getAdvOne(data) {
    return request({
        url: '/api/getAdvOne',
        method: 'post',
        data: data
    })
}

export function getAppList(data) {
    return request({
        url: '/api/getAppList',
        method: 'post',
        data: data
    })
}
