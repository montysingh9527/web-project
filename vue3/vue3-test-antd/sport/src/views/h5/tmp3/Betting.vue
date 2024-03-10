<template>
    <div class="matchesfilter">
        <Head fixed centerdown>
            <span @click="sportHeadSheetStatus = true">英格兰超级联赛</span>
            <template #right>
                <i class="icon_base icon-kefu-white"></i>
            </template>
        </Head>
        <div>
            <div class="lab2">
                <div class="topbg re">
                    <div style="
                        position: fixed;
                        left: 50%;
                        transform: translateX(-50%);
                    ">
                        <img style="height: 1rem" src="../../../assets/images/tmp3/sc.png" />
                    </div>
                    <div class="list1 flex-middle center">
                        <div>
                            <img style="width: 1.6rem" src="../../../assets/images/tmp3/buyu.png" />
                            <p class="bold fs12" style="color: #7B5605;margin-top: 0.8rem">利物浦</p>
                            <p class="bold fs18" style="color: #7B5605;margin-top: 0.8rem">1</p>
                        </div>
                        <div class="fs12" style="color: #4D5872;">
                            <div>10-14</div>
                            <div class="timer">15：30</div>
                            <div>{{$t('bs_wks')}}</div>
                        </div>
                        <div>
                            <img style="width: 1.6rem" src="../../../assets/images/tmp3/buyu.png" />
                            <p class="bold fs12" style="color: #7B5605;margin-top: 0.8rem">利物浦</p>
                            <p class="bold fs18" style="color: #7B5605;margin-top: 0.8rem">2</p>
                        </div>
                    </div>
                    <div class="list2">
                        <ul class="flex flex-between" style="padding: 0 1.2rem">
                            <li class="fs12 lh-45 re" style="height: 2rem" v-for="matche of tabs" :key="matche.value" @click="active_sport = matche" :style="{color: active_sport.value == matche.value ? '#7B5605' : '#818796'}">
                                {{matche.label}}
                                <i class="ab-middle-x active_line" style="bottom: 0; " v-if="matche.value == active_sport.value"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="list3 p-l16 p-r16">
                    <div>
                        <p class="tip" style="margin-top: 0.9rem; margin-bottom: 0.6rem">{{$t('asian_handicap')}}</p>
                        <div class="flex-between">
                            <div class="itemlist fs12 flex-between">
                                <span>阿森纳</span><span>+0/0.5</span><span>1.97</span>
                            </div>
                            <div class="itemlist fs12 flex-between">
                                <span>利物浦</span><span>+0/0.5</span><span>1.97</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="tip" style="margin-top: 0.9rem; margin-bottom: 0.6rem">{{$t('match_goals')}}</p>
                        <div class="flex-between">
                            <div class="itemlist fs12 flex-between active">
                                <span>阿森纳</span><span>+0/0.5</span><span>1.97</span>
                            </div>
                            <div class="itemlist fs12 flex-between">
                                <span>利物浦</span><span>+0/0.5</span><span>1.97</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="tip" style="margin-top: 0.9rem; margin-bottom: 0.6rem">{{$t('f_j_y_z')}}</p>
                        <div class="flex-between">
                            <div class="fs12 center" style="width: 8.4rem;">
                                阿森纳
                            </div>
                            <div class="fs12 center" style="width: 8.4rem;">
                                利物浦
                            </div>
                        </div>
                        <div class="flex-between" v-for="item in 5" :key="item"  style="margin-top: .4rem">
                            <div class="itemlist fs12 flex-between active">
                                <span>+0/0.5</span><span>1.97</span>
                            </div>
                            <div class="itemlist fs12 flex-between">
                                <span>+0/0.5</span><span>1.97</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lab3 full-width bg-white " @click="sportListSheetStatus = true" style="padding: 0 .6rem; height: 2.2rem; box-shadow: 0px -2px 4px 0px rgba(28,29,32,0.1);">
                <Details />
            </div>
        </div>
        <van-action-sheet v-model="sportListSheetStatus" >
            <div class="details-content">
                <div style="height: 2.2rem; padding: 0 .6rem;">
                    <Details :isdown="sportListSheetStatus" @close="sportListSheetStatus = false" />
                </div>
                <ul class="btul">
                    <li class="flex-between fs12 p-l16 p-r16" style="height: 2.7rem" v-for="item in 3" :key="item">
                        <div class="flex-middle">
                            <img class="m-r8" style="width: 0.7rem" src="../../../assets/images/tmp3/del.png" />
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

                    <li class="flex-between fspx12 p-l16 p-r16 bg-white" style="height: 2.7rem" >
                        <div class="flex-middle">
                            <div>
                                <p style="color: #4E5772" class="fspx14 bold">三串一</p>
                                <p style="color: #666666" class="flex-middle cursor">
                                    {{$t('coll')}}
                                    <img class="m-r8" style="width: 0.4rem; margin-left: 0.4rem" src="../../../assets/images/tmp3/sq.png" />
                                </p>
                            </div>
                        </div>
                        <div class="flex-middle">
                            <span class=" m-r8"  style="color: #7B5605">@14.0</span>
                            <input class="inputint" style="color: #4E5772" type="text" :placeholder="$t('mon')">
                        </div>
                    </li>

                    <li class="flex-between fspx12 p-l16 p-r16 bg-white" style="height: 2.7rem" >
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
                <p v-if="isChange" class="fs12" style="color: #888888; padding: 0.6rem 0.8rem 0 0.8rem">{{$t('bet_change')}}</p>
                <div class="flex-between center" style="padding: 0.6rem 0.8rem">
                    <div class="btn1 flex-middle fs12" style="color: #4D5872">
                        {{$t('all_del')}}
                    </div>
                    <div :class="{change: isChange}" class="btn2 flex-middle fs12 white">
                        <span v-if="isChange">{{$t('js_bh')}}</span>
                        <span v-else>{{$t('t_z')}}（￥20000.00）</span>
                    </div>
                </div>
            </div>
        </van-action-sheet>

        <van-action-sheet v-model="sportHeadSheetStatus" :title="$t('s_ss')" >
            <div class="details-content">
               <div style="width: 50%">
                   <ul class="flex flex-between" style="padding: 0 0.8rem">
                        <li class="fs12 lh-45 re" style="height: 2rem;" v-for="matche of tabs2" :key="matche.value" @click="active_sport2 = matche" :style="{color: active_sport2.value == matche.value ? '#7B5605' : '#818796'}">
                            {{matche.label}}
                            <i class="ab-middle-x active_line" style="bottom: 0; " v-if="matche.value == active_sport2.value"></i>
                        </li>
                    </ul>
               </div>
               <div class="scroll-y" style="max-height: 19rem">
                   <!-- 滚球 -->
                    <div style="padding: 0 0.8rem" v-if="active_sport2.value == '3'">
                        <div v-for="(item, index) in selectDataList"  @click="item.isShow = !item.isShow" :key="index"
                                :style="{height: item.isShow ? 'auto' : '2.2rem'}"
                                style="height: 2.2rem;flex-direction: column;border-bottom: 1px solid #DDE6EE" class="flex-start">
                            <div class="flex-between full-width" style="margin-top: 0.7rem" :style="{marginBottom: item.isShow ? '0.6rem' : '0'}">
                                <div>
                                    <p class="tip">英格兰超级联赛 滚球</p>
                                </div>
                                <div>
                                    <img style="width: 0.6rem" :style="{transform: item.isShow ? 'rotate(0deg)' : 'rotate(270deg)'}" src="../../../assets/images/tmp3/sq.png" alt="">
                                </div>
                            </div>
                            <ul v-if="item.isShow" @click.stop>
                                <li class="selectbetli2 flex-middle " :class="{active: index}" v-for="item in 5" :key="item" style="margin-bottom: 0.6rem; padding-right: 1rem">
                                    <div class="full-width flex-between">
                                        <div class="flex-middle">
                                            <div style="padding: 0 0.4rem; ">
                                                53:44
                                            </div>
                                            <div class="m-r8" style="width: 1px; height: 1.6rem; background: #DDE6EE"></div>
                                            <div>
                                                <p>
                                                        <img class="m-r8" style="width: 0.5rem" src="../../../assets/images/tmp3/buyu.png" />
                                                        <span class="fs12" style="color: #4D5872; bold">塞维利亚</span>
                                                </p>
                                                <p style="margin-top: 0.1rem">
                                                        <img class="m-r8" style="width: 0.5rem" src="../../../assets/images/tmp3/buyu.png" />
                                                        <span class="fs12" style="color: #4D5872; bold">塞维利亚</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="fs12 bold" style="color: #7B5605;">1</p>
                                            <p class="fs12 bold" style="color: #7B5605; margin-top: 0.1rem">0</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 选择比赛，非滚球 -->
                    <div style="padding: 0 0.8rem" v-else>
                        <div v-for="(item, index) in selectDataList"  @click="item.isShow = !item.isShow" :key="index"
                                :style="{height: item.isShow ? 'auto' : '2.2rem'}"
                                style="height: 2.2rem;flex-direction: column;border-bottom: 1px solid #DDE6EE" class="flex-start">
                            <div class="flex-between full-width" style="margin-top: 0.7rem" :style="{marginBottom: item.isShow ? '0.6rem' : '0'}">
                                <div>
                                    <p class="tip">英格兰超级联赛 </p>
                                </div>
                                <div>
                                    <img style="width: 0.6rem" :style="{transform: item.isShow ? 'rotate(0deg)' : 'rotate(270deg)'}" src="../../../assets/images/tmp3/sq.png" alt="">
                                </div>
                            </div>
                            <ul v-if="item.isShow" @click.stop>
                                <li class="selectbetli flex-middle " :class="{active: index}" v-for="item in 5" :key="item" style="margin-bottom: 0.6rem">
                                    <span class="flex-end flex-1 right">
                                        <span class="m-r8 bold fs12">阿森纳</span>
                                        <img style="width: 0.8rem" src="../../../assets/images/tmp3/buyu.png" />
                                        </span>
                                        <span class="fs14 p-l16 p-r16" style="color: #4D5872">vs</span>
                                        <span class="flex-start left flex-1">
                                        <img class="m-r8" style="width: 0.8rem" src="../../../assets/images/tmp3/buyu.png" />
                                        <span class="bold fs12">阿森纳</span>
                                        </span>
                                </li>
                            </ul>
                        </div>
                    </div>
               </div>
            </div>
        </van-action-sheet>
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
            Details: () => import('../../../components/temp3/Details'),
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
<style type="text/css" lang="less" scoped>
    @import url('../../../assets/css/index');

    .list1 {
        padding: 1.7rem 0;
    }

    .timer {
        height: 1rem;
        background-image: linear-gradient(180deg, #F0AA08 0%, #B88306 100%);
        border-radius: .5rem;
        line-height: 1rem;
        display: inline-block;
        padding: 0 .5rem;
        margin: .4rem 2.5rem;
        .white();
    }
    .matchesfilter {
        .lab2{
            padding-top: 2.4rem;
            padding-bottom: 3.7rem;
        }
        
        .lab3 {
            position: fixed;
            left: 0;
            bottom: 0;
        }
    }
    
    .itemlist {
        width: 8.4rem;
        height: 1.6rem;
        background: url("../../../assets/images/tmp3/bet-item-bg.png") no-repeat;
        background-size: 100% 100%;
        padding: 0 .4rem;
        &.active {
            background: url("../../../assets/images/tmp3/bet-item-bg-active.png") no-repeat;
            background-size: 100% 100%;
            color: white !important;
            span:last-child {
                color: #f6ec23 !important;
            }
        }
    }
    .topbg {
        background: url("../../../assets/images/tmp3/tz-bg.png") no-repeat;
        background-size: 100% 100%;

    }
    .inputint {
        width: 4rem;
        height: 1.4rem;
        background: #FFFFFF;
        border: 1px solid #BCC0CB;
        border-radius: .1rem;
        padding: 0 .4rem;
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
            width: 4rem;
            height: 1.9rem;
            background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
            border: 1px solid #BCC0CB;
            border-radius: .2rem;
        }
        .btn2 {
            width: 12.35rem;
            height: 1.9rem;
            background-image: linear-gradient(180deg, #F2AC0A 0%, #B68108 100%);
            border-radius: .2rem;
            &.change {
                background-image: linear-gradient(180deg, #F45F5F 0%, #C92B2B 100%);
            }
        }
    }
    .selectbetli {
        height: 2.4rem;
        background: url("../../../assets/images/tmp3/select-bg.png") no-repeat;
        background-size: 100% 100%;
        &.active {
            background: url("../../../assets/images/tmp3/select-bg-active.png") no-repeat;
            background-size: 100% 100%;
        }
    }

    .selectbetli2 {
        height: 2.4rem;
        background: url("../../../assets/images/tmp3/select-bg.png") no-repeat;
        background-size: 100% 100%;
        &.active {
            background: url("../../../assets/images/tmp3/select-bg-active.png") no-repeat;
            background-size: 100% 100%;
        }
    }
</style>
