<template>
    <div class="page">
        <van-nav-bar
            title="充值VIP"
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
                <p>{{ state.account }}11</p>
                <p v-if="!state.isVip">您还不是会员</p>
            </div>
        </div>

        <div class="contenter">
            <div class="title">专属权益</div>
            <ul class="equity">
                <li
                    class="equity_item"
                    style="
                        background-image: url('data:image/png;base64,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');
                    "
                >
                    <p>广告特权</p>
                    <p>广告全跳过</p>
                </li>
                <li
                    class="equity_item"
                    style="
                        background-image: url('data:image/png;base64,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');
                    "
                >
                    <p>高速下载</p>
                    <p>全站高速下</p>
                </li>
                <li
                    class="equity_item"
                    style="
                        background-image: url('data:image/png;base64,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');
                    "
                >
                    <p>高清细节</p>
                    <p>细节不错过</p>
                </li>
            </ul>
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
                        <p class="van-multi-ellipsis--l2">{{ item.title }}</p>
                        <p>{{ item.price }}</p>
                    </div>
                    <div class="list_item_right">
                        <span>特惠价</span><span>{{ item.disCount }}</span>
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
                >立即充值<span v-if="state.result.length > 0">{{ state.result[state.current].disCount }}</span>
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
                立即支付<span v-if="state.result.length > 0">{{ state.result[state.current].disCount }}</span
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

import { getVipItem, getChannelList, toPay } from '@/api/common'
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
            current: 0,
            result: [],
            channelList: []
        })
        // console.log(state)

        getVipItem({}).then((res) => {
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
                type: '1',
                channelId: checked.value,
                itemId: state.result[state.current].id
            }).then((res) => {
                // console.log(res)
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                    window.location.href = import.meta.env.VITE_APP_PROXY_HOST+'api/pay/page?token=' + res.result;
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
