<template>
  <div class="flex-1 full-height full-width cursor" :class="[activeClass(play, match), className]"
       @click.stop="_chooseBet(play, group, match)"
  >
    <div v-if="showName" class="center bet-name" :ref="`bet-name-${match.id || match.match_id}-${play.market_id}`">
      <slot name="play-name" :play="play">
        {{ play.name }}
      </slot>
    </div>

    <div v-if="showHandicap && play.handicap" class="block center fs12">
      <slot name="alias" :play="play"></slot>
      <span class="bet-handicap" :id="`bet-handicap-${match.id || match.match_id}-${play.market_id}`">{{ (play.handicap && play.handicap.replace(',', '/')) }}</span>
    </div>

    <div v-if="showHeader" class="center fs12 bet-header">
      <slot name="header" :play="play">
        <span>{{ play.header }}</span>
      </slot>
    </div>

    <p class="center bet-odd" :id="`bet-odds-${match.id || match.match_id}-${play.market_id}`"
       :class="play.is_suspend === '0' && play.is_show === '1' && (play.isFBD != 1 || play.is_allow_bet == 1) ? 'market-odds' : 'disabled'">
      {{ play.odds }}
<!--      {{ group.code === 'incorrect_score' || group.code === 'half_time_incorrect_score' ? '%' : '' }}-->
    </p>

    <p class="center m-l5" style="color: #7F7F7F;" :id="`bet-fbd-${match.id || match.match_id}-${play.market_id}`" v-if="play.isFBD == 1">
      {{ amountLeft(play.left_amount) }}
    </p>
  </div>
</template>
<script>
import ChooseBet from "../mixins/choose-bets"

export default {
  mixins: [ChooseBet],
  props: {
    showHeader: {
      type: Boolean,
      default: false
    },

    showHandicap: {
      type: Boolean,
      default: false
    },

    showName: {
      type: Boolean,
      default: false
    },

    play: {
      type: Object,
      default: () => ({})
    },
    match: {
      type: Object,
      default: () => ({})
    },
    group: {
      type: Object,
      default: () => ({})
    },
  },

  methods: {
    amountLeft(money = 0) {
      if(money < 1000) {
        return money;
      } else if(money >= 1000 && money < 1000000) {
        return parseInt(money / 1000) + 'k'
      } else if(money >= 1000000 && money < 1000000000) {
        return parseInt(money / 1000000) + 'M'
      } else {
        return parseInt(money / 1000000000) + 'B'
      }
    }
  },

  created() {
    const isTmp2 = localStorage.getItem('tmp') === 'tmp2'
    this.className = isTmp2 ? 'select-bet-init-tmp2' : 'select-bet-init-tmp3'
  }
}
</script>
<style type="text/css" lang="less" scoped>
/**bet365模板选中样式**/
.select-bet-init-tmp2 {
  color: #ddd;
  margin: 1px;
  cursor: pointer;

  .market-odds {
    color: #FFDF1B;
  }

  .bet-odd {
    padding: 0.2rem 0;
  }

  &.active {
    background-color: #e4e4e4 !important;
    color: #545454 !important;

    .market-odds {
      color: #126E51 !important;
    }
  }

  .disabled {
    color: #a1a1a1;
  }
}
/**********end*********/

/**默认模板选中样式**/
.select-bet-init-tmp1 {
  margin-bottom: 2px;
  border-radius: 2px;
  background-color: #f6f5fa;

  .market-odds {
    color: #2e2a44;
  }

  &.active {
    background: #FAC200 !important;
    color: #2E2A44 !important;
  }

  .disabled {
    color: #a1a1a1;
  }
}

/**默认模板选中样式**/
.select-bet-init-tmp3 {
  //background: url("../assets/images/tmp3/matches-bg.png") no-repeat;
  background-size: 100% 100%;
  //color: #7B5605;

  .market-odds {
    color: #7B5605;
  }

  .bet-header {
    color: #4D5872;
  }

  .bet-handicap {
    color: #4D5872;
  }

  &.active {
    color: #fff;
    background-image: linear-gradient(180deg, #59627A 0%, #97A2BB 100%);
    //box-shadow: inset 0 0 .4rem 0 rgba(85, 98, 129, 1);

    .market-odds {
      color: #FFF320;
    }

    .bet-header {
      color: #fff;
    }

    .bet-handicap {
      color: #fff;
    }
  }

  .disabled {
    color: #a1a1a1;
  }
}
</style>
