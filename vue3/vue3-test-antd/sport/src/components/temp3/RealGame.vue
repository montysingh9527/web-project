<template>
  <div class="real-game p-l20 p-r20 index-continaer">
    <van-row gutter="10">
      <van-col :span="12" class="m-b8 real-game-item" :class="i % 2 == 0 ? 'fl' : 'fr'" v-for="(game, i) of game.list" :key="game.id" @click="handleGameClick(game)">
        <img class="full-width" :src="game.icon" alt="">
      </van-col>
    </van-row>
  </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import jumpRealGame from "../../mixins/jumpRealGame";

export default {
  mixins: [jumpRealGame],
  data() {
    return {
      showSubGames: false,
      gameInfo: {}
    }
  },

  props: {
    game: {}
  },

  computed: {
    ...mapState(['userInfo', 'homeGames'])
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET'
    }),

    handleGameClick(game = {}) {
      if (game.subGames && game.subGames.length) {
        this.showSubGames = true;
        this.gameInfo = game;

        // this.$toast('显示二级页面')
        this.$emit('click', game)
        return;
      }

      this.jumpGame(game);
    }
  }
}
</script>
<style type="text/css" lang="less">
.real-game {
  .real-game-item {
    //height: 3.8rem;
  }
}
</style>
