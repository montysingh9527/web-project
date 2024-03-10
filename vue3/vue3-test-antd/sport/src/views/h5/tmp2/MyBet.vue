<template>
  <div class="my-bet flex-column flex-between" ref="page-content">
    <div class="full-width">
      <div class="flex-middle-only" style="background-color: #383838;">
        <div class="left-nav-icon flex-middle m-r16" @click="$router.back()">
          <i class="van-icon van-icon-arrow-left"></i>
        </div>

        <van-tabs v-model="activeTab"
                  :ellipsis="false"
                  color="#26FFBE"
                  :border="false"
                  :line-height="2"
                  :line-width="40"
                  @click="onRefresh"
                  title-active-color="#e4e4e4"
                  title-inactive-color="#e4e4e4"
                  background="#383838">
          <van-tab name="b" :title="$t('un_bets')"></van-tab>
          <van-tab name="a" :title="$t('re_bets')"></van-tab>
        </van-tabs>
      </div>

      <div class="fs12 lh-35 flex-end popover-tav flex-middle-only"
           @click="showCalendar = true"
           v-if="activeTab === 'a'">
        <span class="m-r8">{{ format(start_date, 'yyyy/MM/dd') }}-{{ format(end_date, 'yyyy/MM/dd') }}</span>
        <van-icon class="flex-middle" name="arrow-down"/>
      </div>
    </div>

    <!--        :style="{height: activeTab === 'a' ? scrollHeight_a : scrollHeight_b}"-->
    <div ref="list" class="scroll-y flex-1 full-width" style="max-height:100vh;">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :immediate-check="false"
            :finished="finished"
            :finished-text="$t('no_more')"
            @load="onLoad"
        >
          <div class="forms-content" v-for="(item, j) in list" :key="j">
            <div class="re fs12" style="background-color: #126E51;padding: 0.8rem 0.6rem;">
              <p class="flex-between white">
                <span class="fs12">
                    {{ item.bet_type === '1' ? $t('d_s') : item.bet_type === '2' ? aliasNum(item.children.length) : '' }}
                </span>

                <span v-if="item.bet_type === '2'">{{$t('peilv')}}: @{{ item.odds }}</span>
              </p>

              <p class="flex-between m-t4" style="color: #c4c4c4;">
                <span>{{$t('bet_time')}}: {{ format(item.bet_time * 1000, 'yyyy-MM-dd hh:mm') }}</span>
                <span>{{$t('bet_no')}}: {{ item.bet_no }}</span>
              </p>
            </div>

            <ul style="background-color: #505050;">
              <li v-for="(game, i) of item.children" :key="i" style="color: #b6b6b6;padding: 0.8rem 0.6rem;">
                <div class="flex-between">
                  <div class="m-b8 flex-between full-width fs12">
                    <div class="flex-middle-only">
                      <div :class="sportIcon(game.sport_id).icon"></div>

                      <span class="m-l5">{{ game.league_name }}</span>
                    </div>

                    <span>{{ format(game.start_time * 1000, 'yyyy-MM-dd hh:mm') }}</span>
                  </div>

                  <span>{{ game.gameTime }}</span>
                </div>

                <p class="fs14 flex-between white">
                  <span>{{ game.bet_content.replace(',', '/') }}</span>
                  <span>@{{ game.odds }}</span>
                </p>
                <p class="fs12 lh-20">{{ game.market_group_name }}</p>
                <p class="dark-light fs12">
                  <span class="m-r5" style="color: #B6B6B6;">{{ game.home_name }} v {{ game.away_name }}</span>

                  <!--已结注单-->
                  <span v-if="activeTab === 'a'" style="color: #5FE8BD;">{{ game.is_inplay === '1' ? `[${$t('ground')}: ${game.bet_extend}]` : '' }}</span>
                  <!--未结注单-->
                  <span v-if="activeTab === 'b'" :style="{color: matchStatus(game).color}">{{ matchStatus(game).text}}</span>
                </p>
              </li>
              <li class="flex-between fs12" style="color: #b6b6b6;padding: 0.8rem;border-top:1px solid #777;">
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
        </van-list>
      </van-pull-refresh>
    </div>

    <div class="sum-up-content fs12 flex-middle-only full-width" style="color: #ddd;">
      <span class="m-r20">{{$t('t_bets')}}: &nbsp; &nbsp;{{ totalAmount }}</span>
      <span v-if="activeTab === 'a'">{{$t('t_win')}}: &nbsp; &nbsp;{{ totalWin }}</span>
      <span v-if="activeTab === 'b'" class="">{{$t('win')}}: &nbsp; &nbsp;{{ totalBonus.toFixed(2) }}</span>
    </div>

    <Calendar :show="showCalendar" @close="showCalendar = false"
              @change="_changeDate"/>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import Calendar from "../../../components/Calendar";
import { getBetHistory, getUnsettledBets, cancelBet } from '../../../axios/sport'
import {aliasStatus} from "../../../common/config";
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
      sport: {text: this.$t('all')},
      showCalendar: false,
      showSportPopover: false,
      start_date: new Date(new Date().getTime() - 24 * 3600000 * 7),
      end_date: new Date(new Date().getTime() + 24 * 3600000),
      scrollHeight_b: window.innerHeight - window.rem2px(6.6) + 'px',
      scrollHeight_a: window.innerHeight - window.rem2px(8.4) + 'px'
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
      let query = {
        sport: this.sport.id
      }
      getUnsettledBets(query)
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

            this.loading = false
            this.finished = true
            this.refreshing = false
          })
          .catch(err => {
            this.loading = false
            this.finished = true
            this.refreshing = false
          })
    },

    _changeDate(arr) {
      this.start_date = arr[0]
      this.end_date = arr[1]
      this.onRefresh()
    },

    onSelect(sport) {
      console.log('sport', sport)
      this.sport = sport

      this.onRefresh()
    },

    // 已结注单
    _getBetHistory() {
      let params = {
        pageSize: 20,
        page: this.page,
        sport: this.sport.id,
        start_date: this.format(this.start_date, 'yyyy-MM-dd'),
        end_date: this.format(this.end_date, 'yyyy-MM-dd')
      }

      getBetHistory(params)
          .then((res) => {
            if (this.refreshing) {
              this.list = [];
              this.page = 1
              this.refreshing = false;
            }

            if (res.code === 200) {
              this.list = [...this.list, ...res.data.data]
              this.totalAmount = res.data.totalAmount
              this.totalWin = res.data.totalWin
              this.page++

              if (this.list.length >= Number(res.data.count)) {
                this.finished = true;
              }
            }

            this.loading = false
            // this.finished = true
            this.refreshing = false
          })
          .catch(err => {
            this.finished = true;
            this.refreshing = false
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

    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true

      this.page = 1
      this.onLoad()
    },

    // 比赛状态
    matchStatus(item) {
      // 如果比赛在进行中
      if (item.match_status === '1' || item.match_status === '3') {
        return {
          text: item.bet_extend ? `[${this.$t('groun')}: ${item.bet_extend}]` : item.ss ? `[${this.$t('groun')}: ${item.ss}]` : '',
          color: `#5FE8BD`
        }
      } else if (item.match_status === '2') {
        return {
          text: `[${this.$t('w_c')}]`,
          color: `#5FE8BD`
        }
      } else if (item.match_status === '4') {
        return {
          text: `[${this.$t('t_c')}]`,
          color: `#FFDF1B`
        }
      } else if (item.match_status === '7') {
        return {
          text: `[${this.$t('z_d')}]`,
          color: `#FFDF1B`
        }
      }

      return {
        text: `[${this.$t(aliasStatus(item.match_status))}]`,
        color: `#FFDF1B`
      }
    }
  },

  components: {
    Calendar
  },

  created() {
    this.sports = [{text: this.$t('all'), id: ''}, {text: this.$t('fball'), id: '1'}, {text: this.$t('bball'), id: '18'}]
    this.sport = this.sports[0]
  },

  beforeRouteEnter(to, from, next) {
    console.log('query--------------->', to.query)
    next(_this => {
      if (to.query.type) {
        _this.activeTab = to.query.type
      }
      _this.onLoad()
    })
  },
};
</script>

<style type="text/css" lang="less" scoped>
.my-bet {
  .left-nav-icon {
    color: #cecece;
    padding: 0 0.5rem;
    border-right: 1px solid #5d5d5d;
    height: 2rem;
  }

  .sum-up-content {
    height: 2.2rem;
    padding: 0 0.6rem;
    background-color: #444;
  }

  .popover-tav {
    background: #404040;
    box-shadow: inset 0 2px 0 0 #137A5A;
    height: 2.3rem;
    color: #ddd;
    padding-right: 0.6rem;
  }
}
</style>
