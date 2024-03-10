import * as types from './mutation-type'
import { formatText } from '../assets/js/util'
export default {
    // 全局loading
    [types.UPDATE_LOADING](state, {show = false, text = '加载中...'} = {}) {
        state.loading.show = show
        state.loading.text = text
    },

    //更新userInfo
    [types.UPDATE_USER_INFO](state, params) {
        if (Object.keys(params).length) {
            if (params.balance) {
                params.balance = formatText(params.balance)
            }

            state.userInfo = {...state.userInfo, ...params}
        } else {
            state.userInfo = {}
        }
    },

    //更新登录状态
    [types.UPDATE_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    //更新游客登录状态
    [types.UPDATE_GUEST_STATUS](state, status) {
        state.guestStatus = status
    },

    // 更新 注单
    [types.UPDATE_BET](state, data = {}) {
        const {key, bet = {}} = data

        if (!key) return;

        state.bets[key] = {...(state.bets[key] || {}), ...bet}

        state.bets = {...state.bets}

        sessionStorage.setItem('bets', JSON.stringify(state.bets))
    },

    // 删除注单
    [types.DELETE_BET](state, key) {

        if (key === 'ALL') {
            state.bets = {}

            sessionStorage.setItem('bets', JSON.stringify(state.bets))
            return;
        }

        if (!state.bets[key]) return;

        let newObj = {}

        for (let k in state.bets) {
            if (key !== k) {
                newObj[k] = state.bets[k]
            }
        }

        state.bets = newObj

        sessionStorage.setItem('bets', JSON.stringify(state.bets))
    },

    [types.SET_APP_PARAMS](state, params) {
        state.appParams = {...params}
    },

    [types.UPDATE_COLLECT_FOOTBALL](state) {
        let flag = localStorage.getItem('football')

        if (flag) {
            state.collectFootball = false
            localStorage.removeItem('football')
        } else {
            state.collectFootball = true
            localStorage.setItem('football', '1')
        }

    },

    [types.UPDATE_HOME_GAMES](state, list) {
        state.homeGames = list
    },

    [types.UPDATE_PROJECT_CONFIG](state, projectConfig) {
        const currency = projectConfig.currency
        let siteCurrency = '¥'
        let siteCurrency1 = '元'
        if (currency === 'CNY') {
            siteCurrency = '¥';   //￥
            siteCurrency1 = '元';
        } else if (currency == 'USD') {
            siteCurrency = '$';
            siteCurrency1 = '$';
        } else if (currency == 'VND') {
            siteCurrency = '₫';
            siteCurrency1 = '₫';
        } else if (currency == 'INR') {
            siteCurrency = '₹';
            siteCurrency1 = '₹';
        } else if (currency == 'THB') {
            siteCurrency = '฿';
            siteCurrency1 = '฿';
        } else if (currency == 'MYR') {
            siteCurrency = 'RM';
            siteCurrency1 = 'RM';
        } else if (currency == 'IDR') {
            siteCurrency = 'IDR';
            siteCurrency1 = 'IDR';
        } else if (currency == 'JPY') {
            siteCurrency = '¥';
        }

        state.projectConfig = projectConfig
        state.projectConfig.siteCurrency = siteCurrency
        state.projectConfig.siteCurrency1 = siteCurrency1
    },

    [types.UPDATE_USERINFO_STATUS](state, bool) {
        state.userInfoStatus = bool;
    }
}
