<template>
  <div class="notice">
    <div class="flex-between white" style="height:2.2rem;padding: 0  0.6rem;">
      <span class="fs20">{{ $t('g_n') }}</span>

      <div class="fs14 flex-middle-only" @click="showCalendar = true">
        <span>{{ format(startDate, 'yyyy/MM/dd') }}-{{ format(endDate, 'yyyy/MM/dd') }}</span>
        <i class="van-icon van-icon-arrow-left" style="transform: rotate(-90deg);"></i>
      </div>
    </div>

    <van-row class="fs12 notice-header flex-middle-only">
      <van-col :span="8">{{ $t('time') }}</van-col>
      <van-col :span="16">{{ $t('content') }}</van-col>
    </van-row>


    <div style="overflow-y: scroll;" :style="{height: scrollHeight}">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :immediate-check="false"
            :finished="finished"
            :finished-text="$t('no_more')"
            @load="onLoad"
        >
          <van-row class="notice-content pd12 fs12" v-for="(item, j) in list" :key="j">
            <van-col :span="8">
              <p>{{ item.time && item.time.split(' ')[0] }}</p>
              <p>{{ item.time && item.time.split(' ')[1] }}</p>
            </van-col>
            <van-col :span="16" v-html="item.content"></van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>

    <Calendar :show="showCalendar" @close="showCalendar = false"
              :start-date="startDate"
              @change="onConfirmDate"/>
  </div>
</template>
<script>
import {format} from '../../../assets/js/util'
import {getNotices} from '../../../axios/sport'
import Calendar from "../../../components/Calendar";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      showCalendar: false,
      startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // 默认近7天
      endDate: new Date()
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
    Calendar
  },

  mounted() {
    this.onLoad()
  },

  created() {
    this.scrollHeight = window.innerHeight - window.rem2px(5.8) + 'px';
  }
}
</script>
<style type="text/css" lang="less">
.notice {
  .notice-header {
    padding: 0 0.6rem;
    background-color: #505050;
    color: #B6B6B6;
    height: 1.4rem;
  }

  .notice-content {
    color: #ddd;
    border-bottom: 1px solid #5d5d5d;
    padding: .8rem .6rem;

    &:last-child {
      border-bottom: none !important;
    }
  }
}
</style>
