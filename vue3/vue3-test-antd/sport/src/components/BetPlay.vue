<template>
    <div id="scroll-content" style="background-color: #E6E7F3;border-radius: 8px 8px 0 0;">
        <scroll :scroll-height="scrollHeight"
                :hidden="false"
                :radius="8"
                :bg-color="'transparent'">
            <div class="p-l5 p-r5" style="background-color: #E6E7F3;border-radius: 8px 8px 0 0;">
                <div class="bet-detail-content-header flex-end">
                    <div class="flex-middle-only m-r20" v-if="category === 'upcoming'">
                        <span class="m-r8 fs12">日期: </span>
                        <div class="flex-middle country-box bg-white"
                             @click="_showCalendar">
                            <span class="m-r8 fs12">{{format(theDate, 'MM-dd')}}</span>
                            <i class="icon_triangle m-t4" style="border-top-color: #2B2745;"></i>
                        </div>
                    </div>

                    <div class="flex-middle-only p-r16">
                        <span class="m-r8 fs12">地区: </span>
                        <div class="flex-middle country-box bg-white"
                             @click="_showPicker">
                            <span class="m-r8 fs12">{{country.name}}</span>
                            <i class="icon_triangle m-t4" style="border-top-color: #2B2745;"></i>
                        </div>
                    </div>
                </div>

                <div class="ab-middle fs12 dark-light full-width center"
                     v-if="datas.length === 0 && !loading"
                     style="margin-top: 100px;">
                    <span>暂无数据!</span>
                </div>

                <div class="full-width full-height flex-middle" style="height:3rem;" v-if="loading">
                    <van-loading size="24px">数据加载中...</van-loading>
                </div>

                <van-collapse v-model="activeCollapses" @change="_changeCollapse">
                    <van-collapse-item :name="`${league.id}`" class="m-b8" v-for="league of datas" :key="league.id">
                        <template #title>
                            <div class="flex-middle-only lh-40 collapse-item-title re">
                                <div v-lazy-container="{ selector: 'img'}">
                                    <img style="width:0.6rem;height:0.6rem;margin: 0 0.2rem 0 0.4rem"
                                         :data-error="league.sport === '1' ? footballIcon : basketballIcon"
                                         :data-src="league.logo"/>
                                </div>
                                <span class="fs12 dark m-r8">{{league.name}}</span>
                                <i class="icon_base collect-tmp1"
                                   :id="`favorite_${league.id}`"
                                   @click.stop="_favorite(`favorite_${league.id}`, league, '1')"
                                   :class="league.is_favorite === 1 ? 'active' : ''"></i>
                            </div>
                        </template>

                        <div v-for="(match, k) in league.matches" :key="match.id">
                            <van-row v-if="k === 0" class="lh-25">
                                <van-col :span="13" :offset="11">
                                    <van-row class="dark">
                                        <van-col :span="(24/ navs[league.sport].length)" class="center"
                                                 v-for="nav of navs[league.sport]"
                                                 :key="nav">
                                            <span class="fs10 origin-center">{{nav}}</span>
                                        </van-col>
                                    </van-row>
                                </van-col>
                            </van-row>

                            <van-row class="row-bottom-line" style="height: 5.3rem">
                                <van-col :span="11" class="full-height re" @click="toTheGame(match, league)">
                                    <div class="fs12 dark">
                                        <p class="flex-between" style="padding-right: 0.6rem">
                                            <span class="cles-1">{{match.home_name}}</span>
                                            <span>{{match.ss ? match.ss.split('-')[0]:''}}</span>
                                        </p>
                                        <p class="flex-between" style="padding-right: 0.6rem">
                                            <span class="cles-1">{{match.away_name}}</span>
                                            <span>{{match.ss ? match.ss.split('-')[1]:''}}</span>
                                        </p>

                                        <i class="icon_base collect-tmp1 m-t8"
                                           :id="`favorite_${match.id}`"
                                           @click.stop="_favorite(`favorite_${match.id}`, league, '0')"
                                           :class="match.is_favorite === 1 ? 'active' : ''"></i>
                                    </div>

                                    <div class="ab" style="bottom:0;">
                                        <p class="lh-20">
                                            <!--<i class="icon_base icon-animate-live m-r5"></i>-->
                                            <!--<i class="icon_base icon-video-live"></i>-->
                                        </p>

                                        <p class="dark-light lh-20">
                                        <span class="fs10" v-if="match.timer && match.status === '1'">
                                            {{match.timer.period || '--:--'}}
                                            <count-down
                                                    :type="match.sport === '1' ? 'up' : 'down'"
                                                    :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                                                    :suspend="match.timer.tt"/>
                                        </span>
                                            <span v-else class="fs10">
                                            {{format(match.start_time*1000, 'MM月dd日')}}
                                            {{format(match.start_time*1000, 'hh:mm')}}
                                        </span>

                                            <span class="fs10">{{match.market_group_count}}+</span>
                                            <span class="fs10 m-l5"> > </span>
                                        </p>
                                    </div>
                                </van-col>
                                <van-col :span="13">
                                    <van-row gutter="2" style="height: 5.3rem">
                                        <van-col :span="8" class="full-height flex-column flex-between" v-for="code of market_group_codes[match.sport]" :key="code">

                                            <div class="flex-1 full-width full-height flex-middle m-b2" v-for="k of match.market_groups[code].navs" :key="value">
                                                <div class="bg-gray flex-1 flex-middle full-height m-b2" v-if="!match.market_groups[code].name"></div>

                                                <Play class="flex-middle flex-column"
                                                      v-else-if="match.market_groups[code][k] && match.market_groups[code][k].is_show === '1' && match.market_groups[code][k].is_suspend === '0'"
                                                      :show-handicap="true"
                                                      :play="match.market_groups[code][k]"
                                                      :group="match.market_groups[code]"
                                                      :match="match"
                                                >
                                                    <span slot="alias" class="fs10" v-if="code === 'basketball_game_lines_total' || code === 'total_points'">
                                                        {{k === '1' ? '高于' : '低于'}}
                                                    </span>
                                                </Play>

                                                <div v-else class="bg-gray flex-1 flex-middle full-height m-b2">
                                                    <i class="icon_base icon_lock"></i>
                                                </div>
                                            </div>
                                        </van-col>
                                    </van-row>
                                </van-col>
                            </van-row>

                            <div v-if="league.matches.length - 1 !== k"
                                 class="m-t8 m-b8"
                                 style="height:1px;background: #E6E7F3;"></div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </scroll>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Scroll from "../common/Scroll";
    import LoadImage from "../common/LoadImage";
    import chooseBets from '../mixins/choose-bets'
    import {format} from "../assets/js/util"
    import {addClass, hasClass, removeClass} from "../assets/js/dom";
    import {favorite} from '../axios/sport'
    import Play from "../components/Play";
    import CountDown from "../common/CountDown";

    export default {
        mixins: [chooseBets],
        data() {
            return {
                scrollHeight: 0,
                activeCollapses: [],
            }
        },

        props: {
            datas: {
                type: Array,
                default: () => ([{}])
            },
            loading: {
                type: Boolean,
                default: false
            },
            gameType: {
                type: Object,
                default: () => ({})
            },
            country: {
                type: Object,
                default: () => ({})
            },
            category: {
                type: String,
                default: 'today'
            },
            theDate: {
                type: [String, Date],
                default: ''
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        methods: {
            // listenScroll(pos) {
            //     if (this.category === 'today') {
            //         if (pos.y < -150) {
            //             // this.$emit('toggle-hot-matches', true)
            //         } else if (pos.y > 50) {
            //             this.$emit('toggle-hot-matches', false)
            //         }
            //     }
            // },


            _showCalendar() {
                this.$emit('show-calendar', true)
            },

            _showPicker() {
                this.$emit('show-picker')
            },
            toTheGame(match, league) {

                let query = {
                    league_id: league.id,
                    match_id: match.id,
                    match_status: match.status,
                    sport: match.sport
                }

                this.$router.push({path: '/sport/betDetail', query: {...query}})
                // if (match.status === '1') {
                //     this.$router.push({path: '/football/betGrounder', query: {...query}})
                // } else {
                //     this.$router.push({path: '/football/betMorning', query: {...query}})
                // }
            },

            format(date, fmt) {
                return format(date, fmt)
            },

            _changeCollapse(data) {
                // this._initDom()
                this.$emit('change-collapse', data)
            },

            // 收藏比赛
            _favorite(domId, league, type) {
                // 如果没有登录
                if (!this.userInfo.userId) {
                    this.$toast('请先登录!')
                    return;
                }
                const {matches, id} = league

                let currentDom = document.getElementById(domId)
                let ids = []
                let flag = hasClass(currentDom, 'active') ? 0 : 1

                flag === 0 ? removeClass(currentDom, 'active') : addClass(currentDom, 'active')
                // 全部取消
                if (type === '1') {
                    ids = matches.map(match => {
                        let dom = document.getElementById(`favorite_${match.id}`)

                        flag === 0 ? removeClass(dom, 'active') : addClass(dom, 'active')
                        return match.id
                    })

                } else if (type === '0') {
                    ids = [domId.replace('favorite_', '')]

                    let f = matches.reduce((pre, match) => {
                        let dom = document.getElementById(`favorite_${match.id}`)

                        return pre && hasClass(dom, 'active')
                    }, true)

                    let parentDom = document.getElementById(`favorite_${id}`)

                    f ? addClass(parentDom, 'active')
                        : removeClass(parentDom, 'active')
                }


                // 1收藏0取消
                favorite({id: ids.join(','), favorite: flag})
                    .then()
                    .catch(err => {
                        console.log(err)
                    })
            },

            updateScrollHeight() {
                let bottom = Object.keys(this.bets).length > 0 ? window.rem2px(2.2) : 0

                if (this.timer) {
                    clearTimeout(this.timer)
                }

                this.timer = setTimeout(() => {
                    let scrollContent = document.getElementById('scroll-content')
                    if (scrollContent) {
                        this.scrollHeight = window.innerHeight - scrollContent.getBoundingClientRect().y - bottom
                    }
                }, 100)
            },
        },

        watch: {
            datas() {
                // this._initDom()
                // this.activeCollapses = this.datas.map(league => league.id)

                // console.log('this.activeCollapses', this.activeCollapses)
                setTimeout(() => {
                    // this.activeCollapses = [this.activeCollapses[0]]
                }, 20)
            },

            bets(newBets, oldBets) {
                if (!newBets.length || !oldBets) {
                    this.updateScrollHeight()
                }
            },

            category(v) {
                // console.log('category=====>', v)
            }
        },

        components: {
            Scroll,
            CountDown,
            LoadImage,
            Play
        },

        mounted() {
            this.$nextTick(() => {
                // this._initDom()
                this.updateScrollHeight()
            })
        },

        created() {
            this.footballIcon = require('../assets/images/tmp1/ruqiushu_big.png')
            this.basketballIcon = require('../assets/images/tmp2/basketball-active.svg')
            this.timer = null
            this.navs = {
                '1': ['全场独赢', '全场让球', '全场大小'],
                '18': ['让分', '总分', '强弱盘'],
                '13': ['获胜者', '比分-主', '比分-客'],
                '91': ['获胜者', '总分', '让分-局'],
                '16': ['让垒', '强弱盘', '总分']
            }

            this.market_group_codes = {
                '1': ['full_time_result', 'asian_handicap', 'match_goals'],
                '18': ['basketball_game_lines_spread', 'basketball_game_lines_total', 'basketball_game_lines_money_line'],
                '13': ['tennis_to_win_match'],
                '91': ['to_win', 'total_points', 'handicap_sets'],
                '16': ['run_line', 'money_line', 'total_points']
            }
        }
    }
</script>
<style type="text/css" lang="less">
    .bet-detail-content-header {
        background-color: #E6E7F3;
        height: 48px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .van-collapse-item__content {
        padding: 0 0.8rem 0.6rem;
    }

    .collapse-item-title {
        &::before {
            display: block;
            content: '';
            width: 0.2rem;
            border-radius: 0.1rem;
            height: 0.8rem;
            background: #2B2745;
        }
    }

    .van-collapse-item__wrapper {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .m-b2 {
        margin-bottom: 2px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .height-transition{
        transition: all .2s linear;
    }

    .radius2 {
        border-radius: 2px;
    }

    .rotate90 {
        transform: rotate(90deg);
        transition: transform .2s linear;
    }
</style>
