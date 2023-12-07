<template>
    <div class="page">
        <van-nav-bar
            title="片库"
            @click-left="$router.back()"
            style="height: 46px"
            :border="false"
            fixed
            placeholder
            right-text="搜索"
            @click-right="onRefresh"
        >
            <template #left>
                <van-icon name="arrow-left" style="color: rgb(125, 125, 128); font-size: 16px" />
            </template>
            <template #title>
                <van-search v-model="searchText" shape="round" placeholder="请输入搜索关键词" />
            </template>
        </van-nav-bar>
        <div v-if="state.data.length ==0">
            <!-- <div style="height: 155px"> -->
                <div>
                <!-- <van-sticky :offset-top="46"> -->
                    <div class="top">
                        <!-- <div class="history">
                            <div class="history_title">
                                <span>最近搜索</span>
                                <van-icon name="delete-o" size="20" />
                            </div>
                            <div class="history_content">
                                <span class="history_item van-ellipsis"
                                    >深喉/美女/无毛粉嫩白/女性高潮/叫床/手指插入/舔阴/偷拍</span
                                >
                            </div>
                        </div> -->
                        <div class="hot_title">
                            <span>热门标签</span>
                            <!-- <span>（支持多标签搜索）</span> -->
                        </div>
                    </div>
                <!-- </van-sticky> -->
            </div>
            <div class="hot">
                <div class="hot_content cl">
                    <div class="hot_item" v-for="(item, index) in searchKeys.split(',')" :key="index" @click="searchText=item">
                        <span class="hot_span van-ellipsis" :class="item==searchText?'active':'no_active'"> {{ item }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="play_scroll" v-if="state.data.length>0">
            <div class="play_list">
                <div class="play_list_title">猜你喜欢</div>
                <van-list                     
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false">
                    <div class="list">
                        <div
                            class="list_item"
                            v-for="item in state.data"
                            :key="item.id"
                            @click="
                                $router.push(`/play?id=${item.id}`);
                            "
                        >
                            <div class="list_left_item">
                                <img
                                    v-lazyload="item.imgUrl"
                                    style="width: 4.26667rem; height: 2.53333rem; overflow: hidden; border-radius: 4px"
                                />
                                <div class="list_status">
                                    <span class="list_vip list_format">VIP</span>
                                </div>
                                <div class="list_duration">{{ item.playTime }}</div>
                            </div>
                            <div class="list_right_item">
                                <div class="list_title van-multi-ellipsis--l2">{{ item.title }}</div>
                                <div class="list_lable">
                                    <span>{{ item.zan }}次赞</span><span>评分{{ item.score }}</span>
                                </div>
                                <div class="list_play">{{ item.playCount }}次播放</div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { searchVideo } from '@/api/common'
import {useKeepAliveHook} from '@/hooks/index.js'
export default {
    name: 'Search',
    components: {},
    setup(props, context) {
        useKeepAliveHook()
        const store = useStore()

        const loading = ref(false)
        const finished = ref(false)
        const refreshing = ref(false)



        const searchText = ref('')
        const state = reactive({
            data: []
        })

        watch(
            () => searchText.value,
            (val, old) => {
                // console.log(val)
                // console.log(old)
            }
        )

        const searchKeys = computed(() => store.state.common.config.searchKeys)
        const searchTags = computed(() => store.state.common.config.searchTags)

        // console.log(searchKeys.value.split(','))

        const params = reactive({
            limit: 10,
            page: 1
        })

        const getData = () => {
            loading.value = true
            params.key = searchText.value
            // console.log(params);
            searchVideo(params)
                .then((res) => {
                    loading.value = false
                    // console.log(res)
                    if (res.code !== 0) {
                        Toast.fail(res.message)
                    } else {
                        if (res.result.records && res.result.records.length > 0) {
                            // setTimeout(() => {
                            if (params.page === 1) {
                                state.data = res.result.records
                            } else {
                                state.data = state.data.concat(res.result.records)
                            }
                            // }, 4000)
                        }
                        // console.log(state.data);
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
            // console.log(params)
            await getData(params)
        }

        return { state,loading,finished,refreshing, searchText, searchKeys, onRefresh, onLoad }
    }
}
</script>
<style scoped lang="scss">
.page {
    :deep(.van-nav-bar) {
        .van-icon {
            color: #7d7d80;
        }
    }
}
:deep(.van-nav-bar__text) {
    color: #f8b945;
}

.top {
    background-color: #fff;
}

.history {
    padding: 0 0.21333rem;
}

.history .history_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.13333rem 0;
}

.history .history_title span {
    font-size: 0.42667rem;
    font-weight: 500;
    color: #2c3e50;
}

.history .history_content {
    margin-top: 0.26667rem;
}

.history .history_content .history_item {
    display: inline-block;
    max-width: 1.86667rem;
    margin: 0 0.26667rem 0.26667rem 0;
    background: rgb(247 248 250);
    padding: 0.16rem 0.32rem;
    border-radius: 0.53333rem;
    font-size: 0.34667rem;
    color: rgb(125 125 128);
}

.hot_title {
    padding: 0 0.21333rem 0.26667rem;
}

.hot_title span:first-child {
    font-size: 0.42667rem;
    font-weight: 500;
    color: #2c3e50;
}

.hot_title span:nth-child(2) {
    font-size: 0.37333rem;
    color: rgb(125 125 128);
}

.hot {
    padding: 0 0.26667rem;
}

.cl {
    zoom: 1;
}

.hot .hot_content .hot_item {
    padding-bottom: 0.4rem;
    padding-right: 0.4rem;
    width: calc(25% - 0.3rem);
    float: left;
}

.hot .hot_content .no_active {
    background-color: rgb(247 248 250);
    color: rgb(125 125 128);
    border: 0.02667rem solid #ddd;
}

.hot .hot_content .hot_span {
    height: 0.96rem;
    border-radius: 0.10667rem;
    font-size: 0.37333rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hot .hot_content .active {
    border: 0.02667rem solid rgb(247 180 63);
    background-color: rgb(255 249 238);
    color: rgb(247 180 63);
}

.page .play_scroll {
    height: calc(100vh);
    // overflow-y: scroll;
}

.page .play_content {
    padding: 0.21333rem;
}

.page .play_list {
    margin-top: 0.26667rem;
}

.page .play_list .play_list_title {
    font-family: PingFangTC-Medium;
    font-size: 0.48rem;
    color: #121212;
    padding: 0 0.21333rem;
}

.list {
    padding: 0.26667rem 0.21333rem;
}

.list .list_item {
    font-family: PingFangTC-Regular;
    display: flex;
    align-items: center;
    height: 2.53333rem;
    // padding: 0.24rem 0;
    margin: 0.24rem 0;
}

.list .list_item .list_left_item {
    width: 4.26667rem;
    height: 2.53333rem;
    position: relative;
}

.list .list_item .list_left_item .list_status {
    position: absolute;
    top: 0.16rem;
    right: 0.16rem;
    display: flex;
    align-items: center;
}

.list .list_item .list_left_item .list_status .list_format {
    width: 0.74667rem;
    height: 0.42667rem;
    line-height: 0.42667rem;
    text-align: center;
    font-family: PingFangTC-Medium;
    font-size: 0.29333rem;
    color: #fefffe;
    border-radius: 0.05333rem;
    margin-left: 0.13333rem;
}

.list_left_item .list_duration {
    position: absolute;
    left: 0.16rem;
    bottom: 0.16rem;
    font-size: 0.26667rem;
    color: #fff;
}

.list .list_item .list_right_item {
    margin-left: 0.26667rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.list .list_item .list_right_item .list_title {
    height: 0.96rem;
    line-height: 0.48rem;
    font-family: PingFangTC-Regular;
    font-size: 0.34667rem;
    color: #474747;
    word-break: break-all;
}

.list .list_item .list_right_item .list_lable {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.list .list_item .list_right_item .list_lable {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.list .list_item .list_right_item .list_lable span:after {
    content: '';
    display: inline-block;
    height: 0.21333rem;
    border-right: 0.02667rem solid #d9d9d9;
    margin: 0 0.18667rem;
    position: relative;
    top: 0;
}

.list .list_item .list_right_item .list_lable {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}

.list .list_item .list_right_item .list_play {
    font-family: PingFangTC-Regular;
    font-size: 0.32rem;
    color: #7d7d80;
    margin-top: 0.13333rem;
}
</style>
