import {getleagueMatches, getMatchInfo, getMatchMarkets, getMatchResult} from "../axios/sport";
import {format} from "../assets/js/util";
import {addClass, hasClass, removeClass} from "../assets/js/dom";
import {aliasStatus} from '../common/config'
import LoadImage from "../common/LoadImage";
import chooseBetsMixin from "./choose-bets";
import Event from '../event'
import {mapGetters} from "vuex";

// 越大越靠前
let sort_config = {
  // 足球
  "full_time_result": 99, // 独赢
  "asian_handicap": 98,   // 让球
  "match_goals": 97,  // 大小盘
  "correct_score": 96, // 全局比分
  "half_time_correct_score": 95, // 半场比分

  // 篮球
  "basketball_game_lines": 94, // 比赛投注
  "basketball_1st_half": 93, // 上半场
  "basketball_1st_half_lines": 92, // 第一节
  "basketball_2nd_half": 88, // 下半场投注
  "basketball_2nd_quarter_lines": 87, // 第2节投注
  "basketball_3rd_quarter_lines": 86, // 第3节投注
  "basketball_4th_quarter_lines": 85, // 第4节投注
  "basketball_point_spread_3_way": 83, // 让分三项

  // 网球
  "tennis_to_win_match": 77, // 比赛获胜
  "tennis_set_1_winner": 76, // 赛盘1获胜者
  "tennis_set_betting": 75, // 赛盘投注

  // 排球
  "volleyball_game_lines": 66, // 比赛投注
  "volleyball_correct_set_score": 65, // 赛局正确比分
}

export default {
  mixins: [chooseBetsMixin],
  data() {
    return {
      match: {timer: {}},
      markets: [],
      market_groups: [],
      market_tabs: [],
      group: {market_groups: []},
      groupIndex: 0,
      match_id: '',
      league_id: '',
      sport: '',
      league: {},
      match_status: '',
      matches: [],
      showPicker: false,
      showPicker2: false,
      loading: false,
      isLoad: false,
      isFavorite: false
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
    // playList() {
    //   // 没选玩法组返回空
    //   if (!this.group) return [];
    //   const market_groups = [...this.group.market_groups];
    //
    //   const obj = {};
    //
    //   market_groups.forEach(group_id => {
    //      obj[group_id] = this.market_groups.find(item => item.market_group_id === group_id) || {};
    //   })
    //
    //   this.markets.forEach(market => {
    //     const group_id = market.market_group_id;
    //     if(obj[group_id]) {
    //       if(!Array.isArray(obj[group_id].markets)) {
    //         obj[group_id].markets = [market];
    //       } else {
    //         obj[group_id].markets.push(market)
    //       }
    //     }
    //   })
    //
    //   console.log('list ==', Object.values(obj))
    //
    //   return Object.values(obj);
    // },
    playList() {
      // (如果有置顶功能)每次变动重新排序
      let topTabs = JSON.parse(sessionStorage.getItem('top-tabs') || '{}')

      if (!this.group) return []
      let market_groups = [...this.group.market_groups]
      /**
       * 如果有置顶功能 按置顶时间排序
       * 如果没有置顶功能 默认排序
       * */

      let list = market_groups
        .map(market_group_id => {
          let item = this.market_groups.find(item => item.market_group_id === market_group_id)

          item.markets = this.markets.filter(market => market_group_id === market.market_group_id)

          // 如果 本地有缓存 置顶数据
          if (topTabs[item.code] && topTabs[item.code].top === true) {
            item = {...item, ...topTabs[item.code]}
          } else {
            // 如果 本地没有缓存 或置顶为false 则根据默认 排序规则排序
            item.sort = sort_config[item.code] || 0
            item.top = false
          }

          return item;
        })
        // .sort((a, b) => b.sort - a.sort)

      console.log('playList', list)

      return list
    }
  },

  methods: {
    getSportName(sport = 1) {
      let id = Number(sport)

      if (id === 1) {
        return this.$t('fball')
      } else if (id === 18) {
        return this.$t('bball')
      } else if (id === 13) {
        return this.$t('tennis')
      } else if (id === 91) {
        return this.$t('vball')
      } else if (id === 16) {
        return this.$t('b_ball')
      } else if (id === 151) {
        return this.$t('esports')
      }
    },

    // 选择玩法组
    selectPlay(play) {
      console.log('selectPlay====', play)
      this.group = play
      this.groupIndex = play.index
    },

    findPlay(key, value, arr) {
      return arr.find(market => String(market[key]) === String(value)) || {}
    },

    // 赛盘投注比分归类
    scoreBetSetting(markets = []) {
      let obj = {}
      markets.forEach(market => {
        obj[market.name] = 1
      })

      return Object.keys(obj)
    },

    scoresObj(match = {}) {
      const { scores = {} } = match;
      let list = Object.values(scores)

      if (match.sport === '151') {
        return [...list]
      }
      return scores
    },

    // 比分序列化
    score(ss = '') {
      let arr = ss.split(',')
      let home_score = arr.map(v => v.split('-')[0])
      let away_score = arr.map(v => v.split('-')[1])
      return {
        home_score,
        away_score,
      }
    },

    // 置顶
    _keepTop(e, group) {
      let el = e.target;

      let flag = hasClass(el, 'zhiding')
      if (flag) { // 取消置顶
        removeClass(el, 'zhiding')
        addClass(el, 'weizhiding')
      } else { // 置顶激活
        addClass(el, 'zhiding')
        removeClass(el, 'weizhiding')
      }

      let topTabs = JSON.parse(sessionStorage.getItem('top-tabs') || "{}")

      topTabs[group.code] = {
        top: !flag,
        sort: !flag ? new Date().getTime() : sort_config[group.code],
      }

      sessionStorage.setItem('top-tabs', JSON.stringify(topTabs))

      // 调整排序
      let fIndex = this.group.market_groups.findIndex(id => id === group.market_group_id)

      let startArr = [...this.group.market_groups]
      let s = startArr.splice(fIndex, 1)

      let market_groups = [...s, ...startArr]

      this.group = {...this.group, market_groups}
    },

    // 变更比赛
    _changeMatch(match) {
      if (match.id === this.match.match_id) return;
      this.match = {...match}
      this.match_id = match.match_id || match.id
      this.sport = match.sport || match.sport_id
      this.league_name = match.league_name || ''
      this.showPicker = false
      this.showPicker2 = false

      // 获取比赛信息
      this._getMatchInfo()
    },

    // 获取联赛下所有比赛信息
    _getLeagueMatches() {
      if (!this.league_id) return;
      getleagueMatches(this.league_id)
        .then(res => {
          if (res.code === 200) {
            this.matches = res.data
          }
        })
    },

    // 获取比赛信息
    _getMatchInfo() {
      if (!this.match_id) return;

      this.loading = true

      getMatchInfo(this.match_id)
        .then(res => {
          this.loading = false
          this.isLoad = true

          if (res.code === 200) {
            this.groupIndex = 0
            this.markets = res.data.markets
            this.match = res.data.match
            this.league = res.data.league

            this.market_groups = res.data.market_groups
            this.market_tabs = res.data.market_tabs || []

            this.group = this.market_tabs[this.groupIndex] || {market_groups: []}
            this.isFavorite = res.data.isFavorite == '1'

            // 开始循环 请求比赛变动
            this.startLoop = true

            console.log('==========>', this.match);
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },

    _startGetMatchChange() {
      // 比赛结束取消轮询
      if (this.match.status === 3) {
        this.gameOver()
        return
      }

      this._getMatchMarkets(this.match_id)

      this._getMatchResult(this.match_id)
    },

    // 比赛玩法变动
    _getMatchMarkets(matchId) {
      getMatchMarkets(matchId)
        .then(res => {
          if (res.code === 200) {
            this.market_groups = res.data.market_groups
            this.market_tabs = res.data.market_tabs
            this.markets = res.data.markets
            this.group = this.market_tabs[this.groupIndex] || {market_groups: []}

            // 同步注单数据
            this.synchronizeBets(this.markets)

            // this._initDom()
          }
        })
        .catch(err => console.log(err))
    },

    // 比赛变动
    _getMatchResult(matchId) {
      getMatchResult(matchId)
        .then(res => {
          if (res.code === 200) {
            this.match = {...this.match, ...res.data}
            // 只有PC更新 左侧倒计时
            this.updateLeftList && this.updateLeftList(this.match)
          }
        })
    },

    gameOver() {
      // 如果比赛结束更新注单
      let bets = JSON.parse(sessionStorage.getItem('bets') || "{}")

      // 过滤掉非当前比赛 注单
      // 如果 filterBets 里有 match_id 但是markets没有玩法ID 则判断该玩法以封盘
      for (let k in this.bets) {

        if (bets[k].match_id === this.match_id) {
          this.updateBet({key: k, bet: {status: '3', disable: 1}})
        }
      }
    },

    synchronizeBets(markets) {
      // 如果 filterBets 里有 match_id 但是markets没有玩法ID 则判断该玩法以封盘
      for (let k in this.bets) {
        if (this.bets[k].match_id === this.match_id) {
          let market_id = this.bets[k].market_id

          if (!markets.find(market => market.market_id === market_id)) {
            this.updateBet({key: k, bet: {is_show: '0', disable: 1}})
          }
        }
      }

      markets.forEach(market => {
        let key = this.match_id + '-' + market.market_id

        if (this.bets[key] && this.bets[key].odds !== market.odds) {
          this.updateBet({key: key, bet: {...market, disable: 1}})
        }
      })
    },

    format(date, fmt) {
      return format(date, fmt)
    },

    aliasStatus(status) {
      return aliasStatus(status)
    }
  },

  components: {
    LoadImage
  },

  created() {
    this.startLoop = false
  },

  beforeRouteEnter(to, from, next) {
    // console.log('beforeRouteEnter--------------->', to.query)
    next(_this => {
      _this.league_id = String(to.query.league_id || '')
      _this.league_name = String(to.query.league_name || '')
      _this.match_id = to.query.match_id
      _this.match_status = to.query.match_status
      _this.sport = to.query.sport

      _this._getMatchInfo()
      _this._getLeagueMatches()

      Event.$on('fetch-match-change', () => {
        console.log('fetch-match-change');
        if (_this.startLoop) {
          _this._startGetMatchChange()
        }
      })
    })
  },

  beforeRouteLeave(to, from, next) {
    this.showPicker = false;

    this.startLoop = false;
    Event.$off('fetch-match-change')
    next()
  },

  beforeDestroy() {
    Event.$off('fetch-match-change')
  }
}
