import request from '@/utils/request'

//获取系统配置{}
export function apiGetConfig(data) {
    return request({
        url: '/api/getConfig',
        method: 'post',
        data: data
    })
}

//首页-帖子列表{ "page": "1","limit": "10"}
export function apiArticleIndex(data) {
    return request({
        url: '/api/article/index',
        method: 'post',
        data: data
    })
}


//首页-帖子详情{ "id": "a7b5136aa132fb9970cbfa1fb14794c3"}
export function apiArticleInfo(data) {
    return request({
        url: '/api/article/info',
        method: 'post',
        data: data
    })
}


//首页-获取推荐用户{"payMode":"1"}收费模式：1免费，2收费
export function apiGetRecommendUser(data) {
    return request({
        url: '/api/getRecommendUser',
        method: 'post',
        data: data
    })
}


//首页-搜索帖子{"key": "中出","page":"1","limit":"20"}
export function apiSearchArticle(data) {
    return request({
        url: '/api/search/article',
        method: 'post',
        data: data
    })
}

//首页-搜索用户{"key": "张三","page":"1","limit":"20"}
export function apiSearchUser(data) {
    return request({
        url: '/api/search/user',
        method: 'post',
        data: data
    })
}


//通讯录-列表{"page":"1","limit":"20"} nickName 选填，按用户名搜索
export function apiContactsList(data) {
    return request({
        url: '/api/user/contacts/list',
        method: 'post',
        data: data
    })
}

//通讯录-添加{"contactsId":"s1610319660756930562"}
export function apiContactsAdd(data) {
    return request({
        url: '/api/user/contacts/add',
        method: 'post',
        data: data
    })
}

//通讯录-删除{"id":"1613368934462468098"}
export function apiContactsDel(data) {
    return request({
        url: '/api/user/contacts/del',
        method: 'post',
        data: data
    })
}

//用户-注册{"devCode":"54d44d55s54s4s2","devType":"1","devName":"oppo-151"} devType:设备类型：1安卓，2苹果，3网页
export function apiReg(data) {
    return request({
        url: '/api/user/reg',
        method: 'post',
        data: data
    })
}


//用户-登录{"account":"EHFO9574","pwd":"123456","code":"qdjm","key":"144454423"} code:验证码  key:验证码图片请求路径/key值
export function apiLogin(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: data
    })
}


//用户-发送手机验证码{"mobile":"186xxxxxxxx","type":"1"} type:1登录，2绑定手机
export function apiSendCode(data) {
    return request({
        url: '/api/sendCode',
        method: 'post',
        data: data
    })
}

//用户-手机登录{"mobile":"132xxxxxx","code":"23123"}
export function apiLoginByMobile(data) {
    return request({
        url: '/api/user/loginByMobile',
        method: 'post',
        data: data
    })
}


//用户-我的资料{}
export function apiUserinfo(data) {
    return request({
        url: '/api/user/info',
        method: 'post',
        data: data
    })
}

//用户-绑定手机{"mobile":"132xxxxxx","code":"23123"}
export function apiBindPhone(data) {
    return request({
        url: '/api/user/bindPhone',
        method: 'post',
        data: data
    })
}


//用户-更新我的资料
// {
//     "headUrl": "user/image/2022-12-30/upload_DYXXLA_1672382574958.jpg",
//     "bgUrl": "user/image/2022-12-30/upload_VZZMGT_1672382574976.jpg",
//     "nickName": "张三",
//     "mail": "554s4@qq.com",
//     "introduction": "测试简介内容...s",
//     "address": "中国 四川 成都市",
//     "webUrl": "http://www.baidu.com"
// }
export function apiUpdateUserinfo(data) {
    return request({
        url: '/api/user/updateInfo',
        method: 'post',
        data: data
    })
}


//用户-修改密码{"pwd": "123456"}
export function apiUpdatePwd(data) {
    return request({
        url: '/api/user/updatePwd',
        method: 'post',
        data: data
    })
}

//用户-查看其他用户资料{"id":"10000"}
export function apiGetUserInfo(data) {
    return request({
        url: '/api/user/getUserInfo',
        method: 'post',
        data: data
    })
}

//帖子总数 {"id":"s1610006548841402370"}
export function apiArticleCount(data) {
    return request({
        url: '/api/user/article/count',
        method: 'post',
        data: data
    })
}



// 上传图片 该请求为表单方式，上传接口API地址请在系统配置获取 files:类型file 上传文件列表（图片类型：jpg,png,gif,jpeg），支持多文件
export function apiUploadImage(data) {
    return request({
        url: '/api/upload/uploadImage',
        method: 'post',
        data: data
    })
}


// 发帖图文 {"txtContent":"测试发送内容","pics":"user/s1222.png,user/s1333.png"} txtContent:文字内容，长度600字符  pics:图片合集数组（相对路径），上传接口返回。转字符,号拼接
export function apiSend(data) {
    return request({
        url: '/api/user/article/pics/send',
        method: 'post',
        data: data
    })
}


// 帖子-点赞 {"id":"c1610006904841342978"}
export function apiAddZan(data) {
    return request({
        url: '/api/user/addZan',
        method: 'post',
        data: data
    })
}

// 帖子-我的帖子列表 {"page":"1","limit":"20","sort":"3","order":"asc","type":"1"} sort排序:1时间，2点赞，3打赏金额 order:排序方式：asc正序，desc倒序 type:类型：1视频，2图文
export function apiArticleListMy(data) {
    return request({
        url: '/api/user/article/list/my',
        method: 'post',
        data: data
    })
}

// 帖子-帖子列表 {"id":"10000","page":"1","limit":"20","sort":"3","order":"asc","type":"1"} sort排序:1时间，2点赞，3打赏金额 order:排序方式：asc正序，desc倒序 type:类型：1视频，2图文
export function apiArticleList(data) {
    return request({
        url: '/api/user/article/list',
        method: 'post',
        data: data
    })
}

//用户-消费记录 {"page":"1","limit":"20"}
export function apiMoneyLog(data) {
    return request({
        url: '/api/user/money/log',
        method: 'post',
        data: data
    })
}


//用户-心跳发送 {"type":"2"}  type:平台类型：1APP，2H5
export function apiSendHt(data) {
    return request({
        url: '/api/user/sendHt',
        method: 'post',
        data: data
    })
}


//订阅-我的订阅{"page":"1","limit":"20"} 
export function apiSubscribeList(data) {
    return request({
        url: '/api/user/subscribe/list/user',
        method: 'post',
        data: data
    })
}

//订阅-我的订阅 即将过期{"page":"1","limit":"20"} 
export function apiSubscribeOverlist(data) {
    return request({
        url: '/api/user/subscribe/overList',
        method: 'post',
        data: data
    })
}


//订阅-订阅用户 {"subUserId": "10000","templateId":"1615915938531094530"}  subUserId:被订阅用户ID  templateId非必填: 订阅收费模板ID
export function apiSubscribeUser(data) {
    return request({
        url: '/api/user/subscribe/user',
        method: 'post',
        data: data
    })
}


//订阅-取消订阅用户 {"subUserId": "10000","note":"1615915938531094530"}  subUserId:取消订阅用户ID  note非必填: 取消原因
export function apiSubscribeUserCancel(data) {
    return request({
        url: '/api/user/subscribe/user/cancel',
        method: 'post',
        data: data
    })
}

//订阅-订阅帖子 {"articleId": "c1610009864640040962"}  articleId:帖子id
export function apiSubscribeArticle(data) {
    return request({
        url: '/api/user/subscribe/article',
        method: 'post',
        data: data
    })
}

//获取单个广告
export function apiGetAdvOne(data) {
    return request({
        url: '/api/getAdvOne',
        method: 'post',
        data: data
    })
}

//获取广告列表
export function apiGetAdvList(data) {
    return request({
        url: '/api/getAdvList',
        method: 'post',
        data: data
    })
}


//评论列表 按文章 {"rootId":"bf-582","page":"1","limit":"20"} rootId:文章id
export function apiGetCommentsList(data) {
    return request({
        url: '/api/getCommentsList',
        method: 'post',
        data: data
    })
}


//评论列表 按父级 {"parentId":"63ba840f1ecf235a8df68e6a","page":"1","limit":"20"}  parentId:父级评论id
export function apiGetCommentsByParentId(data) {
    return request({
        url: '/api/getCommentsByParentId',
        method: 'post',
        data: data
    })
}

//评论- 点赞 {"id":"63ba81eae948b3512ed49d4a"}
export function apiGetCommentsZan(data) {
    return request({
        url: '/api/user/comments/zan',
        method: 'post',
        data: data
    })
}


//评论- 发布评论 {"id":"63ba81eae948b3512ed49d4a"}
export function apiSendComment(data) {
    return request({
        url: '/api/user/sendComment',
        method: 'post',
        data: data
    })
}


//通知- 通知列表 {"type":"1","nickName":"OnlyFans","page":"1","limit":"20"} type:1评论，3系统消息，为空为全部 ,nickName选填,按用户名查询
export function apiNoticeList(data) {
    return request({
        url: '/api/user/notice/list',
        method: 'post',
        data: data
    })
}

//通知- 未读数量 {} 
export function apiNoticeCount(data) {
    return request({
        url: '/api/user/notice/count',
        method: 'post',
        data: data
    })
}


//书签列表 {"type":"1","page":"1","limit":"20"}  type 1图文，2视频。
export function apiFavList(data) {
    return request({
        url: '/api/user/fav/list',
        method: 'post',
        data: data
    })
}









// //首页-轮播图
// export function getBanner(data) {
//     return request({
//         url: '/api/h5/getBanner',
//         method: 'post',
//         data: data
//     })
// }

// //首页-栏目列表
// export function getIndexCol(data) {
//     return request({
//         url: '/api/h5/getIndexCol',
//         method: 'post',
//         data: data
//     })
// }

// //视频-分类列表
// export function getVideoCategory(data) {
//     return request({
//         url: '/api/getVideoCategory',
//         method: 'post',
//         data: data
//     })
// }

// //视频-专题列表
// export function getVideoZtList(data) {
//     return request({
//         url: '/api/h5/getVideoZtList',
//         method: 'post',
//         data: data
//     })
// }

// //视频列表-首页栏目
// export function getVideoByIndexCol(data) {
//     return request({
//         url: '/api/h5/getVideoByIndexCol',
//         method: 'post',
//         data: data
//     })
// }

// //视频列表-按分类
// export function getVideoListByCategory(data) {
//     return request({
//         url: '/api/getVideoListByCategory',
//         method: 'post',
//         data: data
//     })
// }

// //视频列表-搜索
// export function searchVideo(data) {
//     return request({
//         url: '/api/searchVideo',
//         method: 'post',
//         data: data
//     })
// }

// //视频列表-按专题
// export function getVideoByZt(data) {
//     return request({
//         url: '/api/h5/getVideoByZt',
//         method: 'post',
//         data: data
//     })
// }

// //视频列表-按演员
// export function listVideoByActor(data) {
//     return request({
//         url: '/api/listVideoByActor',
//         method: 'post',
//         data: data
//     })
// }

// //视频列表-按id数组
// export function listVideoByIds(data) {
//     return request({
//         url: '/api/listVideoByIds',
//         method: 'post',
//         data: data
//     })
// }

// //其它-获取系统配置
// export function getConfig(data) {
//     return request({
//         url: '/api/getConfig',
//         method: 'post',
//         data: data
//     })
// }

// //其它-演员列表
// export function getActorList(data) {
//     return request({
//         url: '/api/getActorList',
//         method: 'post',
//         data: data
//     })
// }

// //其它-演员列表-ID数组
// export function listActorByIds(data) {
//     return request({
//         url: '/api/listActorByIds',
//         method: 'post',
//         data: data
//     })
// }

// //首页-获取标签
// export function getTag(data) {
//     return request({
//         url: '/api/h5/getTag',
//         method: 'post',
//         data: data
//     })
// }

// //视频详情
// export function getVideoInfo(data) {
//     return request({
//         url: '/api/getVideoInfo',
//         method: 'post',
//         data: data
//     })
// }

// //商品-VIP商品
// export function getVipItem(data) {
//     return request({
//         url: '/api/getVipItem',
//         method: 'post',
//         data: data
//     })
// }
// //商品-钻石
// export function getCoinItem(data) {
//     return request({
//         url: '/api/getCoinItem',
//         method: 'post',
//         data: data
//     })
// }

// //支付-支付通道
// export function getChannelList(data) {
//     return request({
//         url: '/api/getChannelList',
//         method: 'post',
//         data: data
//     })
// }

// //支付-状态查询
// export function checkOrderStatus(data) {
//     return request({
//         url: '/api/pay/checkOrderStatus',
//         method: 'post',
//         data: data
//     })
// }

// //支付-下单
// export function toPay(data) {
//     return request({
//         url: '/api/pay/toPay',
//         method: 'post',
//         data: data
//     })
// }

// //支付-下单

// export function getAppList(data) {
//     return request({
//         url: '/api/getAppList',
//         method: 'post',
//         data: data
//     })
// }
