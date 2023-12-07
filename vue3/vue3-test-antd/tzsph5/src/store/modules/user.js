// userInfo
// id: '', //用户ID
// account: '', //帐号
// pwd: '',
// headUrl: '', //头像路径
// nickName: '', //昵称
// balance: 0, //余额
// sex: 0, //性别：0保密，1男，2女
// isUp: 0, //待定义
// status: 1,
// devType: 1,
// profit: '', //待定义
// devCode: '', //设备码
// lastLoginIp: '', //上次登录IP
// appId: '',
// lastLoginTime: '', //上次登录时间
// discount: 0, //待定义
// createTime: '', //注册日期
// version: 39,
// introduction: '', //个人简介
// isVip: false, //是否vip
// feel: 0 //今日已免费使用次数
import { getToken, removeToken } from '@/utils/auth'
const user = {
    namespaced: true,

    state: {
      userInfo:{},

    },

    mutations: {
        SET_USERINFO: (state, payload) => {
            state.userInfo = payload
        }
    },
    actions: {}
}

export default user
