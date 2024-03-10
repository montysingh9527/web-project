<template>
  <div class="bets-record-pc-tmp3">
    <div class="div-1200 re record-container">
      <div class="ab date_select flex-items" @click="isShowTimeSheet = true" v-if="active_tab == 1">
        <img class="" src="../../../assets/images/tmp3/bet/date.png" alt="">
        <span class="gray fs12">{{$utils.format(timeRange[0], 'yyyy-MM-dd')}}</span> &nbsp;-  &nbsp;
        <span class="gray fs12">{{$utils.format(timeRange[1], 'yyyy-MM-dd')}}</span>&nbsp;
        <div class="notice_jt"></div>
        <div class="ab" style="right: 0; top: 6px;">
          <el-date-picker
            size="mini"
            class="datepcikercompint"
            v-model="timeRange"
            align="right"
            @change="handleChangeDate"
            type="daterange"
            :placeholder="$t('x_z_r_q')"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="pc-record-tab div-1200">
<!--        <ul>-->
<!--          <li>{{$t('un_bets')}}</li>-->
<!--          <li>{{$t('re_bets')}}</li>-->
<!--        </ul>-->
        <van-tabs animated v-model="active_tab" @change="onChange" color="#7B5605" line-width="2.8rem" :ellipsis="false">
          <van-tab :key="1" class="center">
            <template #title> {{$t('un_bets')}} </template>
          </van-tab>
          <van-tab :key="2" class="center">
            <template #title> {{$t('re_bets')}} </template>
          </van-tab>
        </van-tabs>

        <ul class="pc-record-list scroll-y hide-scroll-bar">
          <!-- 单式 -->
          <li class="bg-white radius4 b-t2" v-for="(item, j) of list" :key="j">
            <div class="flex l-title">
              <div class="flex-1 flex-items">
                <span class="pc-border-l reguler record-color">{{ item.bet_type === '1' ? $t('d_s') : item.bet_type === '2' ? aliasNum(item.children.length) : '' }}</span>
                <span class="bet-time gray">{{$t('bet_time')}}：{{ $utils.format(item.bet_time * 1000, 'yyyy-MM-dd hh:mm') }}</span>
                <span class="gray">{{$t('bet_no')}}：{{ item.bet_no }}</span>
              </div>
              <div class="flex-1 right pc-title-r">
                <span class="gray">{{$t('peilv')}}：</span>
                <span class="record-color">@{{item.odds}}</span>
                <span class="gray">{{$t('mon')}}：</span>
                <span class="record-color">{{$utils.toCurrency(projectConfig.currency).siteCurrency}} {{ $utils.formatText(item.money) }}</span>
                <span class="gray">{{ active_tab === 1 ? $t('res') : $t('win') }}：</span>
                <span class="record-color" v-if="active_tab == 1" :style="{color: betStatus(item).color}">{{ betStatus(item).text }}</span>
                <span class="record-color" v-else>{{ item.except_bonus }}</span>
              </div>
            </div>
            <div class="flex l-title" style="background-color: #f5f5f5;">
              <div class="flex-items th-1">{{$t('t_y_x_m')}}</div>
              <div class="flex-items th-2">{{$t('s_s')}}</div>
              <div class="flex-items th-3">{{$t('k_s_s_j')}}</div>
              <div class="flex-items th-4">{{$t('sai_c')}}</div>
              <div class="flex-items th-5">{{$t('w_f')}}</div>
              <div class="flex-items th-6">{{$t('x_z_x_m')}}</div>
              <div class="flex-items th-7 flex-between">{{$t('peilv')}}</div>
            </div>

            <div class="record_tr" v-for="(game, i) of item.children" :key="i">
              <div class="flex">
                <div class="flex-items th-1">{{sportIcon(game.sport_id).text}}</div>
                <div class="flex-items th-2">{{ game.league_name }}</div>
                <div class="flex-items th-3">{{ $utils.format(game.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</div>
                <div class="flex-items th-4">
                  {{ game.home_name }} v {{ game.away_name }}
                  <span :style="{color: matchStatus(game).color}">{{matchStatus(game).text}}</span>
                </div>
                <div class="flex-items th-5">{{ game.market_group_name}}</div>
                <div class="flex-items th-6">{{ game.bet_content.replace(',', '/') }}</div>
                <div class="flex-items th-7 flex-between">
                  @{{ game.odds }}
                </div>
              </div>
            </div>
            <div class="flex-end p-r8 p-b8" v-if="item.switch_cancel == '1' && active_tab == '0'">
              <van-button style="height: 1.2rem;font-size: 10px;" color="#797979" @click="_cancelBet(item)">{{$t('c_d')}}</van-button>
            </div>
          </li>
        </ul>
      </div>

<!--      <div class="notice_page bg-white" v-if="active_tab == 1">-->
<!--        <el-pagination-->
<!--            background-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page="currentPage"-->
<!--            :page-sizes="[20, 50, 100]"-->
<!--            :page-size="pageSize"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            :total="total">-->
<!--        </el-pagination>-->
<!--      </div>-->
    </div>
    <div class="bottom_nav bg-white radius4 gray fs12 reguler">
      {{$t('t_bets')}}：<span class="record-color">{{projectConfig.siteCurrency}} {{totalAmount}}</span>
      <span v-if="active_tab === 1" class="record-color">{{$t('t_win')}}: {{ totalWin }}</span>
      <span v-if="active_tab === 0" class="record-color">{{$t('win')}}: {{ totalBonus.toFixed(4) }}</span>
    </div>
  </div>
</template>
<script>
import {DatePicker, Pagination} from 'element-ui';
import showMoreBetDetail from "../../../mixins/showMoreBetDetail";

import {cancelBet, getBetHistory, getUnsettledBets} from "../../../axios/sport";
import {mapGetters} from "vuex";
import {Toast} from "vant";
export default {
  mixins: [showMoreBetDetail],
  data() {
    return {
      timeRange: [new Date(new Date().getTime() - 24 * 3600000 * 7), new Date()],
      isShow: false,
      active_tab: 0,
      page: 1,
      pageSize: 50,
      total: 0,
      totalAmount: 0,
      totalWin: 0,
      totalBonus: 0,
      historyList: [],
      unBetsList: [],
    }
  },

  computed: {
    ...mapGetters(['projectConfig']),
    list() {
      return this.active_tab === 0 ? this.unBetsList : this.historyList
    }
  },

  methods: {
    _cancelBet(item = {}) {
      const { id } = item;

      cancelBet(id)
          .then(res => {
            if(res.code === 0) {
              Toast(this.$t('c_d_s'));
              this.onRefresh();
            } else {
              Toast(res.message);
            }
          })
    },
    handleChangeDate() {
      this._getBetHistory()
    },
    onChange(tab) {
      console.log('onChange===', this.active_tab, tab)
      if (tab === 0) {
        this._getUnsettledBets()
      } else {
        this._getBetHistory()
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this._getBetHistory()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this._getBetHistory()
    },
    // 未结注单
    _getUnsettledBets() {
      this.loading = true
      getUnsettledBets()
          .then(res => {
            if (res.code === 200) {
              this.unBetsList = res.data
              this.totalAmount = 0
              this.totalBonus = 0

              this.list.forEach(item => {
                this.totalAmount += Number(item.money)
                this.totalBonus += Number(item.except_bonus)
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
    },

    // 已结注单
    _getBetHistory() {
      let params = {
        pageSize: 200,
        page: 1,
        start_date: this.format(this.timeRange[0], 'yyyy-MM-dd'),
        end_date: this.format(this.timeRange[1], 'yyyy-MM-dd')
      }

      this.loading = true

      getBetHistory(params)
          .then((res) => {
            if (res.code === 200) {
              this.historyList = res.data.data
              this.totalAmount = res.data.totalAmount
              this.totalWin = res.data.totalWin
              this.page++
              this.total = Number(res.data.count)
            }
          })
          .catch(err => {
            this.loading = false;
          })
    },
  },
  components: {
    'el-date-picker': DatePicker,
    'el-pagination': Pagination
  },

  mounted() {
    this._getUnsettledBets()
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
.bets-record-pc-tmp3 {
  .van-tabs__wrap--scrollable .van-tab {
    flex: 1!important;
    text-align: center;
  }
  >div{
    width: 1200px;
    margin: 0 auto;
  }
  background:#fafcfd;
  .van-tabs__nav{
    max-width: 350px;
    //margin-left: -70px;
    background: #f5fafd;
  }
  .van-tab--active {
    font-size: 14px;
    color: #7B5605 !important;
    font-weight: 700;
  }
  .see_more{
    width: 98px;
    margin:0 auto;
    background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
    border:1px solid #D9E2E9;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    img{
      width:.5rem;
      vertical-align: middle;
    }
  }
  .notice_jt{
    width: 0;
    height: 0;
    margin-top:6px;
    border: .2rem solid #4D5872;
    border-color: #4D5872 transparent transparent transparent;
  }
  .date_select{
    right: 0;
    top: 16px;
    width: 220px;
    text-align: right;
    font-size: 12px;
    z-index: 666;
    >img{
      width:14px;
      margin-right: 8px;
    }
  }
  .th-1{
    width:100px;
  }
  .th-2{
    width:200px;
  }
  .th-3{
    width:160px;
  }
  .th-4{
    width:250px;
  }
  .th-5{
    width:136px;
  }
  .th-6{
    width:228px;
  }
  .datepcikercompint {
    width: 236px !important;
    opacity: 0;
    .el-range__close-icon {
      display: none;
    }
  }
}
.pc-record-tab{
  //left: 0;
  //top: 0;
  //padding-bottom: 50px;
}
.pc-record-list{
  width: 1200px;
  padding:2px;
  margin-top:16px;
  height: calc(100vh - 240px);
  .l-title{
    padding: 0 24px;
    height: 46px;
    font-size: 12px;
  }
  li{
    margin-bottom:16px;
    box-shadow: 0px 0px 4px 0px rgba(221,228,243,1);
  }
}
.pc-border-l{
  display: inline-block;
  padding-left: 8px;
  line-height: 1;
  border-left: 2px solid #7B5605;
}
.bet-time{
  padding: 0 16px
}
.pc-title-r{
  line-height: 46px;
  >span:nth-of-type(3){
    padding-left: 16px;
  }
  >span:nth-of-type(4){
    padding-right: 16px;
  }
}
.record_th{
  padding: 6px 24px;
  font-size:12px;
  color:#4E5A74;
  font-weight: normal;
  background: #F3F6FA;
}
.record_tr{
  padding: 0 24px;
  font-size: 12px;
  color: #4E5772;
  >div{
    padding: 12px 0;
    border-bottom: 1px solid #DDE6EE;
  }
  >div:last-child{
    border:none;
  }
}
.pc-list-table{
  width:1152px;
  margin: 0 auto;
  th{
    height: 28px;
    font-size:12px;
    color:#4E5A74;
    font-weight: normal;
    background: #F3F6FA;
  }
  tr{
    font-size: 12px;
    color: #4E5772;
  }
  td{
    border-bottom: 1px solid #DDE6EE;
    height: 44px;
  }
  tr:last-child{
    td{
      border:none;
    }
  }
}
.bottom_nav{
  position:fixed;
  width:1200px;
  height: 36px;
  line-height: 36px;
  left: 50%;
  bottom: 0;
  padding-left: 24px;
	transform: translateX(-50%);
  border:1px solid #eba503;
  border-bottom: none;
  >span:nth-of-type(1){
    padding-right: 16px;
  }
}
.notice_page{
  width: 1200px;
  left: 0;
  bottom: 0;
  padding: 20px 0;
  text-align: center;
}

.record-container:after{
  display: "block";
  clear:both;
  height:0;
  content: "";
  visibility: hidden;
  overflow:hidden;
}
</style>
