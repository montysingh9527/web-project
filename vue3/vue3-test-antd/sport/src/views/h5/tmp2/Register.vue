<template>
  <div class="register full-width">
    <header class="flex-between" v-if="header">
      <div style="width:20vw;color: #E4E4E4;padding-left: 0.8rem;">{{ $t('c_acc') }}</div>

      <div class="full-height flex-middle">
        <img style="max-height: 2.6rem;max-width:4rem;" :src="projectConfig.mLogo" alt="">
      </div>
      <div style="width:20vw;padding-right: 0.8rem;" class="right" @click="$router.push('/')">
        <van-icon name="cross" color="#26FFBE" size="18px"/>
      </div>
    </header>

    <div style="padding: 1rem 0;" class="scroll-y hide-scroll-bar" :style="{maxHeight: scrollHeight  + 'px'}">
      <van-form @submit="_register">
        <!--防止浏览器自动填充-->
        <input type="password" style="position: fixed;z-index: 0;top:-99999px;width:0;height:0;">
        <div class="pd-20" >
          <van-field class="input-border"
                     :border="false"
                     :label="$t('t_j_r')"
                     clickable
                     clearable
                     v-model="formParams.recouser"
                     :placeholder="String(projectConfig.hide_reco) === '1' ? $t('tjr_x') : $t('tjr_b')"
                     :rules="[{validator: validatoRecouser, message: $t('tjr_k')}]"
                     v-if="projectConfig && Number(projectConfig.hide_reco) > 0"
          />

          <van-field class="input-border"
                     :border="false"
                     :label="$t('y_q_m')"
                     clickable
                     clearable
                     v-model="formParams.invite_code"
                     :placeholder="String(projectConfig.reg_invite_code) === '1' ? $t('y_q_xt') : $t('y_q_bt')"
                     :rules="[{validator: valiInviteCode, message: $t('y_q_e')}]"
                     v-if="projectConfig && Number(projectConfig.reg_invite_code) > 0"
          />
        </div>

        <van-divider style="border-color: #ccc;margin: 24px 0;">
          <i class="icon_base create-login"></i>
          <span class="m-l5">{{ $t('c_l') }}</span>
        </van-divider>

        <div class="pd-20">
          <van-field class="m-b10 input-border input-alight"
                     right-icon="info-o"
                     v-model="formParams.username"
                     clearable
                     clickable
                     :label="$t('user')"
                     :placeholder="$t('rup')"
                     :border="false"
                     :rules="[{ required: true, message: $t('u_tip1')}, {pattern: /^[a-zA-Z0-9]{6,15}$/, message: $t('u_tip2')}]"
          />
          <van-field class="input-border input-alight"
                     v-model="formParams.passwordCheck"
                     :type="showPassword ?'text':'password'"
                     :label="$t('pwd')"
                     clearable
                     clickable
                     :placeholder="$t('rup')"
                     :border="false"
                     :rules="[{ required: true, message: $t('p_tip1')}, {pattern: /^[a-zA-Z0-9]{6,15}$/, message: $t('p_tip2')}]"
          >
            <van-icon slot="right-icon"
                      name="info-o"
                      size="16px"
                      v-show="!formParams.passwordCheck"
            />
            <van-icon v-show="formParams.passwordCheck"
                      slot="right-icon"
                      :name="showPassword ? 'closed-eye' : 'eye-o'"
                      size="16px"
                      @click="showPassword = !showPassword"
            />
          </van-field>
          <van-field v-model="formParams.passwordRpt"
                     style="border-top-width: 0;"
                     class="input-border input-alight"
                     :label="$t('c_pwd')"
                     clearable
                     clickable
                     :type="showRePassword ?'text':'password'"
                     :border="false"
                     :rules="[{validator: validatorPwd, message: $t('c_pwd1')}]"
          >
            <van-icon slot="right-icon"
                      name="info-o"
                      size="16px"
                      v-show="!formParams.passwordRpt"
            />
            <van-icon v-show="formParams.passwordRpt"
                      slot="right-icon"
                      :name="showRePassword ? 'closed-eye' : 'eye-o'"
                      size="16px"
                      @click="showRePassword = !showRePassword"
            />
          </van-field>


        </div>

        <van-divider style="border-color: #ccc;margin: 24px 0;"
                     v-if="showUserInfoReg"
        >
          <i class="icon_base user-info"></i>
          <span>{{ $t('u_i') }}</span>
        </van-divider>

        <div class="pd-20">
          <van-field v-if="Number(projectConfig.reg_name) > 0"
                     right-icon="info-o"
                     class="input-border input-alight"
                     v-model="formParams.fullName"
                     :label="$t('r_n')"
                     :placeholder="$t('r_p1')"
                     :border="false"
                     clickable
                     clearable
                     :rules="[{validator: validatorFullName, message: $t('r_r1')}]"
          />
          <van-field v-if="Number(projectConfig.reg_fundpwd) > 0"
                     right-icon="info-o"
                     class="input-border input-alight m-t8"
                     v-model="formParams.fundPwd"
                     type="number"
                     :label="$t('w_p1')"
                     :placeholder="$t('b_p')"
                     :border="false"
                     clickable
                     clearable
                     :rules="[{validator: validatorFundPwd, message: $t('w_p2')}]"
          />
          <van-field v-if="Number(projectConfig.reg_phone) > 0"
                     v-model="formParams.phone"
                     class="input-border input-alight"
                     style="margin-top: 10px;"
                     :border="false"
                     :rules="[{validator: validatorPhone, message: $t('p_p1')}]"
                     :label="$t('phone')"
                     clickable
                     clearable
          />
          <van-field v-if="Number(projectConfig.reg_qq) > 0"
                     v-model="formParams.qq"
                     style="margin-top: 10px;"
                     class="input-border input-alight"
                     :border="false"
                     type="number"
                     clickable
                     clearable
                     :rules="[{validator: validatorQq, message: $t('q_p1')}]"
                     :label="$t('qq')"/>

          <van-field v-if="Number(projectConfig.reg_zalo) > 0"
                     v-model="formParams.zalo"
                     style="margin-top: 10px;"
                     class="input-border input-alight"
                     :border="false"
                     type="number"
                     clickable
                     clearable
                     :rules="[{validator: validatorZalo, message: $t('z_a_p')}]"
                     :label="$t('z_a_h')"/>


          <van-field v-if="Number(projectConfig.reg_wx) > 0"
                     v-model="formParams.wx"
                     style="margin-top: 10px;"
                     class="input-border input-alight"
                     :border="false"
                     clickable
                     clearable
                     :label="$t('wx')" placeholder=""/>
          <van-field v-if="Number(projectConfig.reg_email) > 0"
                     v-model="formParams.email"
                     style="margin-top: 10px;"
                     class="input-border input-alight"
                     :border="false"
                     clickable
                     clearable
                     :rules="[{validator: validatorEmail, message: $t('email_p')}]"
                     :label="$t('email')" placeholder=""/>
          <van-field v-if="Number(projectConfig.smsVerify) > 0"
                     v-model="formParams.smscode"
                     style="margin-top: 10px;"
                     class="input-border"
                     :border="false"
                     clickable
                     clearable
                     type="number"
                     :rules="[{pattern: /^\d{6}$/, message: $t('sms_e1')}]" @click.stop
                     :label="$t('sms')" :placeholder="$t('sms_p1')">
            <template #button>
              <van-button class="fs12" size="small" v-if="!startCountDown" color="#126E51"
                          @click.stop.prevent="getSmsCode">{{ $t('send_sms') }}
              </van-button>
              <van-count-down ref="count-down" v-else format="ss"
                              :time="60 * 1000"
                              @finish="startCountDown = false"
                              :auto-start="false"/>
            </template>
          </van-field>
          <div v-show="Number(projectConfig.reg_vcode) === 2" class="m-t20">
            <div id="__nc" style="max-height: 100%; height: 45px;">
              <div id="nc"></div>
            </div>
          </div>
        </div>

        <div class="pd-20 m-t20">
          <van-button block color="#126E51" native-type="submit">{{ $t('regs') }}</van-button>
        </div>
      </van-form>
    </div>

    <van-overlay :show="loading"
                 :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}">
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </div>
</template>
<script>
import {getAutoLogin, register} from "../../../axios/user"
import Cookie from "js-cookie";
import {mapGetters, mapMutations} from "vuex"
import {md5} from "../../../axios/crypto_params";

export default {
  data() {
    return {
      form: {},
      formParams: {
        recouser: '', // 代理人ID
        username: '', //
        passwordCheck: '',
        passwordRpt: '', // 确认密码
        wx: '',
        phone: '',
        fullName: '',
        invite_code: '', // 邀请码
        zalo: ''
      },
      loading: false,
      startCountDown: false,
      nc: null,
      showPassword: false,
      showRePassword: false,
    }
  },

  computed: {
    ...mapGetters(['projectConfig']),
    showUserInfoReg() {
      const {reg_name, reg_fundpwd, reg_phone, reg_qq, reg_wx, reg_email} = this.projectConfig
      return reg_name > 0 || reg_fundpwd > 0 || reg_phone > 0 || reg_qq > 0 || reg_wx > 0 || reg_email > 0
    }
  },

  props: {
    header: {
      type: Boolean,
      default: true
    },

    // 是否作为组件使用
    isComment: {
      type: Boolean,
      default: false
    },

    scrollHeight: {
      type: Number,
      default: window.innerHeight - 44
    }
  },

  methods: {
    ...mapMutations({
      updateUserInfo: 'UPDATE_USER_INFO',
    }),

    getSmsCode() {
      if (!/^1\d{10}$/g.test(this.formParams.phone)) {
        this.$toast(this.$t('sms_p2'))
        return;
      }
      this.startCountDown = true
      setTimeout(() => {
        this.$refs['count-down'] && this.$refs['count-down'].start()
      }, 100)
    },

    _register(errorInfo) {
      console.log(errorInfo)
      if (errorInfo) {
        this.loading = true
        const params = {
          ...this.formParams,
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
      }
    },

    validatoRecouser(value) {
      const {hide_reco} = this.projectConfig

      if (!value && String(hide_reco) === '2') {
        return false
      } else {
        return true
      }
    },

    valiInviteCode(value) {
      const {reg_invite_code} = this.projectConfig

      if (!value && String(reg_invite_code) === '2') {
        return false
      } else {
        return true
      }
    },

    validatorEmail(value) {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/g

      if (this.projectConfig.reg_email === 2) {
        return reg.test(value)
      } else {
        if (!value) {
          return true
        } else {
          return reg.test(value)
        }
      }
    },

    validatorQq(value) {
      let reg = /^\d{6,14}$/g

      if (this.projectConfig.reg_qq === 2) {
        return reg.test(value)
      } else {
        if (!value) {
          return true
        } else {
          return reg.test(value)
        }
      }
    },

    validatorZalo(value) {
      let reg = /^\w{3,54}$/g

      if (this.projectConfig.reg_zalo === 2) {
        return reg.test(value)
      } else {
        if (!value) {
          return true
        } else {
          return reg.test(value)
        }
      }
    },

    validatorPhone(value) {
      const {reg_phone} = this.projectConfig
      // 1 选填 2必填
      if (!value && Number(reg_phone) === 1) {
        return true;
      } else {
        return /^\d{8,15}$/g.test(value)
      }
    },
    validatorFullName(value) {
      if (this.projectConfig.reg_name === 2) {
        return value.toString().length >= 2 && value.toString().length < 50
      } else {
        if (!value) {
          return true
        } else {
          return value.toString().length >= 2 && value.toString().length < 50
        }
      }
    },
    validatorPwd(value) {
      let reg = new RegExp(`^${this.formParams.passwordCheck}$`, 'g')

      return reg.test(value)
    },

    validatorFundPwd(value) {
      let reg = /^\d{4}$/g

      if (this.projectConfig.reg_fundpwd === 2) {
        return reg.test(value)
      } else {
        if (!value) {
          return true
        } else {
          return reg.test(value)
        }
      }
    },

    showSlideCode() {
      let nc_token = ["FFFF0000000001824B6C", (new Date()).getTime(), Math.random()].join(':');

      this.nc = window.NoCaptcha.init({
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
        apimap: {
          // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
          // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
        },
        bannerHidden: false,
        initHidden: false,
        callback: (data) => {
          this.formParams.nc_csessionid = data.csessionid;
          this.formParams.nc_token = nc_token;
          this.formParams.nc_sig = data.sig;
          this.formParams.nc_value = data.value;
        },
        error: function (s) {
        }
      });
      window.NoCaptcha.setEnabled(true);
      this.nc.reset();//请务必确保这里调用一次reset()方法
      window.NoCaptcha.upLang('cn', {
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
    this.showSlideCode()
  }
};
</script>
<style type="text/css" lang="less">
.register {
  background: #f1f1f1;

  header {
    height: 2.2rem;
    background: #126E51;
  }

  .pd-20 {
    padding: 0 1rem;
  }

  .create-login {
    background-image: url("../../../assets/images/tmp2/create-login.svg");
    width: 1.2rem;
    height: 1.1rem;
  }

  .user-info {
    background-image: url("../../../assets/images/tmp2/user-info.svg");
    width: 1.2rem;
    height: 1.1rem;
  }

  .tip {
    background-image: url("../../../assets/images/tmp2/tip.svg");
    width: 1.2rem;
    height: 1.1rem;
  }

  .m-b10 {
    margin-bottom: 0.5rem;
  }

  .input-border {
    border: 1px solid #D8D8D8;
  }

  .input-alight {
    input::placeholder {
      font-size: 0.6rem;
      font-weight: 400;
      text-align: right;
      color: #999;
    }
  }
}
</style>
