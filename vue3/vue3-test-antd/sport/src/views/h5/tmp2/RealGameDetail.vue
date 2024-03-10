<template>
  <div class="real-game-detail">
    <h3 style="height: 2.4rem;font-size: 18px;color:#e4e4e4;" class="flex-middle">
      <div class="flex-middle" style="width: 2.4rem">
        <van-icon name="arrow-left" @click="$router.back()"></van-icon>
      </div>
      <p class="center flex-middle flex-1">{{ title }}</p>
      <div style="width:2.4rem"></div>
    </h3>

    <van-row>
      <van-col :span="12" v-for="item of game.subGames" :key="item.gameId" @click="jumpSubGame({gameId: gameId}, item)">

        <div class="real-game-item flex-middle">
          <img class="block" style="margin: 0 auto;width:5rem;" :src="item.logo" alt="">
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
      gameId: '',
      typeId: '',
      title: ''
    }
  },

  computed: {
    ...mapGetters(['homeGames']),

    game() {
      if (!this.gameId || !this.typeId) {
        return {subGames: []}
      }

      let homeGame = JSON.parse(localStorage.getItem('games')) || []

      let subGame = homeGame.find(game => {

        return String(game.id) === String(this.typeId)
      })

      return subGame.list.find(item => String(item.subId) === String(this.gameId))
    }
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      // console.log('to.query------>', to.query)
      _this.gameId = to.query.gameId
      _this.title = to.query.title
      _this.typeId = to.query.typeId
    })
  }
}
</script>
<style type="text/css" lang="less">
.real-game-detail {
  background: #333;

  .real-game-item {
    height: 6.8rem;
    width: 100%;
    background-image: linear-gradient(180deg, #1C1C1C 0%, #294745 100%);
  }

  .real-game-logo {
    max-height: 6.8rem;
    max-width: 100%;
    right: 0;
    bottom: 0;
  }
}
</style>
