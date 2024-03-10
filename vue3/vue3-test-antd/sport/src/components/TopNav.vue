<template>
  <div class="top-nav">
    <div :style="{height: showTopNav ? '2.3rem' : 0}"
         style="background: #333;transition: height .1s;" class="flex-between over-hidden top-nav-box">
      <ul class="full-height flex-1 scroll-x flex">
        <li style="flex-shrink: 0;padding: 0 0.6rem;" class="flex-middle" @click="processing">
          <span :style="{color: navGame.id === -1 ? '#fff' : '#9c9c9c'}">{{ $t('underway') }}</span>
        </li>
        <li style="flex-shrink: 0;padding: 0 0.6rem;" class="flex-middle"
            v-for="nav of homeGames" :key="nav.id"
            @click="changeRealGame(nav)">
          <span :style="{color: navGame.id === nav.id ? '#fff' : '#9c9c9c'}">{{ nav.name }}</span>
        </li>
      </ul>

      <div style="width: 2rem;box-shadow: -1px 0 0 0 #505050;"
           class="flex-middle full-height"
           @click="toggleTopNav(false)"
      >
        <i class="van-icon van-icon-arrow-up" style="color: #9c9c9c;"></i>
      </div>
    </div>

    <div class="bg-green flex-between white" style="height:2.2rem;">
      <div style="width: 20vw;" class="flex-middle-only" v-if="tabsStatus === 1">
        <div v-show="swipeCellState === 'close'" @click.stop="toggleSwipeCell('open')">
          <i class="icon_base icon-menu-2" style="margin: 0 0.3rem 0 0.6rem;"></i>
          <span class="fs12">{{ $t('more') }}</span>
        </div>

        <div v-show="swipeCellState === 'open'" @click.stop="toggleSwipeCell('close')">
          <i class="icon_base icon-close-2" style="margin: 0 0.3rem 0 0.6rem;"></i>
          <span class="fs12">{{ $t('close') }}</span>
        </div>
      </div>

      <div class="flex-middle-only" style="width: 20vw;" v-if="tabsStatus === 2"
           @click="onChangeTab('/index/home')">
        <i class="icon_base icon_home" style="margin-left: 1.2rem;"></i>
      </div>

      <van-tabs v-if="tabsStatus === 1"
                v-model="activeTab"
                class="flex-1 bg-green"
                color="#FFDF1B"
                :border="false"
                line-height="0"
                @click="onChangeTab"
                title-active-color="#fff"
                title-inactive-color="#fff"
                background="transparent">
        <van-tab v-for="tab of homeTabs" :name="tab.name" :key="tab.name">
          <template #title>
            <span v-if="tab.title">{{ $t(tab.title) }}</span>
            <img style="height:2rem;max-width:3rem;" v-else :src="projectConfig.mLogo" alt="">
          </template>
        </van-tab>
      </van-tabs>

      <div v-if="tabsStatus === 2" class="flex-1 bg-green flex-middle" @click="toggleTopNav(1)">
        <img style="height:2rem;max-width:3rem;" :src="projectConfig.mLogo" alt="">
      </div>

      <!--已登录-->
      <div style="width: 20vw;" class="center" @click="showUserInfo = true">
        <i class="icon_base icon-avatar"></i>
        <span class="block fs12 m-t4">{{projectConfig.siteCurrency}} {{ showMoney ? userInfo.balance : '******' }}</span>
      </div>

      <!--未登录-->
      <div v-if="!userInfo.userId" class="ab login-box flex-middle" style="padding-left: 1rem;">
        <span class="flex-1 center" @click="$router.push('/register')">{{ $t('join') }}</span>
        <span class="flex-1 center" @click="_showLogin">{{ $t('login') }}</span>
      </div>
    </div>

    <van-overlay :show="showUserInfo" @click="showUserInfo = false" :custom-style="{background: `rgba(0,0,0,.1)`}">
      <div class="ab" style="background: #e4e4e4;right:0;left:auto;"
           :style="{width: innerWidth - 16 +'px', top: showTopNav ? '4.5rem':'2.2rem'}" @click.stop>
        <div class="flex-between" style="padding: 16px;border-bottom: 1px solid #cecece;">
          <div style="color: #666;">
            <p class="fs12">{{ userInfo.username }}</p>
            <div class="flex-middle-only m-t4">
              <span class="fs18 flex-middle-only">{{$utils.toCurrency(projectConfig.currency).siteCurrency}} {{ showMoney ? userInfo.balance : '******' }}</span>
              <van-icon :name="showMoney ?'closed-eye' :'eye-o'" size="20px" style="margin: 0 24px 0 32px;" @click="toggleMoney"/>
              <van-icon name="replay" size="16px" :class="isRefreshing && 'turn'" @click="refreshMoney"/>
            </div>
          </div>
          <van-button class="deposit-btn" @click="toDeposit">{{ $t('cash') }}</van-button>
        </div>
        <p class="user-drop-item lh-45" @click="$router.push('/realtrans')">{{ $t('trans') }}</p>
        <p class="user-drop-item lh-45" @click="$router.push('/real-history-bet')">{{ $t('realBet') }}</p>
        <p class="user-drop-item lh-45" @click="onChange(3)">{{ $t('fav') }}</p>
        <p class="user-drop-item lh-45" @click="toAgent">{{$t('d_l')}}</p>
        <p class="user-drop-item lh-45" @click="_exitLogin">{{ $t('exit') }}</p>
      </div>
    </van-overlay>
    <van-overlay :show="showLogin" @click="showLogin = false" :custom-style="{background: `rgba(0,0,0,.1)`}">
      <div class="ab-middle-x overlay-login-box" @click.stop :style="{top: showTopNav ? '4.5rem':'2.2rem'}">
        <!--防止浏览器自动填充-->
        <input type="password" style="position: fixed;z-index: 0;top:-99999px;width:0;height:0;">
        <input type="text" v-model="loginParams.username" class="login-input" :placeholder="$t('user')">
        <input type="password" v-model="loginParams.password" class="login-input" :placeholder="$t('pwd')">

        <div v-if="projectConfig.login_vcode === 2 || login_vcode === 3" id="__nc" style="width:98%; height: 40px;"
             class="m-t20 m-b20">
          <div id="nc"></div>
        </div>

        <div class="m-t20">
          <van-checkbox checked-color="#126E51" v-model="keepLogin"
                        @change="_keepLogin"
                        shape="square">{{ $t('keepLogin') }}
          </van-checkbox>
        </div>

        <van-button style="margin: 1rem 0 0.5rem 0;" block color="#126E51" @click="_login">{{ $t('login') }}
        </van-button>
        <!--                <span style="color: #126E51;">忘记密码?</span>-->
      </div>
    </van-overlay>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
import {exitLogin, getUserBalance, userLogin} from "../axios/user";
import Event from "../event";
import {md5} from "../axios/crypto_params";

const tabNames = [
  '/index/bet-grounder',
  '/index/home',
  '/index/my-bet'
]

export default {
  data() {
    return {
      tabsStatus: 1, // 1显示 默认顶部 tabs 2 显示真人 游戏tabs
      navGame: {id: -1},
      showTopNav: true,
      activeTab: '/index/home',
      showUserInfo: false,
      showLogin: false,
      showMoney: sessionStorage.getItem('money') === '1',
      isRefreshing: false,
      loginParams: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      },
      keepLogin: localStorage.getItem('keep-login') === '1',
      loading: false,
      login_vcode: '',
      loginNc: null
    }
  },

  props: {
    swipeCellState: {
      type: String,
      default: 'close'
    }
  },

  watch: {
    '$route'(route) {
      if (route.path.indexOf('/real-games') > -1) {
        this.tabsStatus = 2
      }

      if (tabNames.includes(route.path)) {
        this.activeTab = route.path
      } else {
        this.activeTab = tabNames[1]
      }
    },
  },

  computed: {
    ...mapGetters(['homeGames', 'userInfo', 'projectConfig'])
  },

  methods: {
    ...mapMutations({
      updateUserInfo: 'UPDATE_USER_INFO',
    }),

    _keepLogin(v) {
      console.log(v)
      let vlaue = v === true ? '1' : '0'
      localStorage.setItem('keep-login', vlaue)
    },

    _showLogin() {
      this.showLogin = true
      let keepLogin = localStorage.getItem('keep-login') === '1'
      if (!keepLogin) {
        this.loginParams = {}
      }

      if (this.loginNc) {
        this.loginNc.reset()
      }
    },

    toDeposit() {
      this.showUserInfo = false
      this.$router.push('/account')
    },

    toAgent() {
      this.showUserInfo = false;
      const origin = window.location.origin;
      window.open(`${origin}/agent.php`, '_blank')
      console.log('to agent')
    },

    backHome() {
      this.tabsStatus = 1
      this.$router.push('/index/home')
    },

    processing() {
      this.tabsStatus = 1
      this.navGame = {id: -1}
      this.$router.push('/index/home')
    },

    changeRealGame(game) {
      if (this.navGame.id === game.id) return;

      this.navGame = game
      this.tabsStatus = 2
      this.$router.push({path: '/real-games', query: {id: game.id}})
    },

    toggleTopNav(flag) {
      if (flag === 1) {
        this.showTopNav = !this.showTopNav
      } else {
        this.showTopNav = flag
      }

      this.$emit('toggle-top-nav', this.showTopNav)
    },

    onChangeTab(tabName) {
      this.tabsStatus = 1
      this.navGame = {id: -1}

      console.log(this.$route.path);

      switch (tabName) {
        case '/index/bet-grounder':
          let path = this.$route.path
          let query = this.$route.query

          // 如果当前页是滚球页
          this.$router.push(`/index/bet-grounder?sport=${query.sport || 1}`)

          break;
        case '/index/home':
          if (this.$route.path === '/index/home') {
            this.toggleTopNav(1)
          }

          this.$router.push('/index/home')
          break;
        case '/index/my-bet':
          this.showUserInfo = false
          this.$router.push('/index/my-bet')
          break;
      }
    },

    onChange(tabId) {
      // console.log('tabName', tabId)
      switch (tabId) {
        case 1:
          break;
        case 2:
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

    toggleSwipeCell(state) {
      this.$emit('toggle-swipe-cell', state)
    },

    toggleMoney() {
      this.showMoney = !this.showMoney
      sessionStorage.setItem('money', this.showMoney ? '1' : '0')
    },

    // 刷新金额
    refreshMoney() {
      this.isRefreshing = true

      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        // 刷新金额
        getUserBalance()
            .then(res => {
              this.isRefreshing = false
              if (!Number.isNaN(Number.parseFloat(res))) {
                this.updateUserInfo({balance: res})
              }
            })
            .catch(err => this.isRefreshing = false)
      }, 500)
    },

    _exitLogin() {
      this.loading = true
      exitLogin()
          .then(res => {
            this.updateUserInfo({})
            this.showUserInfo = false
            this.loading = false
          })
          .catch(err => this.loading = false)
    },

    _login() {
      if (!this.loginParams.username || !this.loginParams.password) {
        this.$toast('用户名或密码不能为空!')
        return;
      }
      this.loading = true

      const params = {
        ...this.loginParams,
        password: md5(this.loginParams.password)
      }
      userLogin(params)
          .then(res => {
            this.loading = false
            if (res.code === 0) {
              if (this.keepLogin) {
                localStorage.setItem('username', this.loginParams.username)
                localStorage.setItem('password', this.loginParams.password)
              } else {
                localStorage.removeItem('username')
                localStorage.removeItem('password')
              }

              this.updateUserInfo(res.user);
              this.showLogin = false;

              // 刷新金额
              getUserBalance()
                  .then(res => {
                    if (!Number.isNaN(Number.parseFloat(res))) {
                      this.updateUserInfo({balance: res})
                    }
                  })
            } else if (res.code === 3) {
              this.login_vcode = res.code;
              this.$toast(res.msg)

              setTimeout(() => {
                this.initAli()
              }, 100)

            } else {
              if (this.loginNc) {
                this.loginNc.reset()
              }
              this.$toast(res.msg)
            }
          })
          .catch(err => this.loading = false)
    },

    initAli() {
      let _this = this;
      const nc_token = ["FFFF0000000001824B6C", (new Date()).getTime(), Math.random()].join(':');
      this.loginNc = NoCaptcha.init({
        renderTo: '#nc',
        appkey: 'FFFF0000000001824B6C',
        scene: 'nc_register_h5',
        token: nc_token,
        trans: {"key1": "code200"},
        elementID: ["usernameID"],
        is_Opt: 0,
        language: "cn",
        timeout: 10000,
        retryTimes: 5,
        errorTimes: 5,
        inline: false,
        apimap: {},
        bannerHidden: false,
        initHidden: false,
        callback: function (data) {
          _this.loginParams.nc_csessionid = data.csessionid
          _this.loginParams.nc_token = nc_token
          _this.loginParams.nc_sig = data.sig
        },
        error: function (s) {
        }
      });
      NoCaptcha.setEnabled(true);
      this.loginNc.reset();//请务必确保这里调用一次reset()方法
      console.log(11111)
      NoCaptcha.upLang('cn', {
        'LOADING': this.$t('l_d'),//加载
        'SLIDER_LABEL': this.$t('p_1'),//等待滑动
        'CHECK_Y': this.$t('p_2'),//通过
        'ERROR_TITLE': this.$t('p_3'),//拦截
        'CHECK_N': this.$t('p_4'), //准备唤醒二次验证
        'OVERLAY_INFORM': this.$t('p_5'),//二次验证
        'TIPS_TITLE': this.$t('p_6')//验证码输错时的提示
      });
    },
  },

  mounted() {
    const {path, query} = this.$route

    if (path.indexOf('/real-games') > -1) {
      this.tabsStatus = 2
      this.navGame = {id: query.id}
    } else {
      this.tabsStatus = 1
    }

    if (tabNames.includes(path)) {
      this.activeTab = path
    }

    if (this.projectConfig.login_vcode === 2) {
      this.initAli()
    }

    Event.$on('show-login', () => {
      this.showLogin = true
    })

    Event.$on('toggle-nav-type', state => {
      this.tabsStatus = state
    })
  },

  created() {
    this.innerWidth = window.innerWidth
    this.ug_logo = require('../assets/images/tmp2/logo.svg')
    this.homeTabs = [
      {name: '/index/bet-grounder', title: 'ground'},
      {name: '/index/home', icon: this.projectConfig.mLogo},
      {name: '/index/my-bet', title: 'm_bets'}
    ]
  }
}
</script>
<style type="text/css" lang="less">
.top-nav {
  .icon_home {
    width: 1.1rem;
    height: 0.9rem;
    background-image: url("../assets/images/tmp2/home.svg");
  }

  .user-drop-item {
    padding: 0 16px;
    border-bottom: 1px solid #cecece;
  }

  .deposit-btn {
    /*width: 2.2rem;*/
    height: 1.7rem;
    padding: 0 0.25rem;
    border: 1px solid #126E51;
    color: #126E51;
    background: #E4E4E4;
    border-radius: 2px;
  }

  .login-box {
    height: 2rem;
    width: 40vw;
    right: 0;
    background: #126E51;
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

  .overlay-login-box {
    width: 15.5rem;
    min-height: 11rem;
    background: #e4e4e4;
    padding: 1rem;
    box-sizing: border-box;

    .login-input {
      display: block;
      width: 11.7rem;
      height: 2.3rem;
      background: #f0f0f0;
      padding: 0 0.8rem;
      border: 1px solid #C3C3C3;
      margin-bottom: 0.5rem;
    }
  }

  .top-nav-box {
    .van-tab {
      padding: 0 0.6rem;
    }
  }

  .van-checkbox__icon {
    background-color: #fff;
  }
}
</style>
