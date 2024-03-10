import Cookie from 'js-cookie'

const state = {
    //游戏配置表是否加载完成
    initGame: 0,

    userInfo: {balance: '0.00'},

    userConfig: {},

    collectFootball: !!localStorage.getItem('football'),

    // 是否显示 去登录弹框
    showLogin: false,

    // 全局loading
    loading: {
        show: false,
        text: '加载中...'
    },

    appParams: {
        tmp: ''
    },

    bets: JSON.parse(sessionStorage.getItem('bets') || "{}"),

    homeGames: JSON.parse(localStorage.getItem('games')) || [],

    projectConfig: JSON.parse(sessionStorage.getItem('projectConfig')) || {},
}

export default state
