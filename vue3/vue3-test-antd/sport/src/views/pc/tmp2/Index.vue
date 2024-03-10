<template>
  <div class="index-pc-tmp2">
    <TopNavPc/>
    <header class="flex-between">
      <div style="width: 200px;" @click="$router.push('/index/home')">
        <img style="height: 40px;" :src="projectConfig.pc_logo" alt="">
      </div>
      <van-tabs
        :ellipsis="false"
        v-model="activeTab"
        line-height="2px"
        :border="false"
        :swipe-threshold="5"
        background="transparent"
        :color="lineColor"
        title-inactive-color="#e4e4e4"
        title-active-color="#fff"
        @click="handleTabClick"
        @disabled="toLogin"
      >
        <van-tab :name="tab.path"
                 :disabled="(!userInfo.userId && (tab.title === $t('fav') || tab.title === $t('m_bets')))"
                 v-for="tab of tabs" :key="tab.path">
          <template #title> {{tab.title}} </template>
        </van-tab>

      </van-tabs>

      <div class="flex-middle-only flex-end" style="width: 240px;flex-shrink: 0">
        <!--                <i class="el-icon-search white fs18" ></i>-->
        <van-icon name="search" color="#fff" size="20px" @click="toSearch"/>
        <LoginPc class="m-l20"/>
      </div>
    </header>
    <div class="flex-middle-only marquee-content" @click.stop="$router.push('/index/notice')">
      <div style="height:36px;padding-right:16px;" class="flex-middle">
        <i class="icon_base icon_notice_2"></i>
      </div>

      <marquee-notices class="lh-30 flex-1 fs12" :text="scrollNotices" :textColor="'#cecece'"/>
    </div>


    <div class="flex">
      <LeftPcNav v-if="showLeftNav !== false" class="scroll-y hide-scroll-bar left-nav"
                 :style="{height: scrollHeight + 'px'}"/>
      <router-view class="scroll-y hide-scroll-bar flex-1" :style="{height: scrollHeight + 'px'}"></router-view>
    </div>


    <FootBetControllerPcTmp2 v-if="showFootBet"/>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from "vuex"
  import MarqueeNotices from "../../../common/Marquee";
  import FootBetControllerPcTmp2 from "../../../components/FootBetControllerPcTmp2";
  import LoginPc from "../../../components/LoginPc";
  import LeftPcNav from "../../../components/LeftPcNav";
  import TopNavPc from "../../../components/TopNavPc";

  import {getScrollNotices} from "../../../axios/sport";

  import Event from "../../../event"

  export default {
    data() {
      return {
        showFootBet: false,
        showLeftNav: false,
        scrollNotices: 'null',
        scrollHeight: 900,
        activeTab: '',
        lineColor: '#126E51', // 显示: #fac200 隐藏: #126E51
        loading: false,
      }
    },

    computed: {
      ...mapGetters(['userInfo', 'homeGames', 'projectConfig']),
      tabs() {
        return [
          {title: this.$t('tytz'), path: '/index/sport'},
          {title: this.$t('ground'), path: '/index/bet-grounder'},
          {title: this.$t('fav'), path: '/index/my-favorite'},
          {title: this.$t('m_bets'), path: '/index/my-bet'},
          {title: this.$t('result'), path: '/index/result'},
        ]
      }
    },

    watch: {
      $route(route) {
        const routeMeta = route.meta
        // 根据路由 meta 判断是否显示底部注单
        this.showFootBet = routeMeta.showFootBet
        this.showLeftNav = routeMeta.showLeftNav
        this.toggleLineColor()
      }
    },

    methods: {
      ...mapMutations({
        updateUserInfo: 'UPDATE_USER_INFO',
      }),

      toSearch() {
        this.search = true
        this.$router.push('/index/search')
      },

      toggleLineColor() {
        let path = this.$route.path

        let isTabPath = this.tabs.find(tab => tab.path.indexOf(path) > -1)

        this.activeTab = isTabPath && isTabPath.path

        this.lineColor = isTabPath ? '#fac200' : '#126E51'
      },

      toLogin() {
        Event.$emit('show-login')
      },

      handleTabClick(path) {
        let query = this.$route.query
        this.$router.push({path, query})
      },

      _getScrollNotices() {
        getScrollNotices({client: 'pc'})
          .then(res => {

            if (res.code === 200) {
              this.scrollNotices = ''

              res.data.forEach(notice => {
                this.scrollNotices += notice.content + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
              })
            }
          })
      },

      // 计算滚动高度
      computedScrollHeight(height = 0) {
        this.scrollHeight = window.innerHeight - 136 - height
      }
    },
    components: {
      MarqueeNotices,
      FootBetControllerPcTmp2,
      LoginPc,
      LeftPcNav,
      TopNavPc
    },
    mounted() {
      this._getScrollNotices()

      const routeMeta = this.$route.meta
      // 根据路由 meta 判断是否显示底部注单
      this.showFootBet = routeMeta.showFootBet
      this.showLeftNav = routeMeta.showLeftNav

      this.computedScrollHeight()

      window.addEventListener('resize', () => {
        this.computedScrollHeight()
      })
      this.toggleLineColor()

      Event.$on('search-select', text => {
        this.searchText = text
      })
    },

    created() {
      this.timer = null
    }
  }
</script>
<style type="text/css" lang="less">
  @import "../../../assets/css/index.less";
  .index-pc-tmp2 {
    min-width: 990px;
    background-color: #494949;

    .marquee-content {
      padding: 0 36px;
      height: 36px;
      background-color: #333;
    }

    .search-box-tmp2 {
      input {
        color: #fff;
        width: 500px;

        &::placeholder {
          color: #00E099;
          font-size: 12px;
        }
      }
    }

    > header {
      height: 60px;
      background: #126E51;
      padding: 0 36px;
    }

    > footer {
      background-color: #444444;
      box-shadow: inset 0 1px 0 0 #137A5A;
      height: 115px;
    }

    .van-tabs__line {
      bottom: 7px;
    }

    .van-tabs__wrap {
      overflow: visible !important;
    }

    .user-drop-item {
      padding: 0 16px;
      border-bottom: 1px solid #cecece;
    }

    .deposit-btn {
      /*width: 2.2rem;*/
      height: 1.7rem;
      padding: 0 5px;
      border: 1px solid #126E51;
      color: #126E51;
      background: #E4E4E4;
      border-radius: 2px;
    }

    .turn {
      animation: turn 1s linear infinite;
    }

    @keyframes turn {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }


    .left-nav {
      width: 215px;
      background-color: #383838;
      flex-shrink: 0;
    }
  }
</style>
