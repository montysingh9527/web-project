<template>
    <div class="pcbetting pc-content-width flex" style="padding-top: 24px">
        <div style="width: 300px">
            <div class="goback flex-middle cursor" @click="$router.back()">
                <img style="width: 12px; margin-right: 8px" src="../../../assets/images/tmp3/pc/index-left2.png" alt="">
                <span style="color: #4D5872" class="fspx14 bold">
                    {{$t('f_h_s_y')}}
                </span>
            </div>

            <div class="betting-content" style="margin-top: 24px">
                <div class="topborder"></div>
                <div style="width: 80%" class="marginauto">
                    <ul class="flex flex-between" style="padding: 0 16px">
                        <li class="fspx12 lh-45 re cursor" style="height: 40px;" v-for="matche of tabs2" :key="matche.value" @click="active_sport2 = matche" :style="{color: active_sport2.value == matche.value ? '#7B5605' : '#818796'}">
                            {{matche.label}}
                            <i class="ab-middle-x active_line" style="bottom: 0; " v-if="matche.value == active_sport2.value"></i>
                        </li>
                    </ul>
                </div>
                <div class="scroll-y hide-scroll-bar" style="max-height: 748px">
                    <!-- 滚球 -->
                    <div style="padding: 0 16px" v-if="active_sport2.value == '3'">
                        <div v-for="(item, index) in selectDataList"  @click="item.isShow = !item.isShow" :key="index"
                                :style="{height: item.isShow ? 'auto' : '44px'}"
                                style="height: 44px;flex-direction: column;border-bottom: 1px solid #DDE6EE" class="flex-start">
                            <div class="flex-between full-width cursor" style="margin-top: 14px" :style="{marginBottom: item.isShow ? '12px' : '0'}">
                                <div>
                                    <p class="tip">英格兰超级联赛 滚球</p>
                                </div>
                                <div>
                                    <img style="width: 12px" :style="{transform: item.isShow ? 'rotate(0deg)' : 'rotate(270deg)'}" src="../../../assets/images/tmp3/sq.png" alt="">
                                </div>
                            </div>
                            <ul v-if="item.isShow" @click.stop>
                                <li class="selectbetli2 flex-middle " :class="{active: index}" v-for="item in 5" :key="item" style="margin-bottom: 12px; padding-right: 20px">
                                    <div class="full-width flex-between">
                                        <div class="flex-middle">
                                            <div style="padding: 0 8px;" class="fspx12">
                                                53:44
                                            </div>
                                            <div style="width: 1px; height: 32px; background: #DDE6EE; margin-right: 8px"></div>
                                            <div>
                                                <p>
                                                        <img style="width: 10px; margin-right: 8px" src="../../../assets/images/tmp3/buyu.png" />
                                                        <span class="fspx12" style="color: #4D5872; bold">塞维利亚</span>
                                                </p>
                                                <p style="margin-top: 2px">
                                                        <img style="width: 10px; margin-right: 8px" src="../../../assets/images/tmp3/buyu.png" />
                                                        <span class="fspx12" style="color: #4D5872; bold">塞维利亚</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="fspx12 bold" style="color: #7B5605;">1</p>
                                            <p class="fspx12 bold" style="color: #7B5605; margin-top: 2px">0</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 选择比赛，非滚球 -->
                    <div style="padding: 0 16px" v-else>
                        <div v-for="(item, index) in selectDataList"  @click="item.isShow = !item.isShow" :key="index"
                                :style="{height: item.isShow ? 'auto' : '44px'}"
                                style="height: 44px;flex-direction: column;border-bottom: 1px solid #DDE6EE" class="flex-start">
                            <div class="flex-between full-width cursor" style="margin-top: 14px" :style="{marginBottom: item.isShow ? '12px' : '0'}">
                                <div>
                                    <p class="tip">英格兰超级联赛 </p>
                                </div>
                                <div>
                                    <img style="width: 12px" :style="{transform: item.isShow ? 'rotate(0deg)' : 'rotate(270deg)'}" src="../../../assets/images/tmp3/sq.png" alt="">
                                </div>
                            </div>
                            <ul v-if="item.isShow" @click.stop>
                                <li class="selectbetli flex-middle " :class="{active: index}" v-for="item in 5" :key="item" style="margin-bottom: 12px">
                                    <span class="flex-end flex-1 right">
                                        <span class="bold fspx12" style="margin-right: 8px">阿森纳</span>
                                        <img style="width: 16px" src="../../../assets/images/tmp3/buyu.png" />
                                        </span>
                                        <span class="fspx14" style="color: #4D5872; padding: 0 16px">vs</span>
                                        <span class="flex-start left flex-1">
                                        <img style="width: 16px; margin-right: 8px" src="../../../assets/images/tmp3/buyu.png" />
                                        <span class="bold fspx12">阿森纳</span>
                                        </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 876px; padding-left: 24px">
            <div class="betting-content">
                <div class="topborder"></div>
                <div class="lab2">
                    <div class="topbg re">
                        <div class="ab-middle-x">
                            <img style="height: 20px" src="../../../assets/images/tmp3/sc.png" />
                        </div>
                        <div class="list1 flex-middle center">
                            <div>
                                <img style="width: 32px" src="../../../assets/images/tmp3/buyu.png" />
                                <p class="bold fspx12" style="color: #7B5605;margin-top: 16px">利物浦</p>
                                <p class="bold fspx18" style="color: #7B5605;margin-top: 16px">1</p>
                            </div>
                            <div class="fspx12" style="color: #4D5872;">
                                <div>10-14</div>
                                <div class="timer">15：30</div>
                                <div>{{$t('bs_wks')}}</div>
                            </div>
                            <div>
                                <img style="width: 32px" src="../../../assets/images/tmp3/buyu.png" />
                                <p class="bold fspx12" style="color: #7B5605;margin-top: 16px">利物浦</p>
                                <p class="bold fspx18" style="color: #7B5605;margin-top: 16px">2</p>
                            </div>
                        </div>
                        <div class="list2" style="display: inline-block; padding: 0 24px">
                            <ul class="flex flex-between">
                                <li class="fspx12 lh-45 re cursor" style="height: 40px; margin-right: 32px" v-for="matche of tabs" :key="matche.value" @click="active_sport = matche" :style="{color: active_sport.value == matche.value ? '#7B5605' : '#818796'}">
                                    {{matche.label}}
                                    <i class="ab-middle-x active_line" style="bottom: 0; " v-if="matche.value == active_sport.value"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="list3 bg-white betting-content" style="padding: 0 24px; overflow: hidden; margin-top: 1px;
                        box-shadow: 0px 0px 4px 0px rgba(221,228,243,1);
                        border-radius: 4px;
                        padding-bottom: 20px;
                    ">
                        <div>
                            <p class="pctip" style="margin-top: 18px; margin-bottom: 12px">{{$t('asian_handicap')}}</p>
                            <div class="flex-between">
                                <div class="itemlist fspx12 flex-between">
                                    <span>阿森纳</span><span>+0/0.5</span><span>1.97</span>
                                </div>
                                <div class="itemlist fspx12 flex-between">
                                    <span>利物浦</span><span>+0/0.5</span><span>1.97</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p class="pctip" style="margin-top: 18px; margin-bottom: 12px">{{$t('match_goals')}}</p>
                            <div class="flex-between">
                                <div class="itemlist fspx12 flex-between active">
                                    <span>阿森纳</span><span>+0/0.5</span><span>1.97</span>
                                </div>
                                <div class="itemlist fspx12 flex-between">
                                    <span>利物浦</span><span>+0/0.5</span><span>1.97</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p class="pctip" style="margin-top: 18px; margin-bottom: 12px">{{$t('f_j_y_z')}}</p>
                            <div class="flex-between">
                                <div class="fspx12 center" style="width: 168px;">
                                    阿森纳
                                </div>
                                <div class="fspx12 center" style="width: 168px;">
                                    利物浦
                                </div>
                            </div>
                            <div class="flex-between" v-for="item in 5" :key="item"  style="margin-top: 8px">
                                <div class="itemlist fspx12 flex-between active">
                                    <span>+0/0.5</span><span>1.97</span>
                                </div>
                                <div class="itemlist fspx12 flex-between">
                                    <span>+0/0.5</span><span>1.97</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fixed-bottom-container bg-white">
                    <div style="width: 416px; box-shadow: 0px -2px 4px 0px rgba(28,29,32,0.1);">
                        <div class="lab3 full-width bg-white cursor" @click="sportListSheetStatus = !sportListSheetStatus" style="height: 44px;padding: 0 12px;">
                            <Details :isdown="sportListSheetStatus" />
                        </div>
                        <div class="details-content transition" :style="{'max-height': sportListSheetStatus ? '400px' : '0px'}">
                            <ul class="btul">
                                <li class="flex-between fspx12 p-l16 p-r16" style="height: 54px" v-for="item in 3" :key="item">
                                    <div class="flex-middle">
                                        <img class="m-r8" style="width: 14px" src="../../../assets/images/tmp3/del.png" />
                                        <div>
                                            <p style="color: #4E5772">阿森纳 全场赛果</p>
                                            <p style="color: #666666">阿森纳 vs 利物浦</p>
                                        </div>
                                    </div>
                                    <div class="flex-middle">
                                        <span class="m-r8" style="color: #7B5605">@14.0</span>
                                        <input class="inputint" style="color: #4E5772" type="text" :placeholder="$t('mon')">
                                    </div>
                                </li>
                                
                                <li class="flex-between fspx12 p-l16 p-r16 bg-white" style="height: 54px" >
                                    <div class="flex-middle">
                                        <div>
                                            <p style="color: #4E5772" class="fspx14 bold">三串一</p>
                                            <p style="color: #666666" class="flex-middle cursor">
                                                {{$t('coll')}}
                                                <img class="m-r8" style="width: 8px; margin-left: 8px" src="../../../assets/images/tmp3/sq.png" />
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex-middle">
                                        <span class=" m-r8"  style="color: #7B5605">@14.0</span>
                                        <input class="inputint" style="color: #4E5772" type="text" :placeholder="$t('mon')">
                                    </div>
                                </li>

                                <li class="flex-between fspx12 p-l16 p-r16 bg-white" style="height: 54px" >
                                    <div class="flex-middle">
                                        <div>
                                            <p style="color: #4E5772" class="fspx14">{{$t('d_y1')}}</p>
                                        </div>
                                    </div>
                                    <div class="flex-middle">
                                        <input class="inputint" style="color: #4E5772" type="text" :placeholder="$t('mon')">
                                    </div>
                                </li>

                            </ul>
                            <p v-if="isChange" class="fspx12" style="color: #888888; padding: 12px 16px 0 16px">{{$t('bet_change')}}</p>
                            <div class="flex-between center" style="padding: 12px 16px">
                                <div class="btn1 flex-middle fspx12 cursor" style="color: #4D5872">
                                    {{$t('all_del')}}
                                </div>
                                <div :class="{change: isChange}" class="btn2 flex-middle fspx12 white cursor">
                                    <span v-if="isChange">{{$t('js_bh')}}</span>
                                    <span v-else>{{$t('t_z')}}（￥20000.00）</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mixins: [],
        data() {
            return {
                dataList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                selectList: [1, 2],
                selectDataList: [
                    {
                        isShow: false
                    },
                    {
                        isShow: false
                    },
                    {
                        isShow: false
                    }
                ],
                tabs: Object.freeze([
                    {label: this.$t('yz_pk'), value: '1'},
                    {label: this.$t('zy_pk'), value: '2'},
                    {label: this.$t('f_p'), value: '3'},
                    {label: this.$t('j_q'), value: '4'},
                    {label: this.$t('in_q'), value: '5'},
                ]),
                tabs2: Object.freeze([
                    {label: this.$t('j_r'), value: '1'},
                    {label: this.$t('z_p'), value: '2'},
                    {label: this.$t('groun'), value: '3'},
                    {label: this.$t('s_c'), value: '4'},
                ]),
                sportListSheetStatus: false, // 投注详情
                sportHeadSheetStatus: false, // 选择联赛
                active_sport: {label: this.$t('yz_pk'), value: '1'},
                active_sport2: {label: this.$t('j_r'), value: '1'},
                isChange: false // 判断数据是否发生变化
            }
        },

        computed: {
        },

        watch: {

        },

        methods: {
            allSelect() {
                this.dataList.forEach(item => {
                    if (!this.selectList.includes(item)) {
                        this.selectList.push(item)
                    }
                })
            },
            changeItem(item) {
                if (this.selectList.includes(item)) {
                    this.selectList.splice(this.selectList.indexOf(item), 1);
                } else {
                    this.selectList.push(item)
                }
            },
            reverse() {
                this.dataList.forEach(item => {
                   this.changeItem(item);
                })
            },
            seleceHanlder(item) {
               this.changeItem(item);
            }
        },

        components: {
            Head: () => import('../../../components/temp3/Head'),
            Details: () => import('../../../components/temp3/PcDetails'),
        },

        mounted() {
            setTimeout(() => {
                this.isChange = true;
            }, 3000)
        },

        destroyed() {

        },

        deactivated() {

        },

        activated() {

        }
    }
</script>

<style scoped lang="less">
@import url('../../../assets/css/index');

.goback {
    height: 46px;
    background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
    border: 1px solid #D6DCE6;
    border-radius: 4px;
}


.list1 {
    padding: 34px 0;
}

.timer {
    height: 20px;
    background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
    border-radius: 10px;
    line-height: 20px;
    display: inline-block;
    padding: 0 10px;
    margin: 8px 190px;
    .white();
}
.matchesfilter {
    .lab2{
        padding-top: 48px;
        padding-bottom: 74px;
    }
    
    .lab3 {
        position: fixed;
        left: 0;
        bottom: 0;
    }
}

.itemlist {
    width: 393px;
    height: 38px;
    background: url("../../../assets/images/tmp3/pc/bet-item-bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 8px;
    &.active {
        background: url("../../../assets/images/tmp3/pc/bet-item-bg-active.png") no-repeat;
        background-size: 100% 100%;
        color: white !important;
        span:last-child {
            color: #f6ec23 !important;
        }
    }
}
.topbg {
    background: url("../../../assets/images/tmp3/pc/tz-bg.png") no-repeat center center;
    background-size: 106% 107%;

}
.inputint {
    width: 80px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #BCC0CB;
    border-radius: 2px;
    padding: 0 8px;
    text-align: right;
}

.btul {
    background-image: linear-gradient(90deg, #F3F6FA 0%, #F9FBFC 100%);
    box-shadow: inset 0px -1px 0px 0px rgba(221,230,238,1);box-shadow: inset 0px 1px 0px 0px rgba(221,230,238,1);
    li {
        border-bottom: 1px solid #DDE6EE;
        
    }
}
.details-content {
    .btn1 {
        width: 90px;
        height: 38px;
        background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
        border: 1px solid #BCC0CB;
        border-radius: 4px;
    }
    .btn2 {
        width: 274px;
        height: 38px;
        background-image: linear-gradient(180deg, #F2AC0A 0%, #B68108 100%);
        border-radius: 4px;
        &.change {
            background-image: linear-gradient(180deg, #F45F5F 0%, #C92B2B 100%);
        }
    }
}
.selectbetli {
    height: 48px;
    background: url("../../../assets/images/tmp3/select-bg.png") no-repeat;
    background-size: 100% 100%;
    &.active {
        background: url("../../../assets/images/tmp3/select-bg-active.png") no-repeat;
        background-size: 100% 100%;
    }
}

.selectbetli2 {
    height: 48px;
    background: url("../../../assets/images/tmp3/select-bg.png") no-repeat;
    background-size: 100% 100%;
    &.active {
        background: url("../../../assets/images/tmp3/select-bg-active.png") no-repeat;
        background-size: 100% 100%;
    }
}

.betting-content {
    box-shadow: 0px 2px 4px 0px rgba(28,29,32,0.1);
    border-radius: 4px;
    overflow: hidden;
}

.topborder{
    height: 2px;
    background-image: linear-gradient(134deg, #F2AB06 0%, #B78008 100%);
    border-radius: 100px;
}

</style>