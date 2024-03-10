<template>
  <div class="temp3-h5-notice">
    <div class="listreturn9 lh-48 re center fs14 bold white line_color">
      <img style="left: .8rem;width: 1rem;" class="w-20 ab-middle-y" src="../../../assets/images/tmp3/bet/back.png" alt="" @click="$router.back()">
      <span>{{ $t('g_g') }}</span>
    </div>
    <!-- 时间筛选 -->
    <div class="h-37 right flex-end flex-middle-only" @click="showCalendar = true">
      <img style="width: 0.7rem;height: 0.7rem;" src="../../../assets/images/tmp3/bet/date.png" alt="">
      <span class="fs12 gray p-l8 p-r8" >{{ format(startDate, 'yyyy/MM/dd') }}</span>
      ~
      <span class="fs12 gray p-l8 p-r8">{{ format(endDate, 'yyyy/MM/dd') }}</span>
      <div class="notice_jt"></div>
    </div>
    <van-row class="notice_nav flex h-32 listreturn11">
      <van-col :span="6" class="fs14 noticyc flex-items p-l12">{{ $t('time') }}</van-col>
      <van-col :span="18" class="fs14 noticyc flex-items p-l12">{{ $t('content') }}</van-col>
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
            <van-col :span="6">
              <p class="bold">{{ item.time && item.time.split(' ')[0] }}</p>
              <p>{{ item.time && item.time.split(' ')[1] }}</p>
            </van-col>
            <van-col :span="18" v-html="item.content" class="fs12"></van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>

    <Calendar :show="showCalendar" @close="showCalendar = false"
              :start-date="startDate"
              color="#f1cf80"
              @change="onConfirmDate"/>
  </div>
</template>
<script>
import {format} from '../../../assets/js/util'
import {getNotices} from '../../../axios/sport'
import Calendar from "../../../components/Calendar";

export default {
  data() {
    const now = new Date();

    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      minDate: new Date(now.getFullYear() - 1),
      startDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7), // 默认近7天
      endDate: new Date(),
      showCalendar: false
    }
  },

  methods: {
    format(date, fmt) {
      return format(date, fmt)
    },

    onConfirmDate(date) {
      // console.log('123123', date)
      this.startDate = date[0]
      this.endDate = date[1]

      this.onLoad()
    },

    showDateSheet() {
      alert(123123)
      this.isShowTimeSheet = true
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
    },

    confirmDate() {

    }
  },

  components: {
    Calendar
  },

  mounted() {
    this.onRefresh()
  },

  created() {
    this.scrollHeight = window.innerHeight - window.rem2px(5.8) + 'px';
  }
}
</script>
<style lang="less" type="text/css">
.temp3-h5-notice {
  .vandatetimecontiner {
    padding: 0 3rem;

    .van-picker__toolbar {
      display: none;
    }

    .van-picker-column__item--selected {
      color: #7B5605;
    }
  }

  .notice-content {
    color: #4E5A74;
    border-bottom: 1px solid #DDE6EE;
    padding: 0.8rem 0.6rem;
  }

  .notice_nav {
    background: #F3F6FA;
  }
}
</style>
