<template>
  <!-- 投注记录 -->
  <div class="bet_record" @click="showUserInfo = false">
    <div class="record_title lh-48 re center fs14 bold white line_color listreturn5">
      <a href="javascript:void(0)" @click.stop="handleClickAvatar" class="ab">
        <Avatar/>
      </a>
      {{ $t('t_z_j_l') }}

      <Dialog v-show="showUserInfo"/>
    </div>
    <div class="record_tab re">
      <div class="w-14 flex-items h-14 ab date_select" @click="isShowTimeSheet = true" v-if="active_tab == 2">
        <img class="w-14" src="../../../assets/images/tmp3/bet/date.png" alt="" srcset="">
      </div>
      <van-tabs animated v-model="active_tab" @change="onRefresh" color="#7B5605" line-width="2.8rem">
        <!-- 未结注单 -->
        <van-tab :title="$t('un_bets')" name="1"/>
        <!-- 已结注单 -->
        <van-tab :title="$t('re_bets')" name="2"/>
      </van-tabs>
    </div>

    <div class="scroll-y flex-1 full-width" style="max-height:calc(100vh - 9rem);">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="10"
            :immediate-check="false"
            :finish-text="$t('no_more')"
            @load="onLoad"
        >
          <div class="con-main" style="padding: .6rem .8rem 0;">
            <div v-for="item of list" :key="item.id">
              <!-- 三串一 -->
              <div class="border_l flex">
                <div class="flex-1 p-l8">
                  <p class="fs12 record-color bold">
                    {{ item.bet_type === '1' ? $t('d_s') : item.bet_type === '2' ? aliasNum(item.children.length) : '' }}
                  </p>
                  <p class="p-t8 gray fs12">{{ $t('bet_time') }}：{{ format(item.bet_time * 1000, 'yyyy-MM-dd hh:mm') }}</p>
                </div>
                <div class="flex-1 right">
                  <p class="fs12 gray bold" v-if="item.bet_type === '2'">
                    {{ $t('peilv') }}：<span class="record-color">@{{ item.odds }}</span>
                  </p>
                  <p class="p-t8 gray fs12">{{ $t('bet_no') }}：{{ item.bet_no }}</p>
                </div>
              </div>
              <!-- 列表 -->
              <div class="list_bottom box radius4 m-t12">
                <div class="bg-white p-l12 p-r12">
                  <!-- end -->
                  <div class="p-b17" :class="{'under-line': isShow}" v-for="(game, i) of item.children.slice(0,1)" :key="i">
                    <div class="flex">
                      <div class="flex-1 h-37 flex-items">
                        <div style="width: 1rem;height: 1rem;" :class="sportIcon(game.sport_id).icon"></div>
                        <span class="fs12 color6 p-l4">{{game.league_name}}</span>
                      </div>
                      <div class="flex-1 right p-t12 fs12 color6">
                        {{ format(game.start_time * 1000, 'yyyy-MM-dd hh:mm') }}
                      </div>
                    </div>
                    <div class="fs14 bold gray lh-1 p-t8">
                      {{game.bet_content}}
                    </div>
                    <div class="flex p-b8 p-t8">
                      <div class="flex-1 flex-items">
                        <span class="fs12 gray bold">{{ game.market_group_name }}</span>
                      </div>
                      <div class="flex-1 right fs14 record-color bold">
                        @{{game.odds}}
                      </div>
                    </div>
                    <div class="fs12 color6 lh-1">
                      {{ game.home_name }} VS {{ game.away_name }}
                      <!--已结注单-->
                      <span class="fs12 reguler blue" v-if="active_tab === '2'" style="color: #5FE8BD;">{{ game.is_inplay === '1' ? `[${$t('ground')}: ${game.bet_extend}]` : '' }}</span>
                      <!--未结注单-->
                      <span class="fs12 reguler blue" v-if="active_tab === '1'" :style="{color: matchStatus(game).color}">{{ matchStatus(game).text}}</span>
                    </div>
                  </div>
                  <!-- 第三个start -->
                  <transition name="slide-down">
                    <div v-if="isShow">
                      <div class="p-b17" v-for="(game, i) of item.children.slice(1)" :key="i">
                        <div class="flex">
                          <div class="flex-1 h-37 flex-items">
                            <div style="width: 1rem;height: 1rem;" :class="sportIcon(game.sport_id).icon"></div>
                            <span class="fs12 color6 p-l4">{{game.league_name}}</span>
                          </div>
                          <div class="flex-1 right p-t12 fs12 color6">
                            {{ format(game.start_time * 1000, 'yyyy-MM-dd hh:mm') }}
                          </div>
                        </div>
                        <div class="fs14 bold gray lh-1 p-t8">
                          {{game.bet_content}}
                        </div>
                        <div class="flex p-b8 p-t8">
                          <div class="flex-1 flex-items">
                            <span class="fs12 gray bold">{{ game.market_group_name }}</span>
                          </div>
                          <div class="flex-1 right fs14 record-color bold">
                            @{{game.odds}}
                          </div>
                        </div>
                        <div class="fs12 color6 lh-1">
                          {{ game.home_name }} VS {{ game.away_name }}
                          <!--已结注单-->
                          <span v-if="active_tab === '2'" style="color: #5FE8BD;">{{ game.is_inplay === '1' ? `[${$t('ground')}: ${game.bet_extend}]` : '' }}</span>
                          <!--未结注单-->
                          <span v-if="active_tab === '1'" :style="{color: matchStatus(game).color}">{{ matchStatus(game).text}}</span>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
                <div class="see_more fs12 gray bold center lh-30" @click="isShow = !isShow" v-if="item.children.length > 1">
                  {{ isShow ? $t('s_q') : $t('c_k_g_d') }}
                  <img :class="{rotate: isShow}" class="m-l4" src="../../../assets/images/tmp3/bet/jt.png" alt="">
                </div>
                <div class="h-37 lcolor flex last_div">
                  <div class="p-l24 flex-1 flex-items  bold">
                    <span class="fs12 gray">{{ $t('mon') }}：</span>
                    <span class="fs12 gray record-color">{{item.money}}</span>
                  </div>
                  <div class="p-l24 flex-1 flex-middle-only bold">
                    <span class="fs12 gray">{{ active_tab === '2' ? $t('res') : $t('win') }}:</span>
                    <span class="record-color gray fs12">{{ active_tab === '2' ? betStatus(item).text : item.except_bonus }}</span>
                  </div>
                  <div class="p-l24 flex-1 flex-middle-only bold">
                    <van-button class="flex-1" style="height: 1.2rem;font-size: 10px;"
                                color="transparent"
                                v-if="item.switch_cancel == '1' && active_tab == '1'"
                                @click="_cancelBet(item)">
                      <span style="color: #f2ab06">{{$t('c_d')}}</span>
                    </van-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <div class="lh-45 flex-middle" v-if="finished && list.length == 0">
        {{$t('no_more')}}
      </div>
    </div>

    <div class="h-54"></div>
    <!-- 未结注单底部总下注，可赢 -->
    <div class="bet_footer listreturn6" v-if="active_tab === '1'">
      <div class="h-37 lcolor flex last_div">
        <div class="p-l24 flex-2 flex-items bold">
          <span class="fs12 gray">{{ $t('t_bets') }}：</span>
          <span class="fs12 gray record-color">{{totalAmount}}</span>
        </div>
        <div class="flex-3 flex-items bold">
          <span class="fs12 gray">{{ $t('win') }}：</span>
          <span class="fs12 gray record-color">{{ totalBonus.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <!-- 已结注单底部总下注，总输赢： -->
    <div class="bet_footer listreturn6" v-if="active_tab === '2'">
      <div class="h-37 lcolor flex last_div">
        <div class="p-l24 flex-2 flex-items bold">
          <span class="fs12 gray">{{ $t('t_bets') }}：</span>
          <span class="fs12 gray record-color">{{totalAmount}}</span>
        </div>
        <div class="flex-3 flex-items bold">
          <span class="fs12 gray">{{ $t('t_win') }}：</span>
          <span class="fs12 gray record-color">{{ totalWin }}</span>
        </div>
      </div>
    </div>
    <van-action-sheet v-model="isShowTimeSheet" :title="$t('x_z_r_q')">
      <div class="flex-middle" style="margin-top: 1rem">
        <div class="timer-round center fs12" @click="setIntervalTime(0)">{{ $t('j_t') }}</div>
        <div class="timer-round center fs12" @click="setIntervalTime(1)">{{ $t('y_t') }}</div>
        <div class="timer-round center fs12" @click="setIntervalTime(7)">{{ $t('z_j_y_z') }}</div>
      </div>
      <div class="flex-middle p-l16 p-r16" style="margin: 1.2rem 0;">
        <div class="show-time-continaer fs14 center bold"
            :class="{active: currentSelectLabel === 0}"
            @click="changeCurrentTime(0)">{{ $utils.format(start_time, 'yyyy/MM/dd') }}
        </div>
        <div class="flex-1 center">—</div>
        <div class="show-time-continaer fs14 center bold"
            :class="{active: currentSelectLabel === 1}"
            @click="changeCurrentTime(1)">{{ $utils.format(end_time, 'yyyy/MM/dd') }}
        </div>
      </div>
      <div class="vandatetimecontiner">
        <van-datetime-picker
            @change="handleChangeTimePicker"
            v-model="currentDate"
            type="date"
            :title="$t('s_dyr')"
            :min-date="minDate"
            :max-date="maxDate"
        />
      </div>
      <div class="full-width bg-white" style="padding: .6rem;">
        <div @click="confirmDate" class="submit public-btn flex-middle fs14" style="height: 1.9rem; ">
          {{ $t('q_r') }}
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import {setWindowScrollContentHeight} from '../../../assets/js/util'
import {mapState, mapMutations} from "vuex";
import showMoreBetDetail from "../../../mixins/showMoreBetDetail";
import {cancelBet, getBetHistory, getUnsettledBets} from '../../../axios/sport'
import {Toast} from "vant";

export default {
  mixins: [showMoreBetDetail],
  data() {
    const now = new Date()
    return {
      active_tab: '1',
      isShow: false,
      isShowTimeSheet: false,
      activeNames: ['1'],
      minDate: new Date(now.getFullYear() - 1, now.getMonth(), 1),
      maxDate: new Date(),
      currentDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
      start_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), // 选择的最小时间
      end_time: new Date(), // 选择的最大时间
      currentSelectLabel: 0, // 0 是最小的时间框， 1是最大的时间框
      list: [], // 请求的列表
      loading: false,
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      refreshing: false, // 下拉状态
      page: 1,
      showUserInfo: false,
      totalAmount: 0,
      totalBonus: 0,
    }
  },

  computed: {
    ...mapState(['userInfo', 'userInfoStatus'])
  },

  watch: {
    active_tab() {
      this.setWindowHeight();
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
      updateUserInfoStatus: 'UPDATE_USERINFO_STATUS'
    }),

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

    handleClickAvatar() {
      if(this.userInfo.userId) {
        this.showUserInfo = true
      } else {
        this.$toast(this.$t('login_f'))
      }
    },

    handleChangeTimePicker() {
      if(this.currentSelectLabel === 0) {
        this.start_time = this.currentDate
      } else {
        this.end_time = this.currentDate
      }
    },

    confirmDate() {
      this.isShowTimeSheet = false;

      this.onRefresh();
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

    onLoad() {
      if (this.active_tab === '2') {
        this._getBetHistory()
      } else {
        this._getUnsettledBets()
      }
    },

    setWindowHeight() {
      setTimeout(() => {
        setWindowScrollContentHeight([
          document.querySelector('.listreturn5'),
          document.querySelector('.listreturn6'),
          document.querySelector('.record_tab').querySelector('.van-tab'),
          document.querySelector('.van-hairline--top-bottom')
        ]);
      }, 30)
    },

    setIntervalTime(val) {
      const now = new Date().getTime()
      const oneDay = 24 * 60 * 60 * 1000

      switch(val) {
        case 0: // 今天
          this.start_time = new Date(now - oneDay * val)
          this.end_time = new Date()
          break;
        case 1: // 昨天
          this.start_time = new Date(now - oneDay * val)
          this.end_time = new Date()
          break;
        case 7: // 最近7天
          this.start_time = new Date(now - oneDay * val)
          this.end_time = new Date()
          break;
      }
    },

    changeCurrentTime(val) {
      this.currentSelectLabel = val;
      // 动态改变currentDate的值
      if (this.currentSelectLabel === 0) {
        this.currentDate = this.start_time;
      } else {
        this.currentDate = this.end_time;
      }
    },

    // 已结注单
    _getBetHistory() {
      let params = {
        pageSize: 20,
        page: this.page,
        sport: '',
        start_date: this.$utils.format(this.start_time, 'yyyy-MM-dd'),
        end_date: this.$utils.format(this.end_time, 'yyyy-MM-dd')
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

    // 未结注单
    _getUnsettledBets() {
      let query = {
        sport: ''
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
  },

  components: {
    Avatar: () => import('../../../components/temp3/Avatar'),
    Dialog: () => import('../../../components/temp3/Dialog'),
  },

  mounted() {
    this.setWindowHeight();
    this.onLoad()
  }
}
</script>
<style type="text/css" lang="less">
.bet_record {
  // background: #f6fafb;
}

.record_tab {
  .van-tab__text {
    font-size: .7rem;
    font-weight: bold;
  }

  .van-tabs__wrap {
    padding-right: .75rem;
    padding-left: .75rem;

    .van-tab__text--ellipsis {
      -webkit-line-clamp: 2 !important;
      overflow: visible !important;
      text-align: center;
      padding-bottom: 10px;
    }
  }

  .van-tab--active {
    font-size: 14px;
    color: #7B5605 !important;
    font-weight: 700;
  }

  .van-tabs__line {
    bottom: .95rem
  }
}

.record_title {
  a {
    top: 0;
    left: .8rem;
  }

  img {
    padding-top: .7rem
  }
}

.border_l {
  border-left: .1rem solid #7B5605;

  > div > p {
    line-height: 1;
  }
}

.last_div {
  border-top: .05rem solid #D9E2E9;
}

.see_more {
  min-width: 4.9rem;
  margin: 0 auto;
  max-width: 7.5rem;
  background-image: linear-gradient(180deg, #ECF1F7 0%, #FFFFFF 100%);
  border: .05rem solid #D9E2E9;
  border-bottom: none;
  border-radius: .2rem .2rem 0 0;

  img {
    width: .5rem;
    vertical-align: middle;
  }
}

.list_bottom {
  margin-bottom: 1.2rem
}

.date_select {
  right: .8rem;
  top: .6rem;
  z-index: 666;
}

.bet_footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 50px;
  font-weight: bold;
}

.vandatetimecontiner {
  padding: 0 3rem;

  .van-picker__toolbar {
    display: none;
  }

  .van-picker-column__item--selected {
    color: #7B5605;
  }
}

.timer-round {
  widows: 3.2rem;
  height: 1.4rem;
  border-radius: 1rem;
  line-height: 1.4rem;
  border: 1px solid #BCC0CB;
  color: #4E5772;
  padding: 0 1rem;
  margin: 0 .3rem;
}

.show-time-continaer {
  width: 7.5rem;
  height: 1.5rem;
  background: #FFFFFF;
  border: 1px solid #4D5872;
  border-radius: .1rem;
  color: #4D5872;
  line-height: 1.5rem;

  &.active {
    border: 1px solid #7B5605;
    color: #7B5605;
  }
}
</style>
