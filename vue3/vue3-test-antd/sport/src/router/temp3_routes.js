export default {
    h5: [
        {
            path: '',
            redirect: '/index'
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: '首页',
            component: () => import('../views/h5/tmp3/Index.vue'),
            redirect: '/index/home',
            children: [
                // 首页
                {
                    path: '/index/home',
                    component: () => import('../views/h5/tmp3/Home'),
                    meta: {index: 1, showFootBet: true}
                },

                // 比赛
                {
                    path: '/index/matches',
                    component: () => import('../views/h5/tmp3/Matches')
                },

                // 投注记录
                {
                    path: '/index/betsRecord',
                    component: () => import('../views/h5/tmp3/BetsRecord')
                },

                // 赛果
                {
                    path: '/index/result',
                    component: () => import('../views/h5/tmp3/Result')
                },

                // 我的
                {
                    path: '/index/user',
                    component: () => import('../views/h5/tmp3/User')
                },
            ]
        },
        // 详情
        {
            path: '/bet-detail',
            component: () => import('../views/h5/tmp3/BetDetail')
        },
        {
            path: '/notice',
            component: () => import('../views/h5/tmp3/Notice')
        },
        {
            path: '/login',
            component: () => import('../views/h5/tmp3/Login')
        },
        { // 活动中心
            path: '/activity',
            component: () => import('../views/h5/tmp3/Activity'),
            meta: { index: 2, showFootBet: false}
        },
        {
            path: '/iframe',
            component: () => import('../views/h5/tmp3/Iframe')
        },
        { // 真人注单记录
            path: '/real-history-bet',
            component: () => import('../views/h5/tmp3/RealHistoryBet'),
            meta: { index: 2, showFootBet: false}
        },
        {
            path: '*',
            component: () => import('../common/NotFound')
        }
    ],
    pc: [
        {
            path: '',
            redirect: '/index'
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: '首页',
            component: () => import('../views/pc/tmp3/Index.vue'),
            redirect: '/index/home',
            children: [
                // 首页
                {
                    path: '/index/home',
                    component: () => import('../views/pc/tmp3/Home'),
                    meta: {index: 1, showFootBet: true}
                },

                // 投注记录
                {
                    path: '/index/betsRecord',
                    component: () => import('../views/pc/tmp3/BetsRecord')
                },

                // 赛果
                {
                    path: '/index/result',
                    component: () => import('../views/pc/tmp3/Result')
                },

                // 详情
                {
                    path: '/index/bet-detail',
                    component: () => import('../views/pc/tmp3/BetDetail')
                },

                // 公告
                {
                    path: '/index/notice',
                    component: () => import('../views/pc/tmp3/Notice')
                },
                // {
                //     path: '/index/betting',
                //     component: () => import('../views/pc/tmp3/Betting')
                // },
                {
                    path: '/index/activity',
                    component: () => import('../views/pc/tmp3/Activity'),
                    meta: { showFootBet: true }
                },
                {
                    path: '/index/real-games',
                    component: () => import('../views/pc/tmp3/RealGames')
                },
            ]
        },

        {
            path: '*',
            component: () => import('../common/NotFound')
        }
    ],
}
