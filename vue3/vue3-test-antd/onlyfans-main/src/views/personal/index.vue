<template>
    <div>
        <div class="bgUrl relative w-full">
            <img v-if="state.userInfo.bgUrl" v-lazyload="state.userInfo.bgUrl" class="w-full h-full object-cover" />
            <div class="absolute -bottom-10 left-6 w-20 h-20 rounded-full z-10 overflow-hidden bg-white p-0.5">
                <img
                    v-if="state.userInfo.headUrl"
                    v-lazyload="state.userInfo.headUrl"
                    class="w-full h-full rounded-full object-cover"
                />
            </div>

            <svg @click="$router.back()" class="g-icon back absolute top-4 left-4" aria-hidden="true">
                <use
                    xlink:href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-back"
                    href="/src/assets/icon/icon-home.svg?rev=202302031115-90b0c65565#icon-back"
                ></use>
            </svg>
        </div>

        <div class="user-info">
            <div>
                <div class="nickName g-user-nam">
                    {{ state.userInfo.nickName }}
                </div>
                <div class="fans mt-1">{{ state.userInfo.fans }} 粉丝</div>
            </div>

            <div class="introduction mt-2">{{ state.userInfo.introduction }}</div>
        </div>

        <van-tabs class="tabs" v-model:active="curTab" sticky>
            <van-tab title="视频">
                <template v-if="state.data.length">
                    <van-list
                        v-model:loading="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        :immediate-check="false"
                    >
                        <div
                            v-for="item in state.data"
                            :key="item.id"
                            class="pb-4"
                            style="border-bottom: 1px solid rgba(138, 150, 163, 0.25)"
                        >
                            <ArticleItem :item=item />
                        </div>
                    </van-list>
                </template>

                <van-empty v-else description="暂无数据" />
            </van-tab>

            <van-tab title="图文">
                <template v-if="state.data1.length">
                    <van-list
                        v-model:loading="loading1"
                        :finished="finished1"
                        finished-text="没有更多了"
                        @load="onLoad1"
                        :immediate-check="false"
                    >
                        <div
                            v-for="item in state.data1"
                            :key="item.id"
                            class="pb-4"
                            style="border-bottom: 1px solid rgba(138, 150, 163, 0.25)"
                        >
                            <ArticleItem :item=item />
                        </div>
                    </van-list>
                </template>

                <van-empty v-else description="暂无数据" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup name="Personal">
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { showSuccessToast, showFailToast } from 'vant'
import ArticleItem from '@/components/ArticleItem.vue'
import Hls from 'hls.js'
// import {useIntersectionObserver} from '@vueuse/core'
import { apiAddZan, apiSubscribeArticle, apiGetUserInfo, apiArticleList, apiArticleListMy } from '@/api/common'

const route = useRoute()

const queryId = ref(route.query?.id ? route.query?.id : '')

const txtContent = ref('')

const curTab = ref(0)

const state = reactive({
    userInfo: {
        lastLogin: '',
        mail: '',
        headUrl: '',
        focus: 0,
        articleCount: 0,
        lastLoginIp: '',
        isLock: false,
        costTemplate: '',
        friend: false,
        id: '',
        introduction: '',
        firstPay: 0,
        address: '',
        nickName: '',
        payMode: 0,
        zan: 0,
        mobile: '',
        onLine: false,
        fans: 0,
        lastLoginTime: '',
        createTime: '',
        webUrl: '',
        account: '',
        bgUrl: '',
        status: 0
    },
    data: [],
    data1: []
})

const loading = ref(false)
const finished = ref(false)
const params = reactive({
    limit: 20,
    page: 1,
    sort: 1, //sort排序:1时间，2点赞，3打赏金额
    order: 'asc', //order:排序方式：asc正序，desc倒序
    type: 1 //1视频/2图文
})
const getData = () => {
    loading.value = true
    // if (queryId.value) {
        params.id = queryId.value
        console.log(params)
        apiArticleList(params)
            .then((res) => {
                loading.value = false
                console.log(res)
                if (res.code !== 0) {
                    showFailToast(res.message)
                } else {
                    if (res.result.records && res.result.records.length > 0) {
                        // setTimeout(() => {
                        if (params.page === 1) {
                            state.data = res.result.records
                        } else {
                            state.data = [...state.data, ...res.result.records] //无线加载新数据
                        }
                        // }, 4000)
                    }

                    finished.value = params.page >= res.result.pages
                }
            })
            .catch(() => {})
    // } else {
        // apiArticleListMy(params)
        //     .then((res) => {
        //         loading.value = false
        //         console.log(res)
        //         if (res.code !== 0) {
        //             showFailToast(res.message)
        //         } else {
        //             if (res.result.records && res.result.records.length > 0) {
        //                 // setTimeout(() => {
        //                 if (params.page === 1) {
        //                     state.data = res.result.records
        //                 } else {
        //                     state.data = [...state.data, ...res.result.records] //无线加载新数据
        //                 }
        //                 // }, 4000)
        //             }

        //             finished.value = params.page >= res.result.pages
        //         }
        //     })
        //     .catch(() => {})
    // }
}
// 刷新
const onRefresh = async () => {
    params.page = 1
    await getData(params)
}
// 无限加载
const onLoad = async () => {
    params.page += 1
    // console.log(params.page)
    await getData(params)
}
getData()

const loading1 = ref(false)
const finished1 = ref(false)
const params1 = reactive({
    limit: 20,
    page: 1,
    sort: 1, //sort排序:1时间，2点赞，3打赏金额
    order: 'asc', //order:排序方式：asc正序，desc倒序
    type: 2 //1视频/2图文
})
const getData1 = () => {
    loading1.value = true
    // if (queryId.value) {
        params1.id = queryId.value
        apiArticleList(params1)
            .then((res) => {
                loading1.value = false
                console.log(res)
                if (res.code !== 0) {
                    showFailToast(res.message)
                } else {
                    if (res.result.records && res.result.records.length > 0) {
                        // setTimeout(() => {
                        if (params1.page === 1) {
                            state.data1 = res.result.records
                        } else {
                            state.data1 = [...state.data1, ...res.result.records] //无线加载新数据
                        }
                        // }, 4000)
                    }

                    finished1.value = params1.page >= res.result.pages
                }
            })
            .catch(() => {})
    // } else {
        // apiArticleListMy(params1)
        //     .then((res) => {
        //         loading1.value = false
        //         console.log(res)
        //         if (res.code !== 0) {
        //             showFailToast(res.message)
        //         } else {
        //             if (res.result.records && res.result.records.length > 0) {
        //                 // setTimeout(() => {
        //                 if (params1.page === 1) {
        //                     state.data1 = res.result.records
        //                 } else {
        //                     state.data1 = [...state.data1, ...res.result.records] //无线加载新数据
        //                 }
        //                 // }, 4000)
        //             }

        //             finished1.value = params1.page >= res.result.pages
        //         }
        //     })
        //     .catch(() => {})
    // }
}
// 刷新
const onRefresh1 = async () => {
    params1.page = 1
    await getData1(params1)
}
// 无限加载
const onLoad1 = async () => {
    params1.page += 1
    // console.log(params1.page)
    await getData1(params1)
}
getData1()

// 获取用户资料
const getUserInfo = (item) => {
    apiGetUserInfo({ id: queryId.value }).then((res) => {
        console.log(res)
        if (res.code !== 0) {
            showFailToast(res.message)
        } else {
            state.userInfo = res.result
        }
    })
}

getUserInfo()
</script>
<style lang="scss" scoped>
.send-box {
    margin-bottom: 9px;
    border-bottom: 8px solid var(--marked-color);
}

.g-avatar__img-wrapper {
    width: 48px;
    height: 48px;
    border-radius: inherit;
    border-radius: 50%;
}

.g-avatar__img-wrapper img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
    position: relative;
}

.b-username {
    min-width: 0;
    display: block;
    color: var(--text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 500;
}
.g-user-username {
    font-size: 14px;
    color: #8a96a3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.updateTimeStr {
    font-size: 14px;
    color: #8a96a3;
    margin: 0 0 0 auto;
    white-space: nowrap;
    text-align: right;
}

.txtContent {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    position: relative;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 5px;
}

.video-box {
    width: 100%;
    height: 210px;
    object-fit: cover;
}

.picArray-box {
    width: 100%;
    height: 210px;
    object-fit: cover;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.b-post__tools {
    font-size: 13px;
    font-weight: 500;
    padding: 8px 0 0;
    display: flex;
    position: relative;
    .num {
        font-size: 18px;
    }
}

.b-post__tools__item {
    display: flex;
    align-content: center;
    align-items: center;
    white-space: nowrap;
    color: #8a96a3;
    margin-right: 4px;
}

.b-post__tools__item.m-first {
    margin-left: 6px;
}

.g-btn.m-icon:not(.m-colored) {
    background: none;
    transition: color 0.15s;
}

.g-btn.m-icon.m-icon-only {
    width: 48px;
    height: 48px;
    flex: 0 0 48px;
    padding: 0;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.g-btn.m-icon.m-icon-only.m-sm-size {
    width: 36px;
    height: 36px;
    min-height: 36px;
    flex-basis: 36px;
}

.g-btn.m-icon:not(.m-colored):not(.m-with-text):not(.m-active) {
    color: rgba(138, 150, 163, 0.7);
}

.g-btn.m-icon.m-icon-only:not(.m-colored).m-gray {
    color: #8a96a3;
}

.b-post__tools__item.m-last {
    margin-left: auto;
    margin-right: 6px;
}

.play {
    color: #fff;
}

.bgUrl {
    height: 160px;
    .back {
        color: #fff;
    }
}

.user-info {
    margin-top: 50px;
    padding: 0px 20px;
    .nickName {
        font-size: 19px;
    }
    .fans {
        font-size: 14px;
        color: #8a96a3;
    }
    .introduction {
        font-size: 16px;
    }
}

.tabs {
    border-top: 1px solid rgba(138, 150, 163, 0.25);
    margin-top: 16px;
}
</style>
