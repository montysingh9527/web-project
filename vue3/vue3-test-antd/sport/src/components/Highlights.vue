<template>
  <!--精选赛事-->
  <div class="highlights">
    <div class="fs16 green" style="padding: 0.8rem 0 0 0.6rem;">{{$t('j_x_sh')}}</div>

    <ul class="hide-scroll-bar flex-middle-only highlights-list"
        @click.stop>
      <li class="highlights-item fs12"
          @click="toDetail(match)"
          v-for="match of hotMatches" :key="match.match_id">
        <div class="flex-middle-only lh-20">
          <load-image class="m-r8" style="width:0.8rem;height:0.8rem"
                      v-if="Number(sport) === 1 || Number(sport) === 18"
                      :src="match.home_logo"
                      :loading="require('../assets/images/tmp1/team_logo1.svg')"
                      :error="require('../assets/images/tmp1/team_logo1.svg')"
          />
          <span class="cles-1 fs12">{{ match.home_name }}</span>
        </div>

        <div class="flex-middle-only lh-20">
          <load-image class="m-r8" style="width:0.8rem;height:0.8rem;"
                      v-if="Number(sport) === 1 || Number(sport) === 18"
                      :src="match.away_logo"
                      :loading="require('../assets/images/tmp1/team_logo2.svg')"
                      :error="require('../assets/images/tmp1/team_logo2.svg')"
          />
          <span class="cles-1 fs12">{{ match.away_name }}</span>
        </div>

        <p class="lh-30 flex-middle-only">
          <span>{{ format(match.start_time * 1000, 'MM-dd hh:mm') }}</span>
          <i class="van-icon van-icon-arrow"></i>
        </p>

        <!--足球-->
        <div class="flex-between" style="height:1.6rem;" v-if="Number(sport) === 1">
          <Play class="flex-middle" v-for="value of [$t('h_team'), $t('a_team')]" :key="value"
                :show-handicap="true"
                :play="findPlay(value, 'header', match.markets)"
                :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                :match="match"
          />
        </div>

        <!--蓝球-->
        <div class="flex-between" style="height:1.6rem;" v-if="Number(sport) === 18">
          <Play class="flex-middle" v-for="value of ['1', '2']" :key="value"
                :show-handicap="true"
                :play="findPlay(value, 'header', match.markets)"
                :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                :match="match"
          />
        </div>

        <!--网球-->
        <div class="flex-between" style="height:1.6rem;" v-if="Number(sport) === 13">
          <Play class="flex-middle" v-for="value of ['1', '2']" :key="value"
                :show-name="true"
                :play="findPlay(value, 'name', match.markets)"
                :group="findGroup(findPlay(value, 'name', match.markets), match.market_groups)"
                :match="match"
          />
        </div>

        <!--排球-->
        <div class="flex-between" style="height:1.6rem;" v-if="Number(sport) === 91">
          <Play class="flex-middle" v-for="value of ['1', '2']" :key="value"
                :show-header="true"
                :play="findPlay(value, 'header', match.markets)"
                :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                :match="match"
          />
        </div>

        <!--棒球-->
        <div class="flex-between" style="height:1.6rem;" v-if="Number(sport) === 16">
          <Play class="flex-middle" v-for="value of ['1', '2']" :key="value"
                :show-header="true"
                :play="findPlay(value, 'header', match.markets)"
                :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                :match="match"
          />
        </div>

        <!--电子竞技-->
        <div class="flex-between" style="height:1.6rem;" v-if="sport == 151">
          <Play class="flex-middle" v-for="value of ['1', '2']" :key="value"
                :show-header="true"
                :show-handicap="true"
                :play="findPlay(value, 'header', match.markets)"
                :group="findGroup(findPlay(value, 'header', match.markets), match.market_groups)"
                :match="match"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import LoadImage from "../common/LoadImage";
import Play from "../components/Play";
import {getHotMatches} from "../axios/sport";
import {format} from "../assets/js/util"

export default {
  data() {
    return {
      hotMatches: []
    }
  },

  props: {
    sport: {
      type: [Number, String],
      default: 1
    }
  },

  watch: {
    sport() {
      this._getHotMatches()
    }
  },

  methods: {
    // 根据标识找出对应玩法
    findPlay(value, key, markets) {
      return markets.find(market => market[key] === value) || {}
    },

    findGroup(play, groups) {
      return groups.find(group => group.market_group_id === play.market_group_id) || {}
    },

    // 热门足球
    _getHotMatches() {
      let params = {
        sport: this.sport
      }
      getHotMatches(params)
          .then(res => {
            if (res.code === 200) {
              let list = res.data

              this.hotMatches = list.sort((a, b) => Number(a.start_time) - Number(b.start_time))
              // console.log(this.hotMatches);
            }
          })
          .catch(err => {
            console.log('热门滚球信息err', err)
          })
    },

    toDetail(match) {
      const query = {
        match_id: match.match_id,
        league_id: match.league_id,
        match_status: 0,
        sport: this.sport
      }

      this.$router.push({
        path: '/index/bet-detail',
        query
      })
    },

    format(date, fmt) {
      return format(date, fmt)
    }
  },

  components: {
    LoadImage,
    Play
  },

  mounted() {
    this._getHotMatches()
  }
}
</script>
<style type="text/css" lang="less">
.highlights {
  background: #585858;

  .bet-name {
    padding-right: 0.4rem;
  }

  .bet-handicap {
    margin-right: 0.4rem;
  }

  .bet-header {
    margin-right: 0.4rem;
  }

  .highlights-list {
    width: 100vw;
    overflow-x: scroll;
    padding-top: 0.8rem;
  }

  .highlights-item {
    flex-shrink: 0;
    color: #ddd;
    width: 11.2rem;
    padding: 0 0.6rem;
    border-right: 1px solid #666;
  }

  .highlights-item-play {
    width: 100%;
    padding: 0.4rem 0;
  }
}
</style>
