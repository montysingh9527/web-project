<template>
  <div class="my">
    <div class="my_title">
      <div class="fs14 p-t17 p-b17 center gray bold">{{$t('my')}}</div>
      <div class="p-l15 p-r15 h-54 flex m-b16">
        <img src="../../../assets/images/tmp3/avatar.png" class="h-54 w-54"/>
        <div class="flex-1 flex-items p-l16 fs14 gray bold">{{userInfo.nickname || userInfo.username}}</div>
      </div>
      <div class="my-amount box bg-white radius4 p-l16 p-r16 flex-middle-only">
        <div class="flex-items fs12 gray">{{$t('blance')}}</div>
        <div class="flex-1 flex-middle-only p-l24 gray fs12">
          {{projectConfig.siteCurrency}}{{isShowAmount ? userInfo.balance : '******'}}
        </div>
        <img class="w-16" :src="require(`../../../assets/images/tmp3/my/${isShowAmount ? 'eye_yes' : 'eye_no'}.png`)" alt="" @click="isShowAmount = !isShowAmount">
      </div>
    </div>
    <div class="my_menu flex p-l15 p-r15 m-t14">
      <div class="center flex-1" @click="_toIframe('account')">
        <img class="w-30" src="../../../assets/images/tmp3/my/deposit.png" alt="">
        <p class="fs12 gray">{{$t('c_k')}}</p>
      </div>
      <div class="center flex-1" @click="_toIframe('account')">
        <img class="w-30" src="../../../assets/images/tmp3/my/withdraw.png" alt="">
        <p class="fs12 gray">{{$t('q_k')}}</p>
      </div>
      <div class="center flex-1" @click="_toIframe('account')">
        <img class="w-30" src="../../../assets/images/tmp3/my/amount_detail.png" alt="">
        <p class="fs12 gray">{{$t('zj_mx')}}</p>
      </div>
      <div class="center flex-1" @click="_toIframe('account')">
        <img class="w-30" src="../../../assets/images/tmp3/my/with_account.png" alt="">
        <p class="fs12 gray">{{$t('tk_zh')}}</p>
      </div>
    </div>
    <ul class="my_ul m-t16 box radius4 bg-white">
      <li class="under-line flex" @click="_toIframe('transfer')">
        <div class="w-44 flex-middle">
          <img class="w-16" src="../../../assets/images/tmp3/my/exchange.png" alt="">
        </div>
        <div class="fs12 gray flex-1 flex-items">{{$t('trans')}}</div>
        <div class="p-r16 flex-middle">
          <img class="w-6" src="../../../assets/images/tmp3/my/jt.png" alt="">
        </div>
      </li>
      <li class="under-line flex" @click="$router.push('/real-history-bet')">
        <div class="w-44 flex-middle">
          <img class="w-16" src="../../../assets/images/tmp3/my/order.png" alt="">
        </div>
        <div class="fs12 gray flex-1 flex-items">{{$t('realBet')}}</div>
        <div class="p-r16 flex-middle">
          <img class="w-6" src="../../../assets/images/tmp3/my/jt.png" alt="">
        </div>
      </li>
      <li class="under-line flex" @click="$router.push('/activity')">
        <div class="w-44 flex-middle">
          <img class="w-16" src="../../../assets/images/tmp3/my/porimt.png" alt="">
        </div>
        <div class="fs12 gray flex-1 flex-items">{{$t('activity')}}</div>
        <div class="p-r16 flex-middle">
          <img class="w-6" src="../../../assets/images/tmp3/my/jt.png" alt="">
        </div>
      </li>
      <li class="under-line flex" @click="jumpService">
        <div class="w-44 flex-middle">
          <img class="w-16" src="../../../assets/images/tmp3/my/service.png" alt="">
        </div>
        <div class="fs12 gray flex-1 flex-items">{{$t('k_f')}}</div>
        <div class="p-r16 flex-middle">
          <img class="w-6" src="../../../assets/images/tmp3/my/jt.png" alt="">
        </div>
      </li>
      <li class="under-line flex" @click="downloadApp">
        <div class="w-44 flex-middle">
          <img class="w-16" src="../../../assets/images/tmp3/my/download.png" alt="">
        </div>
        <div class="fs12 gray flex-1 flex-items">{{$t('d_a')}}</div>
        <div class="p-r16 flex-middle">
          <img class="w-6" src="../../../assets/images/tmp3/my/jt.png" alt="">
        </div>
      </li>
      <li class="under-line flex">
        <div class="w-44 flex-middle">
          <img class="w-16" src="../../../assets/images/tmp3/my/logout.png" alt="">
        </div>
        <div class="fs12 gray flex-1 flex-items" @click="logout">{{$t('t_c_d_l')}}</div>
        <div class="p-r16 flex-middle">
          <img class="w-6" src="../../../assets/images/tmp3/my/jt.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import {exitLogin} from "../../../axios/user";
import Cookie from "js-cookie";

export default {
  mixins: [],
  data() {
    return {
      isShowAmount: false
    }
  },

  computed: {
    ...mapState(['userInfo', 'projectConfig'])
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
      updateUserInfo: 'UPDATE_USER_INFO',
    }),

    _toIframe(page =  '') {
      if (!this.userInfo.userId) {
        this.$toast(this.$t('login_f'))
        return;
      }
      this.$router.push({path: '/iframe', query: {page}})
    },

    jumpService() {
      window.open(this.projectConfig.zxkfUrl, '_blank')
    },

    downloadApp() {
      window.open(this.projectConfig.appdownloadurl, '_blank')
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

      this.$router.replace('/login')
    }
  }
}
</script>
<style type="text/css" lang="less">
@import '../../../assets/css/base.less';
.my{
  background: #f9ffff;
}
.my_title {
  // background: #ededed;
  background: url(../../../assets/images/tmp3/tz-bg.png) 100% 100%;
}
.my-amount{
  width: 17.15rem;
  margin: 0 auto;
  height: 2.2rem;
}
.my_ul{
  width: 17.15rem;
  margin: 0 auto;
}
.my_ul li{
  height: 2rem;
}
.my_menu {
  .gray{
    padding:0 0.3rem;
  }
}
</style>
