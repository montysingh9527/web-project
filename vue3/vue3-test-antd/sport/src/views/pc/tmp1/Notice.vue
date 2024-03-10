<template>
    <div class="notice">
        <h3 class="dark flex-between" style="margin: 6px 0 16px 6px;">
            <span class="fs20">游戏公告</span>
            <div class="re flex-middle-only">
                <span class="fs12">日期 :</span>

                <div class="center select-date select-box fs12 bg-white re"
                     @click="showDatePicker = true">
                    <span class="fs12 m-r8" style="color: #2E2A44;">{{startDate}}~{{endDate}}</span>
                    <i class="icon_base triangle"></i>
                </div>
            </div>
        </h3>

        <div>
            <van-row style="background-color: #f6f5fa">
                <van-col :span="4"><span class="fs10 m-l16">时间</span></van-col>
                <van-col :span="20"><span class="fs10 m-l16">内容</span></van-col>
            </van-row>

            <div class="bg-white hide-scroll-bar" style="overflow-y: scroll;" :style="{height: contentHeight}">
                <van-row class="fs12 m-r16 m-l16 message-item" v-for="item of list" :key="item.id">
                    <van-col :span="4">{{item.time}}</van-col>
                    <van-col :span="20" v-html="item.content"></van-col>
                </van-row>
            </div>

            <div v-if="!list.length" class="lh-45 center">
                暂无公告!
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
                      @confirm="_changeDate" color="#19162d"/>
    </div>
</template>
<script>
    import {format} from "../../../assets/js/util";
    import { getNotices } from '../../../axios/sport'
    export default {
        data() {
            return {
                list: [{}],
                contentHeight: window.innerHeight - 200 + 'px',
                page: 1,
                pageSize: 20,
                totalPage: 1,
                showDatePicker: false,
                startDate: format(new Date(new Date().getTime() - 24 * 7 * 3600000), 'yyyy-MM-dd'),
                endDate: format(new Date(), 'yyyy-MM-dd')
            }
        },

        methods: {
            handleSizeChange(pageSize) {
                console.log('pageSize', pageSize, this.pageSize)
                this.pageSize = pageSize

                this._getNotices()
            },

            handleCurrentChange(page) {
                console.log('page', page,  this.page)
                this.page = page

                this._getNotices()
            },

            _getNotices() {
                let params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    client: 'pc'
                }

                getNotices(params)
                    .then(res => {
                        this.list = res.data.data;
                        this.totalPage = Number(res.data.count)
                    })
            },

            _changeDate(date) {
                console.log(date)
                this.startDate = format(date[0], 'yyyy-MM-dd')
                this.endDate = format(date[1], 'yyyy-MM-dd')
                this.showDatePicker = false
                this._getNotices()
            },

            format(date, fmt) {
                return format(date, fmt)
            }
        },

        mounted() {
            this._getNotices()
        },

        created() {
            this.options = {
                disabledDate: date =>  date.getTime() >= new Date().getTime()
            }

            window.addEventListener('resize', () => {
                this.contentHeight = Math.max(window.innerHeight - 200, 20)
            })
        }
    }
</script>
<style type="text/css" lang="less">
    .notice {
        .select-date {
            margin: 0 8px 0 8px;
            padding: 0 16px;
        }

        .van-overlay {
            background-color: rgba(0,0,0,0.1) !important;
        }

        .date-picker-box {
            overflow: hidden;
            width: 97px;
            height: 30px;
            top: 0;
            opacity: 0;
        }

        .message-item {
            padding: 12px 0;
            border-bottom: 1px solid #E6E7F3;
            &:last-child {
                border-bottom: none;
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

        .van-pager {
            li.active {
                background: #2b2745!important;
            }
        }
    }
</style>
