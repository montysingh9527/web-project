<template>
    <div class="home">
        <header class="marquess-content flex-middle-only" @click="jumpNotice">
            <div class="flex-middle" style="padding: 0 12px;">
                <i class="icon_base icon_notice"></i>
            </div>

            <marquee-notices class="lh-30 flex-1 fs12 cursor" :text="scrollNotices" :textColor="'#cecece'"/>
        </header>

        <van-row type="flex" class="bg-tabs over-hidden full-width" style="height: 46px;">
            <van-col :span="8" :offset="8" class="flex-middle full-height">
                <van-tabs v-model="category"
                          :border="false"
                          :swipe-threshold="6"
                          background="transparent"
                          color="#fac200"
                          title-inactive-color="#a39fb8"
                          title-active-color="#fff"
                          class="full-width"
                          @click="handleClick">
                    <van-tab :name="tab.category" v-for="tab of tabs" :key="tab.category">
                        <span slot="title" class="fs14">{{tab.alias}}</span>
                    </van-tab>
                </van-tabs>
            </van-col>

            <van-col :span="8" class="flex-middle-only flex-end" style="height: 100%;">
                <div class="balance flex-between white">
                    <span class="fs12 m-r8" style="opacity: 0.5;">余额</span>
                    <span>¥&nbsp;{{userInfo.balance}}</span>
                </div>
            </van-col>
        </van-row>

        <div class="content">
            <Menu :sports="sports" :show-count="category !== 'result'" @select="_select"/>

            <section class="infinite-list scroll-y"
                     id="main-content"
                     :style="{height: contentHeight + 'px'}"
            >
                <transition :enter-active-class="enterTransition"
                            :leave-active-class="leaveTransition"
                            mode="out-in">
                    <keep-alive>
                        <router-view style="animation-duration: 150ms;" class="wrap-router"/>
                    </keep-alive>
                </transition>
            </section>

            <!--右侧投注单-->
            <div class="re over-hidden right-bet-content" v-if="filterShowBetRouter" :style="{height: contentHeight + 'px'}">
                <div class="bet-container-title over-hidden flex-between"
                     style="height: 44px;">
                    <div class="flex-middle-only">
                        <p class="fs14 dark bet-num flex-middle">{{betKeys.length}}</p>
                        <span class="white fs12" style="margin-left: 12px;">投注单</span>
                    </div>
                </div>

                <div v-if="betKeys.length">
                    <div class="bet-body-detail flex-end"
                         :style="{height: contentHeight - 136 + 'px'}"
                         style="flex-direction: column;">
                        <ul class="top-line under-line flex-1 hide-scroll-bar" style="overflow-y: scroll;padding: 0 16px;">

                            <!--class="disabled" 您所选投注项的盘口、赔率或有效性已经产生变化-->
                            <li class="normal-bet-item re" v-for="bet of betValues"
                                :key="bet.signId">

                                <div class="dark flex-between re">
                                    <span class="collapse-line ab-middle-y"
                                          :style="{backgroundColor: String(bet.disable) === '1' && '#F13F40'}"
                                          style="left: -16px;height: 14px;"></span>
                                    <div>
                                        <span class="m-r8">{{bet.title}}</span>
                                    </div>
                                    <p class="fs12 right bet-odd"
                                       :style="{color: String(bet.disable) === '1' && '#F13F40'}"
                                       style="width: 60px">@{{bet.odds}}</p>
                                </div>

                                <div class="fs10 m-t4 m-b8">{{bet.market_name}}</div>

                                <div class="dark-light">
                                    <span class="fs10 cles-1">{{bet.home_name}} VS {{bet.away_name}}</span>
                                </div>

                                <div class="flex-between bet-money-box">

                                    <van-field class="fs12 bet-money-input bg-white"
                                           v-if="statusAlias(bet).state"
                                           @input="_onChangeInput(bet)"
                                           :formatter="formatter"
                                           maxlength="8"
                                           v-model="money_model[bet.signId]" type="number" placeholder="本金"/>
                                    <div v-else>
                                        <span class="fs12 m-r8">{{statusAlias(bet).msg}}</span>
                                        <i class="icon_base icon_lock"></i>
                                    </div>

                                    <div class="flex-middle-only"
                                         @click="deleteBet(bet.signId)"
                                         style="height:40px;">
                                        <i class="icon_base delete"></i>
                                    </div>
                                    <!--<div class="bet-B m-l16 flex-middle dark-light active">B</div>-->
                                </div>
                            </li>
                        </ul>

                        <div class="bg-white">
                            <span class="fs10 origin-center dark-light lh-25"
                                  v-if="betValues.find(bet => String(bet.disable) === '1' || String(bet.is_show)=== '0' || String(bet.is_suspend) === '1')"
                            >您所投注项的盘口、赔率或有效性已产生变化</span>
                            <div v-if="showSingleBet">
                                <div class="flex-between" >
                                    <div class="flex-middle-only flex-1" style="padding: 8px 0;" @click="_toggleCollapse">
                                        <i class="icon-base m-l16" :class="showCollapse ? 'icon_shouqi' : 'icon_zhankai'"></i>
                                        <div class="m-l10">
                                            <p class="dark fs12">独赢</p>
                                            <span class="fs10 dark-light">{{betKeys.length}}X</span>
                                        </div>
                                    </div>

                                    <van-field class="m-r16 fs12 bet-money-input right"
                                           v-model="resultMoney"
                                           maxlength="8"
                                           :formatter="formatter"
                                           @input="_onChangeResultMoney"
                                           type="number" placeholder="本金"/>
                                </div>

                                <div class="flex-between over-hidden"
                                     style="transition: height .15s linear"
                                     :style="{height: showCollapse ? '50px' : '0'}">
                                    <div class="flex-middle-only flex-1">
                                        <div style="margin-left: 39px;">
                                            <p class="dark fs12">{{computedNum(betValues)}}串一</p>
                                            <span class="fs10 dark-light">@ {{computedOdd(betValues)}}</span>
                                        </div>
                                    </div>

                                    <van-field class="m-r16 fs12 bet-money-input right"
                                               v-model="singleMoney"
                                               maxlength="8"
                                               :formatter="formatter"
                                               @input="_onChangeInput"
                                               type="number" placeholder="本金"/>
                                </div>
                            </div>
                            <div v-else class="flex-between p-t8 p-b8">
                                <div class="flex-middle-only flex-1" style="padding: 8px 0;" @click="_toggleCollapse">
                                    <div class="m-l10">
                                        <p class="dark fs12">独赢</p>
<!--                                        <span class="fs10 dark-light">{{betKeys.length}}X</span>-->
                                    </div>
                                </div>

                                <van-field class="m-r16 fs12 bet-money-input right"
                                           v-model="resultMoney"
                                           maxlength="8"
                                           :formatter="formatter"
                                           @input="_onChangeResultMoney"
                                           type="number" placeholder="本金"/>
                            </div>
                        </div>
                    </div>

                    <div class="bet-footer-submit bg-white" style="border-radius: 0 0 8px 8px;">
                        <button class="submit-bet block btn fs12"
                                   :loading="loading"
                                   @click="submitBet"
                                   :class="Number(amount) > 0 ? 'active' : ''"
                                   style="width:100%;">
                            {{loading ? '投注确认中...' : btnText}} <span v-if="!loading" class="fs14">¥ {{amount}}</span>
                        </button>
                        <button type="text" style="width:100%;margin-left: 0;color: #F56C6C;padding:0.5rem 0;" class="fs12 block center"
                                @click="deleteBet('ALL')"
                        >全部删除
                        </button>
                    </div>
                </div>
                <div v-else class="full-height full-width" style="background-color: #F6F5FA;">
                    <div class="ab-middle" style="width:80%;color:#888;">
                        <img class="block" style="margin: 10px auto 30px;" :src="require('../../../assets/images/default/empty.png')" alt="">
                        <p class="center">空空如也</p>
                        <p class="center">快去左侧添加你中意的项目吧</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MarqueeNotices from "../../../common/Marquee";
    import indexMixin from '../../../mixins/index-mixin'
    import Menu from '../../../components/aside-menu/AsideMenu'
    import {getScrollNotices, getSportCategory} from '../../../axios/sport'
    import {mapGetters} from 'vuex'
    import { sports } from "../../../common/config"

    let arr = [
        {name: 'today', category: 'today', alias: '今日'},
        {name: 'upcoming', category: 'upcoming', alias: '早盘'},
        // {name: 'champion', alias: '冠军'},
        {name: 'grounder', category: 'inplay', alias: '滚球'},
        {name: 'favorite', category: 'favorite', alias: '收藏'},
        {name: 'result', category: 'result', alias: '赛果'}
    ]

    // 缓存选中tab
    export default {
        mixins: [indexMixin],
        data() {
            return {
                sports: [],
                sport: 0,
                category: 'today',
                selectPath: 'football',
                enterTransition: "animated fadeIn",
                leaveTransition: "animated fadeOut",
                contentHeight: window.innerHeight - 45 - 25,

                // drawerVisible: false,
                // visible_popover: false,
                scrollNotices: ''
            }
        },

        watch: {
            '$route'(to, from) {
                this._initialState(to)
            }
        },

        computed: {
            ...mapGetters(['userInfo']),
            filterShowBetRouter() {
                const disableRoutes = ['/result', '/index/forms', '/index/unBet', '/index/notice']

                const path = this.$route.path

                return !disableRoutes.includes(path)
            }
        },

        methods: {
            _initialState(route = this.$route) {
                let query = route.query
                this.category = query.category || 'today'
                this.sport = Number(query.sport) || 0

                if (route.path.indexOf('/result') > -1) {
                    this.category = 'result'
                }

                this._getSportCategory(this.category)
            },

            _toggleCollapse() {
                this.showCollapse = !this.showCollapse
            },

            handleClick(name) {
                if (name === 'result') {
                    this.$router.push({path: `/result`, query: {sport: this.sport}})
                    return;
                }

                const query = {
                    category: this.category,
                    sport: this.sport
                }

                this.$router.push({path: '/index/sport', query})
            },

            _select(data) {
                console.log('_select', data);
                let { sport } = data

                this.sport = sport

                if (this.category === 'result') {
                    this.$router.push({path: `/result`, query: {sport}})
                } else {
                    this.$router.push({path: `/index/sport`, query: {category: this.category, sport}})
                }
            },

            submitBet() {
                this._submitBet()
                    .then(msg => {
                        this.$toast({
                            message: msg,
                            type: 'success'
                        });
                    })
                    .catch(msg => {
                        this.$toast({
                            message: msg,
                            type: 'error'
                        })
                    })
            },

            jumpNotice() {
                this.$router.push('/index/notice')
            },

            _getSportCategory(category = 'today') {
                getSportCategory(category)
                    .then(res => {
                        if (res.code === 200) {
                            let total = 0
                            let menus = sports.map(item => {
                                item.count = res.data.find(c => Number(c.id) === Number(item.id)).count
                                total += Number(item.count)
                                return item
                            })

                            menus.unshift({text: '全部', count: total, id: 0,})

                            this.sports = menus
                        }
                    })
            },

            _getScrollNotices() {
                getScrollNotices({client: 'pc'})
                    .then(res => {
                        if (res.code === 200) {
                            this.scrollNotices = ''

                            res.data.forEach(notice => {
                                this.scrollNotices += notice.content + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                            })
                        }
                    })
            }
        },

        components: {
            Menu,
            MarqueeNotices
        },

        mounted() {
            this.$nextTick(() => {
                this._initialState(this.$route)
                this._getScrollNotices()

                window.addEventListener('resize', () => {
                    let dom = document.getElementById('main-content')

                    this.contentHeight = window.innerHeight - dom.getBoundingClientRect().top

                    console.log('this.contentHeight', this.contentHeight)
                })
            })
        },

        created() {
            this.tabs = arr
        }
    }
</script>
<style type="text/css" lang="less">
    .home {
        height: 100%;
        display: flex;
        flex-direction: column;

        .marquess-content {
            height: 28px;
            background: #19162D;
        }

        .bg-tabs {
            background: #2B2745;
            flex: 0 0 auto;
        }

        .balance {
            height: 28px;
            /*width: 128px;*/
            background: #121021;
            border-radius: 18px;
            margin-right: 16px;
            padding: 0 12px;
        }

        .content {
            display: flex;
            flex: 0 0 1;
            /*margin: 0 auto;*/
            min-width: 990px;
            max-width: 100%;
            height: 100%;

            > section {
                flex: 1 1 auto;
                height: 100%;
                min-width: 990px;
                padding: 10px 10px 0 10px;
                background-color: #e6e7f3;

                &::-webkit-scrollbar {
                    width: 0;
                }
            }
        }

        .bet-container {
            /*min-height: 44px;*/
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            width: 475px;
            /*background: #2B2745;*/
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.50);
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }

        .bet-container-title {
            transition: height .2s linear;
            height: 44px;
            padding: 0 16px;
            background: #2B2745;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;

            .bet-num {
                height: 20px;
                width: 20px;
                border-radius: 10px;
                background: #FAC200;
            }
        }

        .right-bet-content {
            width: 260px;
            padding: 10px 10px 10px 0;
            flex-shrink: 0;
            background-color: #e6e7f3;
        }

        .bet-body-detail {
            background: #F6F5FA;

            .el-collapse-item__header {
                height: auto;
                line-height: normal;
            }

            .el-collapse-item__arrow {
                position: absolute;
                left: 98px;
                margin-top: 8px;
                color: #888;
                transform: rotate(90deg);

                &.is-active {
                    transform: rotate(-90deg);
                }
            }

            .el-collapse-item__content {
                padding-bottom: 0;
            }
        }

        .normal-bet-item {
            border-bottom: 1px solid #e7e6f3;
            /*height: 65px;*/
            padding: 8px 0;

            .bet-odd {
                width: 60px;
            }

            &.disabled {
                .bet-odd {
                    color: #F13F40;
                }

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    background: #F13F40;
                    border-radius: 2px;
                    width: 4px;
                    height: 50px;
                    left: -16px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            &:last-child {
                border: none;
            }
        }

        .normal-h40-item {
            height: 40px;
            /*padding-left: 26px;*/
            border-bottom: 1px solid #E6E7F3;
            /*padding: 5px 0;*/
            &:last-child {
                border-bottom: none;
            }
        }

        .bet-money-input {
            background: #FFFFFF;
            border: 1px solid #E6E7F3;
            border-radius: 2px;
            width: 110px;
            height: 28px;
            padding: 0 3px;
            &.right {
                input {
                    text-align: right!important;
                }
                input::placeholder {
                    text-align: right!important;
                }
            }
            input {
                padding: 0 3px;
                line-height: 28px;
            }

            input::placeholder {
                line-height: 28px;
                font-size: 10px;
                color: #888888;
                letter-spacing: 0;
                transform: scale(0.83);
            }
        }

        .bet-money-box {

            .bet-B {
                background: #FFFFFF;
                border: 1px solid #E6E7F3;
                border-radius: 2px;
                height: 41px;
                width: 41px;

                &.active {
                    background: #FAC200;
                    color: #2E2A44 !important;
                }
            }
        }

        .bet-footer-submit {
            padding: 0px 16px;

            .delete-all {
                width: 80px;
                height: 38px;
                background: #F6F5FA;
                border: 1px solid #E6E7F3;
                border-radius: 4px;
            }

            .submit-bet {
                background: #F6F5FA;
                border-radius: 4px;
                height: 38px;
                color: rgba(46, 42, 68, 0.30);

                &.active {
                    background: #FAC200;
                    color: #2E2A44;

                    > span {
                        color: #000;
                    }
                }
            }
        }

        .drawer-content {
            width: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
        }

        .carousel-notices img {
            height: 20px;
        }
    }
</style>
