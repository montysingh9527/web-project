<template>
    <div class="page">
        <van-nav-bar
            title="影片"
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

        <div class="list" v-if="state.data">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
                            <div class="list_title title_line_2 van-multi-ellipsis--l2">{{ item.title }}</div>
                        </van-col>
                    </van-row>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import ImgUrlBox from '@/components/ImgUrlBox.vue'

import { getBanner, getIndexCol } from '@/api/common.js'
import { Encrypt, Decrypt } from '@/utils/crypto'

import { getCryptImg } from '@/utils/request.ts'
import {useKeepAliveHook} from '@/hooks/index.js'

import { getActorList, listVideoByActor } from '@/api/common'
export default {
    name: 'ActorDetail',
    components: { ImgUrlBox },
    setup(props, context) {
        useKeepAliveHook()
        const route = useRoute()

        const loading = ref(false)
        const finished = ref(false)
        const refreshing = ref(false)

        const state = reactive({
            data: []
        })

        const params = reactive({
            limit: 10,
            page: 1,
        })

        const getData = () => {
            loading.value = true
            params.id = route.query.id || '1503716339367211009'
            listVideoByActor(params)
                .then((res) => {
                    loading.value = false
                    // console.log(res)
                    if (res.code !== 0) {
                        Toast.fail(res.message)
                    } else {
                        if (res.result.records && res.result.records.length > 0) {
                            // setTimeout(() => {
                            if (params.page === 1) {
                                // console.log(2222)
                                state.data = res.result.records
                            } else {
                                state.data = [...state.data, ...res.result.records] //无线加载新数据
                            }
                            // }, 4000)
                        }

                        finished.value = params.page == res.result.pages
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

        onMounted(() => {
            getData()
        })

        return {
            state,
            refreshing,
            finished,
            loading,
            getCryptImg,
            onLoad,
            onRefresh
        }
    }
}
</script>
<style lang="scss" scoped>
.list {
    padding: 0.26667rem 0.21333rem;
}

.list .list_item {
    font-family: PingFangTC-Regular;
    margin-bottom: 0.26667rem;
}

.list .list_item .list_box {
    position: relative;
    font-size: 0.26667rem;
    color: #fff;
}

.list .list_item .h99 {
    height: 2.64rem;
}

.list .list_item .title_line_2 {
    line-height: 0.48rem;
    height: 0.96rem;
    // padding-top: 0.13333rem;
}

.list .list_item .list_title {
    font-size: 0.34667rem;
    color: #474747;
    word-break: break-all;
}
</style>
