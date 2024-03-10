<template>
  <div class="ab realcontent" @mouseenter="$emit('realmouseover')" @mouseleave="$emit('realmouseout')">
    <div class="pchoverstyle cen" :class="bingClass">
      <p class="pctitle bold" style="color: #f0aa08;">
        {{ currentGames.name }}
      </p>
      <ul class="realul cursor">
        <li v-for="game of currentGames.list" :key="game.gameId" @click="jumpToGame(game)">
          <img style="width: 154px; height: 42px" :src="game.icon" alt="">
        </li>
      </ul>
    </div>


    <van-overlay :show="showDialog" :custom-style="{backgroundColor: `rgba(0,0,0,.7)`}"
                 @click="showDialog = false">
      <div @click.stop class="ab-middle scroll-y hide-scroll-bar" style="height:80vh;width:80vw;background-color: #383838;">
        <h3 class="lh-45 flex-between white fs16 pd10" style="background-color: #f0aa08">
          <van-icon name="arrow-left" color="#fff" size="16px" @click="showDialog = false"/>
          <p class="flex-1 flex-middle">{{ currentSubGame.title }}</p>
          <van-icon/>
        </h3>

        <van-row gutter="5">
          <van-col :span="6" v-for="game of currentSubGame.subGames"
                   :key="game.id" class="center m-b16 sub-game-item cursor" @click="jumpSubGame(currentSubGame, game)">
            <img class="block" style="margin:10px auto;width: 80px;height:80px;" :src="game.logo" alt="">
            <span class="fs12 white">{{ game.title }}</span>
          </van-col>
        </van-row>
      </div>
    </van-overlay>
  </div>
</template>
<script>
// 缓存选中tab
import {mapGetters} from "vuex";
import jumpRealGame from "../../mixins/jumpRealGame";

export default {
  mixins: [jumpRealGame],
  data() {
    return {
      gameInfo: {},
      showDialog: false,
      currentSubGame: []
    }
  },

  props: {
    beforeLeft: {
      type: String,
      default: '45px'
    },
    selectvalue: {
      type: Number
    }
  },

  computed: {
    ...mapGetters(['homeGames']),
    currentGames() {
      const game = this.homeGames[this.selectvalue] || {};
      // 一级游戏 数据
      return game || {};
    },
    bingClass() {
      return {
        list1: this.selectvalue === 1,
        list2: this.selectvalue === 2,
        list3: this.selectvalue === 3,
        list4: this.selectvalue === 4,
      }
    }
  },

  methods: {
    jumpToGame(game) {
      if (game.subGames && game.subGames.length) {
        // this.$router.push({path: '/index/real-games', query: {id: game.id, title: game.title}})
        this.showDialog = true
        this.currentSubGame = game
        console.log(game.subGames)
        return;
      }

      this.jumpGame(game);
    },
  },
}
</script>
<style type="text/css" lang="less">
.realcontent {
  z-index: 100;
  width: 518px;
  top: 87px;
  left: -20px;

  .cen {
    padding: 16px;

    &::before {
      transition: all .3s;
      left: 109px;
    }
  }

  .list1 {
    &::before {
      transition: all .3s;
      left: 109px;
    }
  }

  .list2 {
    &::before {
      transition: all .3s;
      left: 173px;
    }
  }

  .list3 {
    &::before {
      transition: all .3s;
      left: 238px;
    }
  }

  .list4 {
    &::before {
      transition: all .3s;
      left: 302px;
    }
  }
}

.realul {
  margin-top: 16px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
  flex-wrap: wrap;

  li {
    cursor: pointer;
  }

  img {
    vertical-align: top;
  }
}
</style>
