<template>
    <div class="page" v-if="state.tabs && state.tabs.length">
        <van-nav-bar title="片库" @click-left="$router.back()" style="height: 46px" :border="false" fixed placeholder>
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
        </van-nav-bar>

        <!-- <div style="height: 162px"> -->
        <div>
            <van-sticky :offset-top="46">
                <div class="search">
                    <van-tabs
                        v-if="state.tabs && state.tabs.length"
                        v-model:active="currentTab"
                        sticky
                        ellipsis
                        shrink
                        :line-width="0"
                        :line-height="0"
                        background="transparent"
                        color="rgb(247, 180, 63)"
                        title-active-color="rgb(247, 180, 63)"
                        title-inactive-color="#646566"
                         @change="onChange"
                    >
                        <van-tab v-for="(t, i) in state.tabs" :key="i" :title="t"></van-tab>
                    </van-tabs>
                    <!-- <div class="search_btn">
              <van-button class="w71" size="small" type="primary" round plain >最热</van-button>
              <van-button class="w71" size="small" type="default" round plain >最热</van-button>
              <van-button class="w71" size="small" type="primary" round plain >最热</van-button>
          </div> -->
                </div>
            </van-sticky>
        </div>

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
                        <div class="list_title title_line_2 van-multi-ellipsis--l2">{{ item.title }}</div>
                    </van-col>
                </van-row>
            </van-list>
            <!-- </van-pull-refresh> -->
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, reactive, defineComponent, computed } from 'vue'
import { Toast } from 'vant'
import ImgUrlBox from '@/components/ImgUrlBox.vue'
import { useRoute } from 'vue-router'
import {useKeepAliveHook} from '@/hooks/index.js'

import { getVideoCategory, getVideoListByCategory } from '@/api/common'
export default {
    name: 'Vault',
    components: { ImgUrlBox },
    setup(props, context) {
        useKeepAliveHook()
        const currentTab = ref(0)
        const loading = ref(false)
        const finished = ref(false)
        const refreshing = ref(false)

        const state = reactive({
            tabs: [],
            result: [],
            data: []
        })

        getVideoCategory({}).then((res) => {
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

            params.categoryId = computed(() => state.result[currentTab.value].id).value
            // console.log(params)
            // console.log(state.result)
            getVideoListByCategory(params)
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
                        finished.value = params.page >= res.result.pages
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

        return { state, currentTab, loading, finished, refreshing, onRefresh, onLoad, onChange }
    }
}
</script>
<style scoped lang="scss">
.page .search {
    padding: 0.26667rem 0.42667rem;
    background-color: #fff;
}

.page .w71 {
    width: 1.89333rem;
    text-align: center;
    margin-right: 0.26667rem;
}

:deep(.van-button--primary) {
    color: #fff;
    background-color: #f8b945;
    border: 0.02667rem solid #f8b945;
}
:deep(.van-button--plain) {
    background-color: #fff;
}

:deep(.van-button--plain.van-button--primary) {
    color: #f8b945;
}


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
