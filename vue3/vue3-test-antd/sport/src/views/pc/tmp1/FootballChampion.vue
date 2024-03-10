<template>
    <div class="champion">
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
                    <span class="fs12 m-r8" style="color: #2E2A44;">英国</span>
                    <i class="icon_base triangle"></i>
                </div>
            </el-popover>
        </h3>

        <div class="foot-ball-collapse">
            <el-collapse accordion v-model="activeNames">
                <el-collapse-item :name="`${i}`" v-for="i of 5" :key="i" class="m-b20" style="border-radius: 8px;">
                    <template slot="title">
                        <p class="collapse-line"></p>

                        <div class="flex-middle-only">
                            <img style="width:16px;height:16px;" :src="logo1" alt="">
                            <span style="margin: 0 4px 0 8px;color: #2E2A44;">英格兰超级联赛2020/04</span>
                            <i class="icon_base collect"></i>
                        </div>
                    </template>
                    <div>
                        <div class="flex-middle-only" style="background-color: #F6F5FA;height:22px;">
                           <span class="dark-light fs10" style="margin-left: 16px;">2020年06月20日 22:00截止</span>
                        </div>

                        <div class="collapse-content">
                            <p class="fs10 dark-light m-b8" style="margin-top:10px;">冠军(不包括利物浦和曼联)</p>
                            <el-row :gutter="4">
                                <el-col style="margin-bottom: 4px;" :span="6" v-for="i of 8" :key="i" class="dark-light">
                                    <div class="grid-content bg-dark flex-middle-only">
                                        <span class="p-l24 dark">切尔西 2.20</span>
                                    </div>
                                </el-col>
                            </el-row>

                            <p class="dark-light m-b8 fs10" style="margin-top:10px;">最佳射手</p>
                            <el-row :gutter="4">
                                <el-col style="margin-bottom: 4px;" :span="6" v-for="i of 8" :key="i" class="dark-light">
                                    <div class="grid-content bg-dark-grid">
                                        <div class="p-l24">
                                            <p class="fs10">切尔西</p>
                                            <p class="dark">杰米瓦尔特 2.37</p>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <p class="fs10 dark-light m-b8" style="margin-top:10px;">降级队伍</p>
                            <el-row :gutter="4">
                                <el-col style="margin-bottom: 4px;" :span="6" v-for="i of 8" :key="i" class="dark-light">
                                    <div class="grid-content bg-dark flex-middle-only">
                                        <span class="p-l24 dark">切尔西 2.20</span>
                                    </div>
                                </el-col>
                            </el-row>

                            <p class="fs10 dark-light m-b8" style="margin-top:10px;">不降级队伍</p>
                            <el-row :gutter="4">
                                <el-col style="margin-bottom: 4px;" :span="6" v-for="i of 8" :key="i" class="dark-light">
                                    <div class="grid-content bg-dark flex-middle-only">
                                        <span class="p-l24 dark">切尔西 2.20</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

<!--                        <el-row v-for="i of 2" :key="i" class="row-line">-->
<!--                            <el-col :span="10">-->
<!--                                <el-row>-->
<!--                                    <el-col :span="4" class="dark-light">-->
<!--                                        <p class="fs12">06月10日</p>-->
<!--                                        <p class="fs14">15:32</p>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="4">-->
<!--                                        <p class="fs16">阿森呐</p>-->
<!--                                        <p class="fs16">利物浦</p>-->
<!--                                        <p class="re" style="height:40px;">-->
<!--                                            <span class="ab fs14 dark-light" style="left:0;bottom:0;">115+</span>-->
<!--                                        </p>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
<!--                            </el-col>-->
<!--                            <el-col :span="14">-->
<!--                                <el-row :gutter="4" style="margin-bottom: 4px;">-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">主胜</span>-->
<!--                                            <span class="dark fs14">14.0</span>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">+2 </span>-->
<!--                                            <span class="dark fs14">2.06</span>-->
<!--                                        </div>-->

<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">大3.5</span>-->
<!--                                            <span class="dark fs14">1.87</span>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
<!--                                <el-row :gutter="4" style="margin-bottom: 4px;">-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">客胜</span>-->
<!--                                            <span class="dark fs14">14.0</span>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">-2</span>-->
<!--                                            <span class="dark fs14"> 1.86</span>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">小3.5</span>-->
<!--                                            <span class="dark fs14">2.03</span>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
<!--                                <el-row :gutter="4" style="margin-bottom: 4px;">-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark flex-middle-only">-->
<!--                                            <span class="dark-light title1 fs12">平局</span>-->
<!--                                            <span class="dark fs12">14.0</span>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark"></div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-dark"></div>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeNames: ['1'],
                visible_popover: false
            }
        },

        created() {
            this.logo1 = require('../../../assets/images/tmp1/team_logo1.svg')
        }
    }
</script>
<style type="text/css" lang="less">
    .champion {
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
