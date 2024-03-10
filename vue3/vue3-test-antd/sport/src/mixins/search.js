import {mapMutations, mapGetters} from "vuex"
import {format} from '../assets/js/util'
import {getMarketChanges, search} from "../axios/sport"
import getBetList from "./getBetList";
import Event from "../event"
import {sports} from "../common/config"

export default {
  mixins: [getBetList],
  data() {
    return {
      searchText: '',
      searchResult: {leagues: [], teams: []},
      sports: sports,
      sport: {id: 1}
    };
  },

  computed: {
    ...mapGetters(['bets'])
  },

  methods: {
    ...mapMutations({
      updateBet: 'UPDATE_BET'
    }),
    sportBorderColor(id) {
      let sport = Number(id)
      if (sport === 1) {
        return '#137A5A'
      } else if (sport === 18) {
        return '#9E6900'
      } else if (sport === 13) {
        return '#4D6B2E'
      } else if (sport === 91) {
        return '#80684C'
      } else if (sport === 151) {
        return '#624C6E'
      } else {
        return '#5d5d5d'
      }
    },

    selectSport(item) {
      this.sport = item
    },

    filterSports() {
      if (!this.searchResult.leagues.length && !this.searchResult.teams.length) return;

      let obj = {}
      let leagues = this.searchResult.leagues
      let teams = this.searchResult.teams

      if (leagues.length) {
        leagues.forEach(league => {
          if (league.matches.length) {
            league.matches.forEach(match => {
              obj[match.sport_id] = true;
            })
          }
        })
      }

      if (teams.length) {
        teams.forEach(match => {
          obj[match.sport_id] = 1
        })
      }

      this.sports = sports.filter(sport => obj[sport.id])
      this.sport = this.sports[0] || {}
    },

    toMatches(league) {
      let group = {
        '1': {
          code: 'asian_handicap_goal',
          name: this.$t('a_h_goal')
        },
        '18': {
          code: 'basketball_game_lines',
          name: this.$t('b_g_lines')
        },
        '13': {
          code: 'to_win',
          name: this.$t('t_t_w_match')
        },
        '91': {
          code: 'volleyball_game_lines',
          name: this.$t('b_g_lines')
        },
        '16': {
          code: 'baseball_game_lines',
          name: this.$t('b_g_lines')
        },
        '151': {
          code: 'esports_match_lines',
          name: this.$t('b_g_lines')
        },
      }

      this.$router.push({
        path: '/index/bet-matches',
        query: {
          league_name: league.league_name,
          league_id: league.league_id,
          market_group_code: group[`${this.sport.id}`].code,
          market_group_name: group[`${this.sport.id}`].name,
          country: league.country,
          sport: this.sport.id
        }
      })
    },

    _delaySearch() {
      this.clearTimer()
      this.timer = setTimeout(() => {
        this.onSearch(false)
      }, 300)
    },

    onSearch(loading = true) {

      if (!this.searchText) {
        return;
      }

      search(this.searchText, loading)
        .then(res => {
          if (res.code === 200) {
            this.searchResult = res.data

            if (!this.searchResult.leagues.length && !this.searchResult.teams.length) {
              this.searchResult.empty = true
              this.searchResult.leagues = []
              this.searchResult.teams = []
            }

            this.filterSports()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    toDetail(match) {
      const query = {
        match_id: match.match_id,
        league_id: match.league_id,
        match_status: match.match_status,
        sport: match.sport_id
      }
      this.$router.push({path: '/index/bet-detail', query})
    },

    getListenMatchIds() {
      let obj = {}
      let leagues = this.searchResult.leagues
      let teams = this.searchResult.teams

      if (leagues.length) {
        leagues.forEach(league => {
          if (league.matches.length) {
            league.matches.forEach(match => {
              if (Number(match.sport_id) === Number(this.sport.id)) {
                obj[match.match_id] = true
              }
            })
          }
        })
      }

      if (teams.length) {
        teams.forEach(match => {
          if (Number(match.sport_id) === Number(this.sport.id)) {
            obj[match.match_id] = true
          }
        })
      }

      return Object.keys(obj)
    },

    _marketChanges() {
      let match_ids = this.getListenMatchIds()

      if (!match_ids.length) return;

      this._getMarketChanges(match_ids)
    },

    onCancel() {
      this.searchText = ''
      this.searchResult = {}
      this.$router.back()
    },

    onClear() {
      this.searchText = ''
      this.searchResult = {leagues: [], teams: []}
    },

    format(date, fmt) {
      return format(date, fmt)
    },

    changeExampleSearch(txt) {
      this.searchText = txt

      this.onSearch()
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },

  created() {
    this.exampleList = [
      'NBA',
      this.$t('o_z_b'),
      this.$t('o_z_l'),
      this.$t('o_z_w_d'),
      this.$t('c_n_z'),
      this.$t('n_m_j')
    ]
    this.timer = null
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      Event.$on('fetch-match-change', () => {
        _this._marketChanges()
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    Event.$off('fetch-match-change')
    next()
  }
};
