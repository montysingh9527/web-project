<template>
    <div class="h5-bet-detail re">
        <van-nav-bar class="full-width over-hidden" style="height: 44px;position: fixed;z-index: 100;"
                     @click-left="$router.back()"
                     left-arrow
                     :placeholder="true" :border="false">
            <div slot="title" class="white">
                <div ref="title-content" class="title-content" :style="{width: innerWidth - 100 + 'px'}">
                    <div style="height: 44px;" class="flex-middle title-content-top" @click="showPicker = true">
                        <span class="fs16">{{match.league_name}}
                            <i class="icon_base icon_triangle"></i>
                        </span>
                    </div>

                    <div v-if="match_status !== '1'" style="height: 44px;"
                         class="flex-between fs12 title-content-bottom">
                        <div style="width: 90px" class="left">{{match.home_name}}</div>
                        <div class="fs10 origin-center">{{aliasStatus(match.status)}}</div>
                        <div style="width: 90px" class="right">{{match.away_name}}</div>
                    </div>

                    <div v-else class="fs12 flex-between" style="height: 44px;">
                        <div class="left flex-between" style="width: 30%;">
                            <p class="m-r16 cles-1" style="max-width: 4rem;">{{match.home_name}}</p>
                            <span class="fs16">{{match.ss ? match.ss.split('-')[0] : ''}}</span>
                        </div>
                        <div class="flex-between flex-1">
                            <p class="flex-middle full-width" v-if="match.status === 1">
                                <span class="fs10">{{match.timer && match.timer.period}}</span>
                                <span v-if="!match.timer" class="fs12">--:--</span>
                                <count-down
                                        v-else class="fs12"
                                        :type="match.sport === '1' ? 'up':'down'"
                                        :time="(match.timer.tm || 0) * 60 + (Number(match.timer.ts) || 0)"
                                        :suspend="match.timer.tt"></count-down>
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
                </div>
            </div>
        </van-nav-bar>

        <div ref="bet-bg" class="bet-bg ab flex-middle"
             style="top: 0;padding-bottom: 30px;"
             :style="{height: initialBgHeight + 'px', transform: `scale(${scale})`}">

            <div ref="bet-bg-content">
                <div class="game-info re flex-between white" style="width: 80vw;">
                    <div style="width: 35%">
                        <load-image class="block m-b16" style="width:2.3rem;height:2.3rem; margin: 0 auto;"
                                    :src="match.home_logo"
                                    :loading="require('../../../assets/images/tmp1/team_logo1.svg')"
                                    :error="require('../../../assets/images/tmp1/team_logo1.svg')"
                        />
                        <p class="center" style="height: 2rem;">{{match.home_name}}</p>
                    </div>
                    <div class="center" style="width: 30%" v-if="match_status !== '1'">
                        <p class="fs12 center m-b8">{{match.start_time ? format(match.start_time * 1000,
                            'yyyy-MM-dd') : '----'}}</p>
                        <span class="fs20">{{match.start_time ? format(match.start_time * 1000, 'hh:mm') : '--:--'}}</span>
                    </div>

                    <div class="center" style="width: 30%" v-else>
                        <p class="fs12 center m-b8" v-if="match.status === 1">
                            <span class="fs10">{{match.timer && match.timer.period}}</span>
                            <count-down v-if="match.timer" class="fs12"
                                        :type="match.sport === '1' ? 'up':'down'"
                                        :time="(match.timer.tm || 0) * 60 + (Number(match.timer.ts) || 0)"
                                        :suspend="match.timer.tt"/>
                        </p>
                        <p class="fs12 center m-b8" v-else>
                            {{aliasStatus(match.status)}}
                        </p>
                        <span class="fs20">{{
                                match.ss ? `${match.ss.split('-')[0]} - ${match.ss.split('-')[1]}` : ''
                                }}</span>
                    </div>
                    <div style="width: 35%">
                        <load-image class="block m-b16" style="width:2.3rem;height:2.3rem; margin: 0 auto;"
                                    :src="match.away_logo"
                                    :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                                    :error="require('../../../assets/images/tmp1/team_logo2.svg')"
                        />
                        <p class="center" style="height: 2rem;">{{match.away_name}}</p>
                    </div>
                </div>
            </div>
        </div>

        <scroll ref="scroll" :scrollHeight="scrollHeight"
                class="scroll_style"
                :probeType="3"
                :listenScroll="true"
                :bgColor="'#E6E7F3'"
                :radius="8"
                :hidden="top" @scroll="_scroll">
            <div class="play-info-list" :style="{minHeight: innerHeight - 44 + 7 + 'px'}">

                <div class="full-width" style="padding: 0.6rem 0;">
                    <scroll-x :tabs="market_tabs" v-slot="{ item }" @change="selectPlay">
                        <template>
                            <div class="flex-middle-only" style="padding-right: 0.6rem;">
                                <span class="dark fs12 play-item" :class="item.index === groupIndex ? 'active' : ''">{{item && item.name}}</span>
                            </div>
                        </template>
                    </scroll-x>
                </div>

                <div v-if="playList && playList.length" class="play-info-item bg-white re m-b8"
                     v-for="group of playList"
                     :key="group.market_group_id">
                    <div class="flex-between p-l16 p-r16" style="line-height: 1.8rem;">
                        <span class="fs12 dark bold">{{group.name}}</span>
                        <i class="icon_base"
                           @click="_keepTop($event, group)"
                           :class="group.top ? 'zhiding' : 'weizhiding'"></i>
                    </div>

                    <!--比赛投注/半场-->
                    <van-row v-if="isMatchBetting(group.code)" class="flex-middle-only group-title">
                        <van-col :span="8" :offset="8" class="center fs12 cles-1">{{match.home_name}}</van-col>
                        <van-col :span="8" class="center fs12 cles-1">{{match.away_name}}</van-col>
                    </van-row>

                    <!--让球/比赛获胜/赛局正确比分-->
                    <van-row v-if="group.code === 'asian_handicap' ||
                         group.code === 'tennis_to_win_match' ||
                         group.code === 'volleyball_correct_set_score' ||
                         group.code === 'tennis_set_winner' ||
                         group.code === 'tennis_set_1_winner'"
                             class="flex-middle-only group-title">
                        <van-col :span="12" class="center fs12">{{match.home_name}}</van-col>
                        <van-col :span="12" class="center fs12">{{match.away_name}}</van-col>
                    </van-row>

                    <!--大小盘-->
                    <van-row v-if="group.code === 'match_goals'" class="flex-middle-only group-title">
                        <van-col :span="8" :offset="8" class="center fs12">高于</van-col>
                        <van-col :span="8" class="center fs12">低于</van-col>
                    </van-row>

                    <!--半场/让分三项/波胆/独赢-->
                    <van-row v-if="group.code === 'correct_score' ||
                    group.code === 'full_time_result' ||
                    group.code === 'basketball_point_spread_3_way' ||
                    group.code === 'half_time_correct_score'"
                             class="flex-middle-only group-title">
                        <van-col :span="8" class="center fs12 cles-1">{{match.home_name}}</van-col>
                        <van-col :span="8" class="center fs12">平局</van-col>
                        <van-col :span="8" class="center fs12 cles-1">{{match.away_name}}</van-col>
                    </van-row>

                    <!--独赢-->
                    <van-row gutter="3" class="p-l16 p-r16" v-if="group.code === 'full_time_result'">
                        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                            <play class="lh-45"
                                  :match="match"
                                  :group="group"
                                  :play="findPlay('name', v,  group.markets)"
                            />
<!--                            <div v-else class="flex-middle play-info-col bg-gray full-height full-width">-->
<!--                                <i class="icon_base icon_lock"></i>-->
<!--                            </div>-->
                        </van-col>
                    </van-row>

                    <!--全场让球-->
                    <van-row gutter="3" class="p-l16 p-r16" v-if="group.code === 'asian_handicap'">
                        <van-col :span="12" v-for="v of ['主队', '客队']" :key="v" class="flex-column">
                            <play class="lh-45 flex-middle"
                                  v-for="play of group.markets" :key="play.market_id"
                                  v-if="play.header === v"
                                  :show-handicap="true"
                                  :match="match"
                                  :group="group"
                                  :play="play"
                            />
                        </van-col>
                    </van-row>

                    <!--大小盘-->
                    <van-row gutter="3" class="p-l16 p-r16" v-if="group.code === 'match_goals'">
                        <van-col :span="8" class="flex-middle play-info-col dark-light lh-45">
                            {{group.markets[0] && group.markets[0].handicap && group.markets[0].handicap.replace(',', '/')}}
                        </van-col>

                        <van-col :span="8" v-for="v of ['大', '小']" :key="v">
                            <play class="lh-45"
                                  :match-goals-name="false"
                                  :match="match"
                                  :group="group"
                                  :play="findPlay('header', v,  group.markets)"
                            />
                        </van-col>
                    </van-row>

                    <!--全场比分-->
                    <van-row gutter="3" class="p-l16 p-r16" v-if="group.code === 'correct_score'">
                        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                            <play class="lh-45 flex-middle"
                                  :match="match"
                                  :group="group"
                                  :show-name="true"
                                  v-for="play of group.markets" :key="play.market_id"
                                  v-if="play.header === v"
                                  :play="play"
                            />
                        </van-col>
                    </van-row>

                    <!--半场比分-->
                    <van-row gutter="3" class="p-l16 p-r16" v-if="group.code === 'half_time_correct_score'">
                        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                            <play class="lh-45 flex-middle"
                                  :match="match"
                                  :group="group"
                                  :show-name="true"
                                  v-for="play of group.markets" :key="play.market_id"
                                  v-if="play.header === v"
                                  :play="play"
                            />
                        </van-col>
                    </van-row>

                    <!--比赛投注模板-->
                    <div v-if="isMatchBetting(group.code)">
                        <van-row gutter="1" class="grid-line-bottom" >
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">让分</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'Spread' && play.header === v"
                                      :play="play"
                                />
                            </van-col>
                        </van-row>
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle lh-40">
                                <span class="fs12">总分</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'Total' && play.header === v"
                                      :play="play"
                                >
                                    <span slot="alias" class="fs10">{{v === '1' ? '高于' : '低于'}}</span>
                                </play>
                            </van-col>
                        </van-row>
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">强弱盘赔率</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height ">
                                <play class="flex-column flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'Money Line' && play.header === v"
                                      :play="play"
                                />
                            </van-col>
                        </van-row>
                    </div>

                    <!--让分3项-->
                    <van-row gutter="3" class="p-l16 p-r16" v-if="group.code === 'basketball_point_spread_3_way'">
                        <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                            <play class="lh-40 flex-middle"
                                  :match="match"
                                  :group="group"
                                  :show-handicap="true"
                                  :play="findPlay('header', v,  group.markets)"
                            />
                        </van-col>
                    </van-row>

                    <!--网球/比赛获胜-->
                    <van-row gutter="1" class="p-l16 p-r16" v-if="group.code === 'tennis_to_win_match' || group.code === 'tennis_set_1_winner' || group.code === 'tennis_set_winner'">
                        <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="flex-column">
                            <play class="lh-40 flex-middle"
                                  :match="match"
                                  :group="group"
                                  :play="findPlay('header', v,  group.markets)"
                            />
                        </van-col>
                    </van-row>

                    <!--排球-->
                    <div v-if="group.code === 'volleyball_game_lines'">
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">获胜者</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-column flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'to_win' && play.header === v"
                                      :play="play"
                                />
                            </van-col>
                        </van-row>
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">让分</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'handicap_sets' && play.header === v"
                                      :play="play"
                                />
                            </van-col>
                        </van-row>
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">总分</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'total_points' && play.header === v"
                                      :play="play"
                                >
                                    <span slot="alias" class="fs10">{{v === '1' ? '高于' : '低于'}}</span>
                                </play>
                            </van-col>
                        </van-row>
                    </div>

                    <!--棒球-->
                    <div class="border-bottom-line" v-if="group.code === 'baseball_game_lines'">
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">让垒</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'run_line' && play.header === v"
                                      :play="play"
                                />
                            </van-col>
                        </van-row>
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">总分</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'total_points' && play.header === v"
                                      :play="play"
                                >
                                    <span slot="alias" class="fs10">{{v === '1' ? '高于' : '低于'}}</span>
                                </play>
                            </van-col>
                        </van-row>
                        <van-row gutter="1" class="grid-line-bottom">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">强弱盘</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      :match="match"
                                      :group="group"
                                      :show-handicap="true"
                                      v-for="play of group.markets" :key="play.market_id"
                                      v-if="play.name === 'money_line' && play.header === v"
                                      :play="play"
                                ></play>
                            </van-col>
                        </van-row>
                    </div>

                    <!--排球 赛局正确比分-->
                    <van-row gutter="1" class="border-bottom-line"
                             v-if="group.code === 'volleyball_correct_set_score'"
                    >
                        <van-col :span="12" v-for="v of ['1', '2']" :key="v">
                            <play class="lh-40 flex-middle"
                                  :match="match"
                                  :group="group"
                                  :show-name="true"
                                  v-for="play of group.markets" :key="play.market_id"
                                  v-if="play.header === v"
                                  :play="play"
                            />
                        </van-col>
                    </van-row>

                    <!--网球赛盘投注-->
                    <div class="border-bottom-line" v-if="group.code === 'tennis_set_betting'">
                        <van-row gutter="1" class="grid-line-bottom" v-for="name of scoreBetSetting(group.markets)" :key="name">
                            <van-col :span="8" class="flex-middle full-height lh-40">
                                <span class="fs12">{{name}}</span>
                            </van-col>
                            <van-col :span="8" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <play class="flex-middle lh-40"
                                      v-for="play of group.markets"
                                      :key="play.market_id"
                                      :match="match"
                                      :group="group"
                                      v-if="play.name === name && play.header === v"
                                      :play="play"
                                />
                            </van-col>
                        </van-row>
                    </div>
                </div>
                <div v-if="isLoad === true && !playList.length" class="center lh-45">
                    暂无开放盘口
                </div>
            </div>
        </scroll>

        <van-popup v-model="showPicker" position="top" :lock-scroll="false"
                   :style="{ maxHeight: '70%', borderRadius: `0 0 12px 12px`, overflowY: 'scroll'}">
            <div style="padding-bottom: 1rem;">
                <header class="flex-middle re" style="height: 2.2rem;">
                    <span class="black fs16 m-r5">{{match.league_name}}</span>
                    <i class="icon_base icon_triangle_detail"></i>
                </header>

                <div style="padding: 0 1.2rem;">
                    <van-row class="match-row" v-for="(action, i) in matches"
                             @click="_changeMatch(action)"
                             :class="action.match_id === match_id ? 'active' : ''"
                             :key="i" type="flex" align="center">
                        <van-col :span="8" class="center">

                            <load-image class="block" style="margin: 0 auto 0.6rem;width:2.3rem;height:2.3rem;"
                                        :src="action.home_logo"
                                        :loading="require('../../../assets/images/tmp1/team_logo1.svg')"
                                        :error="require('../../../assets/images/tmp1/team_logo1.svg')"
                            />

                            <span class="fs12 black">{{action.home_name}}</span>
                        </van-col>
                        <van-col :span="8" class="center">
                            <p class="center fs12 black m-b8">{{format(action.start_time*1000, 'yyyy-MM-dd')}}</p>
                            <span class="fs20 black">{{format(action.start_time*1000, 'hh:mm')}}</span>
                        </van-col>
                        <van-col :span="8" class="center">
                            <load-image class="block" style="margin: 0 auto 0.6rem;width:2.3rem;height:2.3rem;"
                                        :src="action.away_logo"
                                        :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                                        :error="require('../../../assets/images/tmp1/team_logo2.svg')"
                            />
                            <span class="fs12 black">{{action.away_name}}</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-popup>

        <FootBetController/>
    </div>
</template>
<script>
    import betDetail from "../../../mixins/betDetail";
    import Scroll from "../../../common/Scroll";
    import ScrollX from "../../../common/ScrollX";
    import {prefixStyle, addClass, removeClass} from '../../../assets/js/dom'
    import FootBetController from "../../../components/FootBetControll";
    import CountDown from "../../../common/CountDown";
    import Play from "../../../components/Play";

    let initialBgHeight = (287 / 375) * window.innerWidth

    export default {
        mixins: [betDetail],
        data() {
            return {
                actions: [],
                scrollHeight: 100,
                scale: 1,
            }
        },

        props: {
            // 视频或动画置顶
            top: {
                type: Boolean,
                default: false
            },

            changeScrollHeight: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            changeScrollHeight(v) {
                let h = v ? 30 : 0
                this._initialDom(h)
            }
        },

        methods: {

            _initialDom(bottomTabHeight = 0) {
                let scrollDom = this.$refs['scroll'].$el

                console.log('注单发生变化了===>', Object.values(this.bets).length, bottomTabHeight)
                scrollDom.style.top = initialBgHeight - 30 + (bottomTabHeight || 0) + 'px'

                if (Object.values(this.bets).length > 0) {
                    bottomTabHeight += 44
                }
                this.scrollHeight = window.innerHeight - initialBgHeight + 30 - (bottomTabHeight || 0)
            },

            _scroll(pos) {
                let {y} = pos
                if (y > 0) {
                    // 向下滚动
                    this.scale = Math.abs(y / initialBgHeight) + 1
                    this.betBg.style.height = initialBgHeight + 'px'
                } else if (y < 0) {
                    // 如果置顶 背景高度不变
                    if (this.top) return;
                    // 向上滚动背景高度 随滚动偏移减小
                    let height = Math.max(44, initialBgHeight - 30 + 8 + y)
                    this.betBg.style.height = height + 'px'
                    this.betBg.style.zIndex = 90;
                    this.scale = 1

                    // console.log('height', height)

                    let opacity = 1 - Math.abs(y / initialBgHeight)

                    // 处理背景图中间内容 (transform属性会使position失效)
                    this.betBgContent.style[prefixStyle('transform')] = `scale(${opacity}, ${opacity})`
                    this.betBgContent.style.opacity = opacity

                    this.betBgContent.style.display = opacity < 0.3 ? 'none' : 'block'

                    // 动态改变头部内容
                    if (initialBgHeight - Math.abs(y) <= 50 + 30) {
                        addClass(this.titleContent, 'up')
                        this.$refs['scroll'].$el.style.zIndex = 80
                    } else {
                        removeClass(this.titleContent, 'up')
                        this.$refs['scroll'].$el.style.zIndex = 120
                    }
                }
            }
        },

        components: {
            Scroll,
            ScrollX,
            FootBetController,
            CountDown,
            Play
        },

        mounted() {
            this.$nextTick(() => {
                this._initialDom()
                this.betBg = this.$refs['bet-bg']
                this.betBgContent = this.$refs['bet-bg-content']
                this.titleContent = this.$refs['title-content']
            })
        },

        created() {
            this.initialBgHeight = initialBgHeight
            this.innerWidth = window.innerWidth
            this.innerHeight = window.innerHeight
        }
    }
</script>
<style type="text/css" lang="less">
    .h5-bet-detail {
        height: 100%;
        overflow: hidden;

        .van-nav-bar {
            background-color: transparent;

            .van-icon {
                color: #fff;
            }
        }

        .van-nav-bar__title {
            max-width: none;
        }

        .title-content {
            transition: transform .3s ease-in-out;
            height: 88px;
            transform: translate3d(0, 22px, 0);

            .title-content-top {
                opacity: 1;
                transition: opacity .3s linear;
            }

            .title-content-bottom {
                opacity: 0;
                transition: opacity .3s linear;
            }

            &.up {
                transform: translate3d(0, -22px, 0) !important;

                .title-content-top {
                    opacity: 0;
                }

                .title-content-bottom {
                    opacity: 1;
                }
            }
        }

        .bet-bg {
            background-image: url("../../../assets/images/tmp1/bet-bg.png");
            background-size: cover;
            width: 100%;
            transform-origin: top;

            .game-info {
                transform-origin: center;
            }
        }

        .scroll_style {
            border-top-left-radius: 8px;
            z-index: 120;
            border-top-right-radius: 8px;
            position: absolute;
            width: 100%;
        }

        .play-info-list {
            border-top-right-radius: 0.4rem;
            border-top-left-radius: 0.4rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
        }

        .play-info-item {
            border-radius: 0.4rem;
            padding-bottom: 0.4rem;

            &::before {
                content: '';
                display: block;
                position: absolute;
                background: #2B2745;
                border-radius: 2px;
                width: 4px;
                height: 16px;
                top: 10px;
                left: 0;
            }
        }

        .play-item {
            border-radius: 0.7rem;
            height: 1.4rem;
            line-height: 1.4rem;
            background: #fff;
            padding: 0 1rem;
            transition: background .2s linear;

            &.active {
                background: #2B2745;
                color: #fff;
            }
        }

        .play-info-col {
            /*height: 1.9rem;*/
            background: #F6F5FA;
            border-radius: 2px;
            padding: 0 0.6rem;

            &:nth-child(odd) {
                margin-right: 0;
            }
        }

        .icon_triangle_detail{
            border: 5px solid transparent;
            border-radius: 3px;
            width: 0;
            height: 0;
            border-bottom-color: black;
            top: -2px;
        }

        .match-row {
            padding: 0.6rem 0;

            &.active {
                background: #E6E7F3;
                border-radius: 8px;
            }
        }

        .group-title {
            height: 1.6rem;
        }

        .bet-handicap, .bet-name {
            margin-right: 10px!important;
            color: #aaa;
        }
    }
</style>
