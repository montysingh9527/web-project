<template>
  <div class="my-bet-pc-tmp2">
    <div class="flex-between over-hidden" style="background-color: #383838;padding:0 36px;height:50px;">
      <van-tabs :ellipsis="false" v-model="activeTab"
                color="#26FFBE"
                :border="false"
                :line-height="2"
                :line-width="40"
                @click="onLoad"
                title-active-color="#e4e4e4"
                title-inactive-color="#e4e4e4"
                background="#383838">
        <van-tab name="b" :title="$t('un_bets')"></van-tab>
        <van-tab name="a" :title="$t('re_bets')"></van-tab>
      </van-tabs>

      <div class="flex-middle-only">

        <div class="fs12 flex-middle-only" style="color: #ddd;"
             @click="showCalendar = true"
             v-if="activeTab === 'a'">
          <span class="m-r8">{{ format(start_date, 'yyyy/MM/dd') }}-{{ format(end_date, 'yyyy/MM/dd') }}</span>
          <i class="van-icon van-icon-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="scroll-y hide-scroll-bar" :style="{height: scrollHeight}">
      <div class="forms-content" v-for="(item, j) in list" :key="j">
        <div class="re flex-between lh-45" style="background-color: #126E51;padding: 0 36px;">
          <p class="fs14 white">
            <span style="margin-right:24px;">{{ item.bet_type === '1' ? $t('d_s') : item.bet_type === '2' ? aliasNum(item.children.length) : '' }}</span>
            <span v-if="item.bet_type === '2'">{{$t('peilv')}}: @{{ item.odds }}</span>
          </p>

          <p class="flex-between fs12 m-t4" style="color: #e4e4e4;">
            <span>{{$t('bet_time')}}: {{ format(item.bet_time * 1000, 'yyyy-MM-dd hh:mm') }}</span>
            <span style="margin-left: 24px;">{{$t('bet_no')}}: {{ item.bet_no }}</span>
          </p>
        </div>

        <ul style="background-color: #505050;">
          <li v-for="(game, i) of item.children" :key="i" style="color: #b6b6b6;padding: 16px 36px;">
            <div class="flex-between">
              <div class="m-b8 flex-between full-width fs12">
                <div class="flex-middle-only">
                  <div :class="sportIcon(game.sport_id).icon"></div>
                  <span class="m-l5">{{ game.league_name }}</span>
                </div>

                <span>{{ $utils.format(game.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</span>
              </div>

              <span>{{ game.gameTime }}</span>
            </div>

            <p class="fs14 flex-between white">
              <span>{{ game.bet_content.replace(',', '/') }}</span>
              <span>@{{ game.odds }}</span>
            </p>

            <p class="fs12 lh-20" style="color: #B6B6B6;">{{ game.market_group_name }}</p>

            <p class="dark-light fs12">
              <span class="m-r5" style="color: #B6B6B6;">{{ game.home_name }} v {{ game.away_name }}</span>

              <!--已结注单-->
              <span v-if="activeTab === 'a'" style="color: #5FE8BD;">{{ game.is_inplay === '1' ? `[${$t('groun')}: ${game.bet_extend}]` : '' }}</span>
              <!--未结注单-->
              <span v-if="activeTab === 'b'" :style="{color: matchStatus(game).color}">{{ matchStatus(game).text }}</span>
            </p>
          </li>
          <li class="flex-between fs12 except-content">
            <div class="flex-1">
              <span>{{$t('mon')}}:</span>
              <p class="white fs16">{{$utils.toCurrency(projectConfig.currency).siteCurrency}} {{ $utils.formatText(item.money) }}</p>
            </div>
            <div class="flex-1">
              <span>{{ activeTab === 'a' ? $t('res') : $t('win') }}:</span>
              <p class="white fs16">{{ activeTab === 'a' ? betStatus(item).text : item.except_bonus }}</p>
            </div>
            <div class="flex-1" v-if="item.switch_cancel == '1' && activeTab === 'b'">
              <van-button style="height: 1.2rem;font-size: 10px;" color="#797979" @click="_cancelBet(item)">{{$t('c_d')}}</van-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="sum-up-content fs12 flex-middle-only" style="color: #ddd;">
      <span class="m-r20">{{$t('t_bets')}}: &nbsp; &nbsp;{{ totalAmount }}</span>
      <span v-if="activeTab === 'a'">{{$t('t_win')}}: &nbsp; &nbsp;{{ totalWin }}</span>
      <span v-if="activeTab === 'b'" class="">{{$t('win')}}: &nbsp; &nbsp;{{ totalBonus.toFixed(4) }}</span>
    </div>

    <van-calendar v-model="showCalendar"
                  :style="{top: '145px',right: '36px', left:'auto',borderRadius: 0,width: '400px',height: '500px', color:'#333'}"
                  type="range"
                  :confirm-text="$t('q_r')"
                  :show-title="false"
                  position="top"
                  :min-date="new Date(new Date().getTime() - 24 * 3600000 * 60)"
                  :max-date="new Date(new Date().getTime() + 24 * 3600000)"
                  @close="showDatePicker = false"
                  @confirm="_changeDate" color="#126E51"/>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {cancelBet, getBetHistory, getUnsettledBets} from '../../../axios/sport'
import showMoreBetDetail from "../../../mixins/showMoreBetDetail";
import {Toast} from "vant";

export default {
  mixins: [showMoreBetDetail],
  data() {
    return {
      activeTab: 'b',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      totalAmount: 0,
      totalWin: 0,
      totalBonus: 0,
      scrollHeight: '100px',
      showCalendar: false,
      start_date: new Date(new Date().getTime() - 24 * 3600000 * 7),
      end_date: new Date()
    };
  },

  computed: {
    ...mapGetters(['userInfo', 'projectConfig'])
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

    // 未结注单
    _getUnsettledBets() {
      this.loading = true
      getUnsettledBets()
          .then(res => {
            if (this.refreshing) {
              this.list = [];
              this.refreshing = false;
            }

            if (res.code === 200) {
              this.list = res.data
              this.totalAmount = 0
              this.totalBonus = 0

              this.list.forEach(item => {
                this.totalAmount += Number(item.money)
                this.totalBonus += Number(item.except_bonus)
              })
            }

            this.finished = true;

            this.loading = false;
          })
          .catch(err => {
            this.finished = true;

            this.loading = false;
          })
    },

    // 已结注单
    _getBetHistory() {
      let params = {
        pageSize: 200,
        page: this.page,
        start_date: this.format(this.start_date, 'yyyy-MM-dd'),
        end_date: this.format(this.end_date, 'yyyy-MM-dd')
      }

      this.loading = true

      getBetHistory(params)
          .then((res) => {
            if (this.refreshing) {
              this.list = [];
              this.page = 1
              this.refreshing = false;
            }

            if (res.code === 200) {
              this.list = res.data.data
              this.totalAmount = res.data.totalAmount
              this.totalWin = res.data.totalWin
              this.page++

              if (this.list.length >= Number(res.data.count)) {
                this.finished = true;
              }
            }

            this.loading = false;
          })
          .catch(err => {
            this.finished = true;

            this.loading = false;
          })
    },

    onLoad() {
      if (this.activeTab === 'a') {
        this._getBetHistory()
      } else {
        this._getUnsettledBets()
      }
    },

    _changeDate(dateArray) {
      this.start_date = dateArray[0]
      this.end_date = dateArray[1]

      this.showCalendar = false
      this.onLoad()
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true

      this.page = 1
      this.onLoad()
    }
  },

  mounted() {
    this.onLoad()
    this.scrollHeight = window.innerHeight - 240 + 'px'
    window.addEventListener('resize', () => {
      this.scrollHeight = window.innerHeight - 240 + 'px'
    })
  },

  beforeRouteEnter(to, from, next) {
    console.log('query--------------->', to.query)
    next(vm => {
      if (to.query.type) {
        vm.activeTab = to.query.type
      }
    })
  },
};
</script>

<style type="text/css" lang="less">
.my-bet-pc-tmp2 {
  background-color: #505050;

  .sum-up-content {
    height: 44px;
    padding: 0 36px;
    background-color: #444;
  }

  .van-tabs__line {
    bottom: 11px !important;
  }

  .except-content {
    color: #b6b6b6;
    border-top: 1px solid #777;
    height: 64px;
    padding: 0 36px;
  }

  .van-calendar__header {
    padding-right: 12px;
  }
}
</style>
