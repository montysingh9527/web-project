<template>
    <div class="foot-ball">
        <header class="flex-middle-only" v-if="hideHeader && category === 'today'">
            <img style="width: 110px;height: 52px;margin-right: 8px;" :src="img1" alt="">
            <van-swipe style="width:100%;height:52px;"
                       vertical
                       indicator-position="none"
                       :show-indicators="false"
                       :duration="200"
                       :autoplay="5000">
                <van-swipe-item style="height:52px;" v-for="(matches, i) in carousels" :key="i">
                    <van-row style="width: 100%;height:100%;" class="flex-middle-only">
                        <van-col :span="8" v-for="match of matches" :key="match.match_id"
                                class="flex-middle-only header-item white fs12">
                            <div @click="jumpBet(match)" class="flex-middle-only full-width">
                                <div class="right-line item-left center p-l5 p-r5">
                                    <p class="center" style="min-width: 40px;">{{match.timer.period || '--'}}</p>
                                    <count-down
                                            :type="Number(match.sport_id) === 1 ? 'up' : 'down'"
                                            :time="(match.timer.tm || 0) * 60 + (Number(match.timer.ts) || 0)"
                                            :suspend="match.timer.tt"/>
                                </div>

                                <van-row class="flex-between" style="flex: 1;">
                                    <van-col :span="10" class="flex-middle-only">
                                        <!--                                    <i class="icon_base m-l8 m-r8" :style="{backgroundImage: `url(${match.home_logo})`}"></i>-->
                                        <img class="m-l8 m-r8" style="width:20px;height:20px;" :src="logo1"/>
                                        <p class="cles-1">{{match.home_name}}</p>
                                    </van-col>
                                    <van-col :span="4" class="center">{{match.ss}}</van-col>
                                    <van-col :span="10" class="flex-middle-only flex-end">
                                        <p class="cles-1">{{match.away_name}}</p>
                                        <!--                                    <i class="icon_base m-l8 m-r8" :style="{backgroundImage: `url(${match.away_logo})`}"></i>-->
                                        <img class="m-l8 m-r8" style="width:20px;height:20px;" :src="logo2"/>
                                    </van-col>
                                </van-row>
                            </div>
                        </van-col>
                    </van-row>
                </van-swipe-item>
            </van-swipe>
            <div class="close flex-middle" @click="hideHeader = false">
                <img :src="close" alt="">
            </div>
        </header>

        <section>
            <h3 class="flex-start flex-middle-only" style="margin: 16px 0 8px 0;padding-left: 12px;">
                <div v-if="category === 'upcoming'" class="flex-middle-only">
                    <span class="fs12 m-r8">日期:</span>

                    <div class="center select-date select-box fs14 bg-white re"
                         style="margin-right: 24px;"
                         @click="showDatePicker = true">
                        <span class="fs12 m-r8" style="color: #2E2A44;">{{format(theDate, 'MM月dd日')}}</span>
                        <i class="icon_base triangle"></i>

                        <div class="date-picker-box ab">
                            选择日期
                        </div>
                    </div>

                    <van-calendar v-model="showDatePicker"
                                  :style="{
                                    height: '500px',width: '300px',top: '135px',left: '210px',
                                    borderRadius: 0
                                  }"
                                  confirm-text="确认日期更改"
                                  :show-title="false"
                                  :row-height="50"
                                  position="top"
                                  :min-date="new Date(new Date().getTime() + 24 * 3600000)"
                                  @close="showDatePicker = false"
                                  @closed="$emit('close')"
                                  @confirm="onConfirmDate" color="#19162d"/>
                </div>


                <span class="fs12 m-r8">地区:</span>

                <van-popover v-model="showCountryPicker" placement="bottom-start">
                    <div slot="reference" class="center select-country fs14 bg-white re cursor"
                         @click="showCountryPicker = true"
                    >
                        <span class="fs12 m-r8" style="color: #2E2A44;">{{country.name}}</span>
                        <i class="icon_base triangle"></i>
                    </div>

                    <div class="hide-scroll-bar scroll-y bg-white"
                         style="width: 200px"
                         @click.stop>
                        <ul class="p-l10 p-r10 scroll-y hide-scroll-bar" style="max-height: 300px;">
                            <li class="lh-40 under-line cursor" v-for="c of countries" :key="c.code"
                                @click="selectCountry(c)">
                                {{c.name}}
                            </li>
                        </ul>
                    </div>
                </van-popover>
            </h3>

            <div class="dark-light flex-middle" style="height: 300px;"
                 v-if="!list.length && loading === false">抱歉,暂无相关数据!
            </div>
            <div style="display: block;" :style="{height: containerHeight + 'px'}" class="foot-ball-collapse">
                <van-collapse v-model="leagueIds">
                    <van-collapse-item :name="league.id"
                                      v-for="league of list"
                                      :key="league.id" class="m-b8" style="border-radius: 8px;">
                        <div class="flex-middle-only" slot="title">
                            <p class="collapse-line"></p>

                            <div class="flex-middle-only">
                                <load-image :src="league.logo" v-if="league.sport === '1'" :error="errorImg"/>
                                <div class="basketball-icon" v-if="league.sport === '18'"/>
                                <span style="margin: 0 4px 0 8px;color: #2E2A44;">{{league.name}}</span>
                                <i class="icon_base collect-tmp1"
                                   :id="`favorite_${league.id}`"
                                   @click.stop="_favorite(`favorite_${league.id}`, league, '1')"
                                   :class="league.is_favorite === 1 ? 'active' : ''"></i>
                            </div>
                        </div>

                        <div v-for="(match, k) in league.matches" :key="match.id">
                            <van-row v-if="k === 0" class="flex-middle-only"
                                    style="background-color: #F6F5FA;height:22px;">
                                <van-col :span="11" :offset="13">
                                    <van-row>
                                        <van-col :span="8" class="left"
                                                 v-for="nav of navs[league.sport]"
                                                 :key="nav">
                                            <span class="fs10 origin-center dark">{{nav}}</span>
                                        </van-col>
                                    </van-row>
                                </van-col>
                            </van-row>

                            <van-row class="row-line">
                                <van-col :span="13">
                                    <div class="cursor" @click="jumpBet(match, league)">
                                        <van-row>
                                            <van-col :span="4" class="dark-light">
                                                <div v-if="match.status === '1' && match.timer">
                                                    <p class="fs12 lh-25">{{match.timer.period || '--:--'}}</p>

                                                    <p class="fs14 lh-25">
                                                        <count-down
                                                                :type="match.sport === '1' ? 'up' : 'down'"
                                                                :time="(match.timer.tm || 0) * 60 + (match.timer.ts * 1 || 0)"
                                                                :suspend="match.timer.tt"/>
                                                    </p>
                                                </div>
                                                <div v-else>
                                                    <p class="fs12 lh-25">{{format(match.start_time * 1000, 'MM月dd日')}}</p>
                                                    <p class="fs14 lh-25">{{format(match.start_time * 1000, 'hh:mm')}}</p>
                                                </div>

                                                <i class="icon_base collect-tmp1 m-t8"
                                                   :id="`favorite_${match.id}`"
                                                   @click.stop="_favorite(`favorite_${match.id}`, league, '0')"
                                                   :class="match.is_favorite === 1 ? 'active' : ''"></i>
                                            </van-col>
                                            <van-col :span="11">
                                                <p class="fs16 cles-1 lh-30">
                                                    {{match.home_name}}
                                                </p>
                                                <p class="fs16 cles-1 lh-30">
                                                    {{match.away_name}}
                                                </p>

                                                <p class="re" style="height:40px;">
                                                    <span class="ab fs14 dark-light" style="left:0;bottom:0;">
                                                        {{match.market_group_count}}+
                                                    </span>
                                                </p>
                                            </van-col>
                                            <van-col :span="9">
                                                <div class="lh-30">{{match.ss ? match.ss.split('-')[0]:''}}</div>
                                                <div class="lh-30">{{match.ss ? match.ss.split('-')[1]:''}}</div>
                                            </van-col>
                                        </van-row>
                                    </div>
                                </van-col>
                                <van-col :span="11">
                                    <van-row :gutter="4" style="margin-bottom: 4px;">
                                        <van-col :span="8" v-for="code of market_group_codes[match.sport]" :key="code">
                                            <div class="grid-content bg-dark flex-middle-only"
                                                 style="margin-bottom: 4px;"
                                                 :class="activeClass(match.market_groups[code][name], match)"
                                                 v-for="name of match.market_groups[code].navs"
                                                 :key="name"
                                                 @click="_chooseBet(match.market_groups[code][name], match.market_groups[code], match)">

                                                <div class="flex-middle-only full-width cursor"
                                                     v-if="match.market_groups[code][name].is_show === '1' && match.market_groups[code][name].is_suspend === '0'">
                                                    <p class="center dark-light m-l16 m-r8" v-if="match.sport === '1'">
                                                        <span class="fs12 cles-1" v-if="code === 'full_time_result' || code === 'match_goals'">
                                                            {{match.market_groups[code][name].header+'  '+ match.market_groups[code][name].handicap}}
                                                        </span>
                                                        <span v-else class="cles-1">
                                                            {{match.market_groups[code][name].handicap.replace(',', '/')}}
                                                        </span>
                                                    </p>
                                                    <p class="center dark-light m-l16 m-r8 fs12" v-if="match.sport === '18'">
                                                        <span class="cles-1" v-if="code === 'basketball_game_lines_spread'">
                                                            {{match.market_groups[code][name].handicap}}
                                                        </span>
                                                        <span class="cles-1" v-if="code === 'basketball_game_lines_total'">
                                                            {{name === '1' ? '高于':'低于'}} {{match.market_groups[code][name].handicap}}
                                                        </span>
                                                    </p>
                                                    <span class="dark fs14">
                                                        {{match.market_groups[code][name].odds}}
                                                    </span>
                                                </div>

                                                <div class="bg-dark flex-middle full-width" v-else>
                                                    <i class="icon_base icon_lock"></i>
                                                </div>
                                            </div>

                                            <div class="bg-dark flex-middle full-width" v-if="code !== 'full_time_result'"></div>
                                        </van-col>
                                    </van-row>
                                </van-col>
                            </van-row>

                            <div v-if="k !== league.matches.length - 1"
                                 style="height:1px;background-color: #E6E7F3;margin:0 12px 0 16px;"></div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </section>
    </div>
</template>
<script>
    import getBetList from '../../../mixins/getBetList'
    import chooseBets from '../../../mixins/choose-bets'

    import {favorite, getHotInplayMatches} from '../../../axios/sport'
    import {format} from "../../../assets/js/util";
    import {addClass, hasClass, removeClass} from "../../../assets/js/dom";
    import {mapGetters} from 'vuex'
    import LoadImage from "../../../common/LoadImage";
    import CountDown from "../../../common/CountDown";
    import Event from "../../../event";

    let img1 = require('../../../assets/images/tmp1/jinxingzhong.png')
    let img2 = require('../../../assets/images/tmp1/team_logo1.svg')
    let img3 = require('../../../assets/images/tmp1/team_logo2.svg')
    let img4 = require('../../../assets/images/tmp1/close.png')

    export default {
        mixins: [getBetList, chooseBets],

        data() {
            return {
                countries: [],
                country: '',
                category: this.$route.query.category || 'today',
                sport: this.$route.query.sport,
                theDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
                hideHeader: true,
                showCountryPicker: false,
                showDatePicker: false,
                carousels: [],
                loading: null,
                leagueIds: []
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        methods: {
            jumpBet(match = {}, league = {}) {
                let query = {
                    league_id: league.id || match.league_id,
                    match_id: match.id || match.match_id,
                    match_status: match.status,
                    sport: match.sport_id || 1
                }

                this.$router.push({path: '/index/betDetail', query})
            },

            format(date, fmt) {
                return format(date, fmt)
            },

            // 热门滚球
            _getHotInplayMatches() {
                let sportId = Number(this.sport) || 1

                getHotInplayMatches(sportId)
                    .then(res => {
                        if (res.code === 200) {
                            let list = res.data.matches

                            let ln = list.length
                            if (ln <= 3) {
                                this.carousels = [list]
                            } else if (ln > 3) {
                                this.carousels = Array.from({length: ln % 3 === 0 ? ln / 3 : ln % 3 + 1})
                                    .map(() => {
                                        return list.splice(0, 3)
                                    })
                            }

                            console.log(this.carousels);
                        }
                    })
                    .catch(err => {
                        // console.log('热门滚球信息err', err)
                    })
            },

            // 收藏比赛
            _favorite(domId, league, type) {
                // 如果没有登录
                if (!this.userInfo.userId) {
                    this.$message.error('请先登录!');
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
                    // console.log('收藏单个比赛')
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
                    .then(res => {})
                    .catch(err => {
                        console.log(err)
                    })
            },

            // 选择国家
            selectCountry(country) {
                this.showCountryPicker = false
                this.country = country

                this._getSportMatches(true)
            },

            onConfirmDate(date) {
                this.theDate = date
                this.showDatePicker = false
                this._getSportMatches(true)
            },

            _getSportMatches(loading = false) {
                let date = this.category === 'upcoming' ? this.theDate : new Date()

                let params = {
                    sport: this.sport || 0,
                    country: this.country.code,
                    day: format(date, 'yyyyMMdd'),
                    category: this.category || 'today',
                    page: 1,
                    pageSize: 200
                }

                this._getMatches(params, loading)
            },
        },

        watch: {
            '$route'(route) {
                this.category = route.query.category || 'today'
                this.sport = route.query.sport
                this.country = {code: '', name: '全部'}

                console.log('---------------------------', route.query)
                if (this.matchtimer) {
                    clearTimeout(this.matchtimer)
                    this.matchtimer = null
                }

                this.matchtimer = setTimeout(() => {
                    this._getSportMatches(true)
                }, 20)
            }
        },

        components: {LoadImage, CountDown},
        mounted() {

            this._getHotInplayMatches()
            this._getSportMatches(true)

            Event.$on('loop-getHotMatches', () => {
                if (this.category === 'today' && this.$route.path.indexOf('/index/sport') > -1) {
                    this._getHotInplayMatches()
                }
            })
        },

        created() {
            this.img1 = img1
            this.logo1 = img2
            this.logo2 = img3
            this.close = img4

            this.containerHeight = window.innerHeight - 14
            this.errorImg = require('../../../assets/images/tmp1/ruqiushu_big.png')
            this.CountryPickerStyle = {
                today: { top: '190px', left: '213px'},
                upcoming: { top: '135px', left: '370px' },
                inplay: { top: '135px', left: '213px'},
                favorite: { top: '135px', left: '213px'}
            }

            this.navs = {
                '1': ['全场独赢', '全场让球', '全场大小'],
                '18': ['让分', '总分', '强弱盘赔率'],
            }

            this.market_group_codes = {
                '1': ['full_time_result', 'asian_handicap', 'match_goals'],
                '18': ['basketball_game_lines_spread', 'basketball_game_lines_total', 'basketball_game_lines_money_line'],
            }
        },

        destroyed() {
            this.clearTimer()
        },

        beforeRouteEnter(to, from, next) {
            next(_this => {
                let {category, sport} = to.query

                if (category) _this.category = category
                if (sport) _this.sport = sport

                Event.$on('fetch-match-change', () => {
                    if (_this.startLoop === true) {
                        _this.loopGetMatchChanges()
                    }
                })
            })
        },

        beforeRouteLeave(to, from, next) {
            this.loopTimes = 0
            this.startLoop = false
            Event.$off('fetch-match-change')
            next()
        }
    }
</script>
<style type="text/css" lang="less">
    .foot-ball {
        /*width: 1114px;*/

        header {
            background: #403A64;
            border-radius: 8px;
        }

        .header-item {
            background: #19162D;
            border-radius: 8px;
            height: 36px;
            /*width: 305px;*/
            margin-left: 8px;

            .right-line:after {
                right: -7px;
                background: #403A64;
                border-radius: 1px;
                height: 22px;
            }
        }

        .item-left {
            color: #A39FB8;
            min-width: 26px;
            font-size: 12px;
            transform: scale(0.7);
        }

        .close {
            width: 60px;
            height: 40px;
        }

        .select-country {
            /*background: #FFFFFF;*/
            width: 110px;
            height: 28px;
            line-height: 28px;
            border-radius: 14px;

            .triangle {
                width: 6px;
                height: 4px;
                background-image: url("../../../assets/images/tmp1/triangle.png");
            }
        }

        .select-date {
            width: 97px;
        }

        .van-overlay {
            background-color: rgba(0,0,0,0.1) !important;
        }

        .select-my {
            width: 110px;
        }

        .date-picker-box {
            overflow: hidden;
            width: 97px;
            height: 30px;
            top: 0;
            opacity: 0;
        }

        //折叠版样式
        .foot-ball-collapse {
            /*background: #FFFFFF;*/
            .van-collapse-item__content {
                padding: 0;
                border-radius: 0 0 8px 8px;
            }

            .van-cell {
                padding: 10px 16px 10px 0;
                border-radius: 8px 8px 0 0;
            }

            .van-icon-arrow-right {
                font-weight: bold;
                font-size: 16px;
            }

            .van-collapse-item .row-line {
                margin: 16px 12px 0 16px;
                //border-bottom: 1px solid #E6E7F3;
                padding-bottom: 12px;
                //&:last-child {
                //  border-bottom: none;
                //  padding-bottom: 0;
                //}
            }
            .bg-dark {
                background: #F6F5FA;
                border-radius: 2px;
                height: 30px;
            }

            .title1 {
                margin: 0 12px 0 24px;
            }

            .fs-10 {
                font-size: 12px;
                //transform: scale(0.5);
                color: #2E2A44;
                display: inline-block;
            }

            .el-row {
                /*margin-bottom: 10px;*/

                &:last-child {
                    margin-bottom: 0;
                }
            }

            .el-col {
                border-radius: 4px;
            }
        }
    }
</style>
