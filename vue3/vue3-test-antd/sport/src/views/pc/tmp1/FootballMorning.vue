<template>
    <div class="football-morning">
        <h3 class="flex-start flex-middle-only" style="margin: 16px 0 8px 0;padding-left: 12px;">
            <span class="fs12 m-r8">日期:</span>

            <div class="center select-date select-box fs14 bg-white re"
                 @click="showSelectOption = true">
                <span class="fs12 m-r8" style="color: #2E2A44;">{{selectDate}}</span>
                <i class="icon_base triangle"></i>

                <div class="date-picker-box ab">
                    <el-date-picker
                            v-model="selectDate"
                            align="left"
                            type="date"
                            value-format="MM月dd日"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </div>

            <span class="fs12 m-r8" style="margin-left: 24px;">地区:</span>
            <el-popover
                    placement="bottom"
                    width="120"
                    v-model="visible_popover"
                    trigger="click">
                <ul class="p-l10 p-r10" style="height: 300px;overflow: scroll;">
                    <li class="lh-40 under-line" v-for="i of 20" :key="i" @click="visible_popover = false">美国</li>
                </ul>

                <div slot="reference" class="center select-my select-box fs14 bg-white re"
                     @click="showSelectOption = true">
                    <span class="fs12 m-r8" style="color: #2E2A44;">我的收藏</span>
                    <i class="icon_base triangle"></i>
                </div>
            </el-popover>
        </h3>

        <div class="foot-ball-collapse">
            <el-collapse accordion v-model="activeNames">
                <el-collapse-item :name="`${i}`" v-for="(data, i) in datas" :key="data.id" class="m-b20"
                                  style="border-radius: 8px;">
                    <template slot="title">
                        <p class="collapse-line"></p>

                        <div class="flex-middle-only">
                            <img style="width:16px;height:16px;" :src="data.logo" alt="">
                            <span style="margin: 0 4px 0 8px;color: #2E2A44;">{{data.team}}</span>
                            <i class="icon_base collect" :class="data.favorite ? 'active' : ''"></i>
                        </div>
                    </template>
                    <div>
                        <el-row class="flex-middle-only" style="background-color: #F6F5FA;height:22px;">
                            <el-col :span="14" :offset="10">
                                <el-row>
                                    <el-col :span="8"><span class="fs-10">全场独赢</span></el-col>
                                    <el-col :span="8"><span class="fs-10">全场让球</span></el-col>
                                    <el-col :span="8"><span class="fs-10">全场大小</span></el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <el-row v-for="game of data.game" :key="game.id" class="row-line">
                            <el-col :span="10">
                                <div @click="jumpBet(game)">
                                    <el-row>
                                        <el-col :span="4" class="dark-light">
                                            <p class="fs12">{{game.date}}</p>
                                            <p class="fs14">{{game.time}}</p>
                                        </el-col>
                                        <el-col :span="4">
                                            <p class="fs16">{{game.home_court_team}}</p>
                                            <p class="fs16">{{game.visiting_field_team}}</p>
                                            <p class="re" style="height:40px;">
                                                <span class="ab fs14 dark-light" style="left:0;bottom:0;">{{game.num || 1}}</span>
                                            </p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <el-row :gutter="4">
                                    <el-col :span="8" v-for="play of game.plays" :key="play.playId"
                                            style="margin-bottom: 4px;">
                                        <div class="grid-content bg-dark flex-middle-only"
                                             :id="`${data.id}-${game.id}-${play.playId}`"
                                             @click="_chooseBet(play, game, data)">
                                            <span class="dark-light title1 fs12">{{play.alias}}</span>
                                            <span class="dark fs14">{{play.odd}}</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

    </div>
</template>
<script>
    import chooseBetsMixin from '../../../mixins/choose-bets'
    import {format} from '../../../assets/js/util'

    let img2 = require('../../../assets/images/tmp1/team_logo1.svg')
    let img3 = require('../../../assets/images/tmp1/team_logo2.svg')

    let datas = [
        {
            id: '2123',
            logo: img2,
            team: '英格兰超级联赛',
            favorite: true,
            game: [
                {
                    id: '32323sad',
                    date: '06月10日',
                    time: '15:43',
                    home_court_team: '切尔西',
                    visiting_field_team: '狼人队',
                    num: '115+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: '3434ds53453'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: '3453453453'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: '34as534453'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: '34534fdf3453'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: '345dfd3453'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: '3453dfdf3453'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: '34534cv534'},
                        {}, {}
                    ]
                },
                {
                    id: '232323sdfak',
                    date: '07月10日',
                    time: '19:43',
                    home_court_team: '布莱顿',
                    visiting_field_team: '泊莉恩',
                    num: '96+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: '34hgn53fgh453453'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: '34534sd3453'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: '345fgr3453'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: '3453rty3453'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: '34534gfhgh453'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: '345xvd33453'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: '34534vrtb453'},
                        {}, {}
                    ]
                }
            ]
        },
        {
            id: 'asdaassd2',
            logo: img3,
            team: '葡萄牙足总杯',
            favorite: true,
            game: [
                {
                    id: 'fgmio4059845',
                    date: '06月10日',
                    time: '15:43',
                    home_court_team: '巴西',
                    visiting_field_team: '德国',
                    num: '115+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: 'asdm32434'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: 'asd9jk834'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: 'asdfgd834'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: 'asd4569834'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: 'asd98fg34'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: 'asnhkui34'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: 'asdsdt6834'},
                    ]
                }, {
                    id: 'fsmio405df9845',
                    date: '07月10日',
                    time: '19:43',
                    home_court_team: '西班牙',
                    visiting_field_team: '法国',
                    num: '95+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: 'assdfyd98fgh34'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: 'asd9ghjt8gh34'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: 'asd9afgb8jk34'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: 'asd98klui3kj4'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: 'asdsd9834u4674'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: 'asfgfgdwrdfn9834'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: 'asd98ykaghd34'},
                    ]
                }
            ]
        }
    ]

    export default {
        mixins: [chooseBetsMixin],
        data() {
            return {
                selectDate: format(new Date(), 'MM月dd日'),
                activeNames: ['0'],
                visible_popover: false,
                datas: datas
            }
        },
        methods: {
            jumpBet(data) {
                this.$router.push({path: '/index/betMorning', query: data})
            }
        },
        created() {
            this.logo1 = img2
            this.logo2 = img3

            this.pickerOptions = {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            }
        },
        mounted() {
            // this._initDom()
        }
    }
</script>
<style type="text/css" lang="less">
    .football-morning {
        .select-date {
            width: 97px;
        }

        .select-my {
            width: 110px;
        }

        .date-picker-box {
            overflow: hidden;
            width: 97px;
            height: 30px;
            top: 0;
            opacity: 0;
        }
    }

</style>
