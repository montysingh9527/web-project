<template>
    <div class="h5-result">
        <div class="flex-middle-only picker-bar">
            <div class="flex-middle-only" style="margin:0 0.6rem;">
                <span class="m-r8 fs12">赛事: </span>
                <div class="flex-middle bg-white"
                     style="width:5.5rem;height:1.4rem;border-radius: 0.7rem;padding: 0 0.7rem;"
                     @click="showPicker = true">
                    <span class="m-r8 fs12 cles-1">{{league.name}}</span>
                    <i class="icon_triangle m-t4" style="border-top-color: #2B2745;"></i>
                </div>
            </div>

            <div class="flex-middle-only">
                <span class="m-r8 fs12">日期: </span>
                <div class="flex-middle country-box bg-white"
                     style="width:7.5rem;height:1.4rem;border-radius: 0.7rem;padding: 0 0.7rem;"
                     @click="showCalendar = true">
                    <span class="m-r8 fs12">{{format(startDate, 'MM月dd日')}}~{{format(endDate, 'MM月dd日')}}</span>
                    <i class="icon_triangle m-t4" style="border-top-color: #2B2745;"></i>
                </div>
            </div>
        </div>

        <div ref="list" class="bg-gray hide-scroll-bar" style="overflow-y: scroll;"
             :style="{height: scrollHeight + 'px'}">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :immediate-check="false"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="bg-white m-b8" style="border-radius: 0.4rem;" v-for="(item, j) in list"
                         :key="j">
                        <div class="flex-middle-only under-line lh-40">
                            <p class="collapse-line" style="margin-right: 0.4rem;"></p>
                            <load-image :src="item.league_logo"
                                        v-if="item.sport_id === '1'"
                                        :error="require('../../../assets/images/tmp1/ruqiushu_big.png')"/>
                            <div class="basketball-icon" v-if="item.sport_id === '18'"></div>
                            <span class="fs12 m-l5">{{item.league_name}}</span>
                        </div>


                        <ul class="p-l16 p-r16">
                            <li class="re" :class="i !== item.children.length - 1 ? 'under-line' : ''"
                                v-for="(child, i) in item.children" :key="i" style="padding: 0.4rem 0;">
                                <div class="flex-between" @click.stop="_showResultDetail(j, i)">
                                    <div class="fs12 flex-1">
                                        <p class="flex-between dark-light lh-20">
                                            <span>{{format(child.start_time * 1000, 'yyyy-MM-dd hh:mm')}}</span>
                                            <span>{{child.status_name}}</span>
                                        </p>
                                        <p class="flex-between dark">
                                            <span>{{child.home_name}}</span>
                                            <span v-if="child.status !== 5 && child.sport_id === '1' && child.scores">{{child.scores.full && child.scores.full.home}}</span>
                                            <span v-else-if="child.status !== 5 && child.sport_id === '18'">{{child.scores && child.scores['7'].home}}</span>
                                            <span v-else>-</span>
                                        </p>

                                        <p class="flex-between dark">
                                            <span>{{child.away_name}}</span>
                                            <span v-if="child.status !== 5 && child.sport_id === '1' && child.scores">{{child.scores.full && child.scores.full.away}}</span>
                                            <span v-else-if="child.status !== 5 && child.sport_id === '18'">{{child.scores && child.scores['7'].away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </div>
                                    <i class="van-icon van-icon-arrow van-cell__right-icon m-l10"
                                       :class="detailIndex.indexOf(`${j}-${i}`) > -1 ? 'rotate90' : ''"
                                       style="font-size: 14px;color: #000;transition: transform .2s linear;"></i>
                                </div>

                                <van-row class="bg-gray fs12 over-hidden height-transition m-t8"
                                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1"
                                         v-if="child.sport_id === '1'"
                                         style="border-radius: 0.2rem;border: 1px solid #E6E7F3;">
                                    <van-col :span="8">
                                        <p class="center under-line lh-30">上半场比分</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5 && child.scores && child.scores.full">{{child.scores.half.home}} - {{child.scores.half.away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="8">
                                        <p class="center under-line lh-30">最终赛果</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5 && child.scores && child.scores.full">
                                                {{child.scores.full.home}} - {{child.scores.full.away}}
                                            </span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="8">
                                        <p class="center under-line lh-30">状态</p>
                                        <p class="center lh-30">{{child.status_name}}</p>
                                    </van-col>
                                </van-row>
                                <van-row class="bg-gray fs12 over-hidden height-transition m-t8"
                                         v-show="detailIndex.indexOf(`${j}-${i}`) > -1"
                                         v-if="child.sport_id === '18'"
                                         style="border-radius: 0.2rem;border: 1px solid #E6E7F3;">
                                    <van-col :span="4">
                                        <p class="center under-line lh-30">第一节</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5 && child.sport_id === '18'">{{child.scores['1'].home}} - {{child.scores['1'].away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="4">
                                        <p class="center under-line lh-30">第二节</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5">{{child.scores['2'].home}} - {{child.scores['2'].away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="4">
                                        <p class="center under-line lh-30">上半场</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5">{{child.scores['3'].home}} - {{child.scores['3'].away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="4">
                                        <p class="center under-line lh-30">第三节</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5">{{child.scores['4'].home}} - {{child.scores['4'].away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="4">
                                        <p class="center under-line lh-30">第四节</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5">{{child.scores['5'].home}} - {{child.scores['5'].away}}</span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                    <van-col :span="4">
                                        <p class="center under-line lh-30">加时赛</p>
                                        <p class="center lh-30">
                                            <span v-if="child.status !== 5 && child.scores">
                                                {{child.scores['6'].home}} - {{child.scores['6'].away}}
                                            </span>
                                            <span v-else>-</span>
                                        </p>
                                    </van-col>
                                </van-row>
                            </li>
                        </ul>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>

        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                    show-toolbar
                    :columns="leagues"
                    value-key="name"
                    @cancel="showPicker = false"
                    @confirm="onConfirmLeague"
            />
        </van-popup>

        <van-calendar v-model="showCalendar" type="range"
                      position="top"
                      :min-date="new Date(new Date().getTime() - 24 * 3600000 * 60)"
                      :max-date="new Date(new Date().getTime() + 24 * 3600000)"
                      @confirm="onConfirmDate" color="#3D385B"/>
    </div>
</template>
<script>
    import LoadImage from "../../../common/LoadImage";
    import {format} from "../../../assets/js/util";
    import {getMatchHistory} from "../../../axios/sport";

    export default {
        data() {
            return {
                showPicker: false,
                showCalendar: false,
                category: 'result',
                sportId: '1',
                detailIndex: [],
                leagues: [],
                league: {id: '0', name: '全部'},
                list: [],
                startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                endDate: new Date(),
                loading: false,
                refreshing: false,
                finished: false,
                page: 1,
                isLoading: false
            }
        },

        watch: {
            $route(to) {
                let {sport_id} = to.query

                if (this.sportId !== sport_id) {
                    this.sportId = sport_id
                    this.onRefresh()
                }
            },
        },

        components: {
            LoadImage
        },

        methods: {

            format(date, fmt) {
                return format(date, fmt)
            },

            onConfirmLeague(league) {
                console.log('league', league)
                this.showPicker = false

                if (this.league.id !== league.id) {
                    this.league = league
                    this.onRefresh()
                }
            },

            onConfirmDate(rangeDate) {
                console.log('rangeDate', rangeDate)
                this.startDate = rangeDate[0]
                this.endDate = rangeDate[1]

                this.showCalendar = false
                this.onRefresh()
            },

            _showResultDetail(j, i) {
                let v = `${j}-${i}`
                let index = this.detailIndex.indexOf(v)
                if (index > -1) {
                    this.detailIndex.splice(index, 1)
                } else {
                    this.detailIndex.push(v)
                }
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
            },

            onLoad() {
                let params = {
                    page: this.page,
                    pageSize: 100,
                    sport: this.sportId,
                    league: this.league.id,
                    startDate: format(this.startDate, 'yyyy-MM-dd'),
                    endDate: format(this.endDate, 'yyyy-MM-dd')
                }

                getMatchHistory(params)
                    .then(res => {
                        if (this.refreshing) {
                            this.chaheList = [];
                            this.page = 1
                            this.refreshing = false;
                        }

                        if (res.code === 200) {
                            this.leagues = res.data.leagues
                            this.chaheList = [...this.chaheList, ...res.data.data]
                                .sort((a, b) => b.start_time - a.start_time)


                            this.list = this.serializeList(this.chaheList)

                            this.page++

                            if (this.chaheList.length >= Number(res.data.count)) {
                                this.finished = true;
                            }
                        }

                        this.loading = false;
                    })
                    .catch(err => {
                        console.log(err)
                        this.loading = false
                    })
            },

            // 二次排序处理
            serializeList(list = []) {
                let obj = {}
                let arr = []

                list.forEach(item => {

                    // 没有出现过的联赛 push到 arr 并记录下标位置
                    if (!obj[item.league_id]) {

                        obj[item.league_id] = {
                            league_id: item.league_id,
                            league_name: item.league_name,
                            children: [item],
                            index: arr.length,
                            sport_id: item.sport_id
                        }

                        arr.push(obj[item.league_id])

                    } else {
                    // 否则 将找出相关联赛的 下标位置 并替换成新的

                        obj[item.league_id].children.push(item)

                        let index = obj[item.league_id].index

                        arr.splice(index, 1, obj[item.league_id])
                    }
                })

                return arr
            }
        },

        created() {
            this.chaheList = []
            this.scrollHeight = window.innerHeight - window.rem2px(2.4 + 1.6 + 2.2 + 2.4)
        },

        beforeRouteEnter(to, from, next) {
            console.log('query--------------->', to.query)
            next(_this => {
                let {category, sport_id} = to.query

                if (category) _this.category = _this.category
                if (sport_id) _this.sportId = sport_id

                _this.onLoad()
            })
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    .h5-result {
        background: #e6e7f2;
        padding: 0 0.2rem;
        border-radius: 0.4rem 0.4rem 0 0;

        .picker-bar {
            height: 2.4rem;
        }
    }
</style>
