<template>
    <div class="bet-grounder">
        <header class="game-info flex-middle white re">
            <div class="full-height flex-between" style="width: 504px;">
                <div class="flex-middle-only">
                    <img :src="match.home_logo" alt="">
                    <span class="m-l16">{{match.home_name}}</span>
                </div>
                <div class="center">
                    <p class="fs12">{{match.start_time ? format(match.start_time * 1000, 'yyyy-MM-dd') : '----'}}</p>
                    <span class="fs20">{{match.start_time ? format(match.start_time * 1000, 'hh:mm') : '--:--'}}</span>
                </div>
                <div class="flex-middle-only">
                    <span class="m-r16">{{match.away_name}}</span>
                    <img :src="match.away_logo" alt="">
                </div>

                <div class="ab live-content white" v-if="animateType">
                    <p class="flex-middle-only" @click="showVideo('video')">
                        <i class="icon_base video-icon" :class="animateType === 'video' ? 'active' : ''"></i>
                        <span class="fs10">视频直播</span>
                    </p>
                    <p class="m-t8 flex-middle-only" @click="showVideo('animate')">
                        <i class="icon_base animate-icon" :class="animateType === 'animate' ? 'active' : ''"></i>
                        <span class="fs10">动画直播</span>
                    </p>
                </div>
            </div>
        </header>

        <div id="grounder-content" style="display: flex;">
            <div class="left-content flex-1">
                <div class="re" ref="scroll-box"
                     :style="{maxWidth: animateType === 'video' || animateType === 'animate' ? '764px' : '992px'}">
                    <ul ref="scroll-content" class="play-list flex-middle-only dark fs12 re" style="overflow: scroll">
                        <li class="flex-middle" style="flex-shrink:0;"
                            :class="play.label === playIndex ? 'active' : ''"
                            @click="selectPlay(play)"
                            v-for="play of playList"
                            :key="play.label">{{play.label}}
                        </li>
                    </ul>

                    <div v-if="showMaskBtn" class="ul-mask ab flex-end flex-middle-only" @click="scrollXTo">
                        <i class="el-icon-arrow-right m-r8 bold"></i>
                    </div>
                </div>

                <ul id="play-info" class="play-info" style="overflow: scroll;">
                    <li class="bg-white">
                        <div class="flex-between m-b16">
                            <div class="flex-middle-only">
                                <p class="collapse-line"></p>
                                <span class="dark">亚洲让分盘</span>
                            </div>
                            <i class="icon_base zhiding"></i>
                        </div>

                        <el-row :gutter="4" style="padding-left: 16px;">
                            <el-col :span="12">
                                <div class="grid-content bg-dark flex-middle-only">
                                    <span class="fs12" style="margin-left: 24px;">阿森纳</span>
                                    <span class="dark-light fs12" style="margin:0 12px 0 4px;">+0/0.5</span>
                                    <span class="fs14">1.97</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-dark flex-middle-only">
                                    <span class="fs12" style="margin-left: 24px;">阿森纳</span>
                                    <span class="dark-light fs12" style="margin:0 12px 0 4px;">+0/0.5</span>
                                    <span class="fs14">1.97</span>
                                </div>
                            </el-col>
                        </el-row>
                    </li>

                    <li class="bg-white">
                        <div class="flex-between m-b16">
                            <div class="flex-middle-only">
                                <p class="collapse-line"></p>
                                <span class="dark">大小盘</span>
                            </div>
                            <i class="icon_base zhiding"></i>
                        </div>

                        <el-row :gutter="4" style="padding-left: 16px;">
                            <el-col :span="12" v-for="i of 20" :key="i">
                                <div class="grid-content bg-dark flex-middle-only">
                                    <span class="fs12" style="margin-left: 24px;">阿森纳</span>
                                    <span class="dark-light fs12" style="margin:0 12px 0 4px;">+0/0.5</span>
                                    <span class="fs14">1.97</span>
                                </div>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
            <div class="right-content full-height over-hidden"
                 :class="animateType ? 'm-l8' : ''"
                 :style="{width: animateType ? '220px':'0'}">
                <div class="flex-between m-t8 m-b8">
                    <span class="home-team fs10 origin-left">拜仁莫尼黑</span>
                    <span class="visiting-team fs10 origin-right">国际米兰</span>
                </div>

                <!--视频直播-->
                <div v-show="animateType === 'video'" class="re bg-blue m-b8" style="height: 99px;border-radius: 8px;">
                    <div class="icon-box flex-middle ab radius50" style="right: 4px;">
                        <i class="icon_base icon_fullscreen"></i>
                    </div>

                    <el-popover
                            placement="bottom-start"
                            width="220"
                            trigger="hover">
                        <div slot="reference" class="icon-box flex-middle ab radius50" style="left: 4px;">
                            <i class="icon_base icon_tip"></i>
                        </div>
                        <div class="flex-middle-only p-l20">
                            <span class="fs10 origin-left">
                                ·此版面显示的所有直播内容仅供参考，会员亦可使用此内容为指南。我们将尽最大努力确保现实的内容是正确的，如有错误，本公司将不承担任何责任。对于滚球比分，例如滚球让球，将以投注时在投注单中显示的正确比分为准。
                            </span>
                        </div>
                    </el-popover>
                    <!--<video src="../../../assets/"></video>-->
                </div>

                <!--动画直播-->
                <div v-show="animateType === 'animate'" class="animate-live m-b8">
                    <div class="re">
                        <el-carousel ref="carousel" height="99px" arrow="never" indicator-position="none"
                                     :autoplay="false">
                            <el-carousel-item v-for="item in 3" :key="item">
                                <div style="background: #00BF8B;" class="flex-middle-only full-height re">
                                    <div class="ab p-l10" style="border-left: 3px solid #F13F40;height:42px;left: 20%;">
                                        <p style="color: #0BE9AD;">托马斯-穆勒</p>
                                        <span class="fs12 white">进攻</span>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <el-popover
                                placement="bottom-start"
                                width="220"
                                trigger="hover">
                            <div slot="reference" class="icon-box flex-middle ab radius50"
                                 style="left: 4px;z-index: 99;">
                                <i class="icon_base icon_tip"></i>
                            </div>
                            <div class="flex-middle-only p-l20">
                                <span class="fs10 origin-left">
                                    ·此版面显示的所有直播内容仅供参考，会员亦可使用此内容为指南。我们将尽最大努力确保现实的内容是正确的，如有错误，本公司将不承担任何责任。对于滚球比分，例如滚球让球，将以投注时在投注单中显示的正确比分为准。
                                </span>
                            </div>
                        </el-popover>
                    </div>

                    <div class="flex-between animate-live-tabs-box" style="color: rgba(255,255,255,0.50);">
                        <i class="el-icon-arrow-left"
                           @click="jumpCarousel(-1)"
                           style="margin-left: 4px;"></i>
                        <div class="m-l10 m-r10 flex-1">
                            <el-tabs v-model="tabLabel" :stretch="true" @tab-click="handleClick">
                                <el-tab-pane label="现场" name="0">
                                    <span slot="label" class="fs10 origin-center">现场</span>
                                </el-tab-pane>
                                <el-tab-pane label="得分球员" name="1">
                                    <span slot="label" class="fs10 origin-center">得分球员</span>
                                </el-tab-pane>
                                <el-tab-pane label="进球" name="2">
                                    <span slot="label" class="fs10 origin-center">进球</span>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <i class="el-icon-arrow-right"
                           @click="jumpCarousel(1)"
                           style="color: #fff;margin-right: 4px;"></i>
                    </div>
                </div>

                <div class="bg-white" style="border-radius: 8px;">
                    <el-row class="under-line" style="padding: 12px 0">
                        <el-col :span="8" class="center">
                            <p class="center"><span class="dark-light fs10 origin-center">天气</span></p>
                            <span class="fs10 origin-center">好</span>
                        </el-col>
                        <el-col :span="8" class="center">
                            <p class="center"><span class="dark-light fs10 origin-center">场地</span></p>
                            <span class="fs10 origin-center">凹凸不平</span>
                        </el-col>
                        <el-col :span="8" class="center">
                            <p class="center"><span class="dark-light fs10 origin-center">开球</span></p>
                            <span class="fs10 origin-center">14:30</span>
                        </el-col>
                    </el-row>

                    <div class="under-line">
                        <el-row class="flex-between" style="padding: 12px 0;">
                            <el-col :span="8">
                                <p class="center"><span class="fs10 origin-center">进攻</span></p>
                                <div class="fs12 flex-middle">
                                    <p class="red w-20 right">10</p>
                                    <progress-circle style="margin: 0 4px;" :ratio="(1/8)"/>
                                    <p class="blue w-20 left">16</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <p class="center"><span class="fs10 origin-center">危险进攻</span></p>
                                <div class="fs12 flex-middle">
                                    <p class="red w-20 right">2</p>
                                    <progress-circle style="margin: 0 4px;" :ratio="(5/8)"/>
                                    <p class="blue w-20 left">7</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <p class="center"><span class="fs10 origin-center">控球权</span></p>
                                <div class="fs12 flex-middle">
                                    <p class="red w-20 right">24%</p>
                                    <progress-circle style="margin: 0 4px;" :ratio="(6/8)"/>
                                    <p class="blue w-20 left">76%</p>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row style="padding: 12px 0;">
                            <el-col :span="12">
                                <p class="center"><span class="fs10 origin-center">射正球门</span></p>
                                <div class="flex-middle">
                                    <span class="fs10 red">1</span>
                                    <div class="bg-blue ratio-content over-hidden m-l8 m-r8" style="width: 58px;">
                                        <div class="bg-red full-height" style="width: 33%"></div>
                                    </div>
                                    <span class="fs10 blue">3</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <p class="center"><span class="fs10 origin-center">射偏球门</span></p>
                                <div class="flex-middle">
                                    <span class="fs10 red">0</span>
                                    <div class="bg-blue ratio-content over-hidden m-l8 m-r8" style="width: 58px;">
                                        <div class="bg-red full-height" style="width: 0%"></div>
                                    </div>
                                    <span class="fs10 blue">1</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div style="padding: 12px 12px 0 12px;">
                        <el-row class="under-line" style="height:28px;" type="flex" align="middle">
                            <el-col :span="3" :offset="6">
                                <i class="icon_base icon_jiaoqiu_big"></i>
                            </el-col>
                            <el-col :span="3">
                                <i class="icon_base icon_huangpai_big"></i>
                            </el-col>
                            <el-col :span="3">
                                <i class="icon_base icon_hongpai_big"></i>
                            </el-col>
                            <el-col :span="3">
                                <i class="icon_base icon_huanren_big"></i>
                            </el-col>
                            <el-col :span="3">
                                <i class="icon_base icon_dianqiu_big"></i>
                            </el-col>
                            <el-col :span="3">
                                <i class="icon_base icon_ruqiu_big"></i>
                            </el-col>
                        </el-row>
                        <el-row class="under-line" style="height:28px;" type="flex" align="middle">
                            <el-col :span="5" :offset="1"><span class="fs10 dark-light">主场</span></el-col>
                            <el-col :span="3" class="fs12">1</el-col>
                            <el-col :span="3" class="fs12">2</el-col>
                            <el-col :span="3" class="fs12">3</el-col>
                            <el-col :span="3" class="fs12">4</el-col>
                            <el-col :span="3" class="fs12">5</el-col>
                            <el-col :span="3" class="fs12">6</el-col>
                        </el-row>
                        <el-row style="height:28px;" type="flex" align="middle">
                            <el-col :span="5" :offset="1"><span class="fs10 dark-light">客场</span></el-col>
                            <el-col :span="3" class="fs12">1</el-col>
                            <el-col :span="3" class="fs12">2</el-col>
                            <el-col :span="3" class="fs12">3</el-col>
                            <el-col :span="3" class="fs12">4</el-col>
                            <el-col :span="3" class="fs12">5</el-col>
                            <el-col :span="3" class="fs12">6</el-col>
                        </el-row>
                    </div>

                    <div style="height: 40px;padding: 0 12px;" class="flex-middle-only">
                        <div class="line-ratio re full-width">
                            <i class="icon_base icon_huangpai ab" style="top: 4px; left: 20px"></i>
                            <i class="icon_base icon_hongpai ab" style="top: -8px; left: 40px"></i>
                            <i class="icon_base icon_ruqiu ab" style="top: 4px; left: 90px"></i>
                            <i class="icon_base icon_jiaoqiu ab" style="top: 4px; left: 20px"></i>
                            <i class="icon_base icon_huanren ab" style="top: -8px; left: 120px"></i>
                            <i class="icon_base icon_dianqiu ab" style="top: 4px; left: 80px"></i>
                        </div>
                    </div>

                    <div id="soccer" style="overflow: scroll;">
                        <div v-for="i of 10" :key="i">
                            <el-row>
                                <el-col :span="6" :offset="9" style="color: #4a4a4a;">
                                    <p class="center"><span class="fs10 origin-center">下半场</span></p>
                                    <p class="center fs12">17:56</p>
                                </el-col>
                                <el-col :span="9">
                                    <div class="soccer-right flex-start flex-middle-only re">
                                        <i class="icon_base icon_dianqiu_big" style="margin: 0 8px 0 6px;"></i>
                                        <p class="left" style="width: 60px;">
                                            <span class="fs10 origin-left">第4个进球 - (国际米兰)</span>
                                        </p>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="9">
                                    <div class="flex-end soccer-left flex-middle-only re">
                                        <p class="right" style="width: 60px;">
                                            <span class="fs10 origin-right">第3个进球 - (拜仁慕尼黑)</span>
                                        </p>
                                        <i class="icon_base icon_huangpai_big" style="margin: 0 6px 0 8px;"></i>
                                    </div>
                                </el-col>
                                <el-col :span="6" style="color: #4a4a4a;">
                                    <p class="center"><span class="fs10 origin-center">下半场</span></p>
                                    <p class="center fs12">17:56</p>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ProgressCircle from "../../../components/ProgressCircle";
    import {getMatchInfo, getMatchMarkets, getMatchResult} from "../../../axios/sport";
    import {format} from "../../../assets/js/util";

    export default {
        data() {
            return {
                playList: [
                    {label: '亚洲盘口'},
                    {label: '主要盘口'},
                    {label: '罚牌'},
                    {label: '角球'},
                    {label: '进球'},
                    {label: '上/下半场'},
                    {label: '球员'},
                    {label: '精选'},
                    {label: '分钟'},
                    {label: '分钟1'},
                    {label: '分钟2'},
                    // {label: '分钟3'},
                    // {label: '分钟4'},
                    // {label: '分钟5'},
                    // {label: '分钟6'},
                    // {label: '分钟7'},
                    // {label: '分钟8'}
                ],
                detail: {},
                playIndex: '亚洲盘口',
                animateType: '', // video animate
                tabLabel: '0',
                showMaskBtn: true,

                league_id: '',
                match_id: '',
                groupIndex: '亚洲盘口',
                match: {},
                market_groups: [],
                markets: []
            }
        },

        methods: {
            jumpCarousel(n) {
                if (n === 1) {
                    this.$refs['carousel'].next()
                } else {
                    this.$refs['carousel'].prev()
                }

                let nextIndex = Number(this.tabLabel) + n

                this.tabLabel = nextIndex > 2 ? '0' : nextIndex < 0 ? '2' : String(nextIndex)
            },

            handleClick(tab) {
                const {index} = tab

                this.$refs['carousel'].setActiveItem(index)
            },

            selectPlay(play) {
                this.playIndex = play.label
            },

            // 判断是否显示 滚动按钮
            isShowScrollBtn() {
                const scrollContent = this.$refs['scroll-content']
                let scrollContentWidth = scrollContent.clientWidth
                let w= 0
                scrollContent.childNodes.forEach(child => {
                    w += child.clientWidth + 12
                })

                this.showMaskBtn = scrollContentWidth <= w
            },

            scrollXTo() {
                this.$nextTick(() => {
                    const scrollContent = this.$refs['scroll-content']
                    let scrollContentWidth = scrollContent.clientWidth
                    let w= 0
                    scrollContent.childNodes.forEach(child => {
                        w += child.clientWidth + 12
                    })
                    let scrollLeft = scrollContent.scrollLeft

                    let maxScrollLeft = w - scrollContentWidth

                    if (scrollLeft >= maxScrollLeft) {
                        return;
                    } else if (timer) {
                        clearInterval(timer)
                    }
                    let scrollStep = 0

                    let timer = setInterval(() => {
                        scrollStep += 10
                        scrollContent.scrollLeft = scrollLeft + scrollStep
                        if (scrollStep > maxScrollLeft || scrollStep >= 200) {
                            clearInterval(timer)
                        }
                    }, 20)
                })
            },

            showVideo(type) {
                console.log('type', type)
                if (this.animateType === type) {
                    this.animateType = ''
                } else {
                    this.animateType = type
                }
                setTimeout(() => {
                    this._initialHeight()
                    this.isShowScrollBtn()
                }, 220)
            },

            _initialHeight() {
                let div = document.createElement('div')
                let dom = document.getElementById('play-info') || div;
                let dom2 = document.getElementById('soccer') || div;
                let dom3 = document.getElementById('grounder-content') || div;
                let top = dom.getBoundingClientRect().top;
                let top2 = dom2.getBoundingClientRect().top;
                let top3 = dom3.getBoundingClientRect().top;

                dom.style.height = window.innerHeight - top + 'px';
                dom2.style.height = window.innerHeight - top2 - 8 + 'px';
                dom3.style.height = window.innerHeight - top3 + 'px';
            },

            selectPlay(play) {
                this.group = play
                this.groupIndex = play.index
            },

            // 获取比赛信息
            _getMatchInfo(matchId = '') {
                let id = matchId ? matchId : this.match_id

                getMatchInfo(id)
                    .then(res => {
                        if (res.code === 200) {
                            this.groupIndex = 0

                            this.markets = res.data.markets
                            this.match = res.data.match
                            this.market_groups = res.data.market_groups

                            this.group = this.market_groups[this.groupIndex] || {}

                            console.log('=======>', res)
                            // 开始循环 请求比赛变动
                            this._startGetMatchChange(id)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            _startGetMatchChange(id) {
                this.clearTimer()

                this.timer = setInterval(() => {
                    this._getMatchMarkets(id)

                    this._getMatchResult(id)
                }, 5000)
            },

            // 比赛玩法变动
            _getMatchMarkets(matchId) {
                getMatchMarkets(matchId)
                    .then(res => {
                        if (res.code === 200) {
                            let market_groups = res.data.market_groups
                            this.market_groups = this.market_groups.map(item => {
                                let changeItem = market_groups.find(v => item.market_group_id === v.market_group_id)
                                if (changeItem) {
                                    return {...item, ...changeItem}
                                }

                                return item
                            })
                            this.markets = res.data.markets
                        }
                    })
                    .catch(err => console.log(err))
            },

            // 比赛玩法变动
            _getMatchResult(matchId) {
                getMatchResult(matchId)
                    .then(res => {
                        if (res.code === 200) {
                            this.match = {...this.match, ...res.data}
                            console.log('比赛结果变动', this.match)
                        }
                    })
            },

            format(date, fmt) {
                return format(date, fmt)
            },

            clearTimer() {
                if (this.timer) {
                    clearInterval(this.timer)
                    this.timer = null
                }
            }
        },

        components: {
            ProgressCircle,
        },

        beforeRouteEnter(to, from, next) {
            console.log('query--------------->', to.query)
            next(vm => {
                vm.league_id = to.query.league_id
                vm.match_id = to.query.match_id
            })
        },

        mounted() {
            this.$nextTick(() => {
                this._initialHeight()
                this.isShowScrollBtn()
                window.addEventListener('resize', this._initialHeight)

                this._getMatchInfo()
            })
        },

        created() {
            this.timer = null
        }
    }
</script>
<style type="text/css" lang="less">
    .bet-grounder {
        width: 992px;

        .game-info {
            height: 78px;
            background: url("../../../assets/images/tmp1/game_info_bg.png") 100% 100% no-repeat;

            .icon_base {
                width: 12px;
                height: 10px;
                margin: 0 4px 0 12px;
            }
        }

        // 右边 视频和动画CSS
        .right-content {
            transition: width .2s linear;

            .w-20 {
                width: 24px;
            }

            .ratio-content {
                height: 4px;
                border-radius: 2px;
            }

            .icon-box {
                width: 20px;
                height: 20px;
                background: rgba(0, 0, 0, 0.5);
                bottom: 4px;
            }

            .animate-live-tabs-box {
                height: 28px;
                background: #2B2745;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }

            .soccer-left {
                border-right: 2px solid #F13F40;
            }

            .soccer-right {
                border-left: 2px solid #3388FF;;
            }
        }

        .ul-mask {
            height: 34px;
            width: 53px;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            background-image: linear-gradient(270deg, #E6E7F3 41%, rgba(230,231,243,0.00) 100%);
        }

        .play-info {
            /*border-radius: 8px;*/

            > li {
                border-radius: 8px;
                padding: 16px 16px 12px 0;
                margin-bottom: 8px;
            }

            .grid-content {
                background: #F6F5FA;
                border-radius: 2px;
                height: 30px;
                margin-bottom: 4px;
            }
        }

        .live-content {
            right: 16px;
            top: 50%;
            transform: translateY(-50%);

            > p {
                width: 80px;
                height: 22px;
                background: rgba(0, 0, 0, 0.50);
                border-radius: 11px;
            }
        }
    }
</style>
