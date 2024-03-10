<template>
    <div class="h5-bet-grounder">
        <bet-common :top="zd"
                    :league-id="league_id"
                    :match-id="match_id"
                    :change-scroll-height="showBottomTabs">
            <template slot="title-down" slot-scope="{match}">
                <div class="fs12 flex-between" style="height: 44px;">
                    <div class="left flex-between" style="width: 30%;">
                        <p class="m-r16 cles-1" style="max-width: 4rem;">{{match.home_name}}</p>
                        <span class="fs16">{{match.ss ? match.ss.split('-')[0] : ''}}</span>
                    </div>
                    <div class="flex-between flex-1">
                        <p class="flex-middle full-width" v-if="match.status === 1">
                            <span class="fs10">{{match.timer && match.timer.period}}</span>
                            <span v-if="!match.timer" class="fs12">--:--</span>
                            <count-down v-else class="fs12" :time="(match.timer.tm || 0) * 60 + (match.timer.ts || 0)" :suspend="match.timer.tt"></count-down>
                        </p>
                        <p v-else class="flex-middle full-width center">
                            {{aliasStatus(match.status)}}
                        </p>
                    </div>
                    <div class="right flex-between" style="width: 30%;">
                        <p class="m-r16 fs16" style="max-width: 4rem;">{{match.ss ? match.ss.split('-')[1] : ''}}</p>
                        <span class="cles-1">{{match.away_name}}</span>
                    </div>
                </div>
            </template>
            <template slot="bg-content" slot-scope="{match}">
                <div class="white" v-show="liveType === null">
                    <div class="flex-between" style="width: 80vw">
                        <div style="width: 35%;">
                            <load-image class="block m-b16" style="width:2.3rem;height:2.3rem; margin: 0 auto;"
                                        :src="match.home_logo"
                                        :loading="require('../../../assets/images/tmp1/team_logo1.svg')"
                                        :error="require('../../../assets/images/tmp1/team_logo1.svg')"
                            />
                            <p class="center" style="height:2rem;">{{match.home_name}}</p>
                        </div>
                        <div class="center">
                            <p class="fs12 center m-b8" v-if="match.status === 1">
                                <span class="fs10">{{match.timer && match.timer.period}}</span>
                                <count-down v-if="match.timer" class="fs12"
                                            :time="(match.timer.tm || 0) * 60 + (match.timer.ts || 0)" :suspend="match.timer.tt"/>
                            </p>
                            <p class="fs12 center m-b8" v-else>
                                {{aliasStatus(match.status)}}
                            </p>
                            <span class="fs20">{{
                                match.ss ? `${match.ss.split('-')[0]} - ${match.ss.split('-')[1]}` : ''
                                }}</span>
                        </div>
                        <div style="width: 35%;">
                            <load-image class="block m-b16" style="width:2.3rem;height:2.3rem; margin: 0 auto;"
                                        :src="match.away_logo"
                                        :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                                        :error="require('../../../assets/images/tmp1/team_logo2.svg')"
                            />
                            <p class="center" style="height:2rem;">{{match.away_name}}</p>
                        </div>
                    </div>
<!--                    <div class="white flex-between ab bg-live-box" style="bottom: 2.4rem;width: 8.4rem;">-->
<!--                        <p class="flex-middle bg-live-box-item" @click="_changeLiveType('video')">-->
<!--                            <i class="icon_base video-icon" :class="liveType === 'video' && 'active'"></i>-->
<!--                            <span class="fs10 m-l5">视频直播</span>-->
<!--                        </p>-->
<!--                        <p class="flex-middle bg-live-box-item" @click="_changeLiveType('animate')">-->
<!--                            <i class="icon_base animate-icon" :class="liveType === 'animate' && 'active'"></i>-->
<!--                            <span class="fs10 m-l5">动画直播</span>-->
<!--                        </p>-->
<!--                    </div>-->
                </div>

                <div class="ab-middle-x" v-show="liveType" style="width: 17.2rem;bottom:2rem;">
                    <div class="flex-between m-t8 m-b8 white">
                        <div style="width: 4.5rem;">
                            <span class="home-team fs10 origin-left">拜仁莫尼黑</span>
                        </div>

                        <p style="width: 4.5rem;" class="fs12 center">1 - 3</p>

                        <div style="width: 4.5rem;" class="right">
                            <span class="visiting-team fs10 origin-right">国际米兰</span>
                        </div>
                    </div>
                    <div class="white re" style="height: 7.9rem;">
                        <div class="full-width full-height bg-primary flex-middle" v-if="liveType === 'video'">
                            视频占位
                        </div>
                        <div class="full-width full-height re" v-if="liveType === 'animate'">
                            <van-swipe class="my-swipe full-height full-width"
                                       :show-indicators="false"
                                       :loop="false"
                                       @change="_swipeChange">
                                <van-swipe-item class="re"@touchstart="_touchStart" @touchend="_touchEnd">
                                    <van-swipe-cell class="full-width full-height"
                                                    @open="showLeftArrow = false"
                                                    @close="showLeftArrow=true">
                                        <div style="background: #00BF8B;" class="full-height full-width re">
                                            <p class="game-time ab-middle-x center fs12 flex-middle"
                                               style="color: #0BE9AD;">
                                                <span class="fs10">下半场</span> 23:41
                                            </p>
                                            <div class="ab-middle-y p-l10"
                                                 style="border-left: 0.15rem solid #F13F40;height:2.1rem;left: 40%;">
                                                <p style="color: #0BE9AD;">托马斯-穆勒</p>
                                                <span class="fs12 white">进攻</span>
                                            </div>

                                            <!--根据下方导航动态修改数据-->
                                            <div class="ab-middle-x white fs20" style="bottom:0;padding-bottom: 2px;" v-if="showBottomTabs">
                                                <span class="m-r5" style="border-bottom: 2px solid #F13F40;padding: 0 4px;">{{score.team1}}</span>
                                                <span style="border-bottom: 2px solid #3388FF;padding: 0 4px;">{{score.team2}}</span>
                                            </div>
                                        </div>

                                        <template #left>
                                            <div class="full-height bg-red" style="width: 8.6rem">

                                            </div>
                                        </template>
                                    </van-swipe-cell>
                                </van-swipe-item>
                                <van-swipe-item class="re bg-primary">
                                    <van-row class="flex-between" style="padding:0.2rem 0 0.6rem 0;">
                                        <van-col :span="8">
                                            <p class="center m-b8"><span class="fs10 origin-center">进攻</span></p>
                                            <div class="fs12 flex-middle">
                                                <p class="red w-20 right">10</p>
                                                <progress-circle style="margin: 0 0.2rem;"
                                                                 :content-width="35"
                                                                 bg-color="#2B2745"
                                                                 :ratio="(1/8)"/>
                                                <p class="blue w-20 left">16</p>
                                            </div>
                                        </van-col>
                                        <van-col :span="8">
                                            <p class="center m-b8"><span class="fs10 origin-center">危险进攻</span></p>
                                            <div class="fs12 flex-middle">
                                                <p class="red w-20 right">2</p>
                                                <progress-circle style="margin: 0 0.2rem;"
                                                                 :content-width="35"
                                                                 bg-color="#2B2745"
                                                                 :ratio="(5/8)"/>
                                                <p class="blue w-20 left">7</p>
                                            </div>
                                        </van-col>
                                        <van-col :span="8">
                                            <p class="center m-b8"><span class="fs10 origin-center">控球权</span></p>
                                            <div class="fs12 flex-middle">
                                                <p class="red w-20 right">24%</p>
                                                <progress-circle
                                                        :content-width="35"
                                                        bg-color="#2B2745"
                                                        style="margin: 0 0.2rem;" :ratio="(6/8)"/>
                                                <p class="blue w-20 left">76%</p>
                                            </div>
                                        </van-col>
                                    </van-row>

                                    <ul class="flex-middle fs12">
                                        <li class="m-r16">
                                            <i class="icon_base icon_jiaoqiu_big"></i>
                                            <p class="m-t8">0</p>
                                        </li>
                                        <li class="m-r16">
                                            <i class="icon_base icon_huangpai_big"></i>
                                            <p class="m-t8">3</p>
                                        </li>
                                        <li>
                                            <i class="icon_base icon_hongpai_big"></i>
                                            <p class="m-t8">2</p>
                                        </li>
                                        <li style="margin: 0 1.2rem;">
                                            <div>
                                                <p class="center"><span class="fs10 origin-center">射正球门</span></p>
                                                <div class="flex-middle">
                                                    <span class="fs12 red">1</span>
                                                    <div class="bg-blue ratio-content over-hidden m-l8 m-r8"
                                                         style="width: 5.7rem;">
                                                        <div class="bg-red full-height" style="width: 33%"></div>
                                                    </div>
                                                    <span class="fs12 blue">3</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="center"><span class="fs10 origin-center">射偏球门</span></p>
                                                <div class="flex-middle">
                                                    <span class="fs12 red">0</span>
                                                    <div class="bg-blue ratio-content over-hidden m-l8 m-r8"
                                                         style="width: 5.7rem;">
                                                        <div class="bg-red full-height" style="width: 0%"></div>
                                                    </div>
                                                    <span class="fs12 blue">1</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <i class="icon_base icon_hongpai_big"></i>
                                            <p class="m-t8">0</p>
                                        </li>
                                        <li class="m-l16">
                                            <i class="icon_base icon_huangpai_big"></i>
                                            <p class="m-t8">0</p>
                                        </li>
                                        <li class="m-l16">
                                            <i class="icon_base icon_jiaoqiu_big"></i>
                                            <p class="m-t8">0</p>
                                        </li>
                                    </ul>
                                    <div class="ab-middle-x" style="bottom: 0.2rem;" @click="showAnimateDetail">
                                        <span class="fs10 origin-center">更多</span>
                                        <i class="icon_base icon_triangle"
                                           style="margin-top: 0.2rem;border-width: 0.2rem;"></i>
                                    </div>
                                </van-swipe-item>
                                <van-swipe-item class="bg-primary">
                                    <van-row style="padding: 0.7rem 0">
                                        <van-col :span="8" class="center">
                                            <p class="center"><span class="dark-light fs10 origin-center">天气</span></p>
                                            <span class="fs10 origin-center">好</span>
                                        </van-col>
                                        <van-col :span="8" class="center">
                                            <p class="center"><span class="dark-light fs10 origin-center">场地</span></p>
                                            <span class="fs10 origin-center">凹凸不平</span>
                                        </van-col>
                                        <van-col :span="8" class="center">
                                            <p class="center"><span class="dark-light fs10 origin-center">开球</span></p>
                                            <span class="fs10 origin-center">14:30</span>
                                        </van-col>
                                    </van-row>

                                    <div>
                                        <span class="fs10 origin-center">
                                            ·此版面显示的所有直播内容仅供参考，会员亦可使用此内容为指南。我们将尽最大努力确保现实的内容是正确的，如有错误，本公司将不承担任何责任。对于滚球比分，例如滚球让球，将以投注时在投注单中显示的正确比分为准。
                                        </span>
                                    </div>
                                </van-swipe-item>
                            </van-swipe>

                            <div class="van-tabs-box flex-between bg-primary" v-if="showBottomTabs">
                                <i class="van-icon van-icon-arrow-left"
                                   @click="_changeTab('prev')"
                                   :style="{color: `rgba(255, 255, 255, ${tabLabel === 'prev' ? 1 : 0.5})`}"
                                   style="margin: 0 1rem 0 0.5rem;"></i>
                                <van-tabs class="flex-1"
                                          background="#2B2745"
                                          title-active-color="#fff"
                                          :border="false"
                                          line-height="2"
                                          @change="_changeTab"
                                          v-model="tabIndex"
                                          style="height: 36px;">
                                    <van-tab title-style="font-size: 12px;transform: scale(0.83);transform-origin: center;"
                                             v-for="tab in bottomTabs"
                                             :key="tab.name"
                                             :title="tab.name"></van-tab>
                                </van-tabs>
                                <i class="van-icon van-icon-arrow"
                                   @click="_changeTab('next')"
                                   :style="{color: `rgba(255, 255, 255, ${tabLabel === 'next' ? 1 : 0.5})`}"
                                   style="margin: 0 0.5rem 0 1rem;"></i>
                            </div>

                            <div class="ab-middle-x" :style="{bottom: `-${showBottomTabs? 1.9:0.3}rem`}" v-if="swipeIndex === 0">
                                <i class="icon_base down-arrow" :class="showBottomTabs ? 'up':''"
                                ></i>
                            </div>

                            <div class="ab-middle-y" style="right: -0.3rem" v-if="swipeIndex !== 2">
                                <i class="icon_base icon_right_arrow"></i>
                            </div>

                            <div class="ab-middle-y" style="left: -0.3rem" v-if="showLeftArrow">
                                <i class="icon_base icon_left_arrow"></i>
                            </div>
                        </div>

                        <div v-show="swipeIndex === 0">
                            <p class="ab icon-box-layer radius50 flex-middle" style="top: 2.5rem;"
                               v-if="liveType === 'video'"
                               @click="_changeLiveType('animate')">
                                <i class="icon_base animate-icon"
                                   :class="liveType === 'animate' && 'active'"></i>
                            </p>
                            <p class="ab icon-box-layer radius50 flex-middle" style="top: 2.5rem;"
                               v-if="liveType === 'animate'"
                               @click="_changeLiveType('video')">
                                <i class="icon_base video-icon" :class="liveType === 'video' && 'active'"></i>
                            </p>
                            <p class="ab icon-box-layer radius50 flex-middle" style="bottom: 2.5rem;"
                               @click="zdVideo">
                                <i class="icon_base wzd_video" :class="zd && 'active'"></i>
                            </p>
                            <p class="ab icon-box-layer radius50 flex-middle" style="bottom: 0.3rem;">
                                <i class="icon_base icon_fullscreen"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </bet-common>

        <van-dialog v-model="showDialog"
                    width="17rem"
                    :show-confirm-button="false"
                    closeOnClickOverlay
                    :lockScroll="false"
                    closeOnPopstate>
            <div class="bg-white">
                <div class="re center white fs16" style="height: 2.4rem;line-height: 2.4rem;background: #2B2745;">
                    详细数据
                    <i class="icon_base ab-middle-y icon_close_dialog" @click="showDialog = false"
                       style="right: 0.8rem;"></i>
                </div>
                <div style="padding: 0.6rem 1.2rem 0 1.2rem;">
                    <van-row class="under-line" style="height:1.4rem;" type="flex" align="middle">
                        <van-col :span="3" :offset="6">
                            <i class="icon_base icon_jiaoqiu_big"></i>
                        </van-col>
                        <van-col :span="3">
                            <i class="icon_base icon_huangpai_big"></i>
                        </van-col>
                        <van-col :span="3">
                            <i class="icon_base icon_hongpai_big"></i>
                        </van-col>
                        <van-col :span="3">
                            <i class="icon_base icon_huanren_big"></i>
                        </van-col>
                        <van-col :span="3">
                            <i class="icon_base icon_dianqiu_big"></i>
                        </van-col>
                        <van-col :span="3">
                            <i class="icon_base icon_ruqiu_big"></i>
                        </van-col>
                    </van-row>
                    <van-row class="under-line" style="height:1.4rem;" type="flex" align="center">
                        <van-col :span="5" :offset="1"><span class="fs10 dark-light">主场</span></van-col>
                        <van-col :span="3" class="fs12">1</van-col>
                        <van-col :span="3" class="fs12">2</van-col>
                        <van-col :span="3" class="fs12">3</van-col>
                        <van-col :span="3" class="fs12">4</van-col>
                        <van-col :span="3" class="fs12">5</van-col>
                        <van-col :span="3" class="fs12">6</van-col>
                    </van-row>
                    <van-row style="height:1.4rem;;" type="flex" align="center">
                        <van-col :span="5" :offset="1"><span class="fs10 dark-light">客场</span></van-col>
                        <van-col :span="3" class="fs12">1</van-col>
                        <van-col :span="3" class="fs12">2</van-col>
                        <van-col :span="3" class="fs12">3</van-col>
                        <van-col :span="3" class="fs12">4</van-col>
                        <van-col :span="3" class="fs12">5</van-col>
                        <van-col :span="3" class="fs12">6</van-col>
                    </van-row>

                    <div style="height: 2rem;padding: 0 0.6rem;" class="flex-middle-only">
                        <div class="line-ratio re full-width">
                            <i class="icon_base icon_huangpai ab" style="top: 4px; left: 20px"></i>
                            <i class="icon_base icon_hongpai ab" style="top: -8px; left: 40px"></i>
                            <i class="icon_base icon_ruqiu ab" style="top: 4px; left: 90px"></i>
                            <i class="icon_base icon_jiaoqiu ab" style="top: 4px; left: 20px"></i>
                            <i class="icon_base icon_huanren ab" style="top: -8px; left: 120px"></i>
                            <i class="icon_base icon_dianqiu ab" style="top: 4px; left: 80px"></i>
                        </div>
                    </div>
                </div>

                <van-divider
                        :style="{borderColor: '#E6E7F3'}"
                >
                    <div style="background: #F6F5FA;border-radius: 2px;padding: 0.1rem 0.4rem">
                        <span class="fs10">下半场</span>
                        <span class="fs12">23:42</span>
                    </div>
                </van-divider>
                <scroll :scrollHeight="268" :hidden="true">
                    <div id="soccer" style="overflow: scroll;">
                        <div v-for="i of 25" :key="i">
                            <van-row style="height: 1.8rem;">
                                <van-col :span="6" :offset="9" style="color: #4a4a4a;">
                                    <p class="center"><span class="fs10 origin-center">下半场</span></p>
                                    <p class="center fs12">17:56</p>
                                </van-col>
                                <van-col :span="9">
                                    <div class="soccer-right flex-start flex-middle-only re">
                                        <i class="icon_base icon_dianqiu_big" style="margin: 0 8px 0 6px;"></i>
                                        <p class="left">
                                            <span class="fs10 origin-left">第4个进球 - (国际米兰)</span>
                                        </p>
                                    </div>
                                </van-col>
                            </van-row>

                            <van-row style="height: 1.8rem;">
                                <van-col :span="9">
                                    <div class="flex-end soccer-left flex-middle-only re">
                                        <p class="right">
                                            <span class="fs10 origin-right">第3个进球 - (拜仁慕尼黑)</span>
                                        </p>
                                        <i class="icon_base icon_huangpai_big" style="margin: 0 6px 0 8px;"></i>
                                    </div>
                                </van-col>
                                <van-col :span="6" style="color: #4a4a4a;">
                                    <p class="center"><span class="fs10 origin-center">下半场</span></p>
                                    <p class="center fs12">17:56</p>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </scroll>
            </div>
        </van-dialog>
    </div>
</template>
<script>
    import BetCommon from "../../../components/BetCommon";
    import ProgressCircle from "../../../components/ProgressCircle";
    import Scroll from "../../../common/Scroll";
    import {aliasStatus} from '../../../common/config'
    import LoadImage from '../../../common/LoadImage'
    import CountDown from "../../../common/CountDown";

    let touchPosition = {}
    export default {
        data() {
            return {
                liveType: null,
                zd: false,
                showDialog: false,
                swipeIndex: 0,
                showBottomTabs: false,
                tabIndex: 0,
                tabLabel: '',
                showLeftArrow: true,
                showRightArrow: true,
                score: {team1: 9, team2: 1},
                league_id: '',
                match_id: ''
            }
        },

        methods: {
            aliasStatus(status) {
                return aliasStatus(status)
            },
            _changeLiveType(type) {
                console.log('type', type)
                if (this.liveType === type) {
                    this.liveType = null
                    return;
                }
                if (type === 'video') {
                    this.showBottomTabs = false
                }
                this.liveType = type
            },

            _changeTab(index) {

                switch (index) {
                    case 'prev':
                        this.tabLabel = index;
                        this.tabIndex = Math.max(this.tabIndex - 1, 0)
                        break;
                    case 'next':
                        this.tabLabel = index;
                        this.tabIndex = Math.min(this.tabIndex + 1, this.bottomTabs.length - 1)
                        break;
                    case 0:
                        this.score = {team1: 7, team2: 3}
                        break;
                    case 1:
                        this.score = {team1: 1, team2: 3}
                        break;
                    case 2:
                        break;
                        this.score = {team1: 4, team2: 3}
                    case 3:
                        this.score = {team1: 3, team2: 3}
                        break;
                    default:
                        break;
                }
                console.log(this.tabIndex)
            },

            showAnimateDetail() {
                this.showDialog = true
            },

            // 置顶
            zdVideo() {
                this.zd = !this.zd
            },

            _swipeChange(index) {
                this.swipeIndex = index
                if (index > 0) {
                    this.showBottomTabs = false
                }
            },

            _touchStart(event) {
                let ev = ev || event;
                ev.preventDefault()

                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(ev.touches && ev.touches.length == 1) {
                    touchPosition.x0 = ev.touches[0].clientX // 记录开始位置x坐标
                    touchPosition.y0 = ev.touches[0].clientY // 记录开始位置y坐标
                }
            },

            _touchEnd(event) {
                let ev = ev || event;
                ev.preventDefault()

                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                // 计算手指滑动距离
                if(ev.changedTouches.length === 1) {
                    touchPosition.x1 = ev.changedTouches[0].clientX
                    touchPosition.y1 = ev.changedTouches[0].clientY
                }

                const {x0, x1, y0, y1} = touchPosition
                // 计算手势动作

                let offsetX = Math.abs(x1 - x0)
                let offsetY = Math.abs(y1 - y0)

                // 1 左右滑 或者 上下滑 并且手势距离小于 10px 不处理
                if (offsetX > offsetY || offsetY < 10) return;

                // 向下滑动

                this.showBottomTabs = y1 - y0 > 0
                console.log('上滑', this.showBottomTabs)
            },
        },

        components: {
            BetCommon,
            ProgressCircle,
            Scroll,
            LoadImage,
            CountDown
        },

        created() {
            this.bottomTabs = [
                {name: '现场'},
                {name: '得分球员'},
                {name: '进球'},
                {name: '任意球'},
            ]
        },

        beforeRouteEnter(to, from, next) {
            console.log('query--------------->', to.query)
            next(vm => {
                vm.league_id = to.query.league_id
                vm.match_id = to.query.match_id
            })
        },
    }
</script>
<style type="text/css" lang="less">
    .h5-bet-grounder {
        .bg-live-box {
            width: 12.4rem;
            left: 50%;
            transform: translateX(-50%);
        }

        .bg-live-box-item {
            width: 4rem;
            height: 1.1rem;
            background: rgba(0, 0, 0, 0.50);
            border-radius: 11px;
            padding-left: 0.3rem;
        }

        .icon-box-layer {
            width: 1rem;
            height: 1rem;
            background: rgba(0, 0, 0, 0.5);
            right: 0.5rem;
        }

        .game-time {
            width: 4.5rem;
            height: 18px;
            background: rgba(0, 0, 0, 0.30);
        }

        .van-swipe-cell__wrapper {
            height: 100%;
        }

        .ratio-content {
            height: 4px;
            border-radius: 2px;
        }

        .soccer-right {
            border-left: 2px solid #3388FF;
        }

        .soccer-left {
            border-right: 2px solid #F13F40;
        }

        .van-tabs-box {
            border-bottom-right-radius: 0.4rem;
            border-bottom-left-radius: 0.4rem;

            .van-tabs__line {
                background-color: #fff;
                bottom: 0;
            }
            .van-tabs--line .van-tabs__wrap {
                height: 100%;
            }
            .van-tabs__nav--line{
                padding-bottom: 0;
            }
        }
    }
</style>
