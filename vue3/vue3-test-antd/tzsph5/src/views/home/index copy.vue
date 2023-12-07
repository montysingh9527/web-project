<template>
    <div class="page">
        <div class="header">
            <van-sticky>
                <div class="top">
                    <div class="content">
                        <div class="search">
                            <div class="sildbar" @click="show = !show">
                                <i class="sildbar_menu"></i>
                            </div>
                            <div class="seek" @click="$router.push('/search')">
                                <span></span>
                                <span>搜视频</span>
                            </div>
                            <div class="vault" @click="$router.push('/vault')">
                                <span></span>
                                <span>片库</span>
                            </div>
                        </div>
                        <div class="nav_tab">
                            <div class="nav_tab_left">
                                <van-tabs
                                    v-if="state.tabs && state.tabs.length"
                                    v-model:active="currentTab"
                                    sticky
                                    background="transparent"
                                    color="rgb(247, 180, 63)"
                                    title-active-color="rgb(247, 180, 63)"
                                    title-inactive-color="rgb(239, 239, 241)"
                                    @change="onChange"
                                >
                                    <van-tab v-for="(t, i) in state.tabs" :key="i" :title="t"></van-tab>
                                </van-tabs>
                            </div>
                            <!-- <div class="nav_tab_right"></div> -->
                        </div>
                    </div>
                </div>
            </van-sticky>
        </div>
        <div class="swipers">
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in state.banner" :key="image" loop show-indicators>
                    <van-image :src="image" class="swiper_img" style="overflow: hidden; border-radius: 4px" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="container" ref="containerRef">
            <div class="theme_list">
                <div class="list" v-if="state.data && state.data.length">
                    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
                        v-model:loading="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        :immediate-check="false"
                    >
                        <div class="list_item" v-for="(item, index) in state.data" :key="index"  @click="$router.push(`/play?id=${item.id}`)">
                            <!-- {{ item.imgUrl }} -->
                            <ImgUrlBox :videoList="item" />
                            <div class="list_title title_line_1 van-ellipsis">
                                {{ item.title }}
                            </div>
                        </div>
                    </van-list>
                    <!-- </van-pull-refresh> -->
                </div>
            </div>
        </div>
    </div>

    <van-popup v-model:show="show" position="left" style="height: 100%; width: 290px; z-index: 2005" overlay closeable>
        <div class="drawer">
            <div class="drawer-header">
                <div class="drawer-info">
                    <img v-lazyload="headUrl" style="width: 1.6rem; height: 1.6rem; border-radius: 50%" />
                    <div class="drawer-account">
                        <p>{{ account }}</p>
                        <p>ID: {{ userId }}</p>
                    </div>
                </div>
                <div class="drawer-user">
                    <span class="drawer-user-name" v-if="!isVip">普通用户</span>
                    <span class="drawer-user-name" v-else>VIP用户</span>
                    <van-button
                        v-if="!isVip"
                        type="primary"
                        size="small"
                        round
                        style="
                            color: rgb(247, 180, 63);
                            background-color: rgb(51, 51, 51);
                            border: 1px solid rgb(51, 51, 51);
                        "
                        @click="$router.push('/vip')"
                        >开通vip</van-button
                    >
                    <!-- <van-button
                        type="primary"
                        size="small"
                        round
                        style="
                            color: rgb(247, 180, 63);
                            background-color: rgb(51, 51, 51);
                            border: 1px solid rgb(51, 51, 51);
                            margin-left: 10px
                        "
                        @click="$router.push('/coin')"
                        >充值钻石</van-button
                    > -->
                </div>
            </div>
            <div class="drawer-body">
                <van-cell-group :border="false">
                    <van-cell :border="false" @click="show = false">
                        <template #title>
                            <div class="drawer-nav">
                                <i
                                    style="
                                        background-image: url('data:image/png;base64,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');
                                    "
                                ></i
                                ><span>分类</span>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell :border="false" to="/actor">
                        <template #title>
                            <div class="drawer-nav">
                                <i
                                    style="
                                        background-image: url('data:image/png;base64,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');
                                    "
                                ></i
                                ><span>up主</span>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell :border="false" to="/special">
                        <template #title>
                            <div class="drawer-nav">
                                <i
                                    style="
                                        background-image: url('data:image/png;base64,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');
                                    "
                                ></i
                                ><span>标签</span>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell :border="false" to="/my">
                        <template #title>
                            <div class="drawer-nav">
                                <i
                                    style="
                                        background-image: url('data:image/png;base64,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');
                                    "
                                ></i
                                ><span>我的</span>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
            <div class="drawer-footer">
                <!-- <van-button type="primary" round style="color: rgb(51, 51, 51); height: 38px; line-height: 38px"
                    >注册账号</van-button
                > -->
                <van-button
                    type="primary"
                    round
                    style="color: rgb(51, 51, 51); height: 38px; line-height: 38px; margin-left: 10px"
                    @click="$router.push('/login')"
                    >切换账号</van-button
                >
            </div>
        </div>
    </van-popup>
</template>
<script>
import { getCurrentInstance, onMounted, ref, reactive, defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import ImgUrlBox from '@/components/ImgUrlBox.vue'
import { getTag, getVideoCategory, getVideoZtList, getIndexCol, getVideoByIndexCol, getBanner, getConfig } from '@/api/common'
import { getUserInfo } from '@/api/user'
export default defineComponent({
    name: 'Home',
    components: { ImgUrlBox },
    setup(props, context) {
        const store = useStore()
        const containerRef = ref()
        const loading = ref(false)
        const finished = ref(false)
        const refreshing = ref(false)
        const currentTab = ref(0)
        const show = ref(false)
        const a = 'http://77888.0712360.com/mdcm/images/covers/2021/10/cff551b224e6fc6-240x180.png'
        const images = [
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png',
            'http://img.cola9527taozi15.xyz/vod/meterial/20220224/WB0Y0R0N0A0549495719.png'
        ]

        const headUrl = computed(() => store.state.user.userInfo.headUrl)
        const account = computed(() => store.state.user.userInfo.account)
        const userId = computed(() => store.state.user.userInfo.id)
        const isVip = computed(() => store.state.user.userInfo.isVip)

        const state = reactive({
            banner: [],
            tabs: [],
            result: [],
            data: []
        })

        getBanner({}).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                if (res.result.length > 0) {
                    state.banner = computed(() => res.result.map((e) => e.imgUrl))
                } else {
                    state.banner = images
                }
            }
        })

        getIndexCol({ limit: 10 }).then((res) => {
            // console.log(res)
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                state.tabs = computed(() => res.result.map((e) => e.title))
                state.result = res.result
                getData()
            }
        })

        const params = reactive({
            limit: 10,
            page: 1
        })

        const getData = () => {
            loading.value = true
            // console.log(params)
            // console.log(state.result)
            params.id = computed(() => state.result[currentTab.value].id).value
            getVideoByIndexCol(params)
                .then((res) => {
                    loading.value = false
                    // console.log(res)
                    if (res.code !== 0) {
                        Toast.fail(res.message)
                    } else {
                        // console.log(33333)
                        if (res.result.records && res.result.records.length > 0) {
                            // setTimeout(() => {
                            if (params.page === 1) {
                                state.data = res.result.records
                            } else {
                                state.data = state.data.concat(res.result.records)
                            }
                            // }, 4000)
                        }
                        finished.value = params.page == res.result.pages
                    }
                })
                .catch(() => {})
        }

        const onChange = async () => {
            // console.log(222)
            // console.log(currentTab)
            state.data = []
            params.page = 1
            await getData(params)
        }

        // 刷新
        const onRefresh = async () => {
            params.page = 1
            await getData(params)
        }

        // 无限加载
        const onLoad = async () => {
            params.page += 1
            // console.log(params)
            await getData(params)
        }

        getUserInfo({ userId: JSON.parse(localStorage.getItem('userDetail')).id, isUpdate: true }).then((res) => {
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                store.commit('user/SET_USERINFO', res.result)
            }
        })

        getConfig({}).then((res) => {
            // console.log(res);
            if (res.code !== 0) {
                Toast.fail(res.message)
            } else {
                store.commit('common/SET_CONFIG', res.result)
            }
        })

        // console.log()
        onMounted(() => {})
        return {
            state,
            headUrl,
            account,
            userId,
            isVip,
            refreshing,
            loading,
            finished,
            a,
            currentTab,
            images,
            show,
            containerRef,
            onChange,
            onRefresh,
            onLoad
        }
    }
})
</script>

<style lang="scss" scoped>
.page .top {
    position: relative;
    // background-color: #212120;
    background-color: rgb(201, 89, 138);
}
.page .content {
    position: relative;
}
.search {
    padding: 0.24rem 0.42667rem 0;
}
.flex,
.search {
    display: flex;
    align-items: center;
}
.search .sildbar {
    width: 0.58667rem;
    height: 0.58667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAALAAAAAD8buejAAAAkklEQVRYCe3WsQ2AIBCFYc/apRzDgVzA0mmcSStt8NFRALlGovEnIcBxeslHc13HQAABBP4jEEKYNU/NlmNXsamkbKWLGNeHh5ahlvPQ3WZmY+7ffS6YxBbtr+TcYhuR1haFqIEAAggggMDHBNRL0Pw434zmxwlFGgIIIIAAAm8WoPnxvw7Nj9+KTAQQQACBmsAN6UuHV6w0jH0AAAAASUVORK5CYII=)
        no-repeat 50%;
    background-size: contain;
    position: relative;
}
.search .sildbar i {
    width: 0.82667rem;
    height: 0.42667rem;
    background: url(data:image/png;base64,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)
        no-repeat 50%;
    background-size: contain;
    position: absolute;
    display: inline-block;
    right: -0.53333rem;
    top: -0.21333rem;
}

.search .seek {
    display: flex;
    align-items: center;
    flex: 1;
    height: 0.8rem;
    border-radius: 0.45333rem;
    background: hsla(0, 0%, 88.6%, 0.5);
    padding: 0 0.24rem;
    margin: 0 0.45333rem 0 0.74667rem;
}

.search .seek span:first-child {
    display: inline-block;
    width: 0.58667rem;
    height: 0.58667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAALAAAAAD8buejAAACiElEQVRYCe2YsWobQRCGrRBw8grB4MaVm1Rx5zewwfgpDMZpQwghBNJJnZs0eYKoMgTk4E6NcWdMgh8gJF2aNA4JXL5f3J5G4m51K81ZsbkfRjt7u/vPaDS3O6uVlRZtBNoItBGIRaATG6wzlmXZKvO2kDXkSb7mO+035KLT6fzOny23wdEdpI/8QqqgMc3ZWZq3GN9ChkgqtObZoo4npQQGDzB4jDycMvyV/iWiVBCUGk+RTXUM/qIfkSbvzbNmVJztToX0hn4P2aiyqLF8juZadKvWuDzH0oG1hn6OrNcl19x8DU0B/Vr+gF45+6cwk2Uf0bUzJEFrEK0NEKd2F19Aal8wRTbZ2eCR1iLiCBiGMZcWVm1dAcrD2mlQ5YA4EJvTflsexNpDA3pVTqQ+h1Ava0A/dX3pfNj089lDoXI3KCWIPIRXu0eAbMydZoUZSLYDI+2XYsBJEafh365L+yAyUbVBgA4Fb1hOaytqJ+ZwKGREEE6wKFnioOW0tqI0MYejC50Hs7p8MYfnikBdw8yzUf1Rd13MYdWzASpkvGE5ra357PAG/5fbWmWE85vCqfm6nsWK5Tp1u5UQ5bt1NCu6OH13ip/c4SbLy4WvTCZlxypRbqKAv4b38diKswa55xUJuhHO+ExyehmX0BNiuW/ieYa+y05xY575qURkkWv+6EoEx4tRfMcfn1Ef+XlZwoQBbXkq8G3NTHcClX+kMOvlxMwsG9CfWRcnpUSJ39r2FBm97SoRQ32gOkTHbfSvKta+Ys47JGCAsud2kARWzxanXyMWn+jMjLSnD8lcOPjGeoz+IZnkthfg5Fvj9E/0hdO18e+Ak8+RK+SwcWOtgTYCbQTuaQT+AUwxvcKi0P03AAAAAElFTkSuQmCC)
        no-repeat 50%;
    background-size: contain;
}

.search .seek span:nth-child(2) {
    margin-left: 0.24rem;
    font-family: PingFangHK-Regular;
    font-size: 0.37333rem;
    color: #fff;
}
.search .vault {
    display: flex;
    align-items: center;
}

.search .vault span:first-child {
    display: inline-block;
    width: 0.58667rem;
    height: 0.58667rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAALAAAAAD8buejAAACIUlEQVRYCe2Yq0tEURDGvb5A8QUiCmIQDIrNoMGq0SIoFk0Gg8kk/gGCNoMg2ASLxWAUqygYNBhEi0V84At84HP9HdgL43LPY9ezi+IZ+LizM998Mzt7d/dwi4qChQ2EDRR0A5GtWyqVqoQzAlqAlW/TM+RT5E7BWhRFTzqecQCGraJwB3TqBPIQP0SzWzd0saXhEPlCDqvGUf2GlZNkpUlBEVO3g7RlXpzJgCe/GZ1xoaU+2eyNW6IR3IHY9nFqslfSVyg9cBA34Kr6NekrLBmK+8EriG0Tp8xS5pRGpxxsxcJcVZ8+p2ITCZExIarcFRPfJYdGBFaVWNo+uY661DpxEJuJldPXWadCDQmNuQy9aQ019zANljKaTOSihsZkhs5iLjrWGpqUgA3R7B1/wFooCPAHwYfQWMe3/bwKhSxdxCvBrmj4iN/tIgOvFzyL2m38CpfaH3Fo0gBORONL/DaTKPl2cC1qjvDrTTVeczRrA1digF1TA3h7gnuO32ri5yVH0x7wJgZJ/FMhXy04it+Vl4FcRGl+K4apS6ohXys490kc11j+vp3fJ1BHRy9WqIG9DKtEwsDeVqkRChvWLMZbOGzY2yo1QmHDmsV4C4cNe1ulRuhfbvglvQx1wHnVLMZb2MeG55nmBizonoeRMz7D8/ZufAlxFlZPd2L7E+dhX+89HC91m3wgcZFOHutIvyrODdwBpoB6kh8sbODfbuALxcLp/I6C/lYAAAAASUVORK5CYII=)
        no-repeat 50%;
    background-size: contain;
}

.search .vault span:nth-child(2) {
    font-family: PingFangSC-Regular;
    font-size: 0.37333rem;
    color: #fff;
    letter-spacing: 0;
    text-align: right;
}

.nav_tab {
    display: flex;
    align-items: center;
    padding: 0.13333rem 0.42667rem;
}

.nav_tab .nav_tab_left {
    // flex: 1;
    width: 100%;
}

//  :deep(.van-tabs__nav) {
//     background-color: transparent;
// }
.swipers {
    padding: 0.21333rem 0.21333rem 0.02667rem;
}

.van-swipe {
    position: relative;
    overflow: hidden;
    cursor: grab;
    -webkit-user-select: none;
    user-select: none;
}

.swipers .swiper_img {
    width: 9.57333rem;
    height: 4.45333rem;
}

.drawer {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.drawer-header {
    background-image: linear-gradient(231deg, #fbd46b, #f7b440);
    padding: 1.69333rem 0.53333rem 0.4rem;
}
.drawer-header .drawer-info {
    display: flex;
    align-items: center;
}

.drawer-header .drawer-account {
    margin-left: 0.21333rem;
    color: #333;
}

.drawer-header .drawer-account p:first-child {
    font-family: PingFangSC-Semibold;
    font-size: 0.48rem;
}

.drawer-header .drawer-account p:nth-child(2) {
    font-family: PingFangHK-Regular;
    font-size: 0.34667rem;
    margin-top: 0.21333rem;
}

.drawer-header .drawer-user {
    margin-top: 0.32rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.drawer-header .drawer-user .drawer-user-name {
    font-family: PingFangHK-Regular;
    font-size: 0.32rem;
    color: #333;
    font-weight: 600;
    margin-right: 0.21333rem;
}

.drawer-body {
    padding: 0.26667rem 0.21333rem;
}
.drawer-body .drawer-nav {
    height: 1.01333rem;
    line-height: 1.01333rem;
    display: flex;
    align-items: center;
}
.drawer-body .drawer-nav i {
    width: 0.74667rem;
    height: 0.74667rem;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    margin-right: 0.26667rem;
}

.drawer-body .drawer-nav span {
    font-family: PingFangSC-Regular;
    font-size: 0.48rem;
    color: #474747;
    font-weight: 700;
}

.drawer-footer {
    padding: 0.8rem 0.42667rem;
}
:deep(.van-button--primary) {
    color: #fff;
    background-color: #f8b945;
    border: 0.02667rem solid #f8b945;
}

.theme_list {
    padding: 0.02667rem 0.21333rem 0.26667rem;
}

.theme_list .list .list_item {
    font-family: PingFangTC-Regular;
    margin-bottom: 0.26667rem;
}

.theme_list .list .list_item .title_line_1 {
    line-height: 0.8rem;
    height: 0.8rem;
}

.theme_list .list .list_item .list_title {
    font-size: 0.34667rem;
    color: #474747;
    word-break: break-all;
}
</style>
