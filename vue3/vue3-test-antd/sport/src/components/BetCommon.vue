<template>
  <div class="h5-bet-common re">
    <van-nav-bar class="full-width over-hidden" style="height: 44px;position: fixed;z-index: 100;"
                 @click-left="$router.back()"
                 left-arrow
                 :placeholder="true" :border="false">
      <div slot="title" class="white">
        <div ref="title-content" class="title-content" :style="{width: innerWidth - 100 + 'px'}">
          <div style="height: 44px;" class="flex-middle title-content-top" @click="showAction = true">
                        <span class="fs16">{{ match.league_name }}
                            <i class="icon_base icon_triangle"></i>
                        </span>
          </div>
          <slot name="title-down" :match="match">
            <div style="height: 44px;" class="flex-between fs12 title-content-bottom">
              <div style="width: 90px" class="left">{{ match.home_name }}</div>
              <div class="fs10 origin-center">{{ aliasStatus(match.status) }}</div>
              <div style="width: 90px" class="right">{{ match.away_name }}</div>
            </div>
          </slot>
        </div>
      </div>
    </van-nav-bar>

    <div ref="bet-bg" class="bet-bg ab flex-middle"
         style="top: 0;padding-bottom: 30px;"
         :style="{height: initialBgHeight + 'px', transform: `scale(${scale})`}">

      <div ref="bet-bg-content">
        <slot name="bg-content" :match="match">
          <div class="game-info re flex-between white" style="width: 80vw;">
            <div style="width: 35%">
              <load-image class="block m-b16" style="width:2.3rem;height:2.3rem; margin: 0 auto;"
                          :src="match.home_logo"
                          :loading="require('../assets/images/tmp1/team_logo1.svg')"
                          :error="require('../assets/images/tmp1/team_logo1.svg')"
              />
              <p class="center" style="height: 2rem;">{{ match.home_name }}</p>
            </div>
            <div class="center" style="width: 30%">
              <p class="fs12 center m-b8">{{
                  match.start_time ? format(match.start_time * 1000,
                      'yyyy-MM-dd') : '----'
                }}</p>
              <span class="fs20">{{ match.start_time ? format(match.start_time * 1000, 'hh:mm') : '--:--' }}</span>
            </div>
            <div style="width: 35%">
              <load-image class="block m-b16" style="width:2.3rem;height:2.3rem; margin: 0 auto;"
                          :src="match.away_logo"
                          :loading="require('../assets/images/tmp1/team_logo2.svg')"
                          :error="require('../assets/images/tmp1/team_logo2.svg')"
              />
              <p class="center" style="height: 2rem;">{{ match.away_name }}</p>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <scroll ref="scroll" :scrollHeight="scrollHeight"
            class="scroll_style"
            :probeType="3"
            :listenScroll="true"
            :bgColor="'#E6E7F3'"
            :radius="8"
            :hidden="top" @scroll="_scroll">
      <div class="play-info-list" :style="{minHeight: innerHeight - 44 + 7 + 'px'}">

        <div class="full-width" style="padding: 0.6rem 0;">
          <scroll-x :tabs="market_tabs" v-slot="{ item }" @change="selectPlay">
            <template>
              <div class="flex-middle-only" style="padding-right: 0.6rem;">
                <span class="dark fs12 play-item"
                      :class="item.index === groupIndex ? 'active' : ''">{{ item && item.name }}</span>
              </div>
            </template>
          </scroll-x>
        </div>

        <div v-if="playList && playList.length" class="play-info-item bg-white p-l16 p-r16 re m-b8"
             v-for="group of playList"
             :key="group.market_group_id">
          <div class="flex-between" style="line-height: 1.8rem;">
            <span class="fs12 dark bold">{{ group.name }}</span>
            <i class="icon_base"
               @click="_keepTop($event, group)"
               :class="group.top ? 'zhiding' : 'weizhiding'"></i>
          </div>

          <van-row gutter="3" style="margin-bottom: 0.15rem;">
            <van-col :span="12"
                     style="margin-bottom: 3px;"
                     v-for="play of group.market_groups" :key="play.market_id"
            >
              <div class="flex-between play-info-col"
                   :class="activeClass(play, match)"
                   v-if="play.is_show === '1' && play.is_suspend === '0'"
                   @click="_chooseBet(play, group, match)"
              >
                <div class="fs12 cles-1">
                  <span v-if="play.header !== '1' && play.header !== '2'">{{ play.header }}</span>
                  <span class="dark-light m-l5">{{ play.handicap }}</span>
                </div>
                <span>{{ play.odds }}</span>
              </div>
              <div v-else class="flex-middle play-info-col bg-gray full-height full-width">
                <i class="icon_base icon_lock"></i>
              </div>
            </van-col>
          </van-row>
        </div>
        <div v-if="isLoad === true && !playList.length" class="center lh-45">
          暂无开放盘口
        </div>
      </div>
    </scroll>

    <van-popup v-model="showAction" position="top" :lock-scroll="false"
               :style="{ maxHeight: '70%', borderRadius: `0 0 12px 12px`, overflowY: 'scroll'}">
      <div style="padding-bottom: 1rem;">
        <header class="flex-middle re" style="height: 2.2rem;">
          <span class="black fs16 m-r5">{{ match.league_name }}</span>
          <i class="icon_base icon_triangle"></i>
        </header>

        <div style="padding: 0 1.2rem;">
          <van-row class="match-row" v-for="(action, i) in actions"
                   @click="_changeMatch(action)"
                   :class="action.match_id === match.match_id ? 'active' : ''"
                   :key="i" type="flex" align="center">
            <van-col :span="8" class="center">

              <load-image class="block" style="margin: 0 auto 0.6rem;width:2.3rem;height:2.3rem;"
                          :src="action.home_logo"
                          :loading="require('../assets/images/tmp1/team_logo1.svg')"
                          :error="require('../assets/images/tmp1/team_logo1.svg')"
              />

              <span class="fs12 black">{{ action.home_name }}</span>
            </van-col>
            <van-col :span="8" class="center">
              <p class="center fs12 black m-b8">{{ format(action.start_time * 1000, 'yyyy-MM-dd') }}</p>
              <span class="fs20 black">{{ format(action.start_time * 1000, 'hh:mm') }}</span>
            </van-col>
            <van-col :span="8" class="center">
              <load-image class="block" style="margin: 0 auto 0.6rem;width:2.3rem;height:2.3rem;"
                          :src="action.away_logo"
                          :loading="require('../assets/images/tmp1/team_logo2.svg')"
                          :error="require('../assets/images/tmp1/team_logo2.svg')"
              />
              <span class="fs12 black">{{ action.away_name }}</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-popup>

    <FootBetController/>
  </div>
</template>
<script>
import betDetail from "../mixins/betDetail";
import Scroll from "../common/Scroll";
import ScrollX from "../common/ScrollX";
import chooseBets from '../mixins/choose-bets'
import {prefixStyle, addClass, hasClass, removeClass} from '../assets/js/dom'
import {getleagueMatches, getMatchInfo} from '../axios/sport'
import FootBetController from "./FootBetControll";

let initialBgHeight = (287 / 375) * window.innerWidth

export default {
  mixins: [chooseBets, betDetail],
  data() {
    return {
      showAction: false,
      actions: [],
      scrollHeight: 100,
      scale: 1,
      // bets: JSON.parse(sessionStorage.getItem('bets') || "{}"),
      matchInfo: {match: {}},
      isLoad: false
    }
  },

  props: {
    matchId: {
      type: [Number, String],
      default: ''
    },

    leagueId: {
      type: [Number, String],
      default: ''
    },

    // 视频或动画置顶
    top: {
      type: Boolean,
      default: false
    },

    changeScrollHeight: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    changeScrollHeight(v) {
      let h = v ? 30 : 0
      this._initialDom(h)
    },

    matchId() {
      console.log(11111)
      this._getMatchInfo()
    },

    leagueId() {
      this._getLeagueMatches()
    },
  },

  methods: {
    _changeMatch(action) {
      this.match = action

      setTimeout(() => {
        this.showAction = false
      }, 100)

      // 获取比赛信息
      this._getMatchInfo(action.match_id)
    },

    // 获取比赛信息
    _getMatchInfo(matchId = '') {
      let id = matchId ? matchId : this.matchId

      console.log('id=====>', this.matchId)
      if (!id) return;

      getMatchInfo(id)
          .then(res => {
            if (res.code === 200) {
              this.groupIndex = 0
              this.matchInfo = res.data

              this.markets = res.data.markets
              this.match = res.data.match
              this.market_groups = res.data.market_groups
              this.market_tabs = res.data.market_tabs || []

              this.group = this.market_tabs[this.groupIndex] || {market_groups: []}

              // 开始循环 请求比赛变动
              // this._startGetMatchChange()
              this.startLoop = true

              this.isLoad = true
            }
          })
          .catch(err => {
            console.log(err)
            this.isLoad = true
            setTimeout(() => {
              this._getMatchInfo()
            }, 1000)
          })
    },

    _initialDom(bottomTabHeight = 0) {
      let scrollDom = this.$refs['scroll'].$el

      console.log('注单发生变化了===>', Object.values(this.bets).length, bottomTabHeight)
      scrollDom.style.top = initialBgHeight - 30 + (bottomTabHeight || 0) + 'px'

      if (Object.values(this.bets).length > 0) {
        bottomTabHeight += 44
      }
      this.scrollHeight = window.innerHeight - initialBgHeight + 30 - (bottomTabHeight || 0)
    },

    _scroll(pos) {
      let {y} = pos
      if (y > 0) {
        // 向下滚动
        this.scale = Math.abs(y / initialBgHeight) + 1
        this.betBg.style.height = initialBgHeight + 'px'
      } else if (y < 0) {
        // 如果置顶 背景高度不变
        if (this.top) return;
        // 向上滚动背景高度 随滚动偏移减小
        let height = Math.max(44, initialBgHeight - 30 + 8 + y)
        this.betBg.style.height = height + 'px'
        this.betBg.style.zIndex = 90;
        this.scale = 1

        // console.log('height', height)

        let opacity = 1 - Math.abs(y / initialBgHeight)

        // 处理背景图中间内容 (transform属性会使position失效)
        this.betBgContent.style[prefixStyle('transform')] = `scale(${opacity}, ${opacity})`
        this.betBgContent.style.opacity = opacity

        this.betBgContent.style.display = opacity < 0.3 ? 'none' : 'block'

        // 动态改变头部内容
        if (initialBgHeight - Math.abs(y) <= 50 + 30) {
          addClass(this.titleContent, 'up')
          this.$refs['scroll'].$el.style.zIndex = 80
        } else {
          removeClass(this.titleContent, 'up')
          this.$refs['scroll'].$el.style.zIndex = 120
        }
      }
    },

    // 获取联赛下所有比赛信息
    _getLeagueMatches() {
      if (!this.leagueId) return;
      getleagueMatches(this.leagueId)
          .then(res => {
            if (res.code === 200) {
              this.actions = res.data
            }
            console.log('联赛 所有比赛', res)
          })
    }
  },

  components: {
    Scroll,
    ScrollX,
    FootBetController
  },

  mounted() {
    this.$nextTick(() => {
      this._initialDom()
      this.betBg = this.$refs['bet-bg']
      this.betBgContent = this.$refs['bet-bg-content']
      this.titleContent = this.$refs['title-content']
      this._getLeagueMatches()
    })
  },

  activated() {
    console.log('betCommon activated')
    this._getMatchInfo()
  },

  deactivated() {
    console.log('betCommon deactivated')
  },

  created() {
    this.initialBgHeight = initialBgHeight
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight

    this.timer = null
  }
}
</script>
<style type="text/css" lang="less">
.h5-bet-common {
  height: 100%;
  overflow: hidden;

  .van-nav-bar {
    background-color: transparent;

    .van-icon {
      color: #fff;
    }
  }

  .van-nav-bar__title {
    max-width: none;
  }

  .title-content {
    transition: transform .3s ease-in-out;
    height: 88px;
    transform: translate3d(0, 22px, 0);

    .title-content-top {
      opacity: 1;
      transition: opacity .3s linear;
    }

    .title-content-bottom {
      opacity: 0;
      transition: opacity .3s linear;
    }

    &.up {
      transform: translate3d(0, -22px, 0) !important;

      .title-content-top {
        opacity: 0;
      }

      .title-content-bottom {
        opacity: 1;
      }
    }
  }

  .bet-bg {
    background-image: url("../assets/images/tmp1/bet-bg.png");
    background-size: cover;
    width: 100%;
    transform-origin: top;

    .game-info {
      transform-origin: center;
    }
  }

  .scroll_style {
    border-top-left-radius: 8px;
    z-index: 120;
    border-top-right-radius: 8px;
    position: absolute;
    width: 100%;
  }

  .play-info-list {
    border-top-right-radius: 0.4rem;
    border-top-left-radius: 0.4rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  .play-info-item {
    border-radius: 0.4rem;
    padding: 0 0.8rem 0.4rem 0.8rem;

    &::before {
      content: '';
      display: block;
      position: absolute;
      background: #2B2745;
      border-radius: 2px;
      width: 4px;
      height: 16px;
      top: 10px;
      left: 0;
    }
  }

  .play-item {
    border-radius: 0.7rem;
    height: 1.4rem;
    line-height: 1.4rem;
    background: #fff;
    padding: 0 1rem;
    transition: background .2s linear;

    &.active {
      background: #2B2745;
      color: #fff;
    }
  }

  .play-info-col {
    height: 1.9rem;
    background: #F6F5FA;
    border-radius: 2px;
    padding: 0 0.6rem;

    &:nth-child(odd) {
      margin-right: 0;
    }
  }

  .icon_triangle {
    border-bottom-color: black;
    top: -2px;
  }

  .match-row {
    padding: 0.6rem 0;

    &.active {
      background: #E6E7F3;
      border-radius: 8px;
    }
  }
}
</style>
