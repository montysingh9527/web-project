import {getLeaguesByMarketGroup, getMarketGroups} from "../axios/sport";
import getBetList from "../mixins/getBetList"

import {format} from "../assets/js/util"
import Event from "../event";

export default {
  mixins: [getBetList],
  data() {
    return {
      handicap: {code: 'asian_handicap_goal', name: this.$t('a_h_goal')},
      handicaps: [],
      showPicker: false,
      showHandicapPicker: false,
      leagues: '',
      league: {},
      country: '',
      sport: ''
    }
  },

  computed: {

    navTabs() {
      const {code} = this.handicap
      switch (code) {
        case 'full_time_result':
          return ['1', 'x', '2']
        case 'asian_handicap':
        case 'match_goals':
          return [this.$t('height'), this.$t('below')]
        case 'asian_handicap_goal':
          return ['1x2', this.$t('r_f'), this.$t('match_goals')]
        case 'basketball_game_lines':
          return [this.$t('r_f'), this.$t('z_f'), this.$t('game_lines_money_line')]
        case 'tennis_to_win_match':
        case 'tennis_set_betting':
          return ['1', '2']
        case 'volleyball_game_lines':
          return [this.$t('winner'), this.$t('z_f'), this.$t('rang_f_j')]
        case 'baseball_game_lines':
          return [this.$t('r_l'), this.$t('z_f'), this.$t('q_r_p')]
        case 'esports_match_lines':
          return [this.$t('winner'), this.$t('r_f_p'), this.$t('d_t_s')]
      }
    }
  },

  methods: {
    colSpan(id) {
      let sport_id = Number(id)
      if (sport_id === 13) {
        return {
          left: 12,
          right: 10
        }
      } else {
        return {
          left: 9,
          right: 13
        }
      }
    },

    sportName(id) {
      const sport = Number(id)
      if (sport === 1) {
        return this.$t('fball')
      } else if (sport === 18) {
        return this.$t('bball')
      } else if (sport === 13) {
        return this.$t('tennis')
      } else if (sport === 91) {
        return this.$t('vball')
      } else if (sport === 16) {
        return this.$t('b_ball')
      } else if (sport === 151) {
        return this.$t('esports')
      }
    },

    _getLeagues(country) {
      let param = {
        country: country,
        market_group_code: this.handicap.code
      }

      getLeaguesByMarketGroup(param)
        .then(res => {
          if (res.code === 200) {

            res.data.forEach(item => {
              if (item.code === country) {
                this.leagues = item.leagues
              }
            })
          }
        })
    },

    _getMarketGroups() {

      getMarketGroups(this.sport)
        .then(res => {
          if (res.code === 200) {
            let list = res.data

            this.handicaps = list
          }
        })
    },

    _getUpcomingMatches(loading = false) {
      let params = {
        market_group_code: this.handicap.code,
        league: this.league.league_id,
        sport: this.sport,
        start_time: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        end_time: format(new Date().getTime() + 24 * 3600000, 'yyyy-MM-dd hh:mm:ss'),
        category: 'matches'
      }

      this._getUpcomingList(params, loading)
    },

    _changeHandicap(handicap) {
      this.handicap = handicap

      this.showHandicapPicker = false

      this._getUpcomingMatches(true)
    },

    _changeLeague(league) {
      this.league = league
      this.showPicker = false

      this._getUpcomingMatches(true)
    },

    initialMatches(query = {}) {
      this.league = {
        league_name: query.league_name,
        league_id: query.league_id
      }

      this.country = query.country

      this.sport = query.sport

      this.handicap = {
        code: query.market_group_code,
        name: query.market_group_name
      }

      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        this._getUpcomingMatches(true)
        this._getLeagues(this.country)
        this._getMarketGroups()
      }, 20)
    }
  },

  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.initialMatches(to.query)

      Event.$on('fetch-match-change', () => {
        if (_this.startLoop === true) {
          _this.loopGetMatchChanges()
        }
      })
    })
  },

  beforeRouteLeave(from, to, next) {
    this.startLoop = false

    Event.$off('fetch-match-change')

    next()
  }
};
