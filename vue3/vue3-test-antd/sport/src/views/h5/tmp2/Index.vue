<template>
  <div class="index-tmp2">
    <van-swipe-cell class="full-height"
                    stop-propagation
                    ref="swipe-cell"
                    disabled
                    @open="onSwipeCellOpen"
                    @close="onSwipeCellClose"
                    :left-width="swipeCellLeftWidth">
      <template #left>
        <div class="full-height left-content re" style="background-color:  #383838;"
             :style="{width: swipeCellLeftWidth + 'px'}" @click.stop>
          <div class="search-box flex-middle-only" @click.stop="$router.push('/search')">
            <i class="icon_base icon-search m-l10 m-r10"></i>
            <span class="fs14" style="color: #c3c3c3;">{{$t('search')}}</span>
          </div>

          <van-tabs v-model="leftActiveTab" class="full-width"
                    color="#ddd"
                    :border="false"
                    :line-height="2"
                    :line-width="48"
                    @click="onChangeLeftTab"
                    title-active-color="#fff"
                    title-inactive-color="#fff"
                    background="#383838">
            <van-tab v-for="tab of leftTabs" :key="tab.title" :name="tab.id">
              <template #title>
                <img class="block" style="margin: 0.6rem auto 0;" :src="tab.src" alt="">
                <span class="fs12 ab-middle-x full-width center"
                      style="bottom: 5px;line-height: 0.6rem;">{{$t(tab.title)}}</span>
              </template>
            </van-tab>
          </van-tabs>

          <!--体育投注-->
          <div v-show="leftActiveTab === 1">
            <div class="pd-16-12 white" style="background: #474747;" @click="_backSubPage('/index/home')">{{$t('home')}}</div>
            <div v-if="'fball' in displaySportNames" class="pd-16-12" style="color:#cecece;" @click="_backSubPage('/index/sport?sport=1')">{{$t('fball')}}</div>
            <div v-if="'bball' in displaySportNames" class="pd-16-12" style="color:#cecece;" @click="_backSubPage('/index/sport?sport=18')">{{$t('bball')}}</div>
            <div v-if="'tennis' in displaySportNames" class="pd-16-12" style="color:#cecece;" @click="_backSubPage('/index/sport?sport=13')">{{$t('tennis')}}</div>
            <div v-if="'vball' in displaySportNames" class="pd-16-12" style="color:#cecece;" @click="_backSubPage('/index/sport?sport=91')">{{$t('vball')}}</div>
            <div v-if="'b_ball' in displaySportNames" class="pd-16-12" style="color:#cecece;" @click="_backSubPage('/index/sport?sport=16')">{{$t('b_ball')}}</div>
            <div v-if="'esports' in displaySportNames" class="pd-16-12" style="color:#cecece;" @click="_backSubPage('/index/sport?sport=151')">{{$t('esports')}}</div>
          </div>

          <!--滚球盘-->
          <div v-show="leftActiveTab === 2">
            <div class="flex-between" style="height:2.2rem;background: #474747;"
                 v-for="sport of sports" :key="sport.id"
                 v-if="sport.id in displaySportIds"
                 @click="_backSubPage(`/index/bet-grounder?sport=${sport.id}`)">
              <div class="flex-middle-only">
                <div style="width:0.25rem;height:2.2rem;background: #137A5A;margin-right: 0.35rem;"></div>
                <div :class="sportIcon(sport.id)"></div>
                <span style="color:#fafafa;margin-left: 0.4rem;">{{sport.name}}</span>
              </div>
              <span class="white fs12" style="margin-right: 0.6rem;">{{$t('sais', {n: sport.count})}}</span>
            </div>
          </div>


          <div class="language-box ab full-width flex-middle-only flex-between" @click="showPopover = !showPopover" v-if="allowChangeLang">
            <div>
              <i class="icon_base icon-lang m-l10 m-r10"></i>
              <span>{{currentLang.name}}</span>
            </div>

            <van-icon name="arrow" />

            <van-row class="ab" style="bottom: 2.3rem;left: .5rem;width: 80%;color: #545454;" v-show="showPopover">
              <van-col :span="12" class="lh-45 center lang-col"
                       :class="l.code === currentLang.code ? 'active' : ''"
                       v-for="l of languages" :key="l.code"
                       @click="onSelectLang(l)"
              >
                {{l.name}}
              </van-col>
            </van-row>
          </div>

        </div>
      </template>

      <TopNav
        :swipe-cell-state="swipeCellState"
        @toggle-swipe-cell="toggleSwipeCell"
        @toggle-top-nav="toggleTopNav"
      />

      <keep-alive>
        <router-view class="wrap-router scroll-y" :style="{height: scrollHeight + 'px'}"/>
      </keep-alive>
    </van-swipe-cell>

    <FootBetControllerTmp2 v-if="showFootBet" @close="_close"/>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import FootBetControllerTmp2 from "../../../components/FootBetControllerTmp2";
  import TopNav from "../../../components/TopNav";
  import {getSportCategory, getHomeGames, changeLanguage, getLanguages } from "../../../axios/sport";
  import languageMixin from "../../../mixins/languageMixin";
  import customiseMixin from "../../../mixins/customiseMixin";

  export default {
    mixins: [ languageMixin, customiseMixin ],
    data() {
      return {
        leftActiveTab: 1,
        swipeCellState: 'close',
        sports: [],
        scrollHeight: window.innerHeight - window.rem2px(2.2),
        showFootBet: false,
        showTopNav: true,
        showPopover: false,
      };
    },

    computed: {
      ...mapGetters(['userInfo', 'bets', 'homeGames'])
    },

    methods: {
      ...mapMutations({
        updateUserInfo: 'UPDATE_USER_INFO',
        updateHomeGames: 'UPDATE_HOME_GAMES',
      }),


      sportIcon(id) {
        let sport = Number(id)
        if (sport === 1) {
          return 'football-icon'
        } else if (sport === 18) {
          return 'basketball-icon'
        } else if (sport === 13) {
          return 'tennis-icon'
        } else if (sport === 91) {
          return 'volleyball-icon'
        } else if (sport === 16) {
          return 'baseball-icon'
        } else if (sport === 151) {
          return 'gaming-icon'
        }
      },

      toggleTopNav(flag) {
        this.showTopNav = flag

        this.computedScrollHeight()
      },

      onSwipeCellClose() {
        this.swipeCellState = 'close'
        this.showPopover = false;
      },

      onSwipeCellOpen() {
        this.swipeCellState = 'open'
      },

      toggleSwipeCell(type) {
        if (type === 'open') {
          this.$refs['swipe-cell'].open('left')
        } else if (type === 'close') {
          this.$refs['swipe-cell'].close('left')
        }
      },

      onChangeLeftTab(tabId) {
        // console.log('tabName', tabId)
        switch (tabId) {
          case 1:
            break;
          case 2:
            this._getSportCategory()
            break;
          case 3:
            this.showUserInfo = false
            this.toggleSwipeCell('close')
            this.$router.push('/index/my-favorite')
            break;
          case 4:
            this.toggleSwipeCell('close')
            this.$router.push('/index/result')
            break;
        }
      },

      _backSubPage(path) {
        this.toggleSwipeCell('close')
        this.$router.push(path)
      },

      // 获取体育分类和比赛数量
      _getSportCategory(category = 'inplay') {

        // 默认 滚球
        getSportCategory(category)
          .then(res => {
            if (res.code === 200 && res.data) {

              // let list = res.data

              this.sports = res.data.filter(item => String(item.id) !== '0')
              // list.forEach(sport => {
              //     if (sport.id === '1') {
              //         this.sportCount = sport.count
              //     }
              // })
            }
          })
          .catch(err => {
            console.log('err', err)
          })
      },

      computedScrollHeight(bets = {}) {
        let keys = Object.keys(bets)

        const routeMeta = this.$route.meta

        // 根据路由 判断是否显示底部注单
        this.showFootBet = routeMeta.showFootBet

        // 如果显示顶部navBar
        let topNavHeight = this.showTopNav ? window.rem2px(2.3) : 0
        // 如果 不显示注单
        if (!this.showFootBet) {
          this.scrollHeight = window.innerHeight - window.rem2px(2.2) - topNavHeight
          return;
        }

        // 如果 只有一个注单
        if (keys.length === 1) {
          // 78 48
          this.scrollHeight = window.innerHeight - window.rem2px(8.5) - topNavHeight
        } else if (keys.length > 1) {

          // 如果 多个注单
          this.scrollHeight = window.innerHeight - window.rem2px(4.7) - topNavHeight
        } else {
          this.scrollHeight = window.innerHeight - window.rem2px(2.2) - topNavHeight
        }
      },

      _close() {
        this.computedScrollHeight(this.bets)
      }
    },

    watch: {
      '$route'(route) {
        const routeMeta = route.meta

        // 根据路由 meta 判断是否显示底部注单
        this.showFootBet = routeMeta.showFootBet

        this.computedScrollHeight(this.bets)
      },

      bets(bets, obj) {
        let ln1 = Object.keys(bets).length
        let ln2 = Object.keys(obj).length

        if (ln1 !== ln2) {
          this.computedScrollHeight(bets)
        }
      }
    },

    components: {
      FootBetControllerTmp2,
      TopNav
    },

    mounted() {
      setTimeout(() => {
        this.computedScrollHeight(this.bets)
      }, 1000)

      this.getLangList();
    },

    created() {
      this.innerHeight = window.innerHeight
      this.innerWidth = window.innerWidth
      this.swipeCellLeftWidth = window.innerWidth - 64
      this.leftTabs = [
        {id: 1, title: 'tytz', src: require('../../../assets/images/tmp2/sport-bet.svg')},
        {id: 2, title: 'ground', src: require('../../../assets/images/tmp2/bet-grounder.svg')},
        {id: 3, title: 'fav', src: require('../../../assets/images/tmp2/my-favorite.svg')},
        {id: 4, title: 'result', src: require('../../../assets/images/tmp2/result.svg')}
      ]
      this.timer = null;
    }
  };
</script>

<style type="text/css" lang="less">
  @import "../../../assets/css/mobile.less";
  .index-tmp2 {
    background-color: #383838;

    .marquee-content {
      background: #585858;
      box-shadow: inset 0 -1px 0 0 #367A65;
      height: 1.75rem;
    }

    .search-box {
      height: 2.355rem;
      background: #333333;
      box-shadow: inset 0 -1px 0 0 #474747;
    }

    .left-content {
      .van-tabs--line .van-tabs__wrap {
        height: 2.8rem !important;
      }

      .van-tab__text--ellipsis {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }

      .van-tab {
        box-shadow: inset 0 -2px 0 0 #367A65;
      }
    }

    .language-box {
      height: 2.25rem;
      color: #0BE9AD;
      bottom: 0;
      background: #333;
    }

    .lang-col {
      background: #E4E4E4;
      border-bottom: 1px solid #c3c3c3;

      &.active {
        background: #fff;
        color: #0BE9AD;
      }
    }
  }
</style>
