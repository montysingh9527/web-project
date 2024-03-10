<template>
  <div class="matches-filter">
    <Head fixed>
      <div slot="left" class="ab-middle-y" style="left: 0.8rem;" @click="closeOverlay">
        <img style="width: 1rem" src="../../assets/images/tmp3/back.png" alt="">
      </div>
      <div>{{$t('s_ss')}}</div>
    </Head>
    <div>
      <div class="lab1 flex-between full-width bg-white" style="margin-top: 2.4rem;">
        <div class="btn flex-middle" @click="allSelect(true)">
          <img class="icon m-r8" src="../../assets/images/tmp3/all-select.png" alt="">
          <span class="fs14">{{ $t('q_x') }}</span>
        </div>
        <div class="btn flex-middle" @click="allSelect(false)">
          <img class="icon m-r8" src="../../assets/images/tmp3/revert-select.png" alt="">
          <span class="fs14">{{ $t('f_x') }}</span>
        </div>
      </div>
      <div class="lab2 flex-1 scroll-y">
        <ul class="lab_ul">
          <li class="li flex-middle-only" v-for="league of leagues" :key="league.id" @click="handleSelectLeague(league)">
            <div class="flex-middle-only">
              <div class="radio m-r10" :class="{select: league_ids.includes(league.id)}"></div>
              <img v-if="league.logo" style="width: 1.4rem; margin-left: 1.2rem; margin-right: 0.8rem" :src="league.logo" alt="">
              <div class="details">
                <p class="fs14" style="color: #7B5605">{{league.name}}</p>
                <p class="fs12" style="color: #4D5872; margin-top: 0.14rem">{{ $t('g_y_j_c', {totalMatchs: league.matches.length}) }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="lab3 full-width bg-white" style="padding: 0 .6rem; height: 3.7rem;">
        <div class="submit public-btn flex-middle fs14" style="height: 1.9rem; margin-top: 0.6rem" @click="handleConfirm">
          {{ $t('q_r') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Head from './Head'
export default {
  props: {
    leagues: {
      type: Array,
      default: () => []
    }
  },

  components: {
    Head
  },

  data() {
    return {
      league_ids: [],
      all: false
    }
  },

  methods: {
    allSelect(flag = false) {
      if(flag) {
        this.league_ids = this.leagues.map(l => l.id)
      } else {
        this.league_ids = []
      }

      console.log('this.leagues', this.league_ids)
      this.all = true
    },

    closeOverlay() {
      this.$emit('close');
    },

    handleSelectLeague(league = {}) {
      const { id } = league;
      this.league_ids = [id];
      this.all = false
    },

    handleConfirm() {
      this.$emit('confirm', !this.all ? this.league_ids[0] : '');
    }
  }
}
</script>
<style type="text/css" lang="less" scoped>
//@import url('../../assets/css/index');

.matches-filter {
  position: relative!important;
  height: 100vh;
  overflow: hidden;
  .lab1 {
    z-index: 2;
    height: 2.7rem;
    padding: 0 1.5rem;

    .btn {
      color: #F3AC0A;
      width: 7.5rem;
      height: 1.4rem;
      border: 1px solid #F3AC0A;
      border-radius: .1rem;

      .icon {
        width: .7rem;
      }
    }
  }

  .lab2 {
    height: calc(100vh - 2.4rem - 2.7rem);
    overflow-y: scroll;
    //padding-top: 3.1rem;
    //padding-bottom: 3.7rem;
  }

  .lab_ul {
    padding: 0 .6rem;

    .li {
      height: 4.2rem;
      background: url('../../assets/images/tmp3/matches-filter-bg.png');
      background-size: 100% 100%;

      .radio {
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
        margin-left: 1rem;
        border: 1px solid #7B5605;

        &.select {
          background: #7B5605 url('../../assets/images/tmp3/select.png') no-repeat center center;
          background-size: .4rem auto;
        }
      }
    }
  }

  .lab3 {
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
