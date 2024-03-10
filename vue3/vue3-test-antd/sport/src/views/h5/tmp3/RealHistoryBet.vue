<template>
  <div class="account">
    <van-nav-bar
        class="flex-middle-only"
        style="background-image: linear-gradient(180deg, #f2ab06 0%, #b78008 100%);position: static;z-index: 9;width: 100%;top:0;"
        @click-left="clickLeft"
    >
      <div slot="left" class="flex-middle-only">
        <van-icon name="arrow-left" size="20px" color="#fff"></van-icon>
        <!--                <span class="fs12 white">首页</span>-->
      </div>
      <span slot="title" class="fs16" style="color: #fff;">{{ title }}</span>
    </van-nav-bar>

    <ul class="bg-white" v-if="!showIframe">
      <li class="flex-between" style="border-bottom: 1px solid #bbb;padding: 0.6rem"
          @click="jump(item)" v-for="item of list" :key="item.path">
        <span class="fs16" style="color:#4E5772;">{{ item.title }}</span>
        <van-icon name="arrow" size="20px" color="#bbb"></van-icon>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      loading: false,
      title: this.$t('r_b_r'),
      showIframe: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    clickLeft() {
      if (this.showIframe) {
        this.showIframe = false
      } else {
        this.$router.push('/')
      }
    },

    jump(item) {
      if (!this.userInfo.userId) {
        this.$toast('login_f')
        return;
      }
      this.$router.push({path: '/iframe', query: {page: 'realBet', path: item.path}})
    }
  },
  created() {

    this.iframeStyle = {
      width: window.innerWidth + 'px',
      height: window.innerHeight + 'px',
    }

    this.list = [
      {title: this.$t('r_b_r1'), path: '/mobile/#/lottery/realBetReal'},
      {title: this.$t('d_b_r'), path: '/mobile/#/lottery/realBetGame'},
      {title: this.$t('q_b_r'), path: '/mobile/#/lottery/realBetCard'},
      {title: this.$t('t_b_r'), path: '/mobile/#/lottery/realBetSport'},
      {title: this.$t('b_b_r'), path: '/mobile/#/lottery/realBetFish'},
      {title: this.$t('d_b_r1'), path: '/mobile/#/lottery/realBetEsport'},
    ]
  }
}
</script>
<style type="text/css" lang="less">
.account {

}
</style>
