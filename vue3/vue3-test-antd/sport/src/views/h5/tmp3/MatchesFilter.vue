<template>
    <div class="matchesfilter">
        <Head fixed>{{$t('bs_sx')}}</Head>
        <div>
            <div class="lab1 flex-between full-width bg-white">
                <div class="btn flex-middle" @click="allSelect">
                    <img class="icon m-r8" src="../../../assets/images/tmp3/all-select.png" alt="">
                    <span class="fs14">{{$t('q_x')}}</span>
                </div>
                <div class="btn flex-middle" @click="reverse">
                    <img class="icon m-r8" src="../../../assets/images/tmp3/revert-select.png" alt="">
                    <span class="fs14">{{$t('f_x')}}</span>
                </div>
            </div>
            <div class="lab2 flex-1 scroll-y">
                <ul class="lab_ul">
                    <li class="li flex-middle-only" v-for="item in dataList" :key="item" @click="seleceHanlder(item)">
                        <div class="flex-middle-only">
                            <div class="radio" :class="{select: selectList.includes(item)}"></div>
                            <img style="width: 1.4rem; margin-left: 1.2rem; margin-right: 0.8rem" src="../../../assets/images/tmp3/buyu.png" alt="">
                            <div class="details">
                                <p class="fs14" style="color: #7B5605">捷克甲乙联赛</p>
                                <p class="fs12" style="color: #4D5872; margin-top: 0.14rem">{{$t('g_y_j_c', {totalMatchs})}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="lab3 full-width bg-white" style="padding: 0 .6rem; height: 3.7rem;">
                <div class="submit public-btn flex-middle fs14" style="height: 1.9rem; margin-top: 0.6rem">
                    {{$t('q_r')}}
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
                totalMatchs:'2'
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
            Head: () => import('../../../components/temp3/Head')
        },

        mounted() {

        },

        destroyed() {

        },

        deactivated() {

        },

        activated() {

        }
    }
</script>
<style type="text/css" lang="less">
    @import url('../../../assets/css/index');

    .matchesfilter {
        .lab1 {
            position: fixed;
            z-index: 2;
            top: 2.4rem;
            height: 2.7rem;
            padding: 0 1.5rem;
            .btn {
                color: #F3AC0A;
                width: 7.5rem;
                height: 1.4rem;
                border: 1px solid #F3AC0A;
                border-radius: .1rem;
                .icon {
                    width: .7rem;
                }
            }
        }
        .lab2{
            padding-top: 5.1rem;
            padding-bottom: 3.7rem;
        }
        .lab_ul {
            padding: 0 .6rem;
            .li {
                height: 4.2rem;
                background: url('../../../assets/images/tmp3/matches-filter-bg.png');
                background-size: 100% 100%;
                .radio {
                    width: .7rem;
                    height: .7rem;
                    border-radius: 50%;
                    margin-left: 1rem;
                    border: 1px solid #7B5605;
                    &.select {
                        background:#7B5605 url('../../../assets/images/tmp3/select.png') no-repeat center center;
                        background-size: .4rem auto;
                   }
                }
            }
        }
        .lab3 {
            position: fixed;
            left: 0;
            bottom: 0;
        }
    }
</style>
