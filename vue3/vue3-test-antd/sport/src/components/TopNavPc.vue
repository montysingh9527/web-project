<template>
  <div class="top-nav-pc">
    <ul class="full-height flex-middle-only re" style="padding-left: 24px;">
      <li class="re real-game-item flex-middle full-height">
        <span class="real-game-item-title">{{$t('underway')}}</span>

        <div class="ab real-game-item-drop">

          <h3 class="flex-middle-only game-type-bg">
            <img style="width:20px;height:20px;" :src="require('../assets/images/tmp2/football-active.svg')" alt="">
            <span class="m-l8">{{$t('sport')}}</span>
          </h3>
          <van-row style="background-color: #e4e4e4;">
            <van-col v-if="'fball' in displaySportNames" class="lh-45 col-game-detail" :span="6" @click="processing(1)" style="flex-shrink: 0;">
              {{$t('fball')}}
            </van-col>
            <van-col v-if="'bball' in displaySportNames" class="lh-45 col-game-detail" :span="6" @click="processing(18)" style="flex-shrink: 0;">
              {{$t('bball')}}
            </van-col>
            <van-col v-if="'tennis' in displaySportNames" class="lh-45 col-game-detail" :span="6" @click="processing(13)" style="flex-shrink: 0;">
              {{$t('tennis')}}
            </van-col>
            <van-col v-if="'vball' in displaySportNames" class="lh-45 col-game-detail" :span="6" @click="processing(91)" style="flex-shrink: 0;">
              {{$t('vball')}}
            </van-col>
            <van-col v-if="'b_ball' in displaySportNames" class="lh-45 col-game-detail" :span="6" @click="processing(16)" style="flex-shrink: 0;">
              {{$t('b_ball')}}
            </van-col>
            <van-col v-if="'esports' in displaySportNames" class="lh-45 col-game-detail" :span="6" @click="processing(151)" style="flex-shrink: 0;">
              {{$t('esports')}}
            </van-col>
          </van-row>
        </div>
      </li>
      <li class="re real-game-item flex-middle full-height" v-for="game of homeGames" :key="game.id">
        <span class="real-game-item-title">{{ game.name }}</span>

        <div class="ab real-game-item-drop">
          <h3 class="flex-middle-only game-type-bg">
            <img style="width:20px;height:20px;" :src="game.logo" alt="">
            <span class="m-l8">{{ game.name }}</span>
          </h3>
          <van-row style="background-color: #e4e4e4;">
            <van-col class="col-game-detail flex-middle-only" :span="6" style="flex-shrink: 0;"
                     @click="jumpToGame(detail)"
                     v-for="detail of game.list" :key="detail.id">
<!--              <img style="width: 24px;" :src="detail.icon" alt="">-->
              <span>{{ detail.name || detail.title }}</span>
            </van-col>
          </van-row>
        </div>
      </li>
      <li class="re real-game-item flex-middle full-height">
        <span class="real-game-item-title" @click="jump('desp')">{{$t('zjgl')}}</span>
      </li>
      <li class="re real-game-item flex-middle full-height" @click="jump('app')">
        <span class="real-game-item-title">{{ $t('d_a') }}</span>
      </li>
      <li class="re real-game-item flex-middle full-height" @click="$router.push('/index/activity')">
        <span class="real-game-item-title">{{$t('activity')}}</span>
      </li>
      <li class="re real-game-item flex-middle full-height"
          v-if="projectConfig.zxkfUrl"
          @click="jump('kefu')">
        <span class="real-game-item-title">{{$t('k_f')}}</span>
      </li>
      <li class="re real-game-item flex-middle full-height" @click="showRanking = true;" v-if="rankingMap.switch_ranking == 1">
        <span class="real-game-item-title">{{$t('p_r')}}</span>
      </li>

      <li class="ab-middle-y lang-container full-height flex-middle" v-if="allowChangeLang">
        <span class="cursor" style="color: #9c9c9c;">{{currentLang.name}} <van-icon name="arrow-down" /></span>

        <van-row class="lang-li ab">
          <van-col :span="12" class="lh-45 center lang-col cursor"
                   :class="l.code === currentLang.code ? 'active' : ''"
                   v-for="l of languages" :key="l.code"
                   @click="onSelectLang(l)"
          >
            {{l.name}}
          </van-col>
        </van-row>
      </li>
    </ul>

    <van-overlay :show="showGameList" :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}"
                 @click="showGameList = false">
      <div @click.stop class="ab-middle scroll-y hide-scroll-bar"
           style="height:80vh;width:80vw;background-color: #383838;">
        <h3 class="lh-45 flex-between bg-green white fs16 pd10">
          <van-icon name="arrow-left" color="#fff" size="16px" @click="showGameList = false"/>
          <p class="flex-1 flex-middle">{{ gameInfo.name }}</p>
          <van-icon/>
        </h3>

        <van-row gutter="5">
          <van-col :span="6" v-for="game of currentSubGameList"
                   :key="game.id" class="center m-b16 sub-game-item" @click="jumpSubGame(gameInfo, game)">
            <img class="block" style="margin:10px auto;width: 80px;height:80px;" :src="game.logo" alt="">
            <span class="fs12 white">{{ game.title }}</span>
          </van-col>
        </van-row>
      </div>
    </van-overlay>

    <van-overlay :show="showIframe" :custom-style="{backgroundColor: `rgba(0,0,0,.9)`}" @click="showIframe = false">
      <iframe id="iframe" class="ab-middle" frameborder="2" scrolling="no" :src="iframeUrl"
              :width="iframeStyle.width" :height="iframeStyle.height">
      </iframe>

      <van-icon class="ab" :style="{left: iframeStyle.iconLeft, top: iframeStyle.iconTop}"
                name="cross" size="30px" color="#ddd"></van-icon>
      <van-loading v-if="loading" class="ab-middle flex-middle" size="50px"/>
    </van-overlay>

    <van-overlay :show="showRanking">
      <div class="bg-white scroll-y hide-scroll-bar" style="width: 436px;margin:15vh auto;" @click.stop>
        <header class="flex-between" style="height:50px;border-bottom: 1px solid #CECECE">
          <div class="p-l20 flex-middle bold" style="color: #222222;">
            <img class="m-r10" style="width: 22px;" src="../assets/images/tmp2/paih.png" alt="">
            {{rankingMap.ranking_name}}
          </div>
          <div @click="showRanking = false" class="full-height flex-middle" style="border-left: 1px solid #CECECE;width: 50px;">
            <img style="width: 16px;" src="../assets/images/tmp2/close.png" alt="" >
          </div>
        </header>
        <van-row class="lh-35" style="padding: 0 24px;border-bottom: 1px solid #CECECE;">
          <van-col :span="5">{{$t('rank')}}</van-col>
          <van-col :span="7">{{$t('player')}}</van-col>
          <van-col :span="6">{{$t('h_l_l')}}</van-col>
          <van-col :span="6">{{$t('z_y_l')}}</van-col>
        </van-row>

        <div style="padding: 0 24px;height: 480px;" class="scroll-y hide-scroll-bar">
          <van-row class="lh-40" v-for="r of rankingMap.list" :key="r.usr" style="border-bottom: 1px solid #CECECE;">
            <van-col :span="5" class="flex-middle-only flex-start lh-40">
              <img style="width: 20px;" v-if="r.sort == 1" src="../assets/images/tmp2/t1.png" alt="">
              <img style="width: 20px;" v-else-if="r.sort == 2" src="../assets/images/tmp2/t2.png" alt="">
              <img style="width: 20px;" v-else-if="r.sort == 3" src="../assets/images/tmp2/t3.png" alt="">
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
import {getPlayerRanking} from "../axios/sport";
import languageMixin from "../mixins/languageMixin";
import jumpRealGame from "../mixins/jumpRealGame";
import customiseMixin from "../mixins/customiseMixin";
export default {
  mixins: [languageMixin, jumpRealGame, customiseMixin],
  data() {
    return {
      showIframe: false,
      gameInfo: {},
      iframeUrl: '',
      showGameList: false,
      loading: false,
      showPopover: false,
      showRanking: false,
      rankingMap: {
        list: [],
        ranking_name: '',
        switch_ranking: 0
      },
    }
  },

  props: {},

  watch: {
    '$route'(route) {

    },
  },

  computed: {
    ...mapGetters(['homeGames', 'userInfo', 'projectConfig']),
    currentSubGameList() {
      return this.gameInfo.subGames
    }
  },

  methods: {
    processing(sport_id) {
      this.$router.push(`/index/sport?sport=${sport_id}`)
    },

    jumpToGame(game) {
      if (game.subGames && game.subGames.length) {
        this.showGameList = true;
        this.gameInfo = game;
        return;
      }

      this.jumpGame(game);
    },

    jump(name) {
      switch (name) {
        case 'user':
        case 'desp':
          if (!this.userInfo.userId) {
            Event.$emit('show-login')
            return;
          }

          if (name === 'user') {
            this.iframeUrl = window.location.origin + '/index3.php?id=01&fromSport=1'
          } else if (name === 'desp') {
            this.iframeUrl = window.location.origin + '/index3.php?id=02&fromSport=1'
          }

          this.showIframe = true
          this.loading = true

          let iframe = document.getElementById('iframe')

          let iwindow = iframe.contentWindow;

          console.log('iwindow', iwindow)

          setTimeout(() => {
            this.loading = false
          }, 10000)

          iwindow.onload = () => {
            this.loading = false
            console.log('this.onload', this.loading)
          }
          return;
        case 'kefu':
          window.open(this.projectConfig.zxkfUrl, '_blank')
          return;
        case 'app':
          window.open(this.projectConfig.appdownloadurl, '_blank')
          return;
      }
    },
  },

  mounted() {
    Event.$on('login', status => {
      if(status) {
        this.getLangList();
      }
    });

    this.getLangList();

    getPlayerRanking()
        .then(res => {
          if(res.code == 200) {
            this.rankingMap = res.data;
          }
        })
  },

  created() {
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
.top-nav-pc {
  height: 46px;
  background: #333;

  .real-game-item {
    cursor: pointer;

    .real-game-item-title {
      flex-shrink: 0;
      padding: 0 12px;
      color: #9c9c9c;
    }

    &:hover {
      .real-game-item-drop {
        display: block !important;
      }

      .real-game-item-title {
        color: #fff !important;
      }
    }
  }

  .real-game-item-drop {
    display: none;
    width: 520px;
    top: 46px;
    left: 12px;
    z-index: 99;

    h3 {
      background-color: #90a4ae;
      height: 52px;
      padding: 0 16px;
      border-bottom: 1px solid #137A5A;
    }
  }


  .game-type-bg {
    background-image: url("../assets/images/tmp2/real-game-3.png");
  }

  .col-game-detail {
    padding: 0 10px;
    height: 45px;
    border-bottom: 1px solid #d2d2d2;

    &:hover {
      background-color: #fff;
    }
  }


  .sub-game-item {
    cursor: pointer;

    &:hover {
      img {
        transform: scale(1.2);
        transition: transform .1s;
      }
    }
  }

  .lang-container {
    right: 10px;
    z-index: 999999;

    &:hover {
      .lang-li {
        display: block;
      }
    }
  }

  .lang-li {
    top: 45px;
    right: 5px;
    width: 360px;
    color: #545454;
    display: none;
  }

  .lang-col {
    background: #E4E4E4;
    border-bottom: 1px solid #c3c3c3;

    &.active {
      background: #fff;
      color: #0BE9AD;
    }
  }
}
</style>
