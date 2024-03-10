<template>
  <div class="home-dialog ab left" style="line-height: 1" @click.stop>
    <div class="t1">
      <div class="name flex-between">
        <span>{{userInfo.username || userInfo.nickname || userInfo.fullName || '--'}}</span>
        <span class="psd" @click="isHide = !isHide">
          <img :src="isHide ? require('../../assets/images/tmp3/hide-psd.png') : require('../../assets/images/tmp3/show-psd.png')" alt="">
        </span>
      </div>
      <div class="balance m-t8 fs14 bold flex-between">
        {{projectConfig.siteCurrency}}{{isHide ? '*****' : userInfo.balance}}
        <van-icon name="replay" :class="isRefreshing && 'turn'" @click="refreshMoney"/>
      </div>
    </div>
    <ul class="t2">
      <li class="top-line fs12 p-l16" @click="_toAccount">{{$t('c_k')}}</li>
      <li class="top-line fs12 p-l16" @click="_toAccount">{{$t('q_k')}}</li>
      <li class="top-line fs12 p-l16" @click="logout">{{$t('t_c_d_l')}}</li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapMutations, mapGetters} from "vuex";
import Cookie from "js-cookie";
import { exitLogin, getUserBalance } from '../../axios/user'
import Event from "../../event";

export default {
  mixins: [],
  data() {
    return {
      active_tab: 0,
      isHide: true,
      isRefreshing: false
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'projectConfig'])
  },

  methods: {
    ...mapMutations({
      updateUserInfo: 'UPDATE_USER_INFO',
    }),

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

    _toAccount() {
      if (!this.userInfo.userId) {
        this.$toast('login_f')
        return;
      }
      this.$router.push({path: '/iframe', query: {page: 'account'}})
    },

    logout() {
      exitLogin()
        .then(res => {
          Cookie.remove('loginsessid')

          localStorage.removeItem('loginsessid')
          sessionStorage.removeItem('loginsessid')
          this.updateUserInfo({})
          this.showUserInfo = false
          this.loading = false
        })
    }
  },

  components: {
  },

  created() {

  },

  mounted() {

  },

  destroyed() {

  },

  deactivated() {

  },

  activated() {

  }
}
</script>
<style type="text/css" lang="less" scoped>
.home-dialog {
  color:#4D5872;
  z-index: 2;
  width: 7rem;
  background: #FFFFFF;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2);
  left: 0.4rem;
  top: 2.2rem;
  border-radius: .2rem;
  &::before{
    display:block;
    content:'';
    border-width:.32rem .32rem .32rem .32rem;
    border-style:solid;
    border-color:transparent transparent #fff transparent;
    /* 定位 */
    position:absolute;
    left: 0.6rem;
    top: -0.64rem;
  }
  .t1 {
    padding: .8rem;
    .name {
      color: #666666;
      .psd{
        img {
          width: .8rem;
          vertical-align: middle;
        }
      }
    }
    .balance {
      color: #7B5605;
    }
  }
  .t2 {
    li {
      height: 1.8rem;
      line-height: 1.8rem;
      &:last-child {
        color: #EA3D3D;
      }
    }
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
}
</style>
