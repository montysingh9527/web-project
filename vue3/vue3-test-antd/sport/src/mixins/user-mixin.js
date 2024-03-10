import { mapGetters, mapMutations} from "vuex"

export default {
    data() {
        return {
            type: 'account',
            action: {}
        }
    },

    computed: {
        ...mapGetters(['userInfo']),

        routes() {
            let tabItem = this.tabs.find(tab => tab.name === this.type)|| this.tabs[0]
            return tabItem.routes
        }
    },

    watch: {
        '$route'(route) {
            console.log('$route', route.query)
            this.type = route.query.type
            let a = route.query.action
            if (a && this.type) {
                let item = this.tabs.find(tab => tab.name === this.type) || this.tabs[0]
                this.action = item.routes.find(route => route.name === a)
            }
        }
    },

    methods: {
        handleTabClick(name) {
            this.action = {}
            this.$router.push(`/index/user?type=${name}`)
        },

        toDetail(item) {
            this.action = item
            this.$router.push(`/index/user?type=${this.type}&action=${item.name}`)
        },

        back() {
            this.action = {}
            this.$router.push(`/index/user?type=${this.type}`)
        },

        forgetFundPwd() {
            console.log('忘记取款密码')
            this.action = {
                title: '忘记取款密码',
                name: 'forgetFundPwd'
            }

          //  this.$router.push(`/index/user?type=${this.type}&action=forgetFundPwd`)
        }
    },

    created() {
        this.tabs = [
            // {title: '账户信息', name: 'account', routes: [
            //     {title: '个人资料', name: 'userInfo'},
            //     {title: '登录密码', name: 'loginPwd'},
            //     {title: '提款密码', name: 'fundPwd'},
            // ]},
            {title: '资金管理', name: 'funds', routes: [
                // {title: '存款', name: 'deposit'},
                // {title: '取款', name: 'withdraw'},
                {title: '额度转换', name: 'transform'},
                // {title: '提款账户', name: 'withdraw-account'}
            ]},
            {title: '历史记录', name: 'history', routes: [
                // {title: '体育未结算投注', name: 'sport-un-bets-history'},
                // {title: '体育已结算投注', name: 'sport-bets-history'},
                {title: '其他游戏投注', name: 'other-game-bets'},
                // {title: '存款记录', name: 'deposit-history'},
                // {title: '提款记录', name: 'withdraw-history'},
                // {title: '资金明细', name: 'property-detail'},
                // {title: '额度转换记录', name: 'transform-history'}
            ]},
        ]
    },

    beforeRouteEnter(to, from, next) {
        next(_this => {
            console.log('to.query', to.query)
            _this.type = to.query.type
            let a = to.query.action
            if (a && _this.type) {
                let item = _this.tabs.find(tab => tab.name === _this.type) || _this.tabs[0]
                _this.action = item.routes.find(route => route.name === a)
            }
        })
    }
}
