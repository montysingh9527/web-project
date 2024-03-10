<template>
    <div class="football-ball">
        <h3 class="flex-start flex-middle-only" style="margin: 16px 0 8px 0;padding-left: 12px;">
            <span class="fs12 m-r8">地区:</span>

            <el-popover
                    placement="bottom"
                    width="120"
                    v-model="visible_popover"
                    trigger="click">
                <ul class="p-l10 p-r10" style="height: 300px;overflow: scroll;">
                    <li class="lh-40 under-line" v-for="i of 20" :key="i" @click="visible_popover = false">美国</li>
                </ul>

                <div slot="reference" class="center select-box select-my fs14 bg-white re"
                     @click="showSelectOption = true">
                    <span class="fs12 m-r8" style="color: #2E2A44;">全国</span>
                    <i class="icon_base triangle"></i>
                </div>
            </el-popover>
        </h3>

        <div class="foot-ball-collapse">
            <el-collapse accordion v-model="activeNames">
                <el-collapse-item :name="`${i}`" v-for="(data, i) of datas" :key="i" class="m-b20" style="border-radius: 8px;">
                    <template slot="title">
                        <p class="collapse-line"></p>

                        <div class="flex-middle-only">
                            <img style="width:16px;height:16px;" :src="data.logo" alt="">
                            <span style="margin: 0 4px 0 8px;color: #2E2A44;">{{data.team}}</span>
                            <i class="icon_base collect"></i>
                        </div>
                    </template>
                    <div>
                        <el-row class="flex-middle-only" style="background-color: #F6F5FA;height:22px;">
                            <el-col :span="11" :offset="13">
                                <el-row>
                                    <el-col :span="8"><span class="fs-10">全场独赢</span></el-col>
                                    <el-col :span="8"><span class="fs-10">全场让球</span></el-col>
                                    <el-col :span="8"><span class="fs-10">全场大小</span></el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row v-for="game of data.game" :key="game.id" class="row-line">
                            <el-col :span="13">
                                <div @click="jumpBet(game)">
                                    <el-row>
                                        <el-col :span="4" class="dark-light">
                                            <p class="fs12">{{game.session}}</p>
                                            <p class="fs14">{{game.time}}</p>
                                        </el-col>
                                        <el-col :span="4">
                                            <p class="fs16">{{game.home_court_team}}</p>
                                            <p class="fs16">{{game.visiting_field_team}}</p>
                                            <p class="re" style="height:40px;">
                                                <span class="ab fs14 dark-light" style="left:0;bottom:0;">{{game.num}}</span>
                                            </p>
                                        </el-col>
                                        <el-col :span="4">
                                            <p class="fs16 center">{{game.score1}}</p>
                                            <p class="fs16 center">{{game.score2}}</p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="11">
                                <el-row :gutter="4">
                                    <el-col :span="8" v-for="(play, p) in game.plays" style="margin-bottom: 4px;" :key="p">
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
    let img2 = require('../../../assets/images/tmp1/team_logo1.svg')
    let img3 = require('../../../assets/images/tmp1/team_logo2.svg')
    let datas = [
        {
            id: '216523',
            logo: img2,
            team: '英格兰超级联赛',
            favorite: true,
            game: [
                {
                    id: '32jj323sad',
                    session: '下半场',
                    time: '15:43',
                    home_court_team: '切尔西',
                    score1: 3,
                    score2: 2,
                    visiting_field_team: '狼人队',
                    num: '115+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: '343f4ds53453'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: '3453453453'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: '34as5344k53'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: '34534fdf34g53'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: '345dfd34653'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: '3453dff3453'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: '34534cv5ll34'},
                        {}, {}
                    ]
                },
                {
                    id: '2323sdfak',
                    session: '上半场',
                    time: '19:43',
                    home_court_team: '布莱顿',
                    score1: 1,
                    score2: 3,
                    visiting_field_team: '泊莉恩',
                    num: '96+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: '34hgn53fgh4453'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: '34534sd3453fgh'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: '345fgr345gh3'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: '3453rty345h3'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: '34534gfhgh45d3'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: '345xvd334503'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: '34534vrtb45z3'},
                        {}, {}
                    ]
                }
            ]
        },
        {
            id: 'asdaar5ssd2',
            logo: img3,
            team: '葡萄牙足总杯',
            favorite: false,
            game: [
                {
                    id: 'fgmio477059845',
                    session: '下半场',
                    time: '15:43',
                    home_court_team: '巴西',
                    score1: 3,
                    score2: 2,
                    visiting_field_team: '德国',
                    num: '115+',
                    plays: [
                        {name: '全场独赢', alias: '主胜', odd: '14.0', playId: 'asdm32gh434'},
                        {name: '全场让球', alias: '+2', odd: '2.06', playId: 'asd9jk834ddf'},
                        {name: '全场大小', alias: '大3.5', odd: '1.87', playId: 'asdfgd83gh4'},
                        {name: '全场独赢', alias: '客胜', odd: '14.0', playId: 'asd456983hj4'},
                        {name: '全场让球', alias: '-2', odd: '1.86', playId: 'asd98fg34jjh'},
                        {name: '全场大小', alias: '小3.5', odd: '2.03', playId: 'asnhkui3jj4'},
                        {name: '全场独赢', alias: '平局', odd: '14.0', playId: 'asdsdt6834dg'},
                    ]
                }, {
                    id: 'fsmio405df9845',
                    session: '下半场',
                    time: '19:43',
                    home_court_team: '西班牙',
                    score1: 1,
                    score2: 2,
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
                activeNames: ['1'],
                visible_popover: false,
                datas: datas
            }
        },

        methods: {
            jumpBet(game) {
                this.$router.push({path: '/index/betGrounder', query: game})
            }
        },

        created() {
            this.logo1 = require('../../../assets/images/tmp1/team_logo1.svg')
        },

        mounted() {
            // this._initDom()
        }
    }
</script>
<style type="text/css" lang="less">
    .football-ball {
        .select-my {
            width: 110px;
        }

        .collapse-content {
            padding: 16px;
        }

        .p-l24 {
            padding-left: 24px;
        }

        .bg-dark-grid {
            background: #F6F5FA;
            border-radius: 2px;
            padding: 4px 0;
        }
    }

</style>
