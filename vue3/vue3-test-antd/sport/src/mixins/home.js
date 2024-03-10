import {mapGetters, mapMutations} from 'vuex'
import BetList from "../mixins/getBetList"
import Event from "../event"
import {format} from "../assets/js/util"

import {
  getMarketChanges,
  getHomeInplayMatches,
  getSportCategory, getMatchChanges
} from "../axios/sport";

export default {
  mixins: [BetList],
  data() {
    return {
      hotMatches: [],
      sportCount: 0,
      footballMatches: [],
      basketballMatches: [],
      tennisMatches: [],
      volleyballMatches: [],
      esportsMatches: [],
      baseballMatches: []
    };
  },

  computed: {
    ...mapGetters(['bets', 'projectConfig'])
  },

  methods: {
    ...mapMutations({updateBet: 'UPDATE_BET'}),
    // 获取所有比赛列表
    _getGroundMatches(loading = false) {

      getHomeInplayMatches(loading)
        .then(res => {
          if (res.code === 200) {
            let allList = res.data
            let footballMatches = []
            let basketballMatches = []
            let tennisMatches = []
            let volleyballMatches = []
            let esportsMatches = []
            let baseballMatches = []

            allList.forEach(item => {
              if (item.sport == '1') {
                footballMatches.push(item)
              } else if (item.sport == '18') {
                basketballMatches.push(item)
              } else if (item.sport == '13') {
                tennisMatches.push(item)
              } else if (item.sport == '91') {
                volleyballMatches.push(item)
              } else if (item.sport == '151') {
                esportsMatches.push(item)
              } else if(item.sport == '16') {
                baseballMatches.push(item)
              }
            })

            this.footballMatches = this.serializeList(footballMatches, 2)
            this.basketballMatches = this.serializeList(basketballMatches, 2)
            this.tennisMatches = this.serializeList(tennisMatches, 2)
            this.volleyballMatches = this.serializeList(volleyballMatches, 2)
            this.esportsMatches = this.serializeList(esportsMatches, 2)
            this.baseballMatches = this.serializeList(baseballMatches, 2)

            console.log('volleyballMatches===', volleyballMatches)
            this.startLoop = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    _selectSport(item) {
      let sport = item.sport
      console.log('sport', sport)
      this.$router.push(`/index/sport?sport=${sport}`)
    },

    // 获取当前展示的 比赛ID数据
    getHomeMatchIds(exceptHot = false) {
      let changeMatchIds = []

      this.footballMatches.forEach(item => {
        changeMatchIds.push(item.match.id)
      })

      this.basketballMatches.forEach(item => {
        changeMatchIds.push(item.match.id)
      })

      this.tennisMatches.forEach(item => {
        changeMatchIds.push(item.match.id)
      })

      this.volleyballMatches.forEach(item => {
        changeMatchIds.push(item.match.id)
      })

      this.esportsMatches.forEach(item => {
        changeMatchIds.push(item.match.id)
      })

      this.baseballMatches.forEach(item => {
        changeMatchIds.push(item.match.id)
      })

      if (exceptHot) {
        this.hotMatches.forEach(item => {
          changeMatchIds.push(item.match_id)
        })
      }

      return changeMatchIds.join(',')
    },

    // 轮询获取 比赛变更信息
    loopGetHomeMatchChanges() {
      this.loopTimes++

      // 如果轮询次数超过10次 从新拉取列表信息
      if (this.loopTimes >= 10) {

        // 准备拉取列表信息 禁止轮询
        this.startLoop = false
        this.loopTimes = 0

        this._getGroundMatches()
        return
      }

      this._getHomeMarketChanges()
      this._getHomeMatchChanges()
    },

    _getHomeMatchChanges() {
      let match_ids = this.getHomeMatchIds()

      if (!match_ids) return;

      this._getMatchChanges(match_ids)
    },

    _getHomeMarketChanges() {
      let match_ids = this.getHomeMatchIds(true)

      if (!match_ids) return;

      this._getMarketChanges(match_ids)
    },

    // 获取体育分类和比赛数量
    _getSportCategory(category = 'inplay') {

      // 默认 滚球
      getSportCategory(category)
        .then(res => {
          if (res.code === 200 && res.data) {

            let list = res.data

            list.forEach(sport => {
              if (sport.id === 0) {
                this.sportCount = sport.count
              }
            })
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },

    format(date, fmt) {
      return format(date, fmt)
    }
  },

  beforeRouteEnter(from, to, next) {
    console.log('beforeRouteEnter');
    next(_this => {
      Event.$on('fetch-match-change', () => {
        if (_this.startLoop === true) {
          _this.loopGetHomeMatchChanges()
        }
      })
      _this._getGroundMatches(true)
      _this._getSportCategory()
    })
  },

  beforeRouteLeave(from, to, next) {
    console.log('beforeRouteLeave');
    Event.$off('fetch-match-change')
    next()
  }
};
