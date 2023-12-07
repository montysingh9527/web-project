<template>
    <div class="page">
        <van-nav-bar
            title="充值钻石"
            @click-left="$router.back()"
            style="height: 46px"
            :border="false"
            fixed
            placeholder
        >
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>

        <div class="header">
            <div>
                <img v-lazyload="state.headUrl" style="width: 1.38667rem; height: 1.38667rem; border-radius: 50%" />
            </div>
            <div class="info">
                <p>{{ state.account }}</p>
                <p>钻石余额{{ state.balance }}</p>
            </div>
        </div>
        <div class="contenter">
            <div class="title">优惠会员</div>
            <ul class="list">
                <li
                    class="list_item"
                    v-for="(item, index) in state.result"
                    :key="item.id"
                    :class="{ active: state.current == index }"
                    @click="state.current = index"
                >
                    <div class="list_item_left">
                        <p class="van-multi-ellipsis--l2">钻石{{ item.coins }}</p>
                        <p>{{ item.price }}</p>
                    </div>
                    <div class="list_item_right">
                        <span>特惠价</span><span>{{ item.price }}</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="footer">
            <van-button
                class="pay_btn"
                block
                style="
                    color: white;
                    background: linear-gradient(90deg, rgb(240, 202, 161), rgb(190, 142, 96));
                    border: 0px;
                "
                @click="show = true"
                >立即充值<span v-if="state.result.length > 0">{{ state.result[state.current].price }}</span>
            </van-button>
        </div>
    </div>
    <van-popup v-model:show="show" round style="width: 85%; z-index: 2008" overlay>
        <div class="pay_popup">
            <div class="pay_title">请选择支付方式</div>
            <!-- <div class="pay_subtitle">USDT-ETH-BTC</div> -->

            <van-radio-group v-model="checked" style="margin: 20px 0px">
                <van-cell-group inset :border="false">
                    <van-cell
                        v-for="item in state.channelList"
                        :key="item.id"
                        :title="item.title"
                        clickable
                        :border="false"
                        @click="checked = item.id"
                    >
                        <template #value>
                            <div class="pay_img"><img v-lazyload="item.imgUrl" style="width: 100%" /></div>
                        </template>
                        <template #right-icon>
                            <van-radio :name="item.id" checked-color="rgb(211, 168, 124)" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>

            <van-button
                class="pay_btn"
                block
                round
                style="
                    color: white;
                    background: linear-gradient(90deg, rgb(240, 202, 161), rgb(190, 142, 96));
                    border: 0px;
                "
                @click="goPay"
            >
                立即支付<span v-if="state.result.length > 0">{{ state.result[state.current].price }}</span
                >元
            </van-button>
        </div>
    </van-popup>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'

import { getCoinItem, getChannelList, toPay } from '@/api/common'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const store = useStore()
        const show = ref(false)
        const checked = ref('')
        const state = reactive({
            headUrl: store.state.user.userInfo.headUrl,
            account: store.state.user.userInfo.account,
            isVip: store.state.user.userInfo.isVip,
            balance: store.state.user.userInfo.balance,
            current: 0,
            result: [],
            channelList: []
        })
        // console.log(state)

        getCoinItem({}).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                state.result = res.result
                // console.log(res.result)
            }
        })

        getChannelList({}).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                state.channelList = res.result
                checked.value = res.result[0].id
                // console.log(res.result)
            }
        })

        const goPay = () => {
            toPay({
                userId: JSON.parse(localStorage.getItem('userDetail')).id,
                type: '0',
                channelId: checked.value,
                itemId: state.result[state.current].id
            }).then((res) => {
                // console.log(res)
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    window.location.href = import.meta.env.VITE_APP_PROXY_HOST + 'api/pay/page?token=' + res.result
                }
            })
        }

        return { state, show, checked, goPay }
    }
}
</script>
<style lang="scss" scoped>
.page .header {
    padding: 0.8rem 0.26667rem;
    background-color: #373632;
    display: flex;
    align-items: center;
}

.page .header .info {
    margin-left: 0.26667rem;
}

.page .header .info p:first-child {
    color: #f6dca9;
    font-size: 0.50667rem;
}

.page .header .info p:nth-child(2) {
    font-size: 0.32rem;
    color: rgb(184 164 127);
    margin-top: 0.13333rem;
}

.page .contenter {
    padding: 0.26667rem 0.26667rem 1.6rem;
    background-color: #fff;
}

.page .contenter .title {
    color: #474747;
    font-size: 0.42667rem;
    font-weight: 700;
    vertical-align: middle;
}

.page .contenter .title:before {
    content: '';
    display: inline-block;
    border-left: 0.10667rem solid #f7b43f;
    border-radius: 0.08rem;
    height: 0.42667rem;
    position: relative;
    top: 0.05333rem;
    margin-right: 0.13333rem;
}

.page .contenter .equity {
    margin-top: 0.26667rem;
    display: -webkit-box;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 0.26667rem;
}

.page .contenter .equity .equity_item {
    width: 2.72rem;
    height: 1.30667rem;
    margin: 0 0.26667rem 0.26667rem 0;
    padding: 0.26667rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
}

.page .contenter .equity .equity_item p:first-child {
    font-size: 0.34667rem;
}

.page .contenter .equity .equity_item p:nth-child(2) {
    font-size: 0.32rem;
    color: #7d7d80;
}

.page .contenter .list {
    margin-top: 0.26667rem;
}
.page .contenter .list .list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.42667rem;
    border: 0.02667rem solid #d9d9d9;
    border-radius: 0.10667rem;
    margin-bottom: 0.42667rem;
}

.page .contenter .list .active {
    border: 0.02667rem solid #e8b559;
    background-color: #fff6e5;
}

.page .contenter .list .list_item .list_item_left p:first-child {
    color: #474747;
    font-size: 0.42667rem;
    font-weight: 700;
}

.page .contenter .list .list_item .list_item_left p:nth-child(2) {
    font-size: 0.34667rem;
    color: #7d7d80;
    text-decoration: line-through;
    margin-top: 0.13333rem;
}

.page .contenter .list .list_item .list_item_right {
    color: #e8b559;
    white-space: nowrap;
}

.page .contenter .list .list_item .list_item_right span:first-child {
    font-size: 0.34667rem;
}

.page .contenter .list .list_item .list_item_right span:nth-child(2) {
    font-size: 0.74667rem;
}

.page .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page .footer .pay_btn {
    width: calc(100% - 0.53333rem);
}

.pay_popup {
    position: relative;
    background: url('/src/assets/img/5dce662035614d3fb4779cb757de2e8a.png') no-repeat top;
    background-size: 100% 1.22667rem;
    padding: 0.53333rem;
}

.pay_popup .pay_title {
    color: #474747;
    font-size: 0.53333rem;
    font-weight: 700;
    text-align: center;
    line-height: 2;
}

.pay_popup .pay_subtitle {
    color: #7d7d80;
    font-size: 0.4rem;
    font-weight: 500;
    line-height: 2;
    text-align: center;
}

.pay_popup :deep(.van-cell__title) {
    margin-left: 0.53333rem;
}

.pay_popup :deep(.van-cell__value) {
    position: static;
}

.pay_popup .pay_img {
    width: 0.74667rem;
    height: 0.74667rem;
    position: absolute;
    left: 0;
    top: 0.21333rem;
}
</style>
