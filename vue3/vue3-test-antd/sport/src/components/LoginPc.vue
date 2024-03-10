<template>
  <div class="pc-login flex-middle-only">

    <div v-if="userInfo.userId" class="flex-middle-only">
      <div class="fs12 flex-column flex-between" style="color:#e4e4e4;margin: 0 8px 0 16px;"
           @click="showUserInfo = true">
        <p class="right full-width">{{ userInfo.username }}</p>
        <p class="right full-width">{{$utils.toCurrency(projectConfig.currency).siteCurrency}} {{ showMoney ? (userInfo.balance || '0.00') : '******' }}</p>
      </div>
      <img style="width: 32px;" @click="showUserInfo = true"
           :src="require('../assets/images/tmp2/avatar.svg')" alt="">
    </div>

    <div v-if="!userInfo.userId" class="flex-middle-only">
      <span class="white" style="margin: 0 16px 0 58px;" @click="showRegister = true">{{ $t('join') }}</span>
      <van-button style="height:26px;width:46px;padding: 0;" color="#FFDF1B" @click="_showLogin">
        <span style="color:#333;">{{ $t('login') }}</span>
      </van-button>
    </div>

    <van-overlay :show="showLogin" @click="showLogin = false" :custom-style="{background: `rgba(0,0,0,.1)`}">
      <div class="ab-middle-x overlay-login-box hide-scroll-bar" @click.stop
           style="top: 105px;">
        <!--防止浏览器自动填充-->
        <input type="password" style="position: fixed;z-index: 0;top:-99999px;width:0;height:0;">
        <input type="text" v-model="loginParams.username" class="login-input" :placeholder="$t('user')">
        <input type="password" v-model="loginParams.password" class="login-input" :placeholder="$t('pwd')">

        <div @click.stop v-if="projectConfig.login_vcode === 2 || login_vcode === 3" id="__nc"
             style="width:98%; height: 40px;" class="m-t20 m-b20">
          <div id="nc"></div>
        </div>

        <div class="m-t20">
          <van-checkbox checked-color="#126E51" v-model="keepLogin" @change="_keepLogin" shape="square">
            {{ $t('keepLogin') }}
          </van-checkbox>
        </div>

        <van-button style="margin: 1rem 0 0.5rem 0;" block color="#126E51" @click="_login">{{ $t('login') }}
        </van-button>
      </div>
    </van-overlay>

    <van-overlay :show="showRegister" @click="showRegister = false" :custom-style="{background: `rgba(0,0,0,.1)`}">
      <div class="ab-middle-x" @click.stop
           style="top: 105px;">
        <!--防止浏览器自动填充-->
        <input type="password" style="position: fixed;z-index: 0;top:-99999px;width:0;height:0;">

        <Register style="width:436px;"
                  :header="false"
                  :scroll-height="scrollHeight"
                  :is-comment="true"
                  @register-success="showRegister = false"/>
      </div>
    </van-overlay>

    <van-overlay :show="showUserInfo" @click="showUserInfo = false" :custom-style="{background: `rgba(0,0,0,.1)`}">
      <div class="ab" style="background: #e4e4e4;right:36px;left:auto;top: 105px;width:360px;" @click.stop>
        <div class="flex-between" style="padding: 16px;border-bottom: 1px solid #cecece;">
          <div style="color: #666;">
            <p class="fs12">{{ userInfo.username }}</p>
            <div class="flex-middle-only m-t4">
              <span class="fs18 flex-middle-only">{{$utils.toCurrency(projectConfig.currency).siteCurrency}} {{ showMoney ? userInfo.balance : '******' }} {{showMoney}}</span>
              <van-icon :name="showMoney ? 'closed-eye':'eye-o'" size="20px" style="margin: 0 24px 0 32px;"
                        @click="toggleMoney"/>
              <van-icon name="replay" size="16px" :class="isRefreshing && 'turn'" @click="refreshMoney"/>
            </div>
          </div>
          <!--                    <van-button class="deposit-btn" @click="handleTabClick('/index/user?type=deposit')">存款</van-button>-->
          <van-button class="deposit-btn" @click="jumpOtherPage(1)">{{ $t('cash') }}</van-button>
        </div>
        <!--                <p class="user-drop-item lh-45" @click="handleTabClick('/index/user?type=account')">账户管理</p>-->
        <!--                <p class="user-drop-item lh-45" @click="handleTabClick('/index/user?type=funds')">资金管理</p>-->
        <p class="user-drop-item lh-45" @click="jumpOtherPage(2)">{{ $t('trans') }}</p>
        <p class="user-drop-item lh-45" @click="jumpOtherPage(3)">{{ $t('realBet') }}</p>
        <p class="user-drop-item lh-45" @click="handleTabClick('/index/my-favorite')">{{ $t('fav') }}</p>
        <p class="user-drop-item lh-45" @click="toAgent('/index/my-favorite')">{{ $t('d_l') }}</p>
        <p class="user-drop-item lh-45" @click="_exitLogin">{{ $t('exit') }}</p>
      </div>
    </van-overlay>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>

    <van-overlay :show="showDeposit" :custom-style="{backgroundColor: `rgba(0,0,0,.9)`}" @click="showDeposit = false">
      <iframe id="iframe" class="ab-middle" frameborder="2" scrolling="no"
              :src="src"
              :width="iframeStyle.width" :height="iframeStyle.height">
      </iframe>

      <van-icon class="ab"
                :style="{left: iframeStyle.iconLeft, top: iframeStyle.iconTop}"
                name="cross" size="30px" color="#ddd"></van-icon>
      <van-loading v-if="onload" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex"
import Register from "../views/h5/tmp2/Register";
import {exitLogin, getUserBalance, userLogin} from "../axios/user";
import Event from "../event";
import {md5} from "../axios/crypto_params";

export default {
  data() {
    return {
      showUserInfo: false,
      showRegister: false,
      showLogin: false,
      loginParams: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        pwdtext: "",
        vcode: "",
        nc_csessionid: "",
        nc_token: "",
        nc_sig: "",
        nc_value: ""
      },
      keepLogin: localStorage.getItem('keep-login') === '1',
      isRefreshing: false,
      showMoney: sessionStorage.getItem('money') === '1',
      loading: false,
      showDeposit: false,
      onload: false,
      loginNc: null,
      login_vcode: '',
      src: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'projectConfig'])
  },

  methods: {
    ...mapMutations({
      updateUserInfo: 'UPDATE_USER_INFO',
    }),

    toSearch() {
      this.$router.push('/index/search')
    },

    _keepLogin(v) {
      console.log(v)
      let vlaue = v === true ? '1' : '0'
      localStorage.setItem('keep-login', vlaue)
    },

    toAgent() {
      this.showUserInfo = false;
      const origin = window.location.origin;
      window.open(`${origin}/agent.php`, '_blank')
      console.log('to agent')
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

    _login() {
      if (!this.loginParams.username || !this.loginParams.password) {
        this.$toast(this.$t('e_tip'))
        return;
      }
      this.loading = true

      const params = {
        ...this.loginParams,
        password: md5(this.loginParams.password)
      }

      console.log('params====>', params)

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

              this.updateUserInfo(res.user)
              // 通知登录成功
              Event.$emit('login', true);
              // 刷新金额
              getUserBalance()
                  .then(res => {
                    if (!Number.isNaN(Number.parseFloat(res))) {
                      this.updateUserInfo({balance: res})
                    }
                  })

              this.showLogin = false
            } else if (res.code === 3) {
              this.$toast(res.msg)
              this.login_vcode = res.code

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

    handleTabClick(path) {
      this.showUserInfo = false
      this.$router.push(path)
    },

    jumpOtherPage(type) {
      this.showUserInfo = false
      this.showDeposit = true
      this.onload = true
      const host = window.location.origin
      let iframe = document.getElementById("iframe");

      /**
       PC额度转换 /index3.php?realtrans=1
       PC其他游戏记录 /index3.php?realBetList=1
       * */
      if (type === 1) { //
        this.src = `${host}/index3.php?id=02&fromSport=1`
      } else if (type === 2) {
        // 额度转换
        this.src = `${host}/index3.php?realtrans=1`
      } else if (type === 3) {
        // 真人注单
        this.src = `${host}/index3.php?realBetList=1`
      }

      let iwindow = iframe.contentWindow;

      setTimeout(() => {
        this.onload = false
      }, 10000)
      iwindow.onload = () => {
        this.onload = false
        console.log('this.onload', this.onload)
      }
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
                this.updateUserInfo({balance: res});
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

    toggleMoney() {
      this.showMoney = !this.showMoney
      sessionStorage.setItem('money', this.showMoney ? '1' : '0')
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

  components: {
    Register
  },

  mounted() {
    this.$nextTick(() => {
      if (this.projectConfig.login_vcode === 2) {
        this.initAli()
      }
    })

    Event.$on('show-login', () => {
      this.showLogin = true
    })
  },

  created() {
    this.scrollHeight = window.innerHeight - 200

    this.iframeStyle = {
      width: window.innerWidth * 0.9 + 'px',
      height: window.innerHeight * 0.9 + 'px',
      iconTop: window.innerHeight * 0.05 + 'px',
      iconLeft: window.innerWidth * 0.95 + 10 + 'px'
    }
  }
}
</script>
<style type="text/css" lang="less">
.pc-login {
  cursor: pointer;

  .overlay-login-box {
    width: 436px;
    min-height: 270px;
    background: #e4e4e4;
    padding: 24px;
    box-sizing: border-box;

    .login-input {
      display: block;
      width: 352px;
      height: 46px;
      background: #f0f0f0;
      padding: 0 16px;
      border: 1px solid #C3C3C3;
      margin-bottom: 10px;
    }
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

  .van-checkbox__icon {
    background-color: #fff;
  }
}
</style>
