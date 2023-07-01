<template>
<div>        <Header title="通知">

        </Header>

        <div class="b-tabs__nav mx-4 m-2">
            <div class="b-tabs__nav__item" :class="{'m-current':type==''}" @click="onClickTab('')">
                全部
            </div>
                <div class="b-tabs__nav__item" :class="{'m-current':type=='1'}" @click="onClickTab('1')">
                评论
            </div>
            <div class="b-tabs__nav__item " :class="{'m-current':type=='3'}" @click="onClickTab('3')">
                系统消息
            </div>

        </div>



</div>
</template>

<script setup name="Notification">
import { getCurrentInstance, onMounted, provide, ref, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { apiNoticeList } from '@/api/common'

const type = ref('')  //type:1评论，3系统消息，为空为全部

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
    params.type = type.value
    apiNoticeList(params)
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

const onClickTab = (tp)=>{
    type.value = tp
    onRefresh()
}


</script>
<style lang="scss" scoped>
.b-tabs__nav {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    list-style: none;
    padding: 0;
}

.b-tabs__nav__item {
    font-size: 14px;
    line-height: 16px;
    text-transform: none;
    font-weight: 400;
    padding: 8px 10px;
    // padding-bottom: 8px;
    border-radius: 1000px;
    margin-right: 12px;
    border: none;
    color: var(--text-color);
    background-color: rgba(138,150,163,.12);
    transition: background-color .1s,color .1s;
    display: inline-flex;
    min-height: 32px;
    text-align: left;
}

.m-current {
    background-color: rgba(0,175,240,.25);
}

</style>
