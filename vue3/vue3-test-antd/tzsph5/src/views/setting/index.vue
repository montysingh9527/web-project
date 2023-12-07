<template>
    <div class="page">
        <van-nav-bar
            title="我的"
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
        <div class="list">
            <van-cell-group>
                <van-cell title="编辑资料" is-link to="/edit" />
                <van-cell title="绑定手机" is-link to="/bindPhone" :value="phone" />
                <van-cell title="修改密码" is-link to="/updatePwd" />
            </van-cell-group>
            <div class="switch_account" @click="$router.push('/login')"> 切换账号 </div>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick,computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { getTag, getVideoCategory, getVideoZtList } from '@/api/common'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const store = useStore()
        const phone = computed(() => store.state.user.userInfo.phone)
        return {phone}
    }
}
</script>
<style lang="scss" scoped>
.page {
    height: 100vh;
    background: #f4f5f6;
}

:deep(.van-nav-bar__text) {
    color: #f8b945;
}

.page .switch_account {
    margin-top: 0.4rem;
    width: 100%;
    height: 1.33333rem;
    line-height: 1.33333rem;
    text-align: center;
    font-size: .42667rem;
    color: #f8b945;
    background-color: #fff;
    font-weight: 700;
    letter-spacing: .05333rem;
}

</style>
