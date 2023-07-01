<template>
    <div>
        <form action="/">
            <van-search
                v-model="key"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="$router.back()"
            />
        </form>

        <van-tabs class="tabs" v-model:active="curTab" sticky>
            <van-tab title="帖子">
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
                            <ArticleItem :item="item" />
                        </div>
                    </van-list>
                </template>

                <van-empty v-else description="暂无数据" />
            </van-tab>

            <van-tab title="用户">
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
                            {{ item }}
                            <!-- <ArticleItem :item=item /> -->
                        </div>
                    </van-list>
                </template>

                <van-empty v-else description="暂无数据" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name: 'Search'
}
</script>

<script setup>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ArticleItem from '@/components/ArticleItem.vue'
import { showSuccessToast, showFailToast } from 'vant'
import { apiGetRecommendUser, apiSearchArticle, apiSearchUser } from '@/api/common'

const router = useRouter()
const store = useStore()

const curTab = ref(0)

const key = ref('')
const state = reactive({
    data: [],
    data1: []
})

const loading = ref(false)
const finished = ref(false)
const params = reactive({
    limit: 20,
    page: 1
})
const getData = () => {
    loading.value = true
    params.key = key.value
    console.log(params)
    apiSearchArticle(params)
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

const loading1 = ref(false)
const finished1 = ref(false)
const params1 = reactive({
    limit: 20,
    page: 1
})
const getData1 = () => {
    loading1.value = true
    params1.key = key.value
    apiSearchUser(params1)
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

const onSearch = () => {
    onRefresh()
    onRefresh1()
}
</script>
<style lang="scss" scoped>
</style>
