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
            path: './',
            redirect: '/index'
        },
        {
            path: '/index',
            name: '首页',
            component: () => import('../views/h5/tmp2/Index.vue'),
            redirect: '/index/home',
            children: [
                /*首页*/
                {
                    path: '/index/home',
                    component: () => import('../views/h5/tmp2/Home'),
                    meta: { index: 1, showFootBet: true }
                },
                /*足球*/
                {
                    path: '/index/sport',
                    component: () => import('../views/h5/tmp2/Sport'),
                    meta: { index: 1, showFootBet: true }
                },
                /*我的注单*/
                {
                    path: '/index/my-bet',
                    component: () => import('../views/h5/tmp2/MyBet'),
                    meta: { index: 1  }
                },
                /*滚球盘*/
                {
                    path: '/index/bet-grounder',
                    component: () => import('../views/h5/tmp2/BetGrounder'),
                    meta: { index: 1, showFootBet: true}
                },
                /*早盘*/
                {
                    path: '/index/bet-upcoming',
                    component: () => import('../views/h5/tmp2/Upcoming'),
                    meta: { index: 1, showFootBet: true }
                },
                /*早盘*/
                {
                    path: '/index/bet-matches',
                    component: () => import('../views/h5/tmp2/Matches'),
                    meta: { index: 1, showFootBet: true }
                },
                /*比赛详情*/
                {
                    path: '/index/bet-detail',
                    component: () => import('../views/h5/tmp2/BetDetail'),
                    meta: { index: 1, showFootBet: true }
                },
                /*我的收藏*/
                {
                    path: '/index/my-favorite',
                    component: () => import('../views/h5/tmp2/MyFavorite'),
                    meta: { index: 1, showFootBet: true }
                },
                /*赛果*/
                { // 今日|早盘|滚球
                    path: '/index/result',
                    component: () => import('../views/h5/tmp2/Result'),
                    meta: { index: 1 }
                },
                { // 公告
                    path: '/index/notice',
                    component: () => import('../views/h5/tmp2/Notice'),
                    meta: { index: 1 }
                },
                { // 真人电子游戏
                    path: '/real-games',
                    component: () => import('../views/h5/tmp2/HomeGames'),
                    meta: { index: 1 }
                },
                { // 真人电子游戏 详情
                    path: '/real-game-detail',
                    component: () => import('../views/h5/tmp2/RealGameDetail'),
                    meta: { index: 1 }
                },
                { // 彩票
                    path: '/lottery',
                    component: () => import('../views/h5/tmp2/Lottery'),
                    meta: { index: 2, showFootBet: false}
                },
            ],
            meta: { index: 1 }
        },
        {
            path: '/search',
            component: () => import('../views/h5/tmp2/Search'),
            meta: { index: 2, showFootBet: true}
        },
        {
            path: '/funds',
            component: () => import('../views/h5/tmp2/Funds'),
            meta: { index: 2, showFootBet: true}
        },
        {
            path: '/deposit',
            component: () => import('../views/h5/tmp2/Deposit'),
            meta: { index: 2, showFootBet: true}
        },
        { // 资金管理
            path: '/account',
            component: () => import('../views/h5/tmp2/Account'),
            meta: { index: 2, showFootBet: false}
        },
        { // 活动中心
            path: '/activity',
            component: () => import('../views/h5/tmp2/Activity'),
            meta: { index: 2, showFootBet: false}
        },
        { // 会员中心
            path: '/user',
            component: () => import('../views/h5/tmp2/User'),
            meta: { index: 2, showFootBet: false}
        },
        { // 额度转换
            path: '/realtrans',
            component: () => import('../views/h5/tmp2/Realtrans'),
            meta: { index: 2, showFootBet: false}
        },
        { // 额度转换
            path: '/lottery-detail',
            component: () => import('../views/h5/tmp2/LotteryDetail'),
            meta: { index: 2, showFootBet: false}
        },
        { // 真人注单记录
            path: '/real-history-bet',
            component: () => import('../views/h5/tmp2/RealHistoryBet'),
            meta: { index: 2, showFootBet: false}
        },
        {
            path: '/help',
            component: () => import('../views/h5/tmp2/Help'),
            meta: { index: 2, showFootBet: true}
        },
        {
            path: '/register',
            component: () => import('../views/h5/tmp2/Register'),
            meta: { showFootBet: false}
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
            component: () => import('../views/pc/tmp2/Index'),
            redirect: '/index/home',
            children: [
                /*足球首页*/
                {
                    path: '/index/home',
                    component: () => import('../views/pc/tmp2/Home'),
                    meta: { showFootBet: true }
                },
                /*足球赛果*/
                {
                    path: '/index/result',
                    component: () => import('../views/pc/tmp2/Result')
                },
                /*公告*/
                {
                    path: '/index/notice',
                    component: () => import('../views/pc/tmp2/Notice')
                },
                /*早盘*/
                {
                    path: '/index/bet-upcoming',
                    component: () => import('../views/pc/tmp2/BetUpcoming'),
                    meta: { showFootBet: true }
                },
                /*滚球*/
                {
                    path: '/index/bet-grounder',
                    component: () => import('../views/pc/tmp2/BetGround'),
                    meta: { showFootBet: true }
                },
                /*赛事*/
                {
                    path: '/index/bet-matches',
                    component: () => import('../views/pc/tmp2/Matches'),
                    meta: { showFootBet: true }
                },
                /*我的收藏*/
                {
                    path: '/index/my-favorite',
                    component: () => import('../views/pc/tmp2/MyFavorite'),
                    meta: { showFootBet: true }
                },
                /*我的注单*/
                {
                    path: '/index/my-bet',
                    component: () => import('../views/pc/tmp2/MyBet')
                },
                /*足球盘*/
                {
                    path: '/index/sport',
                    component: () => import('../views/pc/tmp2/Sport'),
                    meta: { showFootBet: true }
                },
                /*详情*/
                {
                    path: '/index/bet-detail',
                    component: () => import('../views/pc/tmp2/BetDetail'),
                    meta: { showFootBet: true, showLeftNav: false }
                },
                /*真人游戏*/
                {
                    path: '/index/real-games',
                    component: () => import('../views/pc/tmp2/HomeRealGames'),
                    meta: { showFootBet: true }
                },
                /*棋牌游戏*/
                {
                    path: '/index/real-games-detail',
                    component: () => import('../views/pc/tmp2/RealGameDetail'),
                    meta: { showFootBet: true }
                },
                /*优惠活动*/
                {
                    path: '/index/activity',
                    component: () => import('../views/pc/tmp2/Activity'),
                    meta: { showFootBet: true }
                },

                /*充钱*/
                // {
                // 	path: '/index/user',
                // 	component: () => import('../views/pc/tmp2/User'),
                // 	meta: { showFootBet: true }
                // },
                // /*资金管理*/
                // {
                // 	path: '/index/funds',
                // 	component: () => import('../views/pc/tmp2/Funds'),
                // 	meta: { showFootBet: true }
                // },
                // /*帮助*/
                // {
                // 	path: '/index/help',
                // 	component: () => import('../views/pc/tmp2/Help'),
                // 	meta: { showFootBet: true }
                // },
                // /*账户管理*/
                // {
                // 	path: '/index/account',
                // 	component: () => import('../views/pc/tmp2/Account'),
                // 	meta: { showFootBet: true }
                // },
            ],
        },
        /*搜索*/
        {
            path: '/index/search',
            component: () => import('../views/pc/tmp2/Search'),
            meta: { showFootBet: true }
        },
        {
            path: '*',
            component: () => import('../common/NotFound')
        }
    ]
}