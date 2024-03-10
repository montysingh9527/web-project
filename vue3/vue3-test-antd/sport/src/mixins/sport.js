import {
  getSportCategory,
  getLeaguesByMarketGroup,
  getMarketGroups
} from "../axios/sport";

export default {
  data() {
    return {
      activeNames: ['1'],
      activeSubNames: ['1'],
      collapseList: [],
      sportGroundCount: 0,
      sportUpcomingCount: 0,
      loadings: {},
      sport: this.$route.query.sport || '1'
    }
  },

  methods: {
    // 获取体育分类和比赛数量
    _getSportCategory() {

      // 默认 滚球
      getSportCategory('inplay')
        .then(res => {
          if (res.code === 200 && res.data) {

            let list = res.data

            list.forEach(sport => {
              if (Number(sport.id) === Number(this.sport)) {
                this.sportGroundCount = sport.count
              }
            })
          }
        })
        .catch(err => {
          console.log('err', err)
        })
      // 早盘
      if (Number(this.sport) === 1) {
        getSportCategory('upcoming')
          .then(res => {
            if (res.code === 200 && res.data) {

              let list = res.data

              list.forEach(sport => {
                if (Number(sport.id) === Number(this.sport)) {
                  this.sportUpcomingCount = sport.count
                }
              })
            }
          })
          .catch(err => {
            console.log('err', err)
          })
      }
    },

    _getMarketGroups() {
      getMarketGroups(this.sport)
        .then(res => {
          if (res.code === 200) {
            let list = res.data
            this.collapseList = list.map(item => {
              item.list = []
              this.loadings[item.code] = false
              return item
            })
          }
        })
    },

    _getLeaguesByMarketGroup(group_code) {
      let item = this.collapseList.find(item => item.code === group_code)

      if (item.list && item.list.length) return;

      this.loadings = {...this.loadings, [group_code]: true}
      let param = {
        market_group_code: group_code
      }
      getLeaguesByMarketGroup(param)
        .then(res => {
          this.loadings = {...this.loadings, [group_code]: false}

          if (res.code === 200) {
            let list = res.data
            this.collapseList = this.collapseList.map(item => {
              if (item.code === group_code) {
                item.list = list

                if (list.length) {
                  this.activeSubNames.unshift(`${group_code}-${list[0].code}`)
                }
              }

              return item
            })
          }
        })
        .catch(err => {
          this.loadings = {...this.loadings, [group_code]: false}
          console.log(err)
        })
    },

    toMatches(league, item, country) {
      let query = {
        market_group_code: item.code,
        market_group_name: item.name,
        country: country,
        sport: this.sport,
        league_name: league.league_name
      }

      if (Number(this.sport) !== 13) {
        query.league_id = league.league_id
      }
      this.$router.push({path: '/index/bet-matches', query})
    },

    sportBgClass(id, type) {
      let sport = Number(id)
      if (sport === 1) {
        return {
          bg: type === 'h5' ? 'football-bg' : 'football-pc-bg',
          text: this.$t('fball')
        }
      } else if (sport === 18) {
        return {
          bg: type === 'h5' ? 'basketball-bg' : 'basketball-pc-bg',
          text: this.$t('bball')
        }
      } else if (sport === 13) {
        return {
          bg: type === 'h5' ? 'tennis-bg' : 'tennis-pc-bg',
          text: this.$t('tennis')
        }
      } else if (sport === 91) {
        return {
          bg: type === 'h5' ? 'volleyball-bg' : 'volleyball-pc-bg',
          text: this.$t('vball')
        }
      } else if (sport === 16) {
        return {
          bg: type === 'h5' ? 'baseball-bg' : 'baseball-pc-bg',
          text: this.$t('b_ball')
        }
      } else {
        return {
          bg: type === 'h5' ? 'gaming-bg' : 'gaming-pc-bg',
          text: this.$t('esports')
        }
      }
    }
  },

  watch: {
    $route(route) {
      this.sport = route.query.sport || 1
      this._getSportCategory()
      this._getMarketGroups()
    }
  },

  mounted() {
    this._getSportCategory()
    this._getMarketGroups()
  }
}
