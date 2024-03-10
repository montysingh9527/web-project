<template>
    <div class="user-info">
        <div class="lh-30 m-t8">
            {{`账号:    ${userInfo.username}`}}
        </div>
        <div class="lh-30" v-show="userInfo.fullName">
            {{`真实姓名:    ${userInfo.fullName}`}}
        </div>
        <div class="lh-30" v-show="userInfo.fullName">
            {{`QQ:    ${userInfo.qq}`}}
        </div>
        <div class="lh-30" v-show="userInfo.phone">
            {{`手机:    ${userInfo.phone}`}}
        </div>
        <div class="lh-30" v-show="userInfo.email">
            {{`邮箱:    ${userInfo.email}`}}
        </div>
        <div class="spe-size">
            币别:&nbsp;&nbsp;RMB
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        computed: {
            ...mapGetters(['userInfo'])
        }
    }
</script>
<style type="text/css" lang="less">
    .user-info {
        max-width: 540px;
        margin: 0 auto;
        color: #666;
    }
</style>
