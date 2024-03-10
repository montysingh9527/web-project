<template>
  <div class="home">
    <div class="re over-hidden">
      <!--进行中-->
      <div class="underway re" v-if="!showMore && inTheGames.length" :style="{height: '8rem'}">
        <div class="lh-40">
          <img class="m-l16" :src="require('../../../assets/images/tmp1/underway.png')" alt="">
        </div>

        <scroll-x :tabs="inTheGames"
                  ref="scroll-x"
                  style="padding-left: 0.8rem"
                  :autoScroll="false"
                  tab-padding="0 0.2rem"
                  :listen-scroll="true"
                  @scroll="listenScroll">
          <template v-slot="{ item }">
            <div class="theGame-info" @click="_jump(item)">
              <div class="p-l8 lh-25 flex-middle-only" style="border-bottom: 1px solid #2B2745;">
                            <span class="fs10" style="color: #A39FB8;">
                                {{ item.status === '1' ? (item.timer.period || '') : aliasStatus(item.status) }}
                            </span>
                <count-down class="fs10" style="color:#A39FB8;"
                            :type="Number(sportId) === 1 ? 'up':'down'"
                            :time="(item.timer.tm || 0) * 60 + (Number(item.timer.ts) || 0)"
                            :suspend="item.timer.tt"></count-down>
              </div>
              <div class="fs12 flex-column flex-between" style="padding:0.5rem 0.4rem;height:3.7rem;">
                <van-row class="flex-between lh-25 full-width">
                  <van-col :span="22" class="flex-middle-only">
                    <load-image class="m-r8" style="width:1.2rem;height:1.2rem"
                                :src="item.home_logo"
                                :loading="require('../../../assets/images/tmp1/team_logo1.svg')"
                                :error="require('../../../assets/images/tmp1/team_logo1.svg')"
                    />
                    <p class="white cles-1">{{ item.home_name }}</p>
                  </van-col>

                  <van-col :span="2" class="white right">{{ item.ss && item.ss.split('-')[0] }}</van-col>
                </van-row>
                <van-row class="flex-between lh-25 full-width">
                  <van-col :span="22" class="flex-middle-only">
                    <load-image class="m-r8" style="width:1.2rem;height:1.2rem;"
                                :src="item.away_logo"
                                :loading="require('../../../assets/images/tmp1/team_logo2.svg')"
                                :error="require('../../../assets/images/tmp1/team_logo2.svg')"
                    />
                    <p class="white cles-1">{{ item.away_name }}</p>
                  </van-col>

                  <van-col :span="2" class="white right">{{ item.ss && item.ss.split('-')[1] }}</van-col>
                </van-row>
              </div>
            </div>
          </template>
          <div slot="end" class="show-more white flex-column flex-between"
               @click="_changeCategory({name: '滚球', value: 'inplay'}, true)"
               style="padding: 0.8rem">
            <span class="fs12">查看更多</span>
            <i class="icon_base icon-show-more"></i>
          </div>
        </scroll-x>

        <div class="ab-middle-x scroll-progress-bar flex-middle-only over-hidden">
          <div ref="scroll-progress"></div>
        </div>
      </div>

      <!--列表-->
      <bet-play
          :datas="list"
          ref="bet-play"
          :loading="loading"
          :category="category"
          :the-date="theDate"
          @show-calendar="_showCalendar"
          @show-picker="_showPicker"
          @change-collapse="_changeCollapse"
          :country="country">
      </bet-play>
    </div>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
          show-toolbar
          :columns="countries"
          value-key="name"
          @cancel="showPicker = false"
          @confirm="onConfirmCountry"
      />
    </van-popup>

    <van-calendar v-model="showCalendar"
                  position="top"
                  :min-date="new Date(new Date().getTime() + 24 * 3600000)"
                  :default-date="theDate"
                  @confirm="onConfirmDate" color="#3D385B"/>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import ScrollX from "../../../common/ScrollX";
import BetPlay from "../../../components/BetPlay";
import Result from "./Result";
import LoadImage from "../../../common/LoadImage";
import AsideMenu from "../../../components/aside-menu/AsideMenu";
import {prefixStyle} from '../../../assets/js/dom'
import {format} from '../../../assets/js/util'
import {
  getHotInplayMatches,
} from '../../../axios/sport'
import CountDown from "../../../common/CountDown";
import Event from '../../../event'
import getBetList from '../../../mixins/getBetList'
import { aliasStatus } from "../../../common/config"

let scrollPosition = {}

export default {
  mixins: [getBetList],
  data() {
    return {
      inTheGames: [],
      showPicker: false,
      country: {},
      showMenu: false,
      menu: {},
      pickerType: '',
      showCalendar: false, // 显示日历
      theDate: new Date(new Date().getTime() + 86400000),
      showMore: false,
      loading: false,
      countries: [],
      leagues: [],
      category: 'today',
      sportId: '1',
      sports: []
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  watch: {
    $route(to) {
      let {category, sport_id} = to.query

      if (category) this.category = category
      if (String(sport_id)) this.sportId = sport_id

      if (category === 'today') {
        this._getHotInplayMatches()
      }

      this._getBetList()
    },

    category(v, p) {
      this.showMore = v !== 'today'

      if (v === 'today' || p === 'today') {
        this.$refs['bet-play'].updateScrollHeight()
      }
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET'
    }),

    aliasStatus(status) {
      return aliasStatus(status)
    },
    _showCalendar() {
      this.showCalendar = true
    },

    _showPicker() {
      this.showPicker = true
    },

    // 今日玩法滚动显示隐藏 热门比赛
    _toggleHotMatch(flag) {
      if (this.showMore === flag) return;
      else this.showMore = flag

      this.$refs['bet-play'].updateScrollHeight()
    },

    // 选择国家
    onConfirmCountry(value) {
      this.country = value;
      this.showPicker = false;

      this._getBetList()
    },

    // 选择日期
    onConfirmDate(date) {
      this.theDate = date
      this.showCalendar = false

      this._getBetList()
    },

    // 日期格式化
    format(date, fmt) {
      return format(date, fmt)
    },

    _changeCategory(item) {
      let query = {...this.$route.query, category: item.value}

      this.$router.replace({path: '/home/sport', query})

      this._getBetList()
    },

    _jump(item) {
      let query = {
        league_id: item.league_id,
        match_id: item.match_id,
        match_status: item.status,
        sport: item.sport
      }

      this.$router.push({path: '/sport/betDetail', query: {...query}})
    },

    // 进行中底部 bar偏移
    listenScroll(pos = scrollPosition) {
      scrollPosition = pos
      const {x} = pos

      let scrollX = this.$refs['scroll-x']
      this.rect = !this.rect ? scrollX.getContentRect('ul') : this.rect
      this.contentRect = !this.contentRect ? scrollX.getContentRect('content') : this.contentRect

      let offsetX = x / (this.rect.width - this.contentRect.width + 16)

      let transX = -offsetX * 27

      this.$refs['scroll-progress'].style[prefixStyle('transform')] = `translate3d(${transX}px, 0, 0)`
    },

    // 热门滚球
    _getHotInplayMatches() {
      // 暂时只加载足球和篮球
      let sport_id = [1, 18].includes(Number(this.sportId)) ? this.sportId : 1

      getHotInplayMatches(sport_id)
          .then(res => {
            if (res.code === 200) {
              let list = res.data.matches.map(item => {
                item.t = (item.tm || 0) * 60 + (item.ts || 0)

                return item
              })
              this.inTheGames = list.sort((a, b) => b.t - a.t)
            }

            this.$refs['bet-play'].updateScrollHeight()
          })
          .catch(err => {
            console.log('热门滚球信息err', err)
          })
    },

    // 获取所有比赛列表
    _getBetList(loading = true) {
      this.loading = loading

      let date = this.category === 'upcoming' ? this.theDate : new Date()

      let params = {
        sport: this.sportId,
        country: this.country.code,
        day: format(date, 'yyyyMMdd'),
        // league: 1, // 联赛ID
        category: this.category,
        page: 1,
        pageSize: 50
      }

      this.clearTimer()

      console.log(2222222, params)

      this._getMatches(params)
    },

    _changeCollapse(leagueIds) {

      this.leagueIds = leagueIds
    }
  },

  components: {
    ScrollX,
    BetPlay,
    AsideMenu,
    CountDown,
    LoadImage,
    Result
  },

  mounted() {

    this.$nextTick(() => {
      this.country = this.countries[0] || {}
      this._getHotInplayMatches()
      this._getBetList()
    })

    Event.$on('loop-getHotMatches', () => {
      if (this.showMore === false && this.$route.path.indexOf('/home/sport') > -1) {
        this._getHotInplayMatches()
      }
    })
  },

  destroyed() {
    Event.$off('loop-getHotMatches')
    this.clearTimer()
    this.showMore = true
  },

  deactivated() {
    this.clearTimer()
  },

  activated() {
    if (this.initialList.length) {
      this.$refs['bet-play'].updateScrollHeight()
    }
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      let {category, sport_id} = to.query

      if (category) _this.category = category
      if (sport_id) _this.sportId = sport_id

      Event.$on('fetch-match-change', () => {
        if (_this.startLoop === true) {
          _this.loopGetMatchChanges()
        }
      })
    })
  },

  beforeRouteLeave(to, from, next) {
    this.loopTimes = 0
    this.startLoop = false
    Event.$off('fetch-match-change')
    next()
  }
}
</script>
<style type="text/css" lang="less">
.home {
  background-color: #2B2745;

  .theGame-info {
    width: 7.6rem;
    height: 5rem;
    background: #3D385B;
    border-radius: 8px;
  }

  .underway {
    padding-bottom: 1rem;
  }

  .scroll-progress-bar {
    width: 55px;
    height: 4px;
    background-color: #121021;
    border-radius: 2px;
    bottom: 0.4rem;

    > div {
      width: 27px;
      background-color: #5F5694;
      height: 2px;
      border-radius: 1px;
    }
  }

  .bet-detail-content-header {
    background-color: #E6E7F3;
    height: 48px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .country-box {
    /*min-width: 5rem;*/
    padding: 0 0.9rem;
    height: 1.4rem;
    border-radius: 0.7rem;
  }

  .van-cell {
    padding: 0;
  }

  .van-collapse-item__title--expanded::after {
    left: 0 !important;
    right: 0 !important;
  }

  .van-cell--clickable {
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    .van-cell__right-icon {
      color: #2B2745;
      font-size: 14px;
      font-weight: bold;
      margin-right: 0.8rem;
    }
  }

  /*.menu-header {*/
  /*    background: #121021;*/
  /*    border-radius: 0.8rem;*/
  /*    height: 1.6rem;*/

  /*    .menu-switch-bar {*/
  /*        transition: left .2s ease-in;*/
  /*        border-radius: 0.8rem;*/
  /*        height: 1.4rem;*/
  /*        left: 0.1rem;*/
  /*        background-color: #403A64;*/

  /*        &.active {*/
  /*            left: 4.2rem;*/
  /*        }*/
  /*    }*/
  /*}*/

  /*.menu-item {*/
  /*    height: 2.5rem;*/

  /*    .menu-item-num {*/
  /*        padding: 0.1rem 0.4rem;*/
  /*        background: #403A64;*/
  /*        border-radius: 0.7rem;*/
  /*    }*/
  /*}*/

  /*.menu-money-box {*/
  /*    bottom: 0;*/
  /*    height: 1.8rem;*/
  /*    width: 8.7rem;*/
  /*    background: #121021;*/
  /*    !*border-top-left-radius: 14px 14px 0 0;*!*/
  /*    border-radius: 14px 14px 0px 0px;*/
  /*}*/

  /*.menu-other-btn {*/
  /*    bottom: 2.6rem;*/

  /*    > .btn {*/
  /*        width: 4rem;*/
  /*        height: 1.8rem;*/
  /*        background: #403A64;*/
  /*        border: 1px solid #121021;*/
  /*        border-radius: 8px;*/
  /*    }*/
  /*}*/

  .show-more {
    background: #3D385B;
    border-radius: 8px;
    width: 2.8rem;
    height: 5rem;
  }
}
</style>
