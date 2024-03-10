<template>
  <div class="real-game-detail">
    <h3 style="height: 2.4rem;font-size: 18px;color:#e4e4e4;" class="flex-middle">
      <div class="flex-middle" style="width: 2.4rem">
        <van-icon name="arrow-left" @click="$router.back()"></van-icon>
      </div>
      <p class="center flex-middle flex-1">{{ game.name }}</p>
      <div style="width:2.4rem"></div>
    </h3>

    <van-row gutter="20">
      <van-col :span="4" v-for="item of game.subGames" :key="item.gameId" @click="jumpGame(item)">
        <div>
          <div class="real-game-item flex-middle">
            <img class="block" style="margin: 0 auto;width:5rem;" :src="item.logo" alt="">
          </div>
          <p class="fs12 flex-middle" style="color:#CCC;height:2.2rem;">{{ item.name || item.title }}</p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import Event from "../../../event";

export default {
  data() {
    return {
      gameId: '',
      type: ''
    }
  },

  computed: {
    ...mapGetters(['homeGames', 'userInfo']),

    game() {
      if (!this.gameId || !this.type) {
        return {subGames: []}
      }

      let homeGame = JSON.parse(localStorage.getItem('games')) || []

      let subGame = homeGame.find(game => {

        return String(game.id) === String(this.type)
      })

      return subGame.list.find(item => String(item.subId) === String(this.gameId))
    }
  },

  methods: {
    jumpGame(game) {
      if (!this.userInfo.userId) {
        Event.$emit('show-login')
        return;
      }

      let host = window.location.origin

      let url = host + `/mobile/real/goToGame/${this.gameId}/1/${game.gameId}`

      const windows = window.open(url, '_black')
    }
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      // console.log('to.query------>', to.query)
      _this.gameId = to.query.id
      _this.type = to.query.category
    })
  }
}
</script>
<style type="text/css" lang="less">
.real-game-detail {
  padding: 0 20px 20px 20px;
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
