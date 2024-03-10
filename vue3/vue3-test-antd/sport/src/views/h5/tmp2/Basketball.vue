<template>
    <CommonLayout class="foot-ball-tmp2" :hide-header="true">
        <div class="header flex-column flex-between">
            <h3 style="color:#cecece;" class="fs22 full-width">篮球</h3>

            <p class="flex-between full-width" @click="$router.push('/index/bet-grounder?sport=18')">
                <span class="white fs14">投注盘</span>
                <span style="color:#6EEBC3;" class="flex-middle-only fs12">
                    滚球盘 {{sportGroundCount}}
                    <i class="van-icon-arrow van-icon"></i>
                </span>
            </p>
        </div>

        <!--精选赛事-->
        <Highlights :sport="18" style="border-top:2px solid #367A65;border-bottom: 2px solid #6e6e6e;"/>


        <van-collapse v-model="activeNames" :border="false">
            <van-collapse-item :name="item.code"
                               :ref="`collapse-item-${item.code}`"
                               :border="false"
                               :is-link="false"
                               v-for="item of collapseList"
                               :key="item.code">
                <template #title>
                    <div class="pd-16-12 fs16 flex-between" style="color: #5FE8BD;"
                         @click="_getLeaguesByMarketGroup(item.code)">
                        <span>{{item.name}}</span>

                        <van-loading size="16px" v-if="loadings[item.code]"/>

                        <i class="van-icon van-icon-arrow-down"
                           style="color:#cecece;"
                           v-else
                           v-show="!activeNames.includes(item.code)"
                        ></i>
                    </div>
                </template>
                <van-collapse v-model="activeSubNames" :border="false">
                    <van-collapse-item :name="`${item.code}-${group.code}`"
                                       :border="false"
                                       :is-link="false"
                                       v-for="group of item.list"
                                       :key="group.code">
                        <template #title>
                            <div class="pd-16-12 fs14 flex-between" style="color: #ddd;">
                                <span>{{group.name}}</span>
                                <i class="van-icon van-icon-arrow-down"
                                   style=";color:#cecece;"
                                   v-show="!activeSubNames.includes(group.code)"></i>
                            </div>
                        </template>

                        <van-row style="padding: 0 0.6rem 0.6rem;">
                            <van-col class="fs12 lh-30" style="color:#b5b5b5;" :span="12"
                                     @click="toMatches(league, item, group.code)"
                                     v-for="league of group.leagues"
                                     :key="league.league_id">{{league.league_name}}
                            </van-col>
                        </van-row>
                    </van-collapse-item>
                </van-collapse>
            </van-collapse-item>
        </van-collapse>
    </CommonLayout>
</template>
<script>
    import CommonLayout from '../../../components/CommonLayout'
    import Highlights from "../../../components/Highlights";
    import {
        getSportCategory,
        getLeaguesByMarketGroup,
        getMarketGroups
    } from "../../../axios/sport";

    export default {
        data() {
            return {
                activeNames: ['1'],
                activeSubNames: ['1'],
                collapseList: [],
                sportGroundCount: 0,
                sportUpcomingCount: 0,
                loadings: {}
            }
        },

        methods: {
            // 获取体育分类和比赛数量
            _getSportCategory() {

                // 默认 滚球
                getSportCategory('inplay')
                    .then(res => {
                        if (res.code === 200 && res.data) {

                            let list = res.data

                            list.forEach(sport => {
                                if (sport.id === '18') {
                                    this.sportGroundCount = sport.count
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
            },

            _getMarketGroups() {
                getMarketGroups(18)
                    .then(res => {
                        if (res.code === 200) {
                            let list = res.data
                            this.collapseList = list.map(item => {
                                item.list = []
                                this.loadings[item.code] = false
                                return item
                            })
                        }
                    })
            },

            _getLeaguesByMarketGroup(group_code) {
                let item = this.collapseList.find(item => item.code === group_code)

                if (item.list && item.list.length) return;

                this.loadings = {...this.loadings, [group_code]: true}
                let param = {
                    market_group_code: group_code
                }
                getLeaguesByMarketGroup(param)
                    .then(res => {
                        this.loadings = {...this.loadings, [group_code]: false}

                        if (res.code === 200) {
                            let list = res.data
                            this.collapseList = this.collapseList.map(item => {
                                if (item.code === group_code) {
                                    item.list = list

                                    if (list.length) {
                                        this.activeSubNames.unshift(`${group_code}-${list[0].code}`)
                                    }
                                }

                                return item
                            })
                        }
                    })
                    .catch(err => {
                        this.loadings = {...this.loadings, [group_code]: false}
                        console.log(err)
                    })
            },

            toMatches(league, item, country) {
                this.$router.push({
                    path: '/index/bet-matches',
                    query: {
                        ...league,
                        market_group_code: item.code,
                        market_group_name: item.name,
                        country: country,
                        sport: 18
                    }
                })

            }
        },

        components: {
            CommonLayout,
            Highlights
        },

        mounted() {
            this._getSportCategory()
            this._getMarketGroups()
        }
    };
</script>
<style type="text/css" lang="less">
    .foot-ball-tmp2 {
        .header {
            background: url("../../../assets/images/tmp2/basketball-bg.png");
            background-size: 100% 100%;
            height: 6.4rem;
            width: 100%;
            padding: 1.5rem 0.6rem 0.8rem 0.6rem;
        }

        .match-advance {
            padding: 0.8rem 0.6rem 1.3rem;
            border-bottom: 1px solid #367A65;
            background: #585858;
        }

        .van-collapse-item__title, .van-collapse-item__content {
            padding: 0 !important;
        }

        .van-cell, .van-collapse-item__content {
            background-color: transparent !important;
            line-height: 1;
        }

        .van-collapse-item {
            background: #505050;
            border-bottom: 1px solid #367A65;
            border-top: 1px solid #367A65;

            .van-collapse-item {
                border-bottom: 1px solid #5D5D5D;
                border-top: 1px solid #5D5D5D;
            }
        }
    }
</style>
