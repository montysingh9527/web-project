<template>
  <div class="login">
    <header class="flex-middle-only h-46 re">
        <div class="ab-middle-y" style="left: 0.8rem;" @click="$router.back()">
          <img class="w-20" src="../../../assets/images/tmp3/bet/back.png" alt="">
        </div>
        <div class="ab-middle-y" style="right: 0.8rem;" @click="toKefu">
          <i class="icon_base icon-kefu-white"></i>
        </div>
    </header>
    <div class="logo center">
      <img :src="projectConfig.mLogo" alt="">
    </div>
    <div class="reg_login_btn">
      <van-button color="linear-gradient(to bottom, #F2AB06, #B78008)" round class="lh-40" @click="loginShow = true">{{$t('login')}}</van-button>
      <van-button color="#7B5605" plain round class="lh-40 reg_btn m-t20" @click="regShow = true">{{$t('regs')}}</van-button>
    </div>
    <!-- 登录弹框 -->
    <van-overlay :show="loginShow">
      <div class="login_div bg-white radius4 ab-middle">
        <div class="login_title re fs16 center gray reguler">
          {{$t('hy_hl')}}
          <img class="w-16 ab" src="../../../assets/images/tmp3/bet/close.png" alt="" @click="loginShow = false">
        </div>
        <div class="login_input p-l16 p-r16 m-t12 p-b16">
          <!-- 账号 -->
          <div class="input_box">
            <p class="fs14 gray reguler">{{$t('z_h')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input type="text" v-model="loginParams.username" :placeholder="$t('sr_zh')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
            <p v-if="userNameComputed" class="fs10 red">{{$t('z_h_g_s_c_w')}}</p>
          </div>
          <!-- 密码 -->
          <div class="input_box">
            <p class="fs14 gray reguler">{{$t('pwd')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="loginParams.password" :type="loginPsw ? 'text':'password'" :placeholder="$t('sr_mm')" class="fs14 gray reguler full-width full-height">
              </div>
              <div class="h-38 w-38 flex-middle" @click="loginPsw = !loginPsw">
                <img class="w-20" :src="require(`../../../assets/images/tmp3/my/${loginPsw ? 'eye_yes' : 'eye_no'}.png`)" alt="">
              </div>
            </div>
            <p v-if="psdComputed" class="fs10 red">{{$t('p_tip2')}}</p>
          </div>
          <!-- 验证码 -->
<!--          <div class="input_box">-->
<!--            <p class="fs14 gray reguler">{{$t('y_z_m')}}</p>-->
<!--            <div class="flex h-40 bg-input radius4 m-t4">-->
<!--              <div class="h-38 w-38 flex-middle">-->
<!--                <img class="w-14" src="../../../assets/images/tmp3/login/code.png" alt="">-->
<!--              </div>-->
<!--              <div class="flex-1 flex-items">-->
<!--                <input v-model="code" type="password" :placeholder="$t('sr_yzm')" class="fs14 gray reguler full-width full-height">-->
<!--              </div>-->
<!--              <div class="yzm bg-white p-l8">-->
<!--                <img class="radius4" src="../../../assets/images/tmp3/login/login_bg.png" alt="">-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div @click.stop v-if="projectConfig.login_vcode === 2 || login_vcode === 3" id="__nc"
               style="width:98%; height: 2rem;" class="m-t20 m-b20">
            <div id="nc"></div>
          </div>
          <!-- 忘记密码 -->
<!--          <div class="fs14 forgetc right"><span>{{$t('w_j_m_m')}}</span></div>-->
          <div class="h-37 m-t20" :class="{is_opacity: !isLoginSubmit}">
            <van-button color="linear-gradient(to bottom, #F2AC0A, #B68108)" block class="h-37" @click="_login">{{$t('login')}}</van-button>
          </div>
        </div>
      </div>
    </van-overlay>

    <!-- 注册弹框 -->
    <van-overlay :show="regShow" :lock-scroll="false">
      <div class="reg_div bg-white radius4 ab-middle scroll-y">
        <div class="login_title re fs16 center gray reguler">
          {{$t('reg_zh')}}
          <img class="w-16 ab" src="../../../assets/images/tmp3/bet/close.png" alt="" @click="regShow = false">
        </div>
        <div class="login_input p-l16 p-r16 m-t12 p-b16">
          <!-- 推荐人 -->
          <div class="input_box" v-if="projectConfig && Number(projectConfig.hide_reco) > 0">
            <p class="fs14 gray reguler">
              <span class="required" v-if="String(projectConfig.hide_reco) === '2'">*</span>
              {{$t('t_j_r')}}
            </p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <van-field class="fs14 bg-input reguler full-width full-height" v-model="registerParams.recouser" :placeholder="$t('t_j_r')"/>
              </div>
            </div>
          </div>

          <!-- 邀请码 -->
          <div class="input_box" v-if="projectConfig && Number(projectConfig.reg_invite_code) > 0">
            <p class="fs14 gray reguler">
              <span class="required" v-if="String(projectConfig.reg_invite_code) === '2'">*</span>
              {{$t('y_q_m')}}
            </p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <van-field class="fs14 bg-input reguler full-width full-height" v-model="registerParams.invite_code" :placeholder="$t('t_j_r')"/>
            </div>
          </div>

          <!-- 账号 -->
          <div class="input_box">
            <p class="fs14 gray reguler">
              <span class="required">*</span>
              {{$t('z_h')}}
            </p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="registerParams.username" @blur="handleChangeUsername" type="text" :placeholder="$t('sr_zh')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
            <p v-if="vUsername" class="fs10 red">{{$t('z_h_g_s_c_w')}}</p>
          </div>

          <!-- 密码 -->
          <div class="input_box">
            <p class="fs14 gray reguler">
              <span class="required">*</span>
              {{$t('pwd')}}
            </p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="registerParams.passwordCheck"
                       :type="regPswShow ? 'text':'password'" :placeholder="$t('sr_mm')"
                       @blur="handleChangePwd1"
                       class="fs14 gray reguler full-width full-height">
              </div>
              <div class="h-38 w-38 flex-middle" @click="regPswShow = !regPswShow">
                <img class="w-20" :src="require(`../../../assets/images/tmp3/my/${regPswShow ? 'eye_yes' : 'eye_no'}.png`)" alt="">
              </div>
            </div>
            <p v-if="vPwd1" class="fs10 red">{{$t('p_tip2')}}</p>
          </div>
          <!-- 确认密码 -->
          <div class="input_box">
            <p class="fs14 gray reguler"><span class="required">*</span>{{$t('c_pwd')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="registerParams.passwordRpt"
                       :type="regConfirmPswShow ? 'text':'password'"
                       :placeholder="$t('zc_srmm')" class="fs14 gray reguler full-width full-height"
                       @blur="handleChangePwd2"
                >
              </div>
              <div class="h-38 w-38 flex-middle" @click="regConfirmPswShow = !regConfirmPswShow">
                <img class="w-20" :src="require(`../../../assets/images/tmp3/my/${regConfirmPswShow ? 'eye_yes' : 'eye_no'}.png`)" alt="">
              </div>
            </div>
            <p v-if="vPwd2" class="fs10 red">{{$t('c_pwd1')}}</p>
          </div>

          <!-- 真实姓名 -->
          <div class="input_box" v-if="Number(projectConfig.reg_name) > 0">
            <p class="fs14 gray reguler">{{$t('r_n')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="registerParams.fullName" type="text" :placeholder="$t('sr_zsxm')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!--提款密码 -->
          <div class="input_box" v-if="Number(projectConfig.reg_fundpwd) > 0">
            <p class="fs14 gray reguler">{{$t('w_p1')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="registerParams.fundPwd" :type="regConfirmPswShow ? 'text':'password'" :placeholder="$t('w_p1')" class="fs14 gray reguler full-width full-height">
              </div>
              <div class="h-38 w-38 flex-middle" @click="regConfirmPswShow = !regConfirmPswShow">
                <img class="w-20" :src="require(`../../../assets/images/tmp3/my/${regConfirmPswShow ? 'eye_yes' : 'eye_no'}.png`)" alt="">
              </div>
            </div>
          </div>

          <!--电话号码-->
          <div class="input_box" v-if="Number(projectConfig.reg_phone) > 0">
            <p class="fs14 gray reguler">{{$t('phone')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="flex-1 flex-items">
                <input v-model="registerParams.phone" type="text" :placeholder="$t('phone')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!--qq-->
          <div class="input_box" v-if="Number(projectConfig.reg_qq) > 0">
            <p class="fs14 gray reguler">{{$t('qq')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="flex-1 flex-items">
                <input v-model="registerParams.qq" type="text" :placeholder="$t('qq')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!--zalo号码-->
          <div class="input_box" v-if="Number(projectConfig.reg_zalo) > 0">
            <p class="fs14 gray reguler">{{$t('z_a_h')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="flex-1 flex-items">
                <input v-model="registerParams.zalo" type="text" :placeholder="$t('z_a_h')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!--微信号码-->
          <div class="input_box" v-if="Number(projectConfig.reg_wx) > 0">
            <p class="fs14 gray reguler">{{$t('wx')}}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="flex-1 flex-items">
                <input v-model="registerParams.wx" type="text" :placeholder="$t('wx')" class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <div v-show="Number(projectConfig.reg_vcode) === 2" class="m-t20 m-b16">
            <div id="__nc" style="max-height: 100%; height: 2.2rem;">
              <div id="nc"></div>
            </div>
          </div>

          <div class="h-37">
            <van-button color="linear-gradient(to bottom, #F2AC0A, #B68108)"
                        block class="h-37"
                        @click.stop="_register"
                        :loading="loading"
                        :disabled="vPwd2 || vPwd1 || vUsername"
            >
              {{$t('regs')}}
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import {md5} from "../../../axios/crypto_params";
import {getAutoLogin, getUserBalance, register, userLogin} from "../../../axios/user";
import Event from "../../../event";
import Cookie from "js-cookie";

const userNameReg = /^[0-9]+[a-z]+$/; // 用户名正则表达式, 不是正式的

export default {
  mixins: [],
  data() {
    return {
      loginShow:false,
      regShow:false,
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

      keepLogin: true,
      loginNc: null,
      login_vcode: '',

      registerParams: {
        recouser: '', // 代理人ID
        invite_code: '',
        username: '', //
        passwordCheck: '',
        passwordRpt: '', // 确认密码
        fullName: '',
        fundPwd: '',
        phone: '',
        qq: '',
        wx: '',
        zalo: '',
        email: '',
        smscode: '',
      },

      vUsername: false,
      vPwd1: false,
      vPwd2: false,
      loading: false,

      regPswShow:false,
      loginPsw:false,
      regConfirmPswShow:false,
      regPsd: '',
      regPsd2: '',
      regRealName: '',
      code: ''
    }
  },

  computed: {
    ...mapState(['userInfo', 'projectConfig']),

    isLoginSubmit() {
      if (this.regUserName && this.regPsd && this.code) {
        return true
      }
      return false
    },
  },

  watch: {},

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
      updateUserInfo: 'UPDATE_USER_INFO',
    }),

    handleChangeUsername() {
      const usr = this.registerParams.username
      this.vUsername = !usr || !/^[a-zA-Z0-9]{6,15}$/g.test(usr)
      console.log('this.vUsername', this.vUsername)
      console.log('this.v1', this.vPwd1)
      console.log('this.v2', this.vPwd2)
    },

    handleChangePwd1() {
      const p1 = this.registerParams.passwordCheck;
      this.vPwd1 = !p1 || !/^[a-zA-Z0-9]{6,15}$/g.test(p1)
    },

    handleChangePwd2() {
      const p1 = this.registerParams.passwordCheck;
      const p2 = this.registerParams.passwordRpt;
      this.vPwd2 = !p2 || !/^[a-zA-Z0-9]{6,15}$/g.test(p2) || p1 !== p2
    },

    toKefu() {
      window.open(this.projectConfig.zxkfUrl, '_blank')
    },

    _login() {
      if (!this.loginParams.username || !this.loginParams.password) {
        this.$toast(this.$t('e_tip'));
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
              this.$router.push('/index');
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

    _register() {
      this.loading = true

      console.log('params====', this.registerParams);
      register(this.registerParams)
          .then(res => {
            this.loading = false
            if (this.nc) {
              this.nc.reset()
            }

            if (res.msg === "success") {
              const loginsessid = Cookie.get('loginsessid'), logintoken = Cookie.get('logintoken');

              this.registerParams = {}

              getAutoLogin({loginsessid, logintoken})
                  .then(res => {
                    if (res.code !== 0) {

                      // this.$toast(res.msg)
                      console.log('参数效验失败,请重新登录')
                      return false;
                    }

                    const _initdata = res.data

                    if (_initdata.enable) {
                      this.$toast(this.$t('reg_sus'))
                      this.updateUserInfo(_initdata)

                      //如果作为组件使用则 成功后emit 注册成功事件
                      if (this.isComment) {
                        this.$emit('register-success')
                      } else {
                        // 否则跳转回首页
                        this.$router.push('/')
                      }
                    } else {
                      console.log('登录失败')
                    }

                    this.loading = false
                  })
                  .catch(err => {
                    console.log(err)
                    this.loading = false
                  })
            } else {
              this.loading = false
              this.$toast(res.msg)
            }
          })
          .catch(err => this.loading = false)
    },

    initAli() {
      console.log('initAli 初始化')
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
          if (_this.regShow) {
            _this.registerParams.nc_csessionid = data.csessionid
            _this.registerParams.nc_token = nc_token
            _this.registerParams.nc_sig = data.sig
          } else {
            _this.loginParams.nc_csessionid = data.csessionid
            _this.loginParams.nc_token = nc_token
            _this.loginParams.nc_sig = data.sig
          }
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

  components: {},

  mounted() {
    if (this.projectConfig.reg_vcode == 2) {
      this.initAli()
    }
  }
}
</script>
<style type="text/css" lang="less">
@import "../../../assets/css/mobile";
.login {
  #__nc .bg-green {
    background-color: #f1cf80!important;
  }
  background: url('../../../assets/images/tmp3/login/login_bg.png') 100% 100% no-repeat;
  background-size: cover;
  .logo{
    margin-top:1.7rem;
    img{
      min-width:5.1rem;
      max-width: 80vw;
    }
  }
  .reg_login_btn{
    margin-top:15rem;
    text-align: center;
    button{
      width: 12.25rem;
    }
  }

  .input-bg {
    padding: 0;
    background-color: #4d5872;
  }

  .reg_btn{
    opacity: .8;
  }
  .van-overlay{
    background-color: rgba(0,0,0,.5);
  }
  .login_div{
    width: 17.25rem;
    height: 19.5rem;
    z-index: 6666;
  }
  .reg_div{
    width: 17.25rem;
    max-height: 80vh;
    z-index: 6666;
  }
  .login_title{
    height: 2.4rem;
    line-height: 2.4rem;
    >img{
      right: .8rem;
      top:.8rem;
    }
  }
  .input_box{
    height: 3.95rem;
  }
  .yzm{
    width: 4.15rem;
    img{
      width:3.75rem;
      height: 100%;
    }
  }
  .forgetc{
    >span{
      text-decoration: underline;
    }
    color: #4AB1FF;
  }
  .is_opacity{
    opacity: .5;
  }
  .required{
    color:#FF4D4E !important;
  }
}
</style>
