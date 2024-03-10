<template>
    <div class="bet-detail-pc-tmp2">
        <header class="game-info flex-middle white re">
            <div class="back-pre ab flex-middle cursor" @click="$router.back()">
                <img :src="require('../../../assets/images/tmp1/back.png')" alt="">
                <span class="fs10 origin-center" style="margin-left: 4px;">返回</span>
            </div>
            <van-row class="full-height flex-middle-only" style="width: 60%;">
                <van-col :span="10" class="flex-middle-only">
                    <load-image style="height: 46px" :src="match.home_logo"
                                :error="require('../../../assets/images/tmp1/team_logo1.svg')"/>
                    <span class="m-l16">{{match.home_name}}</span>
                </van-col>
                <van-col :span="4">
                    <div class="center" v-if="String(match_status) !== '1'">
                        <p class="fs14">
                            {{match.start_time ? format(match.start_time * 1000, 'yyyy-MM-dd') : '----'}}
                        </p>
                        <span class="fs20">{{match.start_time ? format(match.start_time * 1000, 'hh:mm') : '--:--'}}</span>
                    </div>
                    <div class="center" v-else>
                        <div class="fs12 center m-b8" v-if="String(match.status) === '1'">
                            <span class="fs10">{{match.timer && match.timer.period}}</span>
                            <count-down v-if="match.timer" class="fs12"
                                        :type="Number(sport) === 1 ? 'up' : 'down'"
                                        :time="Number((match.timer.tm || 0) * 60 + (Number(match.timer.ts) || 0))"
                                        :suspend="match.timer.tt"/>
                        </div>
                        <p class="fs12 center m-b8" v-else>
                            {{aliasStatus(match.status)}}
                        </p>
                        <p class="fs20">
                            <span>{{match.ss ? match.ss.split('-')[0]:''}}</span>
                            <span style="margin:0 4px;">-</span>
                            <span>{{match.ss ? match.ss.split('-')[1]:''}}</span>
                        </p>
                    </div>
                </van-col>

                <van-col :span="10" class="flex-middle-only flex-end">
                    <span class="m-r16 right">{{match.away_name}}</span>
                    <load-image style="height: 46px" :src="match.away_logo"
                                :error="require('../../../assets/images/tmp1/team_logo2.svg')"/>
                </van-col>
            </van-row>
        </header>

        <ul class="play-list flex-middle-only dark fs12">
            <li class="flex-middle cursor"
                :class="i === groupIndex ?'active' : ''"
                @click="selectPlay({...group, index: i})"
                v-for="(group, i) in market_tabs"
                :key="i">{{group.name}}
            </li>
        </ul>

        <ul id="play-info" class="play-info hide-scroll-bar"
            style="overflow-y: scroll;" v-if="Object.keys(group).length">
            <li class="bg-white" v-for="group of playList" :key="group.market_group_id">
                <div class="flex-between m-b16" style="padding-right: 20px;">
                    <div class="flex-middle-only">
                        <p class="collapse-line"></p>
                        <span class="dark">{{group.name}}</span>
                    </div>
                    <i class="icon_base" :class="group.top ? 'zhiding' : 'weizhiding'"
                       @click="_keepTop($event, group)"></i>
                </div>

                <!--让球-->
                <van-row v-if="group.code === 'asian_handicap'" class="flex-middle-only group-title">
                    <van-col :span="12" class="center fs12">{{match.home_name}}</van-col>
                    <van-col :span="12" class="center fs12">{{match.away_name}}</van-col>
                </van-row>

                <!--大小盘-->
                <div v-if="group.code === 'match_goals'" class="flex-middle-only">
                    <div class="group-bet-name full-height"></div>
                    <van-row  class="group-title flex-1 flex-middle-only">
                        <van-col :span="12" class="center fs12">高于</van-col>
                        <van-col :span="12" class="center fs12">低于</van-col>
                    </van-row>
                </div>


                <!--比赛投注/半场-->
                <div v-if="isMatchBetting(group.code)" class="flex-middle-only">
                    <div class="group-bet-name full-height"></div>
                    <van-row  class="group-title flex-1 flex-middle-only">
                        <van-col :span="12" class="center fs12 cles-1">{{match.home_name}}</van-col>
                        <van-col :span="12" class="center fs12 cles-1">{{match.away_name}}</van-col>
                    </van-row>
                </div>

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
                <van-row :gutter="4" style="padding:4px 16px;" v-if="group.code === 'full_time_result'">
                    <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v" style="margin-bottom: 4px;">
                        <div class="grid-content bg-dark flex-middle"
                             :class="activeClass(findPlay('name', v,  group.market_groups), match)"
                             v-if="findPlay('name', v,  group.market_groups).is_show === '1' && findPlay('name', v,  group.market_groups).is_suspend === '0'"
                             @click="_chooseBet(findPlay('name', v,  group.market_groups), group, match)"
                        >
                            <div class="fs12 cles-1">
                                <span>{{findPlay('name', v,  group.market_groups).header}}</span>
                                <span class="dark-light">{{findPlay('name', v,  group.market_groups).handicap}}</span>
                            </div>
                            <span class="m-l10">{{findPlay('name', v,  group.market_groups).odds}}</span>
                        </div>
                        <div v-else class="flex-middle bg-dark full-height full-width grid-content">
                            <i class="icon_base icon_lock"></i>
                        </div>
                    </van-col>
                </van-row>

                <!--让球-->
                <van-row :gutter="4" style="padding:4px 16px;" v-if="group.code === 'asian_handicap'">
                    <van-col :span="12" v-for="v of ['主队', '客队']" :key="v" style="margin-bottom: 4px;">
                        <div v-for="play of group.market_groups"
                             v-if="play.header === v"
                             :key="play.market_id"
                             style="margin-bottom: 4px;"
                             class="grid-content bg-dark"
                        >
                            <div class="flex-middle full-height"
                                 :class="activeClass(play, match)"
                                 v-if="play.is_show === '1' && play.is_suspend === '0'"
                                 @click="_chooseBet(play, group, match)"
                            >
                                <div class="fs12 cles-1 flex-1 right">
                                    <span class="dark-light">{{play.handicap.replace(',', '/')}}</span>
                                </div>
                                <div class="flex-1 left m-l10">{{play.odds}}</div>
                            </div>
                            <div v-else class="flex-middle full-height full-width">
                                <i class="icon_base icon_lock"></i>
                            </div>
                        </div>
                    </van-col>
                </van-row>

                <!--大小盘-->
                <div class="flex-middle-only" v-if="group.code === 'match_goals'">
                    <div class="group-bet-name full-height fs12" style="padding-left: 16px;">
                        {{group.market_groups[0] && group.market_groups[0].handicap && group.market_groups[0].handicap.replace(',', '/')}}
                    </div>
                    <van-row :gutter="4" class="flex-1" style="padding:4px 16px;" >
                        <van-col :span="12" v-for="v of ['大', '小']" :key="v" style="margin-bottom: 4px;">
                            <div class="grid-content bg-dark flex-middle"
                                 :class="activeClass(findPlay('header', v,  group.market_groups), match)"
                                 v-if="findPlay('header', v,  group.market_groups).is_show === '1' && findPlay('header', v,  group.market_groups).is_suspend === '0'"
                                 @click="_chooseBet(findPlay('header', v,  group.market_groups), group, match)"
                            >
                                <span>{{findPlay('header', v,  group.market_groups).odds}}</span>
                            </div>
                            <div v-else class="flex-middle bg-dark full-height full-width grid-content">
                                <i class="icon_base icon_lock"></i>
                            </div>
                        </van-col>
                    </van-row>
                </div>

                <!--全场比分-->
                <van-row :gutter="4" style="padding:4px 16px;" v-if="group.code === 'correct_score'">
                    <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v" style="margin-bottom: 4px;">
                        <div v-for="play of group.market_groups"
                             v-if="play.header === v"
                             :key="play.market_id"
                             style="margin-bottom: 4px;"
                             class="grid-content bg-dark"
                        >
                            <div class="flex-middle full-height"
                                 :class="activeClass(play, match)"
                                 v-if="play.is_show === '1' && play.is_suspend === '0'"
                                 @click="_chooseBet(play, group, match)"
                            >
                                <div class="fs12 cles-1 flex-1 right">
                                    <span class="dark-light">{{play.name}}</span>
                                </div>
                                <div class="flex-1 left m-l10">{{play.odds}}</div>
                            </div>
                            <div v-else class="flex-middle full-height full-width grid-content">
                                <i class="icon_base icon_lock"></i>
                            </div>
                        </div>
                    </van-col>
                </van-row>

                <!--半场比分-->
                <van-row :gutter="4" style="padding:4px 16px;" v-if="group.code === 'half_time_correct_score'">
                    <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v" style="margin-bottom: 4px;">
                        <div v-for="play of group.market_groups"
                             v-if="play.header === v"
                             :key="play.market_id"
                             style="margin-bottom: 4px;"
                             class="grid-content bg-dark"
                        >
                            <div class="flex-middle full-height"
                                 :class="activeClass(play, match)"
                                 v-if="play.is_show === '1' && play.is_suspend === '0'"
                                 @click="_chooseBet(play, group, match)"
                            >
                                <div class="fs12 cles-1 flex-1 right">
                                    <span class="dark-light">{{play.name}}</span>
                                </div>
                                <div class="flex-1 left m-l10">{{play.odds}}</div>
                            </div>
                            <div v-else class="flex-middle full-height full-width grid-content">
                                <i class="icon_base icon_lock"></i>
                            </div>
                        </div>
                    </van-col>
                </van-row>

                <!--比赛投注模板-->
                <div v-if="isMatchBetting(group.code)" style="padding:4px 16px;">
                    <div class="flex-middle-only">
                        <div class="group-bet-name full-height">
                            <span class="fs12">让分</span>
                        </div>
                        <van-row gutter="4" class="flex-1">
                            <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="full-height">
                                <div v-for="play of group.market_groups"
                                     v-if="play.header === v && play.name ==='Spread'"
                                     :key="play.market_id"
                                >
                                    <div class="flex-middle full-height grid-content bg-dark"
                                         :class="activeClass(play, match)"
                                         v-if="play.is_show === '1' && play.is_suspend === '0'"
                                         @click="_chooseBet(play, group, match)"
                                    >
                                        <span class="m-r8 fs12 dark-light">{{play.handicap}}</span>
                                        <span>{{play.odds}}</span>
                                    </div>
                                    <div v-else class="flex-middle play-info-col bg-gray full-height full-width grid-content">
                                        <i class="icon_base icon_lock"></i>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>

                    <div class="flex-middle-only">
                        <div class="group-bet-name full-height">
                            <span class="fs12">总分</span>
                        </div>
                        <van-row gutter="4" class="flex-1">
                            <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="full-height play-info-col">
                                <div v-for="play of group.market_groups"
                                     v-if="play.header === v && play.name ==='Total'"
                                     :key="play.market_id"
                                     class="grid-content"
                                >
                                    <div class="flex-middle full-height bg-dark"
                                         :class="activeClass(play, match)"
                                         v-if="play.is_show === '1' && play.is_suspend === '0'"
                                         @click="_chooseBet(play, group, match)"
                                    >
                                        <span class="m-r5 fs12 dark-light">{{v==='1'? '高于':'低于'}} {{play.handicap}}</span>
                                        <span>{{play.odds}}</span>
                                    </div>
                                    <div v-else class="flex-middle bg-gray full-height full-width">
                                        <i class="icon_base icon_lock"></i>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>

                    <div class="flex-middle-only">
                        <div class="group-bet-name full-height">
                            <span class="fs12">强弱盘赔率</span>
                        </div>
                        <van-row gutter="4" class="flex-1">
                            <van-col :span="12" v-for="v of ['1', '2']" :key="v" class="full-height play-info-col">
                                <div v-for="play of group.market_groups"
                                     v-if="play.header === v && play.name ==='Money Line'"
                                     :key="play.market_id"
                                >
                                    <div class="flex-middle full-height grid-content bg-dark"
                                         :class="activeClass(play, match)"
                                         v-if="play.is_show === '1' && play.is_suspend === '0'"
                                         @click="_chooseBet(play, group, match)"
                                    >
                                        <span>{{play.odds}}</span>
                                    </div>
                                    <div v-else class="flex-middle play-info-col bg-gray full-height full-width grid-content">
                                        <i class="icon_base icon_lock"></i>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>

                <!--让分3项-->
                <van-row gutter="4" class="flex-middle-only" style="padding:4px 16px;" v-if="group.code === 'basketball_point_spread_3_way'">
                    <van-col :span="8" v-for="v of ['1', 'x', '2']" :key="v">
                        <div class="grid-content bg-dark flex-middle full-height"
                             :class="activeClass(findPlay('header', v,  group.market_groups), match)"
                             v-if="findPlay('header', v,  group.market_groups).is_show === '1' && findPlay('header', v,  group.market_groups).is_suspend === '0'"
                             @click="_chooseBet(findPlay('header', v,  group.market_groups), group, match)"
                        >
                            <div class="fs12 cles-1">
                                <span class="dark-light m-r8">{{findPlay('header', v,  group.market_groups).handicap}}</span>
                            </div>
                            <span>{{findPlay('header', v,  group.market_groups).odds}}</span>
                        </div>
                        <div v-else class="flex-middle play-info-col bg-gray full-height full-width grid-content">
                            <i class="icon_base icon_lock"></i>
                        </div>
                    </van-col>
                </van-row>
            </li>
        </ul>
        <div class="flex-middle dark-light" style="height:  200px;" v-if="!market_tabs.length">暂无数据!</div>
    </div>
</template>
<script>
    import betDetail from "../../../mixins/betDetail";
    import CountDown from "../../../common/CountDown";
    import LoadImage from "../../../common/LoadImage";
    import Play from "../../../components/Play";

    export default {
        mixins: [betDetail],

        components: {
            CountDown,
            LoadImage,
            Play
        },

        mounted() {
            this.$nextTick(() => {
                let dom = document.getElementById('play-info');

                if (dom) {
                    let top = dom.getBoundingClientRect().top;

                    // console.log('dom.getBoundingClientRect() =', dom.getBoundingClientRect())
                    // console.log('innerHeight', window.innerHeight)
                    dom.style.height = window.innerHeight - top + 'px';

                    window.addEventListener('resize', () => {
                        dom.style.height = window.innerHeight - top + 'px';
                    })
                }
            })
        }
    }
</script>
<style type="text/css" lang="less">
    .bet-detail-pc-tmp2 {
        min-width: 990px;

        .game-info {
            height: 98px;
            background-image: url("../../../assets/images/tmp1/game_info_bg.png");
            background-size: 100% 100%;
        }

        .play-list {
            margin: 12px 0;
            padding-left: 4px;

            > li {
                border-radius: 14px;
                height: 28px;
                margin-right: 12px;
                background: #fff;
                padding: 8px 20px;

                &.active {
                    background: #2B2745;
                    color: #fff;
                }
            }
        }

        .play-info {
            /*border-radius: 8px;*/

            &::-webkit-scrollbar {
                width: 0;
            }

            > li {
                border-radius: 8px;
                padding-top: 16px;
                margin-bottom: 8px;
            }

            .bg-dark {
                background: #F6F5FA;
                border-radius: 2px;
                height: 30px;
            }

            .grid-content {
                cursor: pointer;
                background: #F6F5FA;
                border-radius: 2px;
                height: 30px;
                margin-bottom: 4px;
            }
        }

        .zhiding {
            height: 12px;
            width: 12px;
            background: url('../../../assets/images/tmp1/zhiding.png');
        }

        .back-pre {
            left: 0;
            top: 0;
            background-color: #2B2745;
            width: 61px;
            height: 26px;
            border-radius: 8px 0 8px 0;
        }

        .group-title {
            height: 1.6rem;
        }

        .group-bet-name {
            width: 140px;
        }
    }
</style>
