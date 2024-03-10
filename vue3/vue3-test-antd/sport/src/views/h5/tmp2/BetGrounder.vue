<template>
  <CommonLayout @select-sport="_selectSport">
    <div class="white flex-between" style="height:2.2rem;padding: 0 0.6rem;">
      <span class="fs20">{{getDefaultSport(sport).name}}</span>

      <van-popover placement="bottom-end" v-model="showPicker" trigger="click">
        <template #reference>
          <span class="fs14">{{$t(handicap.name)}}</span>
          <van-icon name="arrow-down"></van-icon>
        </template>

        <ul class="tmp2-overlay-content" style="width:8rem;">
          <li v-for="item of handicaps" :key="item.code"
              @click="onConfirmHandicap(item)"
              :class="handicap.code === item.code ? 'active' : ''">
            {{$t(item.name)}}
          </li>
        </ul>
      </van-popover>
    </div>
    <CommonBetList :sport="sport"
                   :handicap="handicap"
                   :title="$t('fball')" :category="'inplay'"
    />
  </CommonLayout>
</template>
<script>
  import CommonLayout from "../../../components/CommonLayout";
  import CommonBetList from '../../../components/CommonBetList'

  import {handicaps} from "../../../common/config"

  const all_handicap_item = {code: 'asian_handicap_goal', name: 'a_h_goal', sport: '1'}
  const basketball_game_lines = {code: 'basketball_game_lines', name: 'b_g_lines', sport: '18'}
  const tennis_game_lines = {code: 'tennis_to_win_match', name: 't_t_w_match', sport: '13'}
  const volleyball_game_lines = {code: 'volleyball_game_lines', name: 'b_g_lines', sport: '91'}
  const baseball_game_lines = {code: 'baseball_game_lines', name: 'b_g_lines', sport: '16'}
  const esports_match_lines = {code: 'to_win', name: 'to_win', sport: '151'}

  export default {
    data() {
      return {
        handicap: all_handicap_item,
        handicaps: [],
        showPicker: false,
        sport: '1'
      }
    },

    watch: {
      '$route'(route) {
        console.log('watch route', route.query.sport)
        this.sport = route.query.sport
        this.handicap = this.getDefaultSport(this.sport).handicap

        this.handicaps = handicaps.filter(h => h.sport === this.sport)
      }
    },

    methods: {
      onConfirmHandicap(handicap) {
        this.handicap = handicap
        this.showPicker = false
      },

      _selectSport(item) {
        console.log('item', item)
        this.$router.push(`/index/bet-grounder?sport=${item.sport}`)
        this.sport = Number(item.sport)

        this.handicap = this.getDefaultSport(item.sport).handicap

        this.handicaps = handicaps.filter(h => Number(h.sport) === Number(this.sport))
      },

      getDefaultSport(sport = 1) {
        let id = Number(sport)

        if (id === 1) {
          return {
            name: this.$t('fball'),
            handicap: all_handicap_item
          }
        } else if (id === 18) {
          return {
            name: this.$t('bball'),
            handicap: basketball_game_lines
          }
        } else if (id === 13) {
          return {
            name: this.$t('tennis'),
            handicap: tennis_game_lines
          }
        } else if (id === 91) {
          return {
            name: this.$t('vball'),
            handicap: volleyball_game_lines
          }
        } else if (id === 16) {
          return {
            name: this.$t('b_ball'),
            handicap: baseball_game_lines
          }
        } else if (id === 151) {
          return {
            name: this.$t('esports'),
            handicap: esports_match_lines
          }
        }
      },
    },
    components: {
      CommonLayout,
      CommonBetList
    },

    beforeRouteEnter(to, from, next) {
      next(_this => {
        _this.sport = to.query.sport || 1

        _this.handicap = _this.getDefaultSport(_this.sport).handicap

        _this.handicaps = handicaps.filter(h => h.sport === _this.sport)
      })
    }
  };
</script>
