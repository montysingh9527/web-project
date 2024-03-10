<template>
  <div class="home re" @click="showUserInfo = false">
    <header class="flex-middle-only re listreturn1">
      <div class="ab-middle-y" style="left: 0.8rem;" @click.stop="handleClickAvatar">
        <Avatar />
      </div>

      <img class="ab-middle" style="height: 1.04rem;" :src="projectConfig.mLogo" alt="">

      <div class="ab-middle-y" style="right: 0.8rem;">
        <i class="icon_base icon-china m-r10" v-if="allowChangeLang" @click="langStatus = true"></i>
        <i class="icon_base icon-kefu" @click="jumpService"></i>
      </div>
    </header>

    <Dialog v-show="showUserInfo" />

    <van-tabs class="f-tabs indexvantabs" v-model="active_tab" animated color="#7b5605" line-width="20vw">
      <van-tab :key="0">
        <template #title>
          <div class="flex-middle" style="line-height: 1;height: 100%;">
            <img class="m-r5" style="width: .8rem;" src="../../../assets/images/tmp3/sport_active.png" alt="">
            {{$t('sport')}}
          </div>
        </template>
        <div class="index-continaer">
          <sport :scroll-notices="scrollNotices"
                 :matches="currentSportMatches"
                 :hot-matches="hotMatches"
                 @select-sport="_selectSport"
          />
        </div>
      </van-tab>
      <van-tab :key="`${index+1}`" v-for="(game, index) of homeGames">
        <template #title>
          <div class="flex-middle" style="line-height: 1;height: 100%;">
            <img class="m-r5" style="width: 1rem;" :src="game.logo" alt="">
            {{game.name}}
          </div>
        </template>
        <div class="index-continaer">
          <RealGame :game="game" @click="handleClickSubGame"></RealGame>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="langStatus" position="top">
      <ul class="langul">
        <li class="fs12 center under-line" style="padding: 0.4rem" v-for="(item, index) in languages" :key="index" @click="onSelectLang(item)">
          {{item.name}}
        </li>
      </ul>
    </van-popup>

    <van-overlay :show="showSubGames" :lock-scroll="false">
      <div class="sub-game-wrapper">
        <van-nav-bar
            :title="rootGame.title"
            left-arrow
            @click-left="showSubGames = false"
        />
        <van-row gutter="10" class="p-l10 p-r10 scroll-y" :style="{height: innerHeight - 50 + 'px'}">
          <van-col :span="12" class="flex-middle m-b8"
                   v-for="game of subGames"
                   :key="game.gameId"
                   @click="jumpSubGame(rootGame, game)"
          >
            <img style="height: 3.8rem;width: 100%;" :src="game.logo" alt="">
          </van-col>
        </van-row>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import { setWindowScrollContentHeight } from '../../../assets/js/util';
import languageMixin from '../../../mixins/languageMixin';
import home from "../../../mixins/home";
import jumpRealGame from "../../../mixins/jumpRealGame";
import {getHotMatches} from "../../../axios/sport";

export default {
  mixins: [ languageMixin, home, jumpRealGame ],
  data() {
    return {
      active_tab: 0,
      selectSport: {id: 1},
      showSubGames: false,
      rootGame: {},
      subGames: [],
      showUserInfo: false,
      langStatus: false
    }
  },

  computed: {
    ...mapState(['userInfo', 'projectConfig', 'homeGames']),
    currentSportMatches() {
      const { id } = this.selectSport;

      switch (String(id)) {
        case '1':
          return this.footballMatches;
        case '18':
          return this.basketballMatches;
        case '13':
          return this.tennisMatches;
        case '16':
          return this.baseballMatches;
        case '91':
          return this.volleyballMatches;
        case '151':
          return this.esportsMatches;
        default:
          return []
      }
    }
  },

  watch: {
    active_tab() {
      this.setWindowHeight();
    }
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET',
    }),

    closeAll() {
      this.showUserInfo = false
      this.langStatus = false
      this.showSubGames = false
    },

    handleClickAvatar() {
      if(this.userInfo.userId) {
        this.showUserInfo = true
      } else {
        this.$toast(this.$t('login_f'))
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
    },

    handleClickSubGame(game = {}) {
      console.log('g1', game);
      this.rootGame = game;
      this.subGames = game.subGames;

      this.showSubGames = true;
    },

    jumpService() {
      window.open(this.projectConfig.zxkfUrl, '_blank')
    },

    _selectSport(sport = {}) {
      console.log('_selectSport===', sport);
      this.selectSport = sport;

      this._getHotMatches()
      this._getGroundMatches(true)
    },

    setWindowHeight() {
      setTimeout(() => {
        setWindowScrollContentHeight([
          document.querySelector('.listreturn1'),
          document.querySelector('.indexvantabs').querySelector('.van-tab'),
          document.querySelector('.van-hairline--top-bottom')
        ]);
      }, 30)
    },

    // 热门滚球
    _getHotMatches() {
      let params = {
        sport: this.selectSport.id
      }
      getHotMatches(params)
          .then(res => {
            if (res.code === 200) {
              let list = res.data
              list = list.map(item => {
                item.sport = params.sport

                return item
              })

              this.hotMatches = list.sort((a, b) => Number(a.start_time) - Number(b.start_time));
              console.log('this.hotMatches====', this.hotMatches)
            }
          })
          .catch(err => {
            console.log('热门滚球信息err', err)
          })
    },
  },

  components: {
    Sport: () => import('../../../components/temp3/Sport'),
    RealGame: () => import('../../../components/temp3/RealGame'),
    Dialog: () => import('../../../components/temp3/Dialog'),
    Avatar: () => import('../../../components/temp3/Avatar')
  },

  created() {
    this.tabs = {
      sports: {icon: require('../../../assets/images/tmp3/sport.png'), active_icon: require('../../../assets/images/tmp3/sport_active.png'), text: this.$t('sport')},
      real: {icon: require('../../../assets/images/tmp3/sport.png'), active_icon: require('../../../assets/images/tmp3/real_active.png'), text: this.$t('z_r')},
      dz: {icon: require('../../../assets/images/tmp3/dz.png'), active_icon: require('../../../assets/images/tmp3/dz_active.png'), text: this.$t('d_z')},
      qp: {icon: require('../../../assets/images/tmp3/qp.png'), active_icon: require('../../../assets/images/tmp3/qp_active.png'), text: this.$t('q_p')},
      buyu: {icon: require('../../../assets/images/tmp3/buyu.png'), active_icon: require('../../../assets/images/tmp3/buyu_active.png'), text: this.$t('b_y')},
    }
    this.innerHeight = window.innerHeight;
  },

  mounted() {
      this.setWindowHeight();
      this.getLangList();
      this._getHotMatches();
  }
}
</script>
<style type="text/css" lang="less">
@import url('../../../assets/css/index');

.home {
  header {
    height: 2.4rem;
  }

  .f-tabs {
    .van-tabs__line {
      bottom: auto;
    }
    .van-tabs--line .van-tabs__wrap {
      height: 1.9rem;
    }

    .van-tab {
      color: #818796;
    }
    .van-tab--active {
      background-image: linear-gradient(0deg, #FFFFFF 0%, #FFF4DB 100%);
      color: #7B5605!important;
      font-weight: 500;
    }

  }
  .van-tabbar{
    height: 2.5rem;
  }

  .sub-game-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #444444;
    header {
      background-color: #fff;
      height: 2.2rem;
    }
  }
}
</style>
