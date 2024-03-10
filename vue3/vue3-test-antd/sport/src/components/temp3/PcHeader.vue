<template>
  <header class="pcheader full-width bg-white flex-between">
    <div class="l flex-middle full-height">
      <router-link to="/">
        <img style="height: 44px" :src="projectConfig.pc_logo" alt="">
      </router-link>
      <div class="lang flex-middle re" v-if="allowChangeLang">
        <span>{{ currentLang.name }}</span>
        <i class="icon-pc-down" style="margin-left: 4px"></i>
        <div class="ab select-lang">
          <div class="content pchoverstyle">
            <ul>
              <li v-for="(item, index) in languages" :key="index" @click="onSelectLang(item)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="flex-middle game-list  full-height re">
        <!--                <li class="center full-height flex-middle active">{{$t('sport')}}</li>-->
        <li class="center full-height flex-middle re" v-for="(game, i) of homeGames" :key="i"
            @mouseenter="listMouseover(i)"
            @mouseleave="listMouseoout"
        >
          {{ game.name }}
        </li>
        <li class="center full-height flex-middle re" @click="$router.push('/index/result')">{{ $t('result') }}</li>
        <li class="center full-height flex-middle re" @click="$router.push('/index/activity')">{{ $t('h_d') }}</li>
        <li class="center full-height flex-middle re" @click="jumpToServe">{{ $t('k_f_f') }}</li>
        <li class="center full-height flex-middle re" @click="downloadApp">APP</li>
        <RealPerson
            v-show="ctrlHeaderContentStatus"
            :selectvalue="currentSelectHeadValue"
            @realmouseover="clearTimer"
            @realmouseout="realmouseout"/>
      </ul>
    </div>
    <div class="r flex-middle cursor" @click="showUserInfo = !showUserInfo">
      <div class="name right" v-if="userInfo.userId">
        <p>{{userInfo.username || userInfo.nickname || userInfo.fullName || '--'}}</p>
        <p>{{projectConfig.siteCurrency}} {{userInfo.balance}}</p>
      </div>
      <div class="name right" v-else>
        <p>{{ $t('login') }}/{{ $t('regs') }}</p>
      </div>
      <div class="flex-middle cursor re rightinfo" style="margin-left: 12px">
        <img style="width: 30px" src="../../assets/images/tmp3/pc/avator.png" alt="">
        <i class="icon-pc-down" style="margin-left: 8px"></i>

        <div style="position: fixed;left: 0;top: 0;bottom: 0;right: 0;z-index: 9;" v-if="showUserInfo"></div>
        <!-- 登录的用户信息弹框 -->
        <div class="ab userinfo" v-if="userInfo.userId && showUserInfo" @click.stop>
          <div class="content pchoverstyle">
            <div style="padding: 14px 0">
              <div class="flex-between" style="padding: 0 17px">
                <span style="font-size: 12px;color: #4D5872;">{{ $t('blance') }}</span>
                <img style="width: 16px" src="../../assets/images/tmp3/pc/show-psd.png" alt="" @click="showMoney = !showMoney">
              </div>
              <p style="font-size: 14px;padding: 0 17px;color: #7B5605;">{{projectConfig.siteCurrency}} {{showMoney ? userInfo.balance : '****'}}</p>
            </div>
            <div class="flex-middle cqkuan">
              <div class="flex-1 center" @click="jumpOtherPage(1)">
                {{ $t('c_k') }}
              </div>
              <div style="width: 1px; height: 12px; background: #BCC0CB"></div>
              <div class="flex-1 center" @click="jumpOtherPage(1)">
                {{ $t('q_k') }}
              </div>
            </div>
            <ul>
              <li @click="jumpOtherPage(2)">
                {{ $t('trans') }}
              </li>
              <li @click="jumpOtherPage(1)">
                {{ $t('zj_mx') }}
              </li>
              <li @click="jumpOtherPage(1)">
                {{ $t('tk_zh') }}
              </li>
              <li @click="$router.push('/index/betsRecord')">
                {{ $t('t_z_j_l') }}
              </li>
              <li @click="jumpOtherPage(3)">
                {{ $t('realBet') }}
              </li>
              <li class="cursor" @click="logout">
                {{ $t('t_c_d_l') }}
              </li>
            </ul>
          </div>
        </div>
        <!-- 未登录弹框 -->
        <div class="ab userinfo" v-if="!userInfo.userId && showUserInfo" style="width: 296px" @click.stop>
          <div class="content pchoverstyle">
            <LoginRegister/>
          </div>
        </div>
      </div>
    </div>

    <van-overlay :show="showDeposit" :custom-style="{backgroundColor: `rgba(0,0,0,.9)`}" @click="showDeposit = false">
      <iframe id="iframe" class="ab-middle" frameborder="2" scrolling="no"
              :src="src" :width="iframeStyle.width" :height="iframeStyle.height">
      </iframe>

      <van-icon class="ab"
                :style="{left: iframeStyle.iconLeft, top: iframeStyle.iconTop}"
                name="cross" size="30px" color="#ddd"></van-icon>
      <van-loading v-if="onload" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>
  </header>
</template>
<script>
import Cookie from 'js-cookie'
import {mapGetters, mapMutations} from "vuex";
import languageMixin from "../../mixins/languageMixin";
import { exitLogin } from "../../axios/user";

export default {
  mixins: [languageMixin],
  data() {
    return {
      ctrlHeaderContentStatus: false,
      timer: null,
      currentSelectHeadValue: 1,
      headerData: Object.freeze(
          [
            {
              label: this.$t('z_r'),
              value: 1
            },
            {
              label: this.$t('d_z'),
              value: 2
            },
            {
              label: this.$t('q_p'),
              value: 3
            },
            {
              label: this.$t('b_y'),
              value: 4
            }
          ]
      ),
      src: '',
      showDeposit: false,
      onload: false,
      showUserInfo: false,
      showMoney: true
    }
  },

  computed: {
    ...mapGetters(['projectConfig', 'homeGames', 'userInfo'])
  },

  methods: {
    ...mapMutations({
      updateUserInfo: 'UPDATE_USER_INFO'
    }),
    logout() {
      exitLogin()
          .then(() => {
            Cookie.remove('loginsessid')
            localStorage.removeItem('loginsessid')
            sessionStorage.removeItem('loginsessid')
            this.updateUserInfo({})
            this.showDeposit = false
          })
    },
    downloadApp() {
      window.open(this.projectConfig.appdownloadurl, '_blank')
    },
    jumpOtherPage(type) {
      this.showDeposit = true
      this.showUserInfo = false
      this.onload = false
      const host = process.env.NODE_ENV === 'development' ? 'http://t061f.fhptdev.com' : window.location.origin
      let iframe = document.getElementById("iframe");

      /**
       PC其他游戏记录 /index3.php?realBetList=1
       * */
      if (type === 1) { //
        this.src = `${host}/index3.php?id=02&fromSport=1`
      } else if (type === 2) {
        /**额度转换**/
        this.src = `${host}/index3.php?realtrans=1`
      } else if (type === 3) {
        /**真人注单**/
        this.src = `${host}/index3.php?realBetList=1`
      }

      let iwindow = iframe.contentWindow;

      console.log('this.src', this.src)

      iwindow.onload = () => {
        this.onload = true
        console.log('this.onload', this.onload)
      }
    },

    jumpToServe() {
      window.open(this.projectConfig.zxkfUrl, '_blank')
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    listMouseover(index) {
      this.clearTimer();
      this.currentSelectHeadValue = index;
      this.ctrlHeaderContentStatus = true;
    },

    listMouseoout() {
      this.timer = setTimeout(() => {
        this.ctrlHeaderContentStatus = false;
      }, 500)
    },

    realmouseout() {
      this.ctrlHeaderContentStatus = false;
    },

    selectLanguage(item) {
      this.language = item.text;
      console.log(item.text);
      localStorage.setItem("lang", item.key);
      localStorage.setItem("lanItem", item.text);
      location.reload();
    }
  },

  components: {
    RealPerson: () => import('../../components/temp3/RealPerson.vue'),
    LoginRegister: () => import('../../components/temp3/PcLogin.vue'),
  },

  created() {
    this.getLangList()
    this.iframeStyle = {
      width: window.innerWidth * 0.9 + 'px',
      height: window.innerHeight * 0.9 + 'px',
      iconTop: window.innerHeight * 0.05 + 'px',
      iconLeft: window.innerWidth * 0.95 + 10 + 'px'
    }
  }
}
</script>


<style scoped lang="less">
.pcheader {
  padding: 0 120px;
  height: 78px;
  font-size: 14px;
  background: #FFFFFF;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  .lang {
    cursor: pointer;
    padding: 0 10px;
    min-width: 80px;
    height: 24px;
    background: #F3F6FA;
    border: 1px solid #BCC0CB;
    border-radius: 12px;
    font-size: 12px;
    color: #4D5872;
    margin-left: 16px;

    .select-lang {
      z-index: 100;
      width: 140px;
      left: 0;
      top: 22px;
      display: none;

      > .content {
        margin-top: 35px;

        li {
          height: 32px;
          font-size: 12px;
          color: #4D5872;
          line-height: 32px;
          border-bottom: 1px solid #F2F2F2;
          padding: 0 16px;

          &.active {
            color: #7B5605;
          }

          &:hover {
            color: #7B5605;
          }
        }
      }
    }

    &:hover .select-lang {
      display: block;
    }
  }
}

.game-list {
  margin-left: 20px;

  > li {
    min-width: 64px;
    max-width: 78px;
    padding: 0 8px;
    color: #818796;
    letter-spacing: 0;
    line-height: 14px;
    font-weight: 500;
    cursor: pointer;

    &.active {
      color: #7B5605;
    }

    &:hover {
      color: #7B5605;
    }
  }
}

.name {
  p:nth-child(1) {
    font-size: 12px;
    color: #4D5872;
  }

  p:nth-child(2) {
    font-size: 14px;
    color: #7B5605;
  }
}


.userinfo {
  z-index: 66666;
  width: 160px;
  right: -33px;
  top: 26px;
  padding-top: 35px;
  //display: none;

  .content::before {
    left: 228px;
  }

  li {
    height: 36px;
    font-size: 12px;
    color: #4D5872;
    line-height: 36px;
    border-bottom: 1px solid #F2F2F2;
    padding: 0 16px;

    &:hover {
      color: #7B5605;
    }
  }
}

//.rightinfo:hover .userinfo {
//  display: block;
//}

.cqkuan {
  background-image: linear-gradient(180deg, #ECF2F8 0%, #FFFFFF 100%);
  border: 1px solid #BCC0CB;
  border-radius: 4px;
  width: 137px;
  margin: 0 auto;
  height: 28px;
  font-size: 12px;
  color: #4D5872;
}


</style>
