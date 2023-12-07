// appName: "青楼"
// bakDomain: "http://www.baidu.com"
// commentsKey: "QQ,微信,红包"    //屏蔽关键字
// defCoin: 0               //默认消费钻石
// feelCount: 10            //每日免费观看次数
// id: "1"
// informationApply: 0
// kfUrl: "https://yykf.xyd999.com/"      //客服地址
// mail: "paowang561@gmail.com"
// opGameUrl: "http://qp01api.lsxtdlzpt.com/api/"
// payNote: "1、游戏币 = 同等充值金额，\n2、提现金额需为100的倍数。"   //充值说明
// qpSyn: 1
// resServerUrl: "http://zyapi.xiaotianewx.com"
// resUrl: "http://qlres.zchancheng.com/"          //资源地址
// searchKeys: "足控,萝莉控,苍井空"            //热门关键字
// searchTags: "足控,萝莉控,苍井空"             //热门标签
// tgUrl: "https://www.baidu.com?code=$1"  //推广内容,${1}替换为用户字段:account
// uploadRes: "http://qlapi.zchancheng.com/api/upload/static/"
// userRegCount: 10

export default {
    namespaced: true,
    state: {
        keepAlive: [],
        config: {}
    },
    getters: {},
    mutations: {
        SET_KEEP_ALIVE: (state, payload) => {
            !state.keepAlive.includes(payload) && state.keepAlive.push(payload)
        },
        NO_KEEP_ALIVE: (state, payload) => {
            state.keepAlive = []
        },
        SET_CONFIG: (state, payload) => {
            state.config = payload
        }
    },
    actions: {}
}
