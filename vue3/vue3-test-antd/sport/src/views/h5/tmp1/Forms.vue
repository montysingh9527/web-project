<template>
    <div class="forms bg-primary">
        <van-nav-bar
                style="background-color: transparent; color: #fff;"
                left-arrow
                :border="false"
                @click-left="$router.back()"
        >
            <template #title>
                <span class="white fs16">已结注单</span>
            </template>
        </van-nav-bar>

        <div class="flex-middle-only flex-end bg-white" style="border-radius: 0.6rem 0.6rem 0 0;height: 2.6rem;">
            <span class="m-r8 fs12 white">日期: </span>
            <div class="flex-middle p-l16 p-r16 bg-gray m-r16" style="height: 1.4rem;border-radius: 0.7rem"
                 @click="showCalendar = true">
                <span class="m-r8 fs12">{{format(start_date, 'MM月dd日') + '~' + format(end_date, 'MM月dd日')}}</span>
                <i class="icon_triangle m-t4" style="border-top-color: #2B2745;"></i>
            </div>
        </div>

        <div ref="list" style="overflow-y: scroll;background: #e6e7f2;" :style="{height: height + 'px'}">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :immediate-check="false"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="forms-content" v-for="(item, j) in list" :key="j">
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
                                    <span class="fs10 m-l16">结果: </span>
                                    <span class="fs14" :style="{color: betStatus(item).color}">
                                        {{betStatus(item).text}}
                                    </span>
                                </p>
                            </div>

                            <p class="flex-between dark-light m-t4">
                                <span class="m-l16 fs12">下注时间: {{format(item.bet_time * 1000, 'yyyy-MM-dd hh:mm')}}</span>
                                <span class="m-r16 fs12">注单号: {{item.bet_no}}</span>
                            </p>
<!--                            <p class="flex-between dark-light m-t4">-->
<!--                                <span class="fs12 m-l16">注单状态: <span class="fs12">{{betState(item)}}</span> </span>-->
<!--                            </p>-->
                        </div>

                        <ul class="m-l5 m-r5 bg-white radius7 m-t8">
                            <li :class="i !== (item.children.length - 1) ? 'under-line':''"
                                 v-if="putChildren(i, item.id)"
                                v-for="(game, i) of item.children" :key="i">
                                <div class="flex-between dark-light">
                                    <div class="m-b8 flex-between full-width">
                                        <div class="flex-middle-only">
                                            <div :class="game.sport_id === '1' ? 'football-icon': 'basketball-icon'"></div>
                                            <span class="fs10 m-l5">{{game.league_name}}</span>
                                        </div>

                                        <span class="fs10 origin-right">{{format(game.start_time * 1000, 'yyyy-MM-dd hh:mm')}}</span>
                                    </div>

                                    <span class="fs10 origin-right">{{game.gameTime}}</span>
                                </div>

                                <div class="flex-between">
                                    <div class="dark">
                                        <p class="fs14">{{game.bet_content.replace(',', '/')}}</p>
                                        <p><span class="fs10">{{game.market_group_name}}</span></p>
                                        <p class="dark-light fs12">
                                            <span>{{game.home_name}} vs {{game.away_name}}</span>
                                            <span style="color: #3388FF;">{{game.is_inplay === '1' ? `[滚球: ${game.bet_extend}]` : ''}}</span>
                                        </p>
                                    </div>

                                    <span>@{{game.odds}}</span>
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
            <span class="fs14 m-r16">总下注: {{totalAmount}}</span>
            <span class="fs14 m-r16">总输赢: {{totalWin}}</span>
        </div>

        <van-calendar v-model="showCalendar"
                      position="top"
                      type="range"
                      :min-date="new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)"
                      :maxDate="new Date(new Date().getTime() + 1000 * 60 * 60 * 24)"
                      @confirm="onConfirmDate" color="#3D385B"/>
    </div>
</template>
<script>
    import {getBetHistory} from '../../../axios/sport'
    import showMoreBetDetail from "../../../mixins/showMoreBetDetail";
    export default {
        mixins: [showMoreBetDetail],
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                height: 1000,
                showCalendar: false,
                theDate: this.format(new Date(), 'MM月dd日'),
                start_date: this.format(new Date().getTime() - 1000 * 60 * 60 * 24 * 7, 'yyyy-MM-dd'),
                end_date: this.format(new Date(), 'yyyy-MM-dd'),
                page: 1,
                totalAmount: 0, // 总投注
                totalWin: 0, // 总输赢
            }
        },

        methods: {
            _getBetHistory() {
                let params = {
                    pageSize: 20,
                    page: this.page,
                    start_date: this.format(this.start_date, 'yyyy-MM-dd'),
                    end_date: this.format(this.end_date, 'yyyy-MM-dd')
                }

                return getBetHistory(params)
            },

            onConfirmDate(date) {
                this.start_date = date[0]
                this.end_date = date[1]
                this.showCalendar = false

                this.onRefresh()
            },

            onLoad() {
                this._getBetHistory()
                    .then((res) => {
                        if (this.refreshing) {
                            this.list = [];
                            this.page = 1
                            this.refreshing = false;
                        }

                        if (res.code === 200) {
                            this.list = [...this.list, ...res.data.data]
                            this.totalAmount = res.data.totalAmount
                            this.totalWin = res.data.totalWin
                            this.page++

                            if (this.list.length >= Number(res.data.count)) {
                                this.finished = true;
                            }
                        }

                        this.loading = false;

                        console.log('this.list', this.list)
                    })
            },

            onRefresh() {
                // 清空列表数据
                this.finished = false
                this.refreshing = true
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true

                this.page = 1
                this.onLoad()
            }
        },

        mounted() {
            setTimeout(() => {
                this.height = window.innerHeight - this.$refs.list.getBoundingClientRect().y - window.rem2px(1.8);

            }, 100)
            this.onLoad()
        }
    }
</script>
<style type="text/css" lang="less">
    .forms {
        .van-nav-bar .van-icon {
            color: #fff;
        }

        .forms-content {
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
                    height: 2rem;
                    background-color: #2B2745;
                    left: 0;
                    border-radius: 0 2px 2px 0;
                }
            }
        }
    }
</style>
