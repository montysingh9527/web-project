<template>
    <div>
        <Header title="列表"> </Header>
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
                            <!-- <ArticleItem :item=item /> -->
                            {{item}}
                        </div>
                    </van-list>
                </template>

                <van-empty v-else description="暂无数据" />
    </div>
</template>

<script setup name="Contacts">
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showSuccessToast, showFailToast } from 'vant'
import { apiContactsList } from '@/api/common'

const router = useRouter()
const store = useStore()


const state = reactive({
    data: [],
})

const loading = ref(false)
const finished = ref(false)
const params = reactive({
    limit: 20,
    page: 1,
})
const getData = () => {
    loading.value = true
    apiContactsList(params)
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

</style>
