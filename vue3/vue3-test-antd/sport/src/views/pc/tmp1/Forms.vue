<template>
    <div class="forms re over-hidden" style="height:100%">
        <h3 class="dark flex-between" style="margin: 6px 0 16px 6px;">
            <span class="fs20">已结注单</span>
            <div class="re flex-middle-only">
                <span class="fs12">日期 :</span>

                <div class="center select-date select-box fs14 bg-white re"
                     @click="showDatePicker = true">
                    <span class="fs12 m-r8" style="color: #2E2A44;">
                        {{start_date + '&nbsp;~&nbsp;' + end_date}}
                    </span>
                    <i class="icon_base triangle"></i>
                </div>
            </div>
        </h3>
        <div class="hide-scroll-bar" style="overflow-y: scroll" :style="{height: contentHeight}">
            <div class="lh-45 center" v-if="!list.length && !loading">暂无数据!</div>
            <div v-for="item of list" :key="item.id" class="m-b8">
                <div class="flex-middle-only title bg-white">
                    <p class="collapse-line"></p>

                    <div class="flex-middle-only flex-start flex-1">
                        <span style="margin: 0 16px 0 4px;" class="dark fs14">
                            {{item.bet_type === '1' ? '单式' : item.bet_type === '2' ? aliasNum(item.children.length):''}}
                        </span>
                        <p class="fs12 m-r8">
                            <span class="dark-light">下注时间: &nbsp;</span>
                            <span style="color: #3a3a3a;">{{format(item.bet_time * 1000, 'yyyy-MM-dd hh:mm')}}</span>
                        </p>
                        <p class="fs12">
                            <span class="dark-light">注单号: &nbsp;</span>
                            <span style="color: #3a3a3a;">{{item.bet_no}}</span>
                        </p>
                    </div>

                    <div class="dark fs14" style="margin-right:14px;">
<!--                        <span class="fs12 m-r16">注单状态: <span class="fs14">{{betState(item)}}</span></span>-->
                        <span class="fs12 m-r16" v-if="item.bet_type === '2'">赔率: <span class="fs14">@{{item.odds}}</span></span>
                        <span class="fs12">本金: </span> <span class="fs14">{{item.money}}</span>
                        <span style="margin-left:14px;" class="fs12">结果: </span>
                        <span class="fs14" :style="{color:betStatus(item).color}">
                            {{betStatus(item).text}}
                        </span>
                    </div>
                </div>

                <!--thead-->
                <van-row style="height: 22px;background-color: #F6F5FA;" class="flex-middle-only p-l10 p-r10">
                    <van-col :span="2"><span class="fs10">体育项目</span></van-col>
                    <van-col :span="4"><span class="fs10">赛事</span></van-col>
                    <van-col :span="3"><span class="fs10">开赛时间</span></van-col>
                    <van-col :span="7"><span class="fs10">赛程</span></van-col>
                    <van-col :span="2"><span class="fs10">玩法</span></van-col>
                    <van-col :span="4"><span class="fs10">下注项目</span></van-col>
                    <van-col :span="2"><span class="fs10">赔率</span></van-col>
                </van-row>

                <!--tbody-->
                <div class="p-l10 p-r10 bg-white table-content fs12">
                    <van-row v-for="(detail, i) of item.children"
                            v-if="putChildren(i, item.id)"
                            :key="detail.id" class="under-line flex-middle-only">
                        <van-col :span="2">{{detail.sport_name}}</van-col>
                        <van-col :span="4">{{detail.league_name}}</van-col>
                        <van-col :span="3">{{format(detail.start_time * 1000, 'yyyy-MM-dd hh:mm')}}</van-col>
                        <van-col :span="7" class="flex">
                            <div style="max-width: 60%;">
                                {{detail.home_name}} vs {{detail.away_name}}
                            </div>
                            <div style="width: 80px;color: #3388FF;">
                                {{detail.is_inplay === '1' ? `[滚球: ${detail.bet_extend}]` : ''}}
                            </div>
                        </van-col>
                        <van-col :span="2">{{detail.market_group_name}}</van-col>
                        <van-col :span="4">{{detail.bet_content.replace(',', '/')}}</van-col>
                        <van-col :span="2">
                            @{{detail.odds}}
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
        </div>

        <div class="flex-middle" style="height: 48px;">
            <van-pagination v-model="page"
                            :items-per-page="pageSize"
                            :total-items="totalPage"
                            @change="handleCurrentChange"
                            :show-page-size="10">
                <template #prev-text>
                    <van-icon name="arrow-left" />
                </template>
                <template #next-text>
                    <van-icon name="arrow" />
                </template>
                <template #page="{ text }">{{ text }}</template>
            </van-pagination>
        </div>

        <div class="bottom-total ab flex-end fs12 p-r10 white flex-middle-only">
            <span>总下注: &nbsp;</span>
            <span>{{totalAmount || 0}}</span>
            <span class="m-l20">总输赢: &nbsp;</span>
            <span :style="{color: Number(totalWin) > 0 ? '#F13F40' : '#00BF8B'}">{{Number(totalWin) > 0 ? `+${totalWin}`: totalWin}}</span>
        </div>

        <van-calendar v-model="showDatePicker"
                      :style="{
                                    height: '500px',width: '300px',top: '125px',right: '20px', left:'auto',
                                    borderRadius: 0
                                  }"
                      type="range"
                      confirm-text="确认日期更改"
                      :show-title="false"
                      :row-height="50"
                      position="top"
                      :min-date="new Date(new Date().getTime() - 24 * 3600000 * 60)"
                      :max-date="new Date(new Date().getTime() + 24 * 3600000)"
                      @close="showDatePicker = false"
                      @confirm="_handlerChange" color="#19162d"/>
    </div>
</template>
<script>
    import {format} from "../../../assets/js/util";
    import {getBetHistory} from "../../../axios/sport";
    import showMoreBetDetail from "../../../mixins/showMoreBetDetail";

    export default {
        mixins: [showMoreBetDetail],
        data() {
            return {
                contentHeight: window.innerHeight - 126 - 36 - 50 + 'px',
                start_date: format(new  Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), 'yyyy-MM-dd'),
                end_date: format(new Date(), 'yyyy-MM-dd'),
                list: [],
                loading: false,
                totalAmount: 0, // 总投注
                totalWin: 0, // 总输赢
                pickerDate: [new  Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), new Date()],
                showDatePicker: false,
                page: 1,
                pageSize: 20,
                totalPage: 1,
            }
        },

        methods: {

            handleSizeChange(pageSize) {
                console.log('pageSize', pageSize, this.pageSize)
                this.pageSize = pageSize

                this._getBetHistory()
            },

            handleCurrentChange(page) {
                this.page = page

                this._getBetHistory()
            },

            _getBetHistory() {
                let params = {
                    pageSize: this.pageSize,
                    page: this.page,
                    start_date: this.start_date,
                    end_date: this.end_date
                }

                this.loading = true

                getBetHistory(params)
                    .then(res => {
                        this.loading = false
                        if (res.code === 200) {
                            this.totalPage = Number(res.data.count)
                            this.list = res.data.data
                            this.totalWin = res.data.totalWin
                            this.totalAmount = res.data.totalAmount
                        }
                    })
                    .catch(err =>  {
                        this.loading = false
                    })
            },

            _handlerChange(date) {
                console.log('_handlerChange', date)
                this.start_date = format(date[0], 'yyy-MM-dd')
                this.end_date = format(date[1], 'yyy-MM-dd')
                this.showDatePicker = false
                this._getBetHistory()
            }
        },

        mounted() {
            this._getBetHistory()
        },

        created() {
            this.options = {
                disabledDate: date =>  date.getTime() > new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
            }

            window.addEventListener('resize', () => {
                this.contentHeight = Math.max(window.innerHeight - 126 - 36 - 50, 20) + 'px'
            })
        }
    }
</script>
<style type="text/css" lang="less">
    .forms {
        .select-date {
            /*width: 97px;*/
            margin: 0 8px 0 8px;
            padding: 0 20px;
        }

        .date-picker-box {
            overflow: hidden;
            width: 97px;
            height: 30px;
            top: 0;
            opacity: 0;
        }

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

        .van-overlay {
            background-color: rgba(0,0,0,0.1) !important;
        }

        .van-pager {
            li.active {
                background: #2b2745!important;
            }
        }

        /***分页**/
        .van-pagination {
            font-size: 12px;
            .van-pagination__item {
                color: #2b2745;
                background-color: #f4f4f5;

                min-width: auto;
                height: 24px;
                padding: 0 10px;
                border-radius: 2px;
                margin: 0 4px;
                &.van-pagination__item--active {
                    background-color: #2b2745!important;
                    color: #f4f4f5!important;
                }
            }
            .van-pagination__item::after {
                border-width: 0;
            }
        }
    }
</style>
