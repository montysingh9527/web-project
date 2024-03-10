<template>
  <div class="notice-pc-tmp3">
    <div class="div-1200 re bg-white box radius4 b-t2">
      <div class="flex notice_title">
        <div class="flex-1">{{$t('g_g')}}</div>
        <div class="flex-items cursor">
          <img class="" src="../../../assets/images/tmp3/bet/date.png" alt="">
          <span>{{$utils.format(timeRange[0], 'yyyy-MM-dd')}}~{{$utils.format(timeRange[1], 'yyyy-MM-dd')}}</span>
          <div class="notice_jt"></div>
          <span class="gray">{{showDate}}</span>

          <div class="ab" style="right: 0; top: 6px;">
            <el-date-picker
                size="mini"
                class="datepcikercompint"
                v-model="timeRange"
                align="right"
                type="daterange"
                :placeholder="$t('x_z_r_q')"
                :picker-options="pickerOptions"
                @change="onConfirmDate"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="notice_th flex noticyc">
        <div class="flex-items">{{$t('time')}}</div>
        <div class="flex-items">{{$t('content')}}</div>
      </div>
      <ul class="notice_ul">
        <li class="under-line flex" v-for="item in list" :key="index">
          <div class="flex-items">{{ item.time }}</div>
          <div class="flex-1 flex-items" v-html="item.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {DatePicker, Pagination} from 'element-ui';
import dayjs from 'dayjs';
import {format} from "../../../assets/js/util";
import {getNotices} from "../../../axios/sport";
export default {
  data() {
    const now = new Date().getTime()
    return {
      list: [],
      timeRange: [new Date(now - 1000 * 60 * 60 * 24 * 7), new Date()],
      scrollHeight: 0,
      currentPage: 1,
      pageSize: 50,
      total: 0
    }
  },

  methods: {
    onConfirmDate(date) {
      console.log('123123', date)

      this.getNoticeList()
    },

    getNoticeList() {

      getNotices({
        startDate: format(this.timeRange[0], 'yyyy-MM-dd'),
        endDate: format(this.timeRange[1], 'yyyy-MM-dd'),
        client: 'pc'
      })
          .then(res => {
            if (res.code === 200) {
              this.total = Number(res.data.count)
              this.list = res.data.data
            }
          })
    },
  },
  computed: {
    showDate() {
      if (this.value1) {
        return format(this.value1, 'yyyy-MM-dd')
      } else {
        return ''
      }
    }
  },

  components: {
    'el-date-picker': DatePicker,
    'el-pagination': Pagination
  },

  mounted() {
    this.getNoticeList()
  },

  created() {
    this.pickerOptions = {
      shortcuts: [{
        text: this.$t('z_j_y_z'),
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: this.$t('z_j_y_y'),
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: this.$t('z_j_s_y'),
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    }
  }
}
</script>
<style type="text/css" lang="less">
.notice-pc-tmp3 {
  >div{
    width:1200px;
    margin:0 auto;
  }
  .div-1200{
	  margin-top:24px;
  }
  .notice_ul{
    height: 700px;
    padding-bottom: 74px;
    color:#4E5772;
    overflow-y: scroll;
    li{
      padding: 12px 0;
      margin: 0 24px;
      line-height: 20px;
      font-size: 14px;
      color: #4E5772;
      letter-spacing: 0;
      line-height: 20px;
      font-weight: 500;
      div{
          text-align: justify;
      }
      >div:nth-of-type(1){
        width:190px;
      }
    }
    li:last-child{
      border:none;
    }
    
  }
  .datepcikercompint {
    width: 236px !important;
    opacity: 0;
    .el-range__close-icon {
      display: none;
    }
  }
}
.notice_title{
  height: 52px;
  padding: 0 24px;
  line-height: 52px;
  >div:nth-of-type(1){
    font-size: 20px;
    color: #4E5772;
    letter-spacing: 0;
    font-weight: 500;
  }
  >div:nth-of-type(2){
    font-size: 12px;
    color: #4D5872;
    font-weight: 500;
    cursor: pointer;
    >img{
      width:14px;
    }
    span{
      padding: 0 8px;
    }
  }
  .notice_jt{
    width: 0;
    height: 0;
    margin-top:6px;
    border: .2rem solid #4D5872;
    border-color: #4D5872 transparent transparent transparent;
  }
  
}
.notice_th{
  height: 28px;
  background: #F3F6FA;
  padding: 0 24px;
  font-size: 12px;
  >div:nth-of-type(1){
    width:190px;
  }
}
.notice_page{
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 20px 0;
  text-align: center;
}
</style>
