<template>
    <div>
        <Header title="首页">
            <template #left></template>
            <template #right>
                <svg
                    data-v-7a4c7613=""
                    data-feed-search="true"
                    extra-class="m-default-size"
                    class="g-icon m-default-size"
                    aria-hidden="true"
                    @click="$router.push('/serach')"
                >
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202303061035-0d2f8fde82#icon-search"
                        href="/src/assets/icon/icon-home.svg?rev=202303061035-0d2f8fde82#icon-search"
                    ></use>
                </svg>
            </template>
        </Header>

        <div class="send-box" @click="$router.push('/compose')">
            <van-cell-group :border="false">
                <van-field
                    v-model="txtContent"
                    placeholder="发布贴文..."
                    size="large"
                    type="textarea"
                    autosize
                    rows="3"
                />
            </van-cell-group>
            <div class="ml-3">
                <svg data-v-eb436e2a="" class="g-icon" aria-hidden="true">
                    <use
                        xlink:href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-media"
                        href="/src/assets/icon/icon-home.svg?rev=202302141130-b6a55920fb#icon-media"
                    ></use>
                </svg>
            </div>
        </div>

        <div class="">
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
                    <ArticleItem :item="item" />
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<script setup>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { showSuccessToast, showFailToast } from 'vant'
import Hls from 'hls.js'
import ArticleItem from '@/components/ArticleItem.vue'
// import {useIntersectionObserver} from '@vueuse/core'
import { apiArticleIndex, apiAddZan, apiSubscribeArticle } from '@/api/common'

const txtContent = ref('')

const loading = ref(false)
const finished = ref(false)

const state = reactive({
    data: []
})

const params = reactive({
    limit: 20,
    page: 1
})

const getData = () => {
    loading.value = true
    apiArticleIndex(params)
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
</style>
