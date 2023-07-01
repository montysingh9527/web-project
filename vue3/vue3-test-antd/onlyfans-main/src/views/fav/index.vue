<template>
    <div>
        <Header title="书签"> </Header>

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

<script setup name="Fav">
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ArticleItem from '@/components/ArticleItem.vue'
import { showSuccessToast, showFailToast } from 'vant'
import { apiFavList } from '@/api/common'


const router = useRouter()
const store = useStore()

const curTab = ref(0)


const state = reactive({
    data: [],
    data1: []
})

const loading = ref(false)
const finished = ref(false)
const params = reactive({
    limit: 20,
    page: 1,
    type: 1 //1视频/2图文
})
const getData = () => {
    loading.value = true
    console.log(params)
    apiFavList(params)
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
    page: 1,
    type: 2 //1视频/2图文
})
const getData1 = () => {
    loading1.value = true
    apiFavList(params1)
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
</script>
<style lang="scss" scoped>
</style>
