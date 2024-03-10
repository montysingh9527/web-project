<template>
    <div class="user white">
        <header class="flex-middle bg-white over-hidden" style="height:48px;">
            <van-tabs
                    style="min-width: 350px;height:100%;"
                    v-model="type"
                    line-height="2px"
                    :border="false"
                    :swipe-threshold="5"
                    color="#14805E"
                    title-inactive-color="#474747"
                    title-active-color="#14805E"
                    @click="handleTabClick">
                <van-tab :name="tab.name" :title="tab.title" v-for="tab of tabs" :key="tab.name"/>
            </van-tabs>
        </header>

        <ul class="route-content bg-white" style="width:608px;margin: 24px auto;" v-show="!action.name">
            <li class="route-item flex-middle-only"
                v-for="route of routes" :key="route.title"
                @click="toDetail(route)"
            >
                <span class="fs16" style="color:#06855F;">{{route.title}}</span>
            </li>
        </ul>

        <div class="route-detail-content" v-show="action.name">
            <header class="flex-between">
                <div class="flex-middle header-icon">
                    <van-icon name="arrow-left" color="#333" @click="back"></van-icon>
                </div>
                <div class="flex-1 flex-middle" style="color: #222;">{{action.title}}</div>
                <div style="width: 44px;"></div>
            </header>
        </div>

        <component :is="action.name" @forget-click="forgetFundPwd"></component>
    </div>
</template>
<script>
    import UserMixin from "../../../mixins/user-mixin"
    import UserInfo from "../../../components/user/UserInfo";
    import LoginPwd from "../../../components/user/LoginPwd";
    import FundPwd from "../../../components/user/FundPwd";
    import ForgetFundPwd from "../../../components/user/ForgetFundPwd";
    import Deposit from "../../../components/user/Deposit";
    import Withdraw from "../../../components/user/Withdraw";
    import Transform from "../../../components/user/Transform";
    import WithdrawAccount from "../../../components/user/WithdrawAccount";
    export default {
        mixins: [UserMixin],
        components: {
            'userInfo': UserInfo,
            'loginPwd': LoginPwd,
            'fundPwd': FundPwd,
            'forgetFundPwd': ForgetFundPwd,
            'deposit': Deposit,
            'withdraw': Withdraw,
            'transform': Transform,
            'withdraw-account': WithdrawAccount,
        }
    }
</script>
<style type="text/css" lang="less">
    .user {
        background-color: #ddd;

        .van-tabs__nav--line {
            padding-bottom: 10px;
        }

        .route-content {
            border-top:1px solid #bbb;
            border-left:1px solid #bbb;

            .route-item {
                border-right:1px solid #bbb;
                border-bottom:1px solid #bbb;
                padding:0 16px;
                height: 44px;
                &:hover {
                    background-color: #eee;
                }
            }
        }

        .route-detail-content {
            header {
                background: #F8F8F8;
                box-shadow: inset 0 -1px 0 0 #CCCCCC;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
        }

        .header-icon {
            width:44px;
            height:44px;
            border-right:1px solid #ccc;
        }
    }
</style>
