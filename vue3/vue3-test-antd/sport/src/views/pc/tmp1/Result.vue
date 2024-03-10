<template>
    <div class="pc-result">
        <div class="flex-middle-only">
            <div class="re flex-middle-only cursor" style="margin-right: 24px;">
                <span class="fs12 m-r8">赛事: </span>
                <van-popover v-model="showMatchPicker" placement="bottom-start">
                    <div slot="reference" class="fs14 bg-white re flex-middle" @click="showMatchPicker = true"
                         style="width:278px;height: 28px;border-radius: 14px;outline: none;">
                        <span class="fs12 m-r16" style="color: #2E2A44;">{{league.name}}</span>
                        <i class="icon_base triangle"></i>
                    </div>

                    <div class="hide-scroll-bar scroll-y bg-white" :style="{width: '300px'}" @click.stop>
                        <ul class="p-l10 p-r10 hide-scroll-bar" style="max-height: 400px;overflow-y: scroll;">
                            <li class="lh-40 under-line cles-1 cursor" v-for="league of leagues" :key="league.id"
                                @click="selectMarket(league)">
                                {{league.name}}
                            </li>
                        </ul>
                    </div>
                </van-popover>
            </div>

            <!--日期-->
            <div class="flex-middle-only cursor">
                <span class="fs12 m-r8">日期:</span>

                <div class="flex-middle-only over-hidden center fs14 bg-white re"
                     style="width:229px;height:28px;border-radius: 14px;">
                    <div class="full-width flex-middle" @click="showDatePicker = true">
                        <span class="fs12 m-r8" style="color: #2E2A44;">
                            {{format(startDate, 'yyyy年MM月dd日')}}~{{format(endDate, 'yyyy年MM月dd日')}}
                        </span>
                        <i class="icon_base triangle"></i>
                    </div>


                    <van-calendar v-model="showDatePicker"
                                  :style="{height: '500px',width: '500px',top: '50%',left:'50%',
                                    transform: `translate3d(-50%,-50%,0)`,
                                    borderRadius: 0
                                  }"
                                  type="range"
                                  confirm-text="确认日期更改"
                                  :show-title="false"
                                  :row-height="60"
                                  position="top"
                                  :min-date="new Date(new Date().getTime() - 24 * 3600000 * 60)"
                                  :max-date="new Date(new Date().getTime() + 24 * 3600000)"
                                  @close="showDatePicker = false"
                                  @confirm="_changeDate" color="#19162d"/>
                </div>
            </div>
        </div>
        <div style="border-radius: 8px;margin-top: 12px;">
            <div class="hide-scroll-bar block scroll-y" :style="{height: scrollHeight + 'px'}"
                 style="border-radius: 0 0 8px 8px;">
                <div class="bg-white" v-for="item of list" :key="item.league_id">
                    <div class="flex-middle-only lh-40">
                        <p class="collapse-line" style="margin-right: 0;"></p>
                        <load-image :src="item.league_logo" style="margin: 0 8px"
                                    :error="require('../../../assets/images/tmp1/ruqiushu_big.png')"
                                    v-if="item.sport_id === '1'"
                        />
                        <div class="basketball-icon m-l5 m-r5" v-if="item.sport_id === '18'"></div>
                        <span class="dark fs14">{{item.league_name}}</span>
                    </div>

                    <van-row class="dark fs12" style="background-color: #F6F5FA;border-radius: 8px 8px 0 0;"
                             v-if="item.sport_id === '1'">
                        <van-col class="flex-middle-only lh-25 p-l10" :span="4">日期</van-col>
                        <van-col class="flex-middle-only lh-25" :span="14">赛程</van-col>
                        <van-col class="flex-middle-only lh-25" :span="2">上半场</van-col>
                        <van-col class="flex-middle-only lh-25" :span="2">全场</van-col>
                        <van-col class="flex-middle-only lh-25" :span="2">状态</van-col>
                    </van-row>

                    <van-row class="dark fs12 lh-25 flex-middle-only"
                             style="background-color: #F6F5FA;border-radius: 8px 8px 0 0;"
                             v-if="item.sport_id === '18'">
                        <van-col :span="4" class="p-l10">日期</van-col>
                        <van-col :span="10">赛程</van-col>
                        <van-col :span="1">第一节</van-col>
                        <van-col :span="1">第二节</van-col>
                        <van-col :span="1">上半场</van-col>
                        <van-col :span="1">第三节</van-col>
                        <van-col :span="1">第四节</van-col>
                        <van-col :span="1">加时赛</van-col>
                        <van-col :span="2">全场比分</van-col>
                        <van-col :span="2">状态</van-col>
                    </van-row>

                    <van-row class="dark fs12 under-line" v-for="child of item.children" :key="child.match_id"
                             v-if="child.sport_id === '1'">
                        <van-col class="flex-middle-only lh-40 p-l10" :span="4">{{format(child.start_time * 1000,'yyyy-MM-dd hh:mm')}}
                        </van-col>
                        <van-col class="flex-middle-only lh-40" :span="14">{{child.home_name}} vs {{child.away_name}}
                        </van-col>
                        <van-col class="flex-middle-only center lh-40" :span="2">
                            <span v-if="child.status !== 5 && child.scores && child.scores.half">{{child.scores.half.home +' - '+ child.scores.half.away}}</span>
                            <span v-else class="m-l10">-</span>
                        </van-col>
                        <van-col class="flex-middle-only lh-40" :span="2">
                            <span v-if="child.status !== 5 && child.scores && child.scores.half">{{child.scores.full.home +' - '+ child.scores.full.away}}</span>
                            <span v-else class="m-l10">-</span>
                        </van-col>
                        <van-col class="flex-middle-only lh-40" :span="2">{{child.status_name}}</van-col>
                    </van-row>

                    <van-row class="dark fs12 under-line flex-middle-only" style="min-height: 46px;"
                             v-for="child of item.children" :key="child.match_id" v-if="child.sport_id === '18'">
                        <van-col class="flex-middle-only  p-l10" :span="4">{{format(child.start_time * 1000, 'yyyy-MM-dd hh:mm')}}</van-col>
                        <van-col class="flex-middle-only" :span="10">{{child.home_name}} vs {{child.away_name}}
                        </van-col>
                        <van-col :span="1">
                            <span v-if="child.scores && child.scores['1']">{{child.scores['1'].home}}-{{child.scores['1'].away}}</span>
                        </van-col>
                        <van-col :span="1">
                            <span v-if="child.scores && child.scores['2']">{{child.scores['2'].home}}-{{child.scores['2'].away}}</span>
                        </van-col>
                        <van-col :span="1">
                            <span v-if="child.scores && child.scores['3']">{{child.scores['3'].home}}-{{child.scores['3'].away}}</span>
                        </van-col>
                        <van-col :span="1">
                            <span v-if="child.scores && child.scores['4']">{{child.scores['4'].home}}-{{child.scores['4'].away}}</span>
                        </van-col>
                        <van-col :span="1">
                            <span v-if="child.scores && child.scores['5']">{{child.scores['5'].home}}-{{child.scores['5'].away}}</span>
                        </van-col>
                        <van-col :span="1">
                            <span v-if="child.scores && child.scores['6']">{{child.scores['6'].home}}-{{child.scores['6'].away}}</span>
                        </van-col>
                        <van-col :span="2">
                            <span v-if="child.scores && child.scores['7']">{{child.scores['7'].home}}-{{child.scores['7'].away}}</span>
                        </van-col>
                        <van-col :span="2">
                            {{child.status_name}}
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <div class="flex-middle" style="height: 48px;">
            <span class="fs12">共{{totalPage}}条 </span>
            <div class="fs12 flex-middle m-l8 m-r8 pagination-page-size re">
                <span>{{pageSize}}条/页</span>
                <i class="van-icon van-icon-arrow-down"></i>

                <ul class="ab pagination-page-size-list">
                    <li class="pagination-page-size-item"
                        :style="{color: pageSize === 50 ? '#FFDF1B' : ''}"
                        @click="handleSizeChange(50)">50条
                    </li>
                    <li class="pagination-page-size-item"
                        :style="{color: pageSize === 100 ? '#FFDF1B': ''}"
                        @click="handleSizeChange(100)">100条
                    </li>
                </ul>
            </div>
            <van-pagination v-model="page"
                            :items-per-page="pageSize"
                            :total-items="totalPage"
                            @change="handleCurrentChange"
                            :show-page-size="10">
                <template #prev-text>
                    <van-icon name="arrow-left"/>
                </template>
                <template #next-text>
                    <van-icon name="arrow"/>
                </template>
                <template #page="{ text }">{{ text }}</template>
            </van-pagination>
            <div class="flex-middle m-l10">
                <span>前往</span>
                <van-field class="fs12 center page-input m-l8 m-r8"
                           maxlength="8"
                           v-model="page1"
                           @input="handleCurrentChange"
                           type="number"/>
                <span>页</span>
            </div>
        </div>
    </div>
</template>
<script>
    import LoadImage from "../../../common/LoadImage";
    import {format} from '../../../assets/js/util'
    import {getMatchHistory} from '../../../axios/sport'
    import {sports} from "../../../common/config"

    export default {
        data() {
            return {
                sport: '',
                scrollHeight: window.innerHeight - 193,
                leagues: [{}],
                league: {id: '0', name: '全部'},
                list: [],
                loading: false,
                startDate: new Date(),
                endDate: new Date(),
                totalPage: 1,
                page: 1,
                page1: 1,
                pageSize: 100,
                showPicker: false,
                showMatchPicker: false,
                showDatePicker: false
            }
        },

        watch: {
            $route(to) {
                this.page = 1
                this.sport = to.query.sport
                this._getMatchHistory(true)
            }
        },

        methods: {
            handleSizeChange(pageSize) {
                console.log('pageSize', pageSize, this.pageSize)
                this.pageSize = pageSize

                this._getMatchHistory(true)
            },

            handleCurrentChange(page) {
                this.page = Number(page)

                this._getMatchHistory(true)
            },

            _changeDate(date) {
                this.startDate = date[0]
                this.endDate = date[1]
                this.page = 1
                this.showDatePicker = false

                this._getMatchHistory(true)
            },

            // selectSport(sport) {
            //     this.sport = sport
            //     this.showPicker = false
            //     this._getMatchHistory(true)
            // },

            selectMarket(league) {
                this.league = league
                this.showMatchPicker = false
                this.page = 1
                this._getMatchHistory(true)
            },

            format(date, fmt) {
                return format(date, fmt)
            },

            _getMatchHistory(loading) {
                let params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sport: this.sport,
                    league: this.league.id,
                    startDate: format(this.startDate, 'yyyy-MM-dd'),
                    endDate: format(this.endDate, 'yyyy-MM-dd')
                }

                this.clearTimer()
                this.timer = setTimeout(() => {
                    getMatchHistory(params, loading)
                        .then(res => {
                            if (res.code === 200) {
                                this.leagues = res.data.leagues
                                this.totalPage = Number(res.data.count)

                                let list = res.data.data
                                    .sort((a, b) => b.start_time - a.start_time)
                                    .filter(item => item.sport_id !== '13')

                                this.list = this.serializeList(list)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }, 40)
            },

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
            },

            clearTimer() {
                if(this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            }
        },

        components: {
            LoadImage
        },

        created() {
            window.addEventListener('resize', () => {
                this.scrollHeight = Math.max(window.innerHeight - 200, 20)
            })

            this.timer = null
        },

        activated() {
            this._getMatchHistory()
        }
    }
</script>
<style type="text/css" lang="less">
    .pc-result {
        .van-overlay {
            background-color: rgba(0, 0, 0, 0.1) !important;
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
                    background-color: #2b2745 !important;
                    color: #f4f4f5 !important;
                }
            }

            .van-pagination__item::after {
                border-width: 0;
            }
        }

        .pagination-page-size {
            width: 90px;
            height: 26px;
            border-radius: 2px;
            background-color: rgb(246, 245, 250);
            color: #2b2745;

            &:hover {
                .pagination-page-size-list {
                    display: block !important;
                }
            }
        }

        .pagination-page-size-list {
            background-color: rgb(246, 245, 250);
            padding: 0 10px;
            width: 90px;
            top: -56px;
            display: none;
        }

        .pagination-page-size-item {
            border-bottom: 1px solid #e6e7f3;
            padding: 5px 0;
        }

        .page-input {
            width: 44px;
            height: 20px;
            background-color: rgb(246, 245, 250);
            padding: 0;
            color: #ddd;

            .van-field__control {
                text-align: center;
                font-size: 12px;
                color: #2b2745;
            }
        }

        .van-cell::after {
            border-bottom: none !important;
        }
    }
</style>
