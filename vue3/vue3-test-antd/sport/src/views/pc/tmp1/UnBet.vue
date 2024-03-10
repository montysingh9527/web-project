<template>
    <div class="un-bet re over-hidden" style="height:100%">
        <h3 class="fs20 dark" style="margin: 6px 0 16px 6px;">未结注单</h3>
        <div class="hide-scroll-bar" style="overflow-y: scroll" :style="{height: contentHeight}">
            <div v-for="item of list" :key="item.id" class="m-b8">
                <div class="flex-middle-only title bg-white">
                    <p class="collapse-line"></p>

                    <div class="flex-middle-only flex-start flex-1">
                        <span style="margin: 0 16px 0 4px;" class="dark fs14">
                            {{item.bet_type === '1' ? '单式' : item.bet_type === '2' ? aliasNum(item.children.length):''}}
                        </span>
                        <p class="fs12">
                            <span class="dark-light">下注时间: &nbsp;</span>
                            <span style="color: #3a3a3a;">{{format(Number(item.bet_time)*1000, 'yyyy-MM-dd hh:mm')}}</span>
                        </p>
                        <p class="fs12" style="margin-left: 10px;">
                            <span class="dark-light">注单号: &nbsp;</span>
                            <span style="color: #3a3a3a;">{{item.bet_no}}</span>
                        </p>
                    </div>

                    <div class="dark" style="margin-right:14px;">
<!--                        <span class="fs12 m-r16">注单状态: <span class="fs14">{{betState(item)}}</span></span>-->
                        <span class="fs12 m-r16" v-if="item.bet_type === '2'">赔率: <span class="fs14">@{{item.odds}}</span></span>
                        <span class="fs12">本金: </span> <span class="fs14">{{item.money}}</span>
                        <span style="margin-left:14px;" class="fs12">可赢: </span> <span class="fs14">{{item.except_bonus}}</span>
                    </div>
                </div>

                <!--thead-->
                <van-row style="height: 22px;background: #F6F5FA;" class="flex-middle-only p-l10 p-r10">
                    <van-col :span="2"><span class="fs10">体育项目</span></van-col>
                    <van-col :span="4"><span class="fs10">赛事</span></van-col>
                    <van-col :span="3"><span class="fs10">开赛时间</span></van-col>
                    <van-col :span="7"><span class="fs10">赛程</span></van-col>
                    <van-col :span="2"><span class="fs10">玩法</span></van-col>
                    <van-col :span="4"><span class="fs10">下注项目</span></van-col>
                    <van-col :span="2"><span class="fs10">赔率</span></van-col>
                </van-row>

                <!--tbody-->
                <div class="p-l10 p-r10 bg-white table-content fs12 re">
                    <van-row v-for="(child, i) in item.children"
                            v-if="putChildren(i, item.id)"
                            :key="i" class="under-line flex-middle-only">
                        <van-col :span="2">{{child.sport_name}}</van-col>
                        <van-col :span="4">{{child.league_name}}</van-col>
                        <van-col :span="3">{{format(Number(child.start_time)*1000, 'yyyy-MM-dd hh:mm')}}</van-col>
                        <van-col :span="7" class="flex">
                            <div style="max-width: 70%;">
                                {{child.home_name}} vs {{child.away_name}}
                            </div>
                            <div style="width: 80px;" :style="{color: matchStatus(child).color}">&nbsp;{{matchStatus(child).text}}</div>
                        </van-col>
                        <van-col :span="2">{{child.market_group_name}}</van-col>
                        <van-col :span="4">{{child.bet_content.replace(',', '/')}}</van-col>
                        <van-col :span="2">
                            @{{child.odds}}
                        </van-col>
                    </van-row>

                    <div class="re bg-white full-width" style="height: 40px;"
                         v-if="item.bet_type === '2'&& item.children.length > 2"
                    >
                        <div class="ab-middle-x bg-gray flex-middle"
                             @click="showMore(item.id)"
                             style="width: 98px;height: 28px;bottom:0;border-radius: 8px 8px 0 0;border: 1px solid #E6E7F3;">
                            <span v-if="!ids.includes(item.id)">查看更多 <i class="icon_base triangle m-l5"></i></span>
                            <span v-else>收起 <i class="icon_base triangle m-l5" style="transform: scaleY(-1);"></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin:100px auto;" class="center" v-if="!list.length">暂无数据!</div>
        </div>

        <div class="bottom-total ab flex-end fs12 p-r10 white flex-middle-only">
            <span>总下注: &nbsp;</span>
            <span>{{totalAmount}}</span>
            <span class="m-l20">可赢: &nbsp;</span>
            <span>{{totalBonus}}</span>
        </div>
    </div>
</template>
<script>
    import { aliasStatus } from '../../../common/config'
    import {getUnsettledBets} from '../../../axios/sport'
    import showMoreBetDetail from "../../../mixins/showMoreBetDetail";
    export default {
        mixins: [showMoreBetDetail],
        data() {
            return {
                contentHeight: window.innerHeight - 126 - 36 + 'px',
                list: [],
                totalBonus: 0,
                totalAmount: 0
            }
        },

        methods: {
            matchStatus(item) {
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
            _getUnsettledBets() {
                getUnsettledBets()
                    .then(res => {
                        if (res.code === 200) {
                            this.list = res.data

                            let a = 0
                            let b = 0
                            this.list.forEach(item => {
                                a += Number(item.money)
                                b += Number(item.except_bonus)
                            })

                            this.totalAmount = a.toFixed(2)
                            this.totalBonus = b.toFixed(2)
                        }
                    })
            }
        },

        created() {
            this.logo1 = require('../../../assets/images/tmp1/team_logo1.svg')
        },

        activated() {
            this._getUnsettledBets()
        }
    }
</script>
<style type="text/css" lang="less">
    .un-bet {
        .title {
            height: 48px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .table-content {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;

            > .van-row {
                height: 44px;

                &:last-child {
                    border-bottom: none;
                }
            }
        }

        .bottom-total {
            bottom: 0px;
            height: 36px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background: #2B2745;
            width: 100%;
        }
    }
</style>
