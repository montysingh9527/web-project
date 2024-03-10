import {submitBet} from '../axios/sport'
import {getUserBalance} from '../axios/user'
import {mapGetters, mapMutations} from 'vuex'
import {addClass, hasClass, removeClass} from "../assets/js/dom";
import {aliasStatus} from '../common/config'
import Event from "../event"

export default {
    data() {
        return {
            showBetDetail: false,
            activeNames: 'collapse',
            showPicker: false,
            betType: '标准式投注',
            amount: 0.00,
            columns: ['标准式投注'], // 'Banker式投注'
            loading: false,
            singleMoney: '',
            resultMoney: '',
            showCollapse: true,
            money_model: {},
            bankerBets: [] // banker式投注单
        }
    },

    computed: {
        ...mapGetters(['bets']),

        betKeys() {
            return Object.keys(this.bets);
        },

        betValues() {
            return Object.values(this.bets);
        },

        // 判断是否显示 复式的单式投注
        showSingleBet() {
            let bets = {}

            for (let key in this.bets) {
                let bet = this.bets[key]
                if (this.statusAlias(bet).state) {
                    bets[key] = {...bet}
                }
            }

            let betKeys = Object.keys(bets)

            // 注单数大于等于2 并且 同一场有效比赛只能有一个注单
            let newBetKeys = [...new Set(betKeys.map(key => {
                let str0 = key.split('-')[0]

                return str0
            }))]

            return betKeys.length >= 2 && newBetKeys.length === betKeys.length
        },

        btnText() {
            if (this.betValues.find(bet => String(bet.disable) === '1' || String(bet.is_show) === '0' || String(bet.is_suspend) === '1')) {
                return this.$t('js_bh')
            } else {
                return this.$t('t_z')
            }
        },

        betChanged() {
            const flag = this.betValues.find(bet => String(bet.disable) === '1' || String(bet.is_show) === '0' || String(bet.is_suspend) === '1')
            return {
                text: flag ? this.$t('js_bh') : this.$t('t_z'),
                isChange: flag,
            }
        }
    },

    watch: {
        showSingleBet() {
            this.resultMoney = ''
            this.singleMoney = ''
        },

        bets(newBets, oldBets) {
            let l1 = Object.keys(newBets).length
            let l2 = Object.keys(oldBets).length

            // 取消注单
            if (l1 < l2) {
                for (let k in oldBets) {
                    if (!newBets[k]) {
                        this.money_model = {...this.money_model, [k]: ''}
                    }
                }
            }

            // 注单状态变化 计算投注金额
            this.computeTotalMoney()
        }
    },

    methods: {
        ...mapMutations({
            updateUserInfo: 'UPDATE_USER_INFO',
            _updateBet: 'UPDATE_BET',
            _deleteBet: 'DELETE_BET'
        }),

        deleteBet(betKey) {
            // console.log('betKey===>', betKey)
            this.singleMoney = ''
            if (betKey === 'ALL') {
                this.resultMoney = ''
                this.singleMoney = ''
                this.money_model = {}
            }

            this._deleteBet(betKey)

            this.money_model = {...this.money_model, [betKey]: ''}

            if (!this.betKeys.length) {
                this.singleMoney = ''
                this.resultMoney = ''
                this.hideBetDialog()
            }
        },

        // 计算总金额
        computeTotalMoney() {

            this.amount = this.betValues.reduce((prev, v) => {
                if (this.statusAlias(v).state) {
                    prev += Number(v.money || 0)
                } else {
                    // console.log('计算金额时 清空无效状态注单金额', v)
                    // 计算金额时 清空无效状态注单金额
                    this.money_model = {...this.money_model, [v.signId]: ''}
                }

                return prev

            }, 0) + Number(this.singleMoney || 0)
        },

        // 单个注单金额变化
        _onChangeInput(bet) {
            if (bet) {
                this._updateBet({key: bet.signId, bet: {money: this.money_model[bet.signId]}})
            }

            this.computeTotalMoney()
        },

        // 独赢金额变化
        _onChangeResultMoney() {
            let obj = {}
            for (let key in this.bets) {
                obj[key] = this.resultMoney
                this._updateBet({key, bet: {money: this.resultMoney}})
            }

            this.money_model = {...obj}

            this.computeTotalMoney()
        },

        //  计算串关
        computedNum(bets) {
            const NUMS = [null, this.$t('n1'), this.$t('n2'), this.$t('n3'), this.$t('n4'), this.$t('n5'), this.$t('n6'), this.$t('n7'), this.$t('n8'), this.$t('n9'), this.$t('n10')];

            let n = 0

            bets.forEach(bet => {
                if (this.statusAlias(bet).state) {
                    n += 1
                }
            })

            return NUMS[n]
        },

        // 计算 几串几 赔率
        computedOdd(bets) {

            let odds = 1

            bets.forEach(bet => {
                if (this.statusAlias(bet).state) {
                    odds = odds * bet.odds
                }
            })

            odds = String(odds).split('.')
            return odds[0] + (odds[1] ? `.${odds[1].substr(0, 4)}` : '')
        },

        onConfirm(value) {
            this.betType = value;
            this.showPicker = false;
        },

        formatter(value) {
            let arr = value.split('.')
            if (arr.length > 1) {
                return arr[0] + '.' + arr[1].substr(0, 2)
            }

            return value
        },

        _submitBet() {
            if (!this.userInfo.userId) {
                Event.$emit('show-login')
                return Promise.reject(this.$t('login_f'))
            }
            // else if (Object.values(this.bets).find(bet => bet.disable === 1)) {
            //     return Promise.reject('您所选投注项的盘口、赔率或有效性已经产生变化!')
            // }

            let bets = Object.values(this.bets)
                .filter(bet => this.statusAlias(bet).state)
                .map(bet => ({
                    match_id: bet.match_id,
                    market_id: bet.market_id,
                    odds: bet.odds,
                    money: bet.money,
                    bet_info: bet.name
                }))

            let flag = bets.reduce((p, v) => p || !!v.money, false)

            if (!flag && !this.singleMoney) return Promise.reject(this.$t('b_p_e'));

            let params = {}

            // 单式注单金额
            if (this.singleMoney && this.showSingleBet) {
                params.bets = bets
                params.totalMoney = this.amount
                params.singleMoney = this.singleMoney
            } else {
                params.bets = bets.filter(bet => bet.money)
                params.totalMoney = this.amount
            }

            this.loading = true

            return new Promise((resolve, reject) => {
                submitBet(params)
                    .then(res => {
                        let msg = res.message
                        this.loading = false
                        if (res.code === 200) {

                            // 删除投注成功的注单
                            params.bets.forEach(bet => {
                                this.deleteBet(`${bet.match_id}-${bet.market_id}`)
                            })

                            resolve(msg)

                            // 刷新金额
                            getUserBalance()
                                .then(res => {
                                    this.updateUserInfo({balance: res})
                                })
                                .catch(err => console.log(err))
                        } else {
                            this.errorCodeManger(res.data)

                            this.computeTotalMoney()

                            reject(msg)
                        }
                    })
                    .catch(err => {
                        this.loading = false
                        reject(err)
                    })
            })
        },

        // 有效注单的判定条件
        statusAlias(bet = {}) {
            const {status, is_suspend, is_show, isFBD, limit_min, limit_max} = bet

            if (
                String(status) === '3' || // 已结束
                String(status) === '4' || // 推迟
                String(status) === '5' || // 已取消
                String(status) === '6' || // 退赛
                String(status) === '7' // 中断
            ) {
                return {
                    state: false,
                    msg: aliasStatus(status)
                }
            }

            if (String(is_suspend) === '1' || String(is_show) === '0') {
                return {
                    state: false,
                    msg: this.$t('y_f_p')
                }
            }

            // 如果是反波胆
            // if (isFBD == 1) {
            //     const money = this.money_model[bet.signId];
            //     return {
            //         state: money < limit_min || money > limit_max,
            //         msg: this.$t('e_d')
            //     }
            // }


            return {
                state: true,
                msg: ''
            }
        },

        // 统一处理 注单错误 编码
        errorCodeManger(data = {}) {
            const {error_code} = data
            if (error_code === 'market_change') {
                let changeMatchIds = data.markets

                changeMatchIds.forEach(market => {
                    let key = market.match_id + '-' + market.market_id

                    if (this.bets[key]) {
                        this._updateBet({key, bet: {disable: 1, ...market}})

                        if (String(market.is_suspend) === '1') {
                            this._updateBet({key, bet: {money: ''}})
                        }
                    }
                })

            } else if (error_code === 'error_match_status') {
                let match_id = String(data.match_id)
                let status = data.status

                for (let key in this.bets) {
                    if (this.bets[key].match_id === match_id) {

                        this._updateBet({key, bet: {status, money: ''}})
                    }
                }
            }
        },

        // 复式注单处理
        _changeMultipleBet(e, bet) {
            let el = e.target

            let flag = false
            if (hasClass(el, 'active')) {
                removeClass(el, 'active')
                flag = false
            } else {
                addClass(el, 'active')
                flag = true
            }

            this.bets[bet.signId].multipeActive = flag

            let bets = Object.values(this.bets)

            // console.log('bets----->', this.bets)
            let list = []
            // 最少一个B项 2个非B项

            let BNum = bets.filter(bet => bet.multipeActive === true).length
            let noBNum = bets.length - BNum

            // console.log('B项=', BNum)
            // console.log('非B项=', noBNum)
            if (BNum >= 1 && noBNum >= 2) {
                let i = noBNum
                while (i > 0) {
                    list.push({
                        name: `${BNum}B + ${i}/${noBNum}`,
                        betNum: noBNum - i + 1,
                        money: ''
                    })
                    i--
                }
            }

            this.bankerBets = list

            // console.log('list===', list)

            sessionStorage.setItem('bet', JSON.stringify(this.bets))
        },

        hideBetDialog() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }

            this.timer = setTimeout(() => {
                this.showBetDetail = false
            }, 300)
        }
    },

    created() {
        this.timer = null
    }
}
