<template>
    <div class="notice bg-primary">
        <van-nav-bar
                style="background-color: transparent; color: #fff;"
                left-arrow
                :border="false"
                @click-left="$router.back()"
        >
            <template #title>
                <span class="white fs16">游戏公告</span>
            </template>
        </van-nav-bar>

        <div class="bg-gray p-l5 p-r5 full-height" style="border-radius: 0.6rem 0.6rem 0 0">
            <div class="flex-middle-only flex-end" style="height: 2.6rem;">
                <span class="m-r8 fs12 dark">日期: </span>
                <div class="flex-middle p-l16 p-r16 bg-white m-r16" style="height: 1.4rem;border-radius: 0.7rem"
                     @click="showCalendar = true">
                    <span class="m-r8 fs12">{{
                        format(startDate, 'yyyy年MM月dd日') === format(endDate, 'yyyy年MM月dd日') ?
                        format(endDate, 'yyyy年MM月dd日') : `${format(startDate, 'yyyy年MM月dd日')}~${format(endDate, 'yyyy年MM月dd日')}`
                        }}</span>
                    <i class="icon_triangle m-t4" style="border-top-color: #2B2745;"></i>
                </div>
            </div>

            <div class="bg-white" style="padding: 0 0.6rem;border-radius: 0.6rem 0.6rem 0 0;">
                <van-row class="under-line bg-white pd12 under-line">
                    <van-col :span="8"><span class="fs10">时间</span></van-col>
                    <van-col :span="16"><span class="fs10">内容</span></van-col>
                </van-row>
            </div>



            <div ref="list" class="bg-gray scroll-y" :style="{height: height + 'px'}">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                            v-model="loading"
                            :immediate-check="false"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                    >
                        <div class="bg-white" style="padding: 0 0.6rem;">
                            <van-row class="notice-content pd12 under-line dark" v-for="(item, j) in list" :key="j">
                                <van-col :span="8" class="fs14">{{item.time}}</van-col>
                                <van-col :span="16" class="fs12" v-html="item.content"></van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </div>
        </div>

        <van-calendar v-model="showCalendar"
                      type="range"
                      position="top"
                      :min-date="new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)"
                      :maxDate="new Date()"
                      @confirm="onConfirmDate" color="#3D385B"/>
    </div>
</template>
<script>
    import { format } from '../../../assets/js/util'
    import { getNotices } from '../../../axios/sport'
    export default {
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                height: 1,
                showCalendar: false,
                // startDate: format(new Date(), 'yyyy年MM月dd日'),
                startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // 默认近7天
                endDate: new Date()
            }
        },

        methods: {
            format(date, fmt) {
                return format(date, fmt)
            },

            onConfirmDate(date) {
                console.log('123123', date)
                this.startDate = date[0]
                this.endDate = date[1]
                this.showCalendar = false

                this.onLoad()
            },

            onLoad() {
                this.refreshing = true

                getNotices({
                    startDate: format(this.startDate, 'yyyy-MM-dd'),
                    endDate: format(this.endDate, 'yyyy-MM-dd'),
                    client: 'mobile'
                })
                    .then(res => {
                        if (res.code === 200) {
                            let arr = res.data
                            if (this.refreshing) {
                                this.list = arr.data;
                                console.log('list', this.list)
                                this.refreshing = false;
                            }

                            this.loading = false
                            this.finished = true

                            if (arr.length >= arr.count) {
                                this.finished = true;
                            }
                        }
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
            this.height = window.innerHeight - window.rem2px(2.6 + 2.3 + 2.2);
            this.onLoad()
        }
    }
</script>
<style type="text/css" lang="less">
    .notice {
        .van-nav-bar .van-icon {
            color: #fff;
        }

        .notice-content {
            &:last-child {
                border-bottom: none!important;
            }
        }

        .pd12 {
            padding: 0.6rem 0;
        }
    }
</style>
