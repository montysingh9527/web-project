<template>
  <div class="login" style="padding-bottom: 20px">
    <div style="height: 40px;
            background-image: linear-gradient(180deg, #ECF2F8 0%, #FFFFFF 100%);
            border-radius: 10px;">
    </div>
    <div style="padding: 0 60px">
      <ul class="flex p-l20 p-r20 flex-between logintab">
        <li class="fs14 re cursor p-t4 p-b4 flex-middle center" style="height: 2rem;" :class="{active: isLogin}" @click="isLogin = true">
          {{ $t('login') }}
          <i class="ab-middle-x active_line" style="bottom: 2px"></i>
        </li>
        <li class="fs14 re cursor p-t4 p-b4 flex-middle center" style="height: 2rem;" :class="{active: !isLogin}" @click="isLogin = false">
          {{ $t('regs') }}
          <i class="ab-middle-x active_line" style="bottom: 0;width: 25px;"></i>
        </li>
      </ul>
    </div>

    <div class="login_div bg-white radius4" v-if="isLogin">
      <div class="login_input p-l16 p-r16 m-t12">
        <!-- 账号 -->
        <div class="input_box">
          <p class="fs14 gray reguler">{{ $t('z_h') }}</p>
          <div class="flex h-40 bg-input radius4 m-t4">
            <div class="h-38 w-38 flex-middle">
              <img class="w-14" src="../../assets/images/tmp3/login/user.png" alt="">
            </div>
            <div class="flex-1 flex-items">
              <input type="text" v-model="regUserName" :placeholder="$t('sr_zh')"
                     class="fs14 gray reguler full-width full-height">
            </div>
          </div>
          <p v-if="userNameComputed" class="fs10 red">{{ $t('z_h_g_s_c_w') }}</p>
        </div>
        <!-- 密码 -->
        <div class="input_box">
          <p class="fs14 gray reguler">{{ $t('pwd') }}</p>
          <div class="flex h-40 bg-input radius4 m-t4">
            <div class="h-38 w-38 flex-middle">
              <img class="w-14" src="../../assets/images/tmp3/login/psw.png" alt="">
            </div>
            <div class="flex-1 flex-items">
              <input v-model="regPsd" :type="loginPsw ? 'text':'password'" :placeholder="$t('sr_mm')"
                     class="fs14 gray reguler full-width full-height">
            </div>
            <div class="h-38 w-38 flex-middle" @click="loginPsw = !loginPsw">
              <img class="w-20" :src="require(`../../assets/images/tmp3/my/${loginPsw ? 'eye_yes' : 'eye_no'}.png`)"
                   alt="">
            </div>
          </div>
          <p v-if="psdComputed" class="fs10 red">{{ $t('p_tip2') }}</p>
        </div>
        <!-- 验证码 -->
        <div class="input_box" v-if="projectConfig.login_vcode == 2 || login_vcode == 3">
          <div @click.stop id="__login_nc" style="width:98%; height: 40px;margin-bottom: 20px;" class="m-t20 m-b20">
            <div id="login_nc"></div>
          </div>
        </div>
        <!-- 忘记密码 -->
<!--        <div class="fs14 forgetc right"><span>{{ $t('w_j_m_m') }}</span></div>-->
        <div class="h-37 m-t20" :class="{is_opacity: !isLoginSubmit}">
          <van-button color="linear-gradient(to bottom, #F2AC0A, #B68108)" block class="h-37" :loading="loading" @click="_login">{{ $t('login') }}
          </van-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="reg_div bg-white radius4">
        <div class="login_input p-l16 p-r16 m-t12 scroll-y hide-scroll-bar" style="max-height: 60vh;">
          <!-- 推荐人 -->
          <div class="input_box" v-if="projectConfig && Number(projectConfig.hide_reco) > 0">
            <p class="fs14 gray reguler"><span class="required" v-if="String(projectConfig.hide_reco) == '2'">*</span> {{ $t('t_j_r') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="formParams.recouser" type="text" :placeholder="$t('t_j_r')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- 邀请码 -->
          <div class="input_box" v-if="projectConfig && Number(projectConfig.reg_invite_code) > 0">
            <p class="fs14 gray reguler"><span class="required" v-if="String(projectConfig.reg_invite_code) == '2'">*</span> {{ $t('y_q_m') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="formParams.invite_code" type="text" :placeholder="$t('y_q_m')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- 账号 -->
          <div class="input_box">
            <p class="fs14 gray reguler"><span class="required">*</span> {{ $t('z_h') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="regUserName" type="text" :placeholder="$t('sr_zh')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
            <p v-if="userNameComputed" class="fs10 red">{{ $t('z_h_g_s_c_w') }}</p>
          </div>
          <!-- 密码 -->
          <div class="input_box">
            <p class="fs14 gray reguler"><span class="required">*</span>{{ $t('pwd') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="regPsd" :type="regPswShow ? 'text':'password'" :placeholder="$t('sr_mm')"
                       class="fs14 gray reguler full-width full-height">
              </div>
              <div class="h-38 w-38 flex-middle" @click="regPswShow = !regPswShow">
                <img class="w-20" :src="require(`../../assets/images/tmp3/my/${regPswShow ? 'eye_yes' : 'eye_no'}.png`)"
                     alt="">
              </div>
            </div>
            <p v-if="psdComputed" class="fs10 red">{{ $t('p_tip2') }}</p>
          </div>
          <!-- 确认密码 -->
          <div class="input_box">
            <p class="fs14 gray reguler"><span class="required">*</span>{{ $t('c_pwd') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="regPsd2" :type="regConfirmPswShow ? 'text':'password'" :placeholder="$t('zc_srmm')"
                       class="fs14 gray reguler full-width full-height">
              </div>
              <div class="h-38 w-38 flex-middle" @click="regConfirmPswShow = !regConfirmPswShow">
                <img class="w-20"
                     :src="require(`../../assets/images/tmp3/my/${regConfirmPswShow ? 'eye_yes' : 'eye_no'}.png`)"
                     alt="">
              </div>
            </div>
            <p v-if="psdComputed2.msg" class="fs10 red">{{ psdComputed2.msg }}</p>
          </div>

          <!-- 真实姓名 -->
          <div class="input_box" v-if="Number(projectConfig.reg_name) > 0">
            <p class="fs14 gray reguler"> {{ $t('r_n') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/user.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="regRealName" type="text" :placeholder="$t('r_p1')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
<!--            <p class="fs10 red">{{ $t('r_r1') }}</p>-->
          </div>

          <!-- 取款密码 -->
          <div class="input_box" v-if="Number(projectConfig.reg_fundpwd) > 0">
            <p class="fs14 gray reguler"> {{ $t('w_p1') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4">
              <div class="h-38 w-38 flex-middle">
                <img class="w-14" src="../../assets/images/tmp3/login/psw.png" alt="">
              </div>
              <div class="flex-1 flex-items">
                <input v-model="formParams.fundPwd" type="text" :placeholder="$t('b_p')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- 手机号 -->
          <div class="input_box" v-if="Number(projectConfig.reg_phone) > 0">
            <p class="fs14 gray reguler"> {{ $t('phone') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4 p-l8">
              <div class="flex-1 flex-items">
                <input v-model="formParams.phone" type="text" :placeholder="$t('phone')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- qq号 -->
          <div class="input_box" v-if="Number(projectConfig.reg_qq) > 0">
            <p class="fs14 gray reguler"> {{ $t('qq') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4 p-l8">
              <div class="flex-1 flex-items">
                <input v-model="formParams.qq" type="text" :placeholder="$t('qq')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- zalo号 -->
          <div class="input_box" v-if="Number(projectConfig.reg_zalo) > 0">
            <p class="fs14 gray reguler"> {{ $t('z_a_h') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4 p-l8">
              <div class="flex-1 flex-items">
                <input v-model="formParams.zalo" type="text" :placeholder="$t('z_a_h')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- 微信 -->
          <div class="input_box" v-if="Number(projectConfig.reg_wx) > 0">
            <p class="fs14 gray reguler"> {{ $t('wx') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4 p-l8">
              <div class="flex-1 flex-items">
                <input v-model="formParams.wx" type="text" :placeholder="$t('wx')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- 邮箱 -->
          <div class="input_box" v-if="Number(projectConfig.reg_email) > 0">
            <p class="fs14 gray reguler"> {{ $t('email') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4 p-l8">
              <div class="flex-1 flex-items">
                <input v-model="formParams.wx" type="text" :placeholder="$t('email')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <!-- 邮箱 -->
          <div class="input_box" v-if="Number(projectConfig.reg_email) > 0">
            <p class="fs14 gray reguler"> {{ $t('email') }}</p>
            <div class="flex h-40 bg-input radius4 m-t4 p-l8">
              <div class="flex-1 flex-items">
                <input v-model="formParams.wx" type="text" :placeholder="$t('email')"
                       class="fs14 gray reguler full-width full-height">
              </div>
            </div>
          </div>

          <div v-show="Number(projectConfig.reg_vcode) === 2" class="m-t20">
            <div id="__reg_nc" style="max-height: 100%; height: 45px;margin-bottom: 20px;">
              <div id="reg_nc" tyle="max-height: 100%; height: 45px;"></div>
            </div>
          </div>

          <div class="h-37" :class="{is_opacity: !isSubmit}">
            <van-button color="linear-gradient(to bottom, #F2AC0A, #B68108)" block class="h-37" :loading="loading" @click="_register">{{ $t('regs') }}
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import {md5} from "../../axios/crypto_params";
import {getAutoLogin, getUserBalance, register, userLogin} from "../../axios/user";
import Event from "../../event";
import Cookie from "js-cookie";

const userNameReg = /^[a-zA-Z0-9]{6,15}$/g;
const pwdReg = /^[a-zA-Z0-9]{6,15}$/g;

export default {
  mixins: [],
  data() {
    return {
      regPswShow: false,
      loginPsw: false,
      regConfirmPswShow: false,
      regUserName: '',
      regPsd: '',
      regPsd2: '',
      regRealName: '',
      code: '',
      isLogin: true,
      formParams: {
        recouser: '', // 代理人ID
        username: '', // 用户名
        passwordCheck: '', // 密码
        passwordRpt: '', // 确认密码
        wx: '',
        phone: '',
        fullName: '',
        invite_code: '', // 邀请码
        zalo: ''
      },
      login_vcode: '',
      loginParams: {
        username: '',
        password: '',
        pwdtext: "",
        vcode: "",
        nc_csessionid: "",
        nc_token: "",
        nc_sig: "",
        nc_value: ""
      },
      loading: false,
      loginNc: null
    }
  },

  watch: {
    isLogin() {
      setTimeout(() => {
        this.initAli()
      }, 200)
    }
  },

  computed: {
    ...mapState(['userInfo', 'projectConfig']),
    userNameComputed() {
      if (!this.regUserName) {
        console.log('regUserName', this.regUserName)
        return false
      } else {
        return !/^[a-zA-Z0-9]{6,15}$/g.test(this.regUserName.trim())
      }
    },
    psdComputed() {
      if (!this.regPsd) {
        return false
      }
      return!/^[a-zA-Z0-9]{6,15}$/g.test(this.regPsd)
    },
    psdComputed2() {
      if (!this.regPsd2) {
        return {
          status: false,
          msg: ''
        };
      }

      if (!userNameReg.test(this.regPsd2)) {
        return {
          status: false,
          msg: this.$t('p_tip2')
        };
      }

      if (this.regPsd2 != this.regPsd) {
        return {
          status: false,
          msg: this.$t('c_pwd1')
        };
      }

      return {
        status: true
      }
    },

    isSubmit() {
      if (this.regUserName && this.regPsd && this.regPsd2 && this.regRealName) {
        return !this.userNameComputed && !this.psdComputed && !this.psdComputed2.msg && !this.realNameComputed
      }
      return false
    },
    isLoginSubmit() {
      if (this.regUserName && this.regPsd && this.code) {
        return !this.userNameComputed && !this.psdComputed && !!this.code
      }
      return false
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
      updateUserInfo: 'UPDATE_USER_INFO',
    }),
    initAli() {
      let _this = this;
      const nc_token = ["FFFF0000000001824B6C", (new Date()).getTime(), Math.random()].join(':');
      console.log(111111)
      this.loginNc = window.NoCaptcha.init({
        renderTo: _this.isLogin ? '#login_nc' : '#reg_nc',
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
          if (_this.isLogin) {
            _this.loginParams.nc_csessionid = data.csessionid
            _this.loginParams.nc_token = nc_token
            _this.loginParams.nc_sig = data.sig
          } else {
            _this.formParams.nc_csessionid = data.csessionid
            _this.formParams.nc_token = nc_token
            _this.formParams.nc_sig = data.sig
          }
        },
        error: function (s) {
        }
      });
      NoCaptcha.setEnabled(true);
      this.loginNc.reset();//请务必确保这里调用一次reset()方法
      console.log(22222)
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

    _register() {
      if (!this.regUserName || !this.regPsd) {
        this.$toast(this.$t('e_tip'))
        return false;
      }
      this.loading = true
      const params = {
        ...this.formParams,
        username: this.regUserName,
        passwordCheck: this.regPsd,
        passwordRpt: this.regPsd2,
        fullName: this.regRealName
      }

      console.log('params====', params);
      register(params)
          .then(res => {
            console.log('res--->', res)
            if (this.nc) {
              this.nc.reset()
            }

            if (res.msg === "success") {
              const loginsessid = Cookie.get('loginsessid'), logintoken = Cookie.get('logintoken');

              this.formParams = {}

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

    _login() {
      if (!this.regUserName || !this.regPsd) {
        this.$toast(this.$t('e_tip'))
        return;
      }
      this.loading = true
      this.loginParams.username = this.regUserName
      const params = {
        ...this.loginParams,
        password: md5(this.regPsd)
      }

      console.log('params====>', params)

      userLogin(params)
          .then(res => {
            this.loading = false
            if (res.code === 0) {
              this.showUserInfo = false
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
  },

  mounted() {
    if ((this.projectConfig.login_vcode == 2 && this.isLogin) || (this.projectConfig.reg_vcode == 2 && !this.isLogin)) {
      setTimeout(() => {
        this.initAli()
      }, 1000)
    }
  }
}
</script>
<style type="text/css" lang="less">
.login {
  //   background: url('../../assets/images/tmp3/login/login_bg.png') 100% 100% no-repeat;
  background-size: cover;

  .logo {
    margin-top: 34px;

    img {
      width: 102px
    }
  }

  #login_nc,#reg_nc {
    .bg-green {
      background-color: #7a5605!important;
    }
  }

  .logintab {
    li {
      i {
        display: none;
      }
    }

    .active {
      color: #7B5605;

      > i {
        display: block;
      }
    }
  }

  .reg_login_btn {
    margin-top: 300px;
    text-align: center;

    button {
      width: 245px;
    }
  }

  .reg_btn {
    opacity: .8;
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, .5);
  }

  .login_div {
    z-index: 6666;
  }

  .reg_div {
    z-index: 6666;
  }

  .login_title {
    height: 48px;
    line-height: 48px;

    > img {
      right: 16px;
      top: 16px;
    }
  }

  .input_box {
    height: 79px;
  }

  .yzm {
    width: 83px;

    img {
      width: 75px;
      height: 100%;
    }
  }

  .forgetc {
    > span {
      text-decoration: underline;
    }

    color: #4AB1FF;
  }

  .is_opacity {
    opacity: .5;
  }

  .required {
    color: #FF4D4E !important;
  }
}
</style>
