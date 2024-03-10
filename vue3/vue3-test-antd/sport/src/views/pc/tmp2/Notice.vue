<template>
  <div class="notice-pc-tmp2">
    <div class="flex-between white" style="height:50px;padding: 0 36px;">
      <span class="fs20">{{ $t('g_n') }}</span>

      <div class="fs14 flex-middle-only" @click="showCalendar = true">
        <span>{{ format(startDate, 'yyyy-MM-dd') }}-{{ format(endDate, 'yyyy-MM-dd') }}</span>
        <i class="van-icon van-icon-arrow-left" style="transform: rotate(-90deg);"></i>
      </div>
    </div>

    <van-row class="fs12 notice-header flex-middle-only" style="padding: 0 36px;">
      <van-col :span="8">{{ $t('time') }}</van-col>
      <van-col :span="16">{{ $t('content') }}</van-col>
    </van-row>


    <div class="scroll-y hide-scroll-bar" :style="{height: scrollHeight}">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :immediate-check="false"
            :finished="finished"
            :finished-text="$t('no_more')"
            @load="onLoad"
        >
          <van-row class="notice-content fs12" v-for="(item, j) in list" :key="j">
            <van-col :span="8">
              {{ item.time }}
            </van-col>
            <van-col :span="16" v-html="item.content"></van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>

    <Footer/>

    <van-calendar v-model="showCalendar"
                  :style="{top: '145px',right: '36px', left:'auto',borderRadius: 0,width: '300px',height: '500px', color:'#333'}"
                  type="range"
                  :confirm-text="$t('q_r')"
                  :show-title="false"
                  :row-height="50"
                  position="top"
                  :min-date="new Date(new Date().getTime() - 24 * 3600000 * 60)"
                  :max-date="new Date(new Date().getTime() + 24 * 3600000)"
                  @close="showCalendar = false"
                  @confirm="onConfirmDate" color="#126E51"/>
  </div>
</template>
<script>
import {format} from '../../../assets/js/util'
import {getNotices} from '../../../axios/sport'
import Footer from "../../../components/Footer";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      showCalendar: false,
      startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // 默认近7天
      endDate: new Date(),
      scrollHeight: 0
    }
  },

  methods: {
    format(date, fmt) {
      return format(date, fmt)
    },

    onConfirmDate(date) {
      console.log('123123', date)
      this.startDate = date[0]
      this.endDate = date[1]
      this.showCalendar = false

      this.onLoad()
    },

    onLoad() {
      this.refreshing = true

      getNotices({
        startDate: format(this.startDate, 'yyyy-MM-dd'),
        endDate: format(this.endDate, 'yyyy-MM-dd'),
        client: 'mobile'
      })
          .then(res => {
            if (res.code === 200) {
              let arr = res.data
              if (this.refreshing) {
                this.list = arr.data;
                this.refreshing = false;
              }

              this.loading = false
              this.finished = true

              if (arr.length >= arr.count) {
                this.finished = true;
              }
            }
          })
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },

  components: {
    Footer
  },

  mounted() {
    this.onLoad()
  },

  created() {
    this.scrollHeight = window.innerHeight - 291 + 'px';
    window.addEventListener('resize', () => {
      this.scrollHeight = window.innerHeight - 291 + 'px';
    })
  }
}
</script>
<style type="text/css" lang="less">
.notice-pc-tmp2 {
  background-color: #333;

  .notice-header {
    padding: 0 0.6rem;
    background-color: #505050;
    color: #B6B6B6;
    height: 1.4rem;
  }

  .notice-content {
    color: #ddd;
    border-bottom: 1px solid #5d5d5d;
    padding: 16px 36px;

    &:last-child {
      border-bottom: none !important;
    }
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
