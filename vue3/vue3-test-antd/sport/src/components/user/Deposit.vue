<template>
    <div class="deposit black">

        <div class="flex-middle-only">
            <div style="width: 100px;" class="right m-r8">存款方式</div>


            <van-popover
                    placement="bottom-start"
                    v-model="showPayType"
                    trigger="click"
                    @select="onSelect"
            >
                <template #reference>
                    <div class="lh-45  bg-white flex-between" style="padding: 0 16px;" @click.stop="showPayType = true">
                        <span>选择支付方式</span>
                        <i class="van-icon van-icon-arrow-down fs20"></i>
                    </div>
                </template>

                <ul style="width: 516px;">
                    <li class="lh-30 van-hairline--bottom" style="padding: 0 16px;" v-for="item of list" :key="item.code">
                        {{item.name}}
                    </li>
                </ul>
            </van-popover>
<!--            -->
<!--            <select v-model="depositType" class="flex-1" style="height:44px;">-->
<!--                <option :value="item.id" v-for="item of list">-->
<!--                    {{item.name}}-->
<!--                </option>-->
<!--            </select>-->
        </div>


        <van-button class="fs14" block color="#79AF9E" native-type="submit">提交</van-button>
    </div>

</template>
<script>
    const md5 = require('md5');
    import { mapGetters, mapMutations } from "vuex"
    import {getThirdPay, getUserRechCfg} from '../../axios/user'
    export default {
        data() {
            return {
                list: [],
                depositType: '',
                showPayType: false
            }
        },

        methods: {
            ...mapMutations({
                updateUserInfo: 'UPDATE_USER_INFO'
            }),
            onSelect(item) {
                console.log(item)
            },

            validatorPwd(value) {
                let reg = new RegExp(`^${this.formParams.newPwd}$`, 'g')

                console.log(2222)

                return reg.test(value)
            },

            submit(errorInfo) {
                if (!errorInfo) return;

            },

            _getThirdPay() {
                getThirdPay()
                    .then(res => {
                        let list = Object.values(res.bank_ary)

                        this.list = list.map(item => {
                            // item.logo = require(`../../../public/images/pay_icon/${item.id}.png`)
                            item.logo = ''
                            item.payType = item.id.split('_')[1]

                            if (Array.isArray(item.payWay)) {
                                item.payWay = item.payWay.map(pay => {
                                    if (!pay.para.fixedAmount) {
                                        pay.fixedAmount = [10, 50, 100, 200, 500, 1000]
                                    } else {
                                        pay.fixedAmount = pay.para.fixedAmount
                                    }
                                    return pay
                                })
                            }
                            return item
                        })

                        console.log(this.list)
                    })
                    .catch(err => console.log(err))
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        mounted() {
            this._getThirdPay()
        }
    }
</script>
<style type="text/css" lang="less">
    .deposit {
        max-width: 608px;
        margin: 0 auto;

        .input-border {
            border: 1px solid #bbb;
        }

        .van-popover__wrapper {
            width: 100%;
        }
    }
</style>
