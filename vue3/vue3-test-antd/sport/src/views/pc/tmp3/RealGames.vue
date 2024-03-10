<template>
  <div class="real-games hide-scroll-bar">
    <header class="lh-45 center">
      {{title}}
    </header>
    <van-row gutter="15" class="p-l10 p-r10 scroll-y">
      <van-col :span="6" class="flex-middle m-b8"
               v-for="game of subGames"
               :key="game.gameId"
               @click="jumpSubGame({id}, game)"
      >
        <img style="height: 64px;" :src="game.logo" alt="">
        <p class="center">{{game.name}}</p>
      </van-col>
    </van-row>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import jumpRealGame from "../../../mixins/jumpRealGame";
  export default {
    mixins: [jumpRealGame],
    data() {
      return {
        id: '',
        title: ''
      }
    },

    computed: {
      ...mapGetters(['homeGames']),
      subGames() {
        let game = {}
        for (let i = 0; i < this.homeGames.length; i++) {
          const list = this.homeGames[i] ? this.homeGames[i].list : [];
          game = list.find(g => g.id === this.id)
          if(game) break;
        }
        return game.subGames || [];
      }
    },

    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter query', to.query)

      next(_this => {
        _this.id = to.query.id;
        _this.title = to.query.title;
      })
    },
  }
</script>
<style type="text/css" lang="less">
  .real-games {
    width:1200px;
    margin:0 auto;
  }
</style>