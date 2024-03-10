<template>
  <div class="home-nav">
    <ul class="flex scroll-x">
      <li class="real-game-item flex-middle right-line" @click="jump('desp')">
        <span class="real-game-item-title fs12">{{ $t('zjgl') }}</span>
      </li>
      <li class="re real-game-item flex-middle right-line" @click="jump('app')">
        <span class="real-game-item-title fs12">{{ $t('d_a') }}</span>
      </li>
      <li class="re real-game-item flex-middle right-line" @click="$router.push('/activity')">
        <span class="real-game-item-title fs12">{{ $t('activity') }}</span>
      </li>
      <!--        <li class="re real-game-item flex-middle right-line" @click="jump('user')">-->
      <!--            <span class="real-game-item-title">会员中心</span>-->
      <!--        </li>-->
      <li class="re real-game-item flex-middle right-line"
          v-if="projectConfig.zxkfUrl"
          @click="jump('kefu')">
        <span class="real-game-item-title fs12">{{ $t('k_f') }}</span>
      </li>
      <li class="re real-game-item flex-middle" @click="showRanking = true" v-if="rankingMap.switch_ranking == 1">
        <span class="real-game-item-title fs12">{{ $t('p_r') }}</span>
      </li>
    </ul>

    <van-overlay :show="showRanking" :lock-scroll="false">
      <div class="bg-white scroll-y" style="width: 80vw;margin:15vh auto;" @click.stop>
        <header class="flex-between" style="height:2.5rem;border-bottom: 1px solid #CECECE">
          <div class="p-l20 flex-middle bold" style="color: #222222;">
            <img class="m-r10" style="width: 1.1rem;" src="../assets/images/tmp2/paih.png" alt="">
            {{rankingMap.ranking_name}}
          </div>
          <div @click="showRanking = false" class="full-height flex-middle" style="border-left: 1px solid #CECECE;width: 2.5rem;">
            <img style="width: 0.7rem;" src="../assets/images/tmp2/close.png" alt="" >
          </div>
        </header>
        <van-row class="lh-35" style="padding: 0 1.2rem;border-bottom: 1px solid #CECECE;">
          <van-col :span="5">{{$t('rank')}}</van-col>
          <van-col :span="7">{{$t('player')}}</van-col>
          <van-col :span="6">{{$t('h_l_l')}}</van-col>
          <van-col :span="6">{{$t('z_y_l')}}</van-col>
        </van-row>

        <div style="padding: 0 1.2rem;height: 60vh;" class="scroll-y hide-scroll-bar">
          <van-row class="lh-35" v-for="r of rankingMap.list" :key="r.usr" style="border-bottom: 1px solid #CECECE;">
            <van-col :span="5" class="flex-middle-only flex-start lh-35">
              <img style="width: 1rem;" v-if="r.sort == 1" src="../assets/images/tmp2/t1.png" alt="">
              <img style="width: 1rem;" v-else-if="r.sort == 2" src="../assets/images/tmp2/t2.png" alt="">
              <img style="width: 1rem;" v-else-if="r.sort == 3" src="../assets/images/tmp2/t3.png" alt="">
              <span v-else class="p-l5">{{r.sort}}</span>
            </van-col>
            <van-col :span="7">{{r.usr}}</van-col>
            <van-col :span="6">{{r.hl + '%' }}</van-col>
            <van-col :span="6">{{r.yl}}</van-col>
          </van-row>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import Event from "../event";
import { getPlayerRanking } from '../axios/sport'

export default {
  data() {
    return {
      showRanking: false,
      rankingMap: {
        list: [],
        ranking_name: '',
        switch_ranking: 0
      }
    }
  },
  computed: {
    ...mapGetters(['projectConfig', 'userInfo'])
  },
  methods: {
    jump(name) {
      switch (name) {
        case 'user':
        case 'desp':
          if (!this.userInfo.userId) {
            Event.$emit('show-login')
            return;
          }

          if (name === 'user') {
            this.$router.push('/user')
          } else if (name === 'desp') {
            this.$router.push('/account')
          }
          return;
        case 'kefu':
          window.open(this.projectConfig.zxkfUrl, '_blank')
          return;
        case 'app':
          window.open(this.projectConfig.appdownloadurl, '_blank')
          return;
      }
    }
  },

  mounted() {
    getPlayerRanking()
        .then(res => {
          if(res.code == 200) {
            this.rankingMap = res.data;
          }
        })
  }
}
</script>
<style type="text/css" lang="less">
.home-nav {
  box-shadow: inset 0 -1px 0 0 #367A65;
  height: 2rem;
  padding: 0.4rem 0;

  .real-game-item {
    //width: 3.6rem;
    width: 20%;
    flex-shrink: 0;
    color: #ddd;
  }

  .right-line {
    border-right: 1px solid #5D5D5D;
  }
}
</style>
