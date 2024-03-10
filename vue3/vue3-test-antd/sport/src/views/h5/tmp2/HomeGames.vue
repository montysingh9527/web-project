<template>
  <div class="real-game">
    <h3 style="height: 60px;font-size: 28px;color:#e4e4e4;" class="flex-middle">{{ game.name }}</h3>

    <van-row>
      <van-col :span="12" v-for="item of game.list" :key="item.id" @click="jumpQGame(item)">
        <div class="real-game-item re flex-middle">
          <img class="block real-game-logo" :src="item.icon" alt="">
        </div>
        <p class="fs12 flex-middle" style="color:#CCC;height:2.2rem;">{{ item.name || item.title }}</p>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import jumpRealGame from "../../../mixins/jumpRealGame";

export default {
  mixins: [jumpRealGame],
  data() {
    return {
      gameId: ''
    }
  },

  computed: {
    ...mapGetters(['homeGames', 'userInfo']),
    game() {
      return this.homeGames.find(game => game.id === this.gameId) || {}
    }
  },
  watch: {
    '$route'(route) {
      this.gameId = route.query.id
    }
  },

  methods: {
    jumpQGame(game = {}) {
      console.log('jumpQGame===', game);
      if(game.subGames && game.subGames.length > 0) {
        // 跳转到 子游戏详情
        const {gameId, title} = game;
        this.$router.push({path: '/real-game-detail', query: {gameId, title, typeId: this.gameId}})
      } else {
        this.jumpGame(game)
      }
    },

    changeRealGame(tab) {
      console.log(tab)
    },

    toggleTopNav(flag) {
      this.showTopNav = flag
    }
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.gameId = to.query.id
    })
  }
}
</script>
<style type="text/css" lang="less">
.real-game {
  background: #333;

  .real-game-item {
    height: 6.8rem;
    width: 100%;
    background-image: linear-gradient(180deg, #1C1C1C 0%, #294745 100%);
  }

  .real-game-logo {
    //max-height: 6.8rem;
    width: 55%;
    //right: 0;
    //bottom: 0;
  }
}
</style>
