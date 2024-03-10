<template>
    <div class="un-bet bg-primary">
        <van-nav-bar
                style="background-color: transparent; color: #fff;"
                left-arrow
                :border="false"
                @click-left="$router.back()"
        >
            <template #title>
                <span class="white fs16">未结注单</span>
            </template>
        </van-nav-bar>

        <div ref="list" style="border-radius: 0.6rem 0.6rem 0 0;overflow-y: scroll;background-color: #E6E7F3;"
             :style="{height: height + 'px'}">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :immediate-check="false"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="un-bet-content" v-for="(item, j) in list" :key="j">
                        <div class="header re">
                            <div class="dark flex-between">
                                <span class="fs14 m-l16">
                                    {{item.bet_type === '1' ? '单式' : item.bet_type === '2' ? aliasNum(item.children.length):''}}
                                </span>
                                <p class="m-r16">
                                    <span class="m-r16" v-if="item.bet_type === '2'">
                                        <span class="fs10">赔率:</span>
                                        <span class="fs14"> @{{item.odds}}</span>
                                    </span>

                                    <span class="fs10">本金: </span> <span class="fs14">{{item.money}}</span>
                                    <span class="fs10 m-l16">可赢: </span> <span class="fs14">{{item.except_bonus}}</span>
                                </p>
                            </div>
<!--                            <p class="flex-middle-only dark-light lh-20">-->
<!--                                <span class="fs12 m-l16">注单状态: <span class="fs12">{{betState(item)}}</span> </span>-->
<!--                            </p>-->
                            <p class="flex-between dark-light m-t4">
                                <span class="m-l16 fs12">下注时间: {{format(Number(item.bet_time)*1000, 'yyyy-MM-dd hh:mm')}}</span>
                                <span class="m-r16 fs12">注单号: {{item.bet_no}}</span>
                            </p>
                        </div>

                        <ul class="m-l5 m-r5 bg-white radius7 m-t8">
                            <li v-for="(game, i) of item.children"
                                :class="i !== (item.children.length - 1) ? 'under-line':''"
                                v-if="putChildren(i, item.id)"
                                :key="i">
                                <div class="flex-between dark-light">
                                    <div class="m-b8 flex-middle-only">
                                        <div :class="game.sport_id === '1' ? 'football-icon': 'basketball-icon'"></div>
                                        <span class="fs10 m-l5">{{game.league_name}}</span>
                                    </div>

                                    <span class="fs12">{{format(Number(game.start_time)*1000, 'yyyy-MM-dd hh:mm')}}</span>
                                </div>

                                <div class="flex-between">
                                    <div class="dark full-width">
                                        <p class="fs12">{{game.bet_content.replace(',', '/')}}</p>
                                        <p>
                                            <span class="fs10">{{game.market_group_name}}</span>
                                        </p>
                                        <p class="dark-light" style="max-width: 85%;">
                                            <span class="fs12">
                                                {{game.home_name}} vs {{game.away_name}}
                                            </span>

                                            <span class="fs12 m-l8" :style="{color: _matchStatus(game).color}">
                                                {{_matchStatus(game).text}}
                                            </span>
                                        </p>
                                    </div>

                                    <span>
                                        <span class="fs14">@{{game.odds}}</span>
                                    </span>

                                </div>
                            </li>

                            <li class="re bg-white" style="height: 40px;"
                                v-if="item.bet_type === '2'&& item.children.length > 2"
                            >
                                <div class="ab-middle-x bg-gray flex-middle fs12"
                                     @click="showMore(item.id)"
                                     style="width: 4.9rem;height: 1.4rem;bottom:0;border-radius: 8px 8px 0 0;border: 1px solid #E6E7F3;">
                                    <span v-if="!ids.includes(item.id)">查看更多 <i class="icon_base triangle m-l5"></i></span>
                                    <span v-else>收起 <i class="icon_base triangle m-l5" style="transform: scaleY(-1);"></i></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="white flex-end flex-middle-only" style="height: 1.8rem;">
            <span class="fs14 m-r16">总下注: {{totalAmount.toFixed(2)}}</span>
            <span class="fs14 origin-right m-r16">可赢: {{totalBonus.toFixed(2)}}</span>
        </div>
    </div>
</template>
<script>
    import {getUnsettledBets} from '../../../axios/sport'
    import showMoreBetDetail from "../../../mixins/showMoreBetDetail";
    import {aliasStatus} from "../../../common/config";
    export default {
        mixins: [showMoreBetDetail],
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                height: 1000,
                totalBonus: 0,
                totalAmount: 0
            }
        },

        methods: {
            _matchStatus(item) {
                // 如果比赛在进行中
                if (item.match_status === '1') {
                    return {
                        text: item.bet_extend ? `[滚球: ${item.bet_extend}]` : '',
                        color: `#3388FF`
                    }
                } else if (item.match_status === '2') {
                    return {
                        text: `[比赛确认中]`,
                        color: `#3388FF`
                    }
                } else if (item.match_status === '3') {
                    return {
                        text: item.bet_extend ? `[滚球: ${item.bet_extend}]` : item.ss ? `[滚球: ${item.ss}]` : '',
                        color: `#3388FF`
                    }
                }

                return {
                    text: `[${aliasStatus(item.match_status)}]`,
                    color: `#F13F40`
                }
            },

            onLoad() {
                getUnsettledBets()
                    .then(res => {
                        if (this.refreshing) {
                            this.list = [];
                            this.refreshing = false;
                        }

                        if (res.code === 200) {
                            this.list = res.data
                            this.totalAmount = 0
                            this.totalBonus = 0

                            this.list.forEach(item => {
                                this.totalAmount += Number(item.money)
                                this.totalBonus += Number(item.except_bonus)
                            })
                        }

                        this.finished = true;

                        this.loading = false;
                    })
                    .catch(err => {
                        this.finished = true;

                        this.loading = false;
                    })
            },

            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            }
        },

        mounted() {
            this.onLoad()
            setTimeout(() => {
                this.height = window.innerHeight - this.$refs.list.getBoundingClientRect().y - window.rem2px(1.8);
            }, 100)
        }
    }
</script>
<style type="text/css" lang="less">
    .un-bet {
        .van-nav-bar .van-icon {
            color: #fff;
        }

        .un-bet-content {
            border-radius: 12px 12px 0 0;
            padding-top: 0.8rem;

            ul > li {
                margin: 0 0.6rem;
                padding: 0.4rem 0;

                &:last-child {
                    border-bottom: none !important;
                }
            }

            > .header {
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 0.2rem;
                    height: 2.1rem;
                    background-color: #2B2745;
                    left: 0;
                    border-radius: 0 2px 2px 0;
                }
            }
        }
    }
</style>
