<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="keepAlive">
            <component :is="Component" v-if="isRouterAlive" />
        </keep-alive>
    </router-view>

    <!-- <router-view v-if="isRouterAlive"></router-view> -->
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import { senHt } from '@/api/user'
import { getVipItem } from '@/api/common'
export default {
    name: 'App',
    components: {},
    setup(props, context) {
        const route = useRoute()
        const store = useStore()
        const isRouterAlive = ref(true) //router自己跳自己不刷新
        const keepAlive = computed(() => store.state.common.keepAlive)
        const reload = () => {
            isRouterAlive.value = false
            nextTick(function () {
                isRouterAlive.value = true
            })
        }
        provide('reload', reload)

        setInterval(() => {
            senHt({ account: JSON.parse(localStorage.getItem('userDetail')).account, type: '2' }).then((res) => {
                if (res.code !== 0) {
                    Toast.fail(res.message)
                } else {
                }
            })
        }, 50000)

        return {
            route,
            keepAlive,
            isRouterAlive
        }
    }
}
</script>
<style lang="scss">
html,
body {
    font-family: Microsoft YaHei;
    min-height: 100vh;
    background-color: #fff;
    zoom: 1;
    // width: 100%;
    // height: 100%;
}
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // overflow: scroll;
    color: #2c3e50;
    background-color: #fff;
    // height: 100%;
    // width: 100%;
}
</style>
