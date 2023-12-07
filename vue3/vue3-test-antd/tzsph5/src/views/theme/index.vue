<template>
    <div class="page">
        <van-nav-bar :title="title" @click-left="$router.back()" style="height: 46px" :border="false" fixed placeholder>
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>

        <div class="list" v-if="state.data">
            <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
            >
                <van-row gutter="10">
                    <van-col
                        class="list_item"
                        span="12"
                        v-for="item in state.data"
                        :key="item.id"
                        @click="$router.push(`/play?id=${item.id}`)"
                    >
                        <ImgUrlBox :videoList="item" />
                        <div class="list_title title_line_1 van-ellipsis">{{ item.title }}</div>
                    </van-col>
                </van-row>
            </van-list>
            <!-- </van-pull-refresh> -->
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'
import ImgUrlBox from '@/components/ImgUrlBox.vue'
import { senHt } from '@/api/user'
import { getVipItem, getVideoByIndexCol } from '@/api/common'
import { useKeepAliveHook } from '@/hooks/index.js'
export default {
    name: 'Theme',
    components: { ImgUrlBox },
    setup(props, context) {
        useKeepAliveHook()
        const route = useRoute()

        const title = route.query.title
        const themeId = route.query.themeId

        const loading = ref(false)
        const finished = ref(false)
        const refreshing = ref(false)

        const state = reactive({
            data: []
        })


        const params = reactive({
            limit: 20,
            page: 1
        })

        const getData = () => {
            loading.value = true
            params.id = themeId
            getVideoByIndexCol(params)
                .then((res) => {
                    loading.value = false
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
        getData()

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

        return { state, title, themeId, loading, finished, refreshing, onLoad }
    }
}
</script>
<style lang="scss">
.list {
    padding: 0.26667rem 0.21333rem;
}

.list .list_item .title_line_1 {
    line-height: 0.8rem;
    height: 0.8rem;
}

.list .list_item .list_title {
    font-size: 0.34667rem;
    color: #474747;
    word-break: break-all;
}
</style>
