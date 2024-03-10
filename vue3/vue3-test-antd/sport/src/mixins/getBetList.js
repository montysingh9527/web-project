import {mapGetters, mapMutations} from "vuex"
import {getMarketChanges, getMatchChanges, getMatches, getUpcomingMatches} from "../axios/sport";
import {addClass, hasClass, removeClass} from "../assets/js/dom"
import {format} from "../assets/js/util";
import {handicaps} from "../common/config"
import chooseBet from "../mixins/choose-bets"

const week = ['w_0', 'w_1', 'w_2', 'w_3', 'w_4', 'w_5', 'w_6']

export default {
  mixins: [chooseBet],
  data() {
    return {
      list: [],
      activeCollapses: [],
      countries: [],
      country: {},
    }
  },
  computed: {
    ...mapGetters(['bets'])
  },

  methods: {
    ...mapMutations({updateBet: 'UPDATE_BET'}),
    /**获取比赛列表**/
    _getMatches(params = this.defaultParams, loading = false) {
      this.clearTimer()

      this.params = params

      this.timer = setTimeout(() => {
        getMatches(params, loading)
          .then(res => {
            if (res.code === 200) {
              this.initialList = res.data.data.filter(item => item.markets.length && item.market_groups.length)

              // 1号模板
              this.countries = res.data.country
              this.country = Object.keys(this.country).length ? this.country : (this.countries[0] || {})
              this.loading = false

              // 允许轮询
              this.startLoop = true

              this.list = this.serializeList(this.initialList)
              console.log('serializeList====', this.list)
              this.initActiveCollapses()
            }
          })
          .catch(err => {
            this.loading = false
            console.log('err', err)
          })
      }, 20)
    },

    _getUpcomingList(params = this.defaultParams, loading = false) {
      this.clearTimer()

      this.params = params

      this.timer = setTimeout(() => {
        getUpcomingMatches(params, loading)
          .then(res => {
            if (res.code === 200) {
              this.initialList = res.data.filter(item => item.markets.length)

              // 允许轮询
              this.startLoop = true

              this.list = this.serializeList(this.initialList)

              console.log('serializeList====', this.list)

              this.initActiveCollapses()
            }
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      }, 20)
    },

    /**
     * 轮询获取 比赛变更信息
     * 每隔 一段时间重新获取 比赛变更
     * 10次后 重新拉取原始列表接口
     * **/
    async loopGetMatchChanges() {

      this.loopTimes++
      this.startLoop = false

      // 如果轮询次数超过10次 从新拉取列表信息
      if (this.loopTimes >= 5) {

        // 准备拉取列表信息 禁止轮询
        this.startLoop = false
        this.loopTimes = 0

        if (this.params.category === 'matches') {
          this._getUpcomingList(this.params)
        } else {
          this._getMatches(this.params)
        }

        return;
      }

      // 只有滚球或收藏 监听 marketChange
      if (this.params.category === 'inplay' || this.params.category === 'favorite') {
        this._getMarketChanges()

        // 隔5次拉一次 比赛信息
        if (this.loopTimes % 2 === 0) {
          this._getMatchChanges()
          // this.list = this.serializeList(this.initialList)
        }
      } else {
        this._getMarketChanges()
      }

      this.startLoop = true
    },

    _getMatchChanges(ids = '') {
      let match_ids = ids ? ids : this.getChangedMatchIds().join(',')

      if (!match_ids) return;
      getMatchChanges(match_ids)
        .then(res => {
          if (res.code === 200) {
            let matches = res.data.matches

            matches.forEach(match => {
              this.updateMatch(match)
            })
          }
        })
        .catch(err => console.log(err))
    },

    _getMarketChanges(ids = '') {
      let match_ids = ids ? ids : this.getChangedMatchIds().join(',')

      if (!match_ids) return;

      getMarketChanges(match_ids)
        .then(res => {
          if (res.code === 200) {
            let obj = res.data

            // 变动比赛玩法 数组
            let markets = obj.markets

            markets.forEach(market => {
              let key = `${market.match_id}-${market.market_id}`

              // if (this.mark[key]) {
              //     this.updateMarketDom(key, market)
              // }
              this.updateMarketDom(key, market)

              if (this.bets[key]) {
                if (this.compareObj(this.bets[key], market)) {
                  let bet = this.bets[key]
                  let title = this.betTitle(market, {code: bet.group_code}, {
                    home_name: bet.home_name,
                    away_name: bet.away_name
                  })
                  this.updateBet({key, bet: {disable: 1, ...market, title}})
                }
              }
            })
          }
        })
        .catch(err => Promise.reject(err))
    },

    /**
     * 重新 比赛列表 主要是数组转对象
     * arr 原始接口获取的列表
     * type 1 标准模式 2 简单模式(不要联赛名称)
     **/
    serializeList(arr, type = 1) {

      let leaguesObj = {}
      let list = []

      arr.forEach(item => {
        let match = {...item.match, market_groups: {}, sport: item.sport, league_name: item.league.name}
        let sport_id = String(item.sport)
        switch (sport_id) {
          case '1':
            match.market_groups = this.footballGroups(item)
            break;
          case '18':
            match.market_groups = this.basketballGroups(item)
            break;
          case '13':
            match.market_groups = this.tennisGroups(item)
            break;
          case '91':
            match.market_groups = this.volleyballGroups(item)
            break;
          case '16':
            match.market_groups = this.baseballGroups(item)
            break;
          case '151':
            match.market_groups = this.gamingGroups(item)
            break;
        }

        if (type === 2) {
          item.match = match
          list.push(item)
        }

        if (this.params.category === 'matches') {
          // 将所有比赛日期相同的比 归为一组
          let key = new Date(item.match.start_time * 1000).getDay()
          let dateTxt = format(new Date(item.match.start_time * 1000), 'MM-dd')

          if (!leaguesObj[key]) {
            leaguesObj[key] = {
              matches: [match],
              ...item.league,
              title: `${this.$t(week[key])} ${dateTxt}`,
              start_time: item.match.start_time,
              sport: item.sport,
            }
          } else {
            leaguesObj[key].matches.push(match)
          }

          return Object.values(leaguesObj).sort((a, b) => a.start_time - b.start_time)
        }

        if (!leaguesObj[item.league.id]) {
          leaguesObj[item.league.id] = {
            matches: [match],
            ...item.league,
            sport: item.sport,
            is_favorite: match.is_favorite
          }
        } else {
          leaguesObj[item.league.id].matches.push(match)
          let is_favorite = leaguesObj[item.league.id].is_favorite === 1

          leaguesObj[item.league.id].matches.forEach(match => {
            is_favorite = is_favorite && match.is_favorite === 1
          })

          leaguesObj[item.league.id].is_favorite = is_favorite ? 1 : 0
        }
      })


      if (type === 2) {
        console.log(list);
        return list
      }

      // 筛选出所有不同ID联赛
      console.log('list', Object.values(leaguesObj));
      return Object.values(leaguesObj)
    },

    footballGroups(item = {market_groups: [], markets: []}) {
      const {market_groups, markets, match} = item

      let full_time_result = market_groups.find(group => group.code === 'full_time_result') || {code: 'full_time_result'}
      let asian_handicap = market_groups.find(group => group.code === 'asian_handicap') || {code: 'asian_handicap'}
      let match_goals = market_groups.find(group => group.code === 'match_goals') || {code: 'match_goals'}

      markets.forEach(market => {
        this.mark[`${match.id}-${market.market_id}`] = true

        if (market.name === '1' && market.market_group_id === full_time_result.market_group_id) full_time_result['1'] = market || {}
        if (market.name === 'x' && market.market_group_id === full_time_result.market_group_id) full_time_result['x'] = market || {}
        if (market.name === '2' && market.market_group_id === full_time_result.market_group_id) full_time_result['2'] = market || {}
        if (market.header2 === 'h' && market.market_group_id === asian_handicap.market_group_id) asian_handicap['1'] = market || {}
        if (market.header2 === 'a' && market.market_group_id === asian_handicap.market_group_id) asian_handicap['2'] = market || {}
        if (market.header2 === 'o' && market.market_group_id === match_goals.market_group_id) match_goals['1'] = market || {}
        if (market.header2 === 'u' && market.market_group_id === match_goals.market_group_id) match_goals['2'] = market || {}
      })

      return {
        full_time_result: {...full_time_result, navs: ['1', 'x', '2']},
        asian_handicap: {...asian_handicap, navs: ['1', '2']},
        match_goals: {...match_goals, navs: ['1', '2']}
      }
    },

    // 篮球
    basketballGroups(item = {market_groups: [], markets: []}) {
      const {market_groups, markets, match} = item

      let groups = {}

      let basketball_game_lines = market_groups.find(group => group.code === 'basketball_game_lines') || {}

      groups['basketball_game_lines_spread'] = {...basketball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      groups['basketball_game_lines_total'] = {...basketball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      groups['basketball_game_lines_money_line'] = {...basketball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      markets.forEach(market => {
        this.mark[`${match.id}-${market.market_id}`] = true

        if (Number(market.header) === 1 && market.name === 'Spread' && market.market_group_id === basketball_game_lines.market_group_id) groups['basketball_game_lines_spread']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'Spread' && market.market_group_id === basketball_game_lines.market_group_id) groups['basketball_game_lines_spread']['2'] = market || {}
        if (Number(market.header) === 1 && market.name === 'Total' && market.market_group_id === basketball_game_lines.market_group_id) groups['basketball_game_lines_total']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'Total' && market.market_group_id === basketball_game_lines.market_group_id) groups['basketball_game_lines_total']['2'] = market || {}
        if (Number(market.header) === 1 && market.name === 'Money Line' && market.market_group_id === basketball_game_lines.market_group_id) groups['basketball_game_lines_money_line']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'Money Line' && market.market_group_id === basketball_game_lines.market_group_id) groups['basketball_game_lines_money_line']['2'] = market || {}
      })

      return groups
    },

    // 网球
    tennisGroups(item) {
      const {market_groups, markets, match} = item

      // 比赛获胜
      let tennis_to_win_match = market_groups.find(group => group.code === 'tennis_to_win_match') || {code: 'tennis_to_win_match'}

      // 赛盘投注 主队/客队
      let tennis_set_betting = market_groups.find(group => group.code === 'tennis_set_betting') || {code: 'tennis_set_betting'}

      tennis_to_win_match.navs = ['1', '2']
      tennis_set_betting.navs = ['1', '2']
      tennis_set_betting['1'] = []
      tennis_set_betting['2'] = []

      markets.forEach(market => {
        this.mark[`${match.id}-${market.market_id}`] = true

        if (Number(market.header) === 1 && market.market_group_id === tennis_to_win_match.market_group_id) tennis_to_win_match['1'] = market || {}
        if (Number(market.header) === 2 && market.market_group_id === tennis_to_win_match.market_group_id) tennis_to_win_match['2'] = market || {}
        if (Number(market.header) === 1 && market.market_group_id === tennis_set_betting.market_group_id) tennis_set_betting['1'].push(market)
        if (Number(market.header) === 2 && market.market_group_id === tennis_set_betting.market_group_id) tennis_set_betting['2'].push(market)
      })

      return {
        tennis_to_win_match: {...tennis_to_win_match, navs: ['1', '2']},
        tennis_set_betting
      }
    },

    // 排球
    volleyballGroups(item) {
      const {market_groups, markets, match} = item
      let groups = {}

      let volleyball_game_lines = market_groups.find(group => group.code === 'volleyball_game_lines')

      if (!volleyball_game_lines) return {}

      groups['to_win'] = {...volleyball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      groups['total_points'] = {...volleyball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      groups['handicap_sets'] = {...volleyball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      markets.forEach(market => {
        this.mark[`${match.id}-${market.market_id}`] = true

        if (Number(market.header) === 1 && market.name === 'to_win' && market.market_group_id === groups['to_win'].market_group_id) groups['to_win']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'to_win' && market.market_group_id === groups['to_win'].market_group_id) groups['to_win']['2'] = market || {}
        if (Number(market.header) === 1 && market.name === 'total_points' && market.market_group_id === groups['total_points'].market_group_id) groups['total_points']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'total_points' && market.market_group_id === groups['total_points'].market_group_id) groups['total_points']['2'] = market || {}
        if (Number(market.header) === 1 && market.name === 'handicap_sets' && market.market_group_id === groups['handicap_sets'].market_group_id) groups['handicap_sets']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'handicap_sets' && market.market_group_id === groups['handicap_sets'].market_group_id) groups['handicap_sets']['2'] = market || {}
      })

      return groups
    },

    // 棒球
    baseballGroups(item) {
      const {market_groups, markets, match} = item
      let groups = {}

      let baseball_game_lines = market_groups.find(group => group.code === 'baseball_game_lines')

      if (!baseball_game_lines) return {}

      // 让垒
      groups['run_line'] = {...baseball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      // 强弱盘
      groups['money_line'] = {...baseball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      // 总分
      groups['total_points'] = {...baseball_game_lines, '1': {}, '2': {}, navs: ['1', '2']}

      markets.forEach(market => {
        this.mark[`${match.id}-${market.market_id}`] = true

        if (Number(market.header) === 1 && market.name === 'run_line' && market.market_group_id === groups['run_line'].market_group_id) groups['run_line']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'run_line' && market.market_group_id === groups['run_line'].market_group_id) groups['run_line']['2'] = market || {}
        if (Number(market.header) === 1 && market.name === 'money_line' && market.market_group_id === groups['money_line'].market_group_id) groups['money_line']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'money_line' && market.market_group_id === groups['money_line'].market_group_id) groups['money_line']['2'] = market || {}
        if (Number(market.header) === 1 && market.name === 'total_points' && market.market_group_id === groups['total_points'].market_group_id) groups['total_points']['1'] = market || {}
        if (Number(market.header) === 2 && market.name === 'total_points' && market.market_group_id === groups['total_points'].market_group_id) groups['total_points']['2'] = market || {}
      })

      return groups
    },

    // 电子竞技
    gamingGroups(item = {}) {
      const {market_groups, markets, match} = item

      // 比赛获胜
      const obj = market_groups.find(group => group.code === 'esports_match_lines') || {code: 'esports_match_lines'};
      let to_win = {...obj, navs: ['1', '2']};
      let match_handicap = {...obj, navs: ['1', '2']}
      let total_maps = {...obj, navs: ['1', '2']}

      markets.forEach(market => {
        this.mark[`${match.id}-${market.market_id}`] = true

        if (market.name === 'to_win' && market.header == 1 && market.market_group_id === to_win.market_group_id) to_win['1'] = market || {}
        if (market.name === 'to_win' && market.header == 2 && market.market_group_id === to_win.market_group_id) to_win['2'] = market || {}

        if (market.name === 'match_handicap' && market.header == 1 && market.market_group_id === match_handicap.market_group_id) match_handicap['1'] = market || {}
        if (market.name === 'match_handicap' && market.header == 2 && market.market_group_id === match_handicap.market_group_id) match_handicap['2'] = market || {}

        if (market.name === 'total_maps' && market.header == 1 && market.market_group_id === total_maps.market_group_id) total_maps['1'] = market || {}
        if (market.name === 'total_maps' && market.header == 2 && market.market_group_id === total_maps.market_group_id) total_maps['2'] = market || {}
      })

      return {
        to_win: {...to_win, navs: ['1', '2']},
        match_handicap: {...match_handicap, navs: ['1', '2']},
        total_maps: {...total_maps, navs: ['1', '2']},
      }
    },

    /***
     * 更新 玩法 dom
     * refId 玩法ref
     **/
    updateMarketDom(refId, market) {
      //主要更新 odds name handicap,
      let odds_dom = document.getElementById(`bet-odds-${refId}`)
      let name_dom = document.getElementById(`bet-name-${refId}`)
      let handicap_dom = document.getElementById(`bet-handicap-${refId}`)

      const {odds, name, handicap, is_suspend, is_show} = market
      if (odds_dom && odds !== odds_dom.innerHTML) {
        // console.log('赔率变化', odds_dom.innerHTML, odds)
        // console.log('-------------------------------')
        odds_dom.innerHTML = odds
      }

      if (is_suspend === '0' && is_show === '1') {
        if (odds_dom) odds_dom.className = 'center market-odds'
      } else {
        if (odds_dom) odds_dom.className = 'center disabled'
      }

      if (name_dom && name !== name_dom.innerHTML) {
        name_dom.innerHTML = name
      }

      if (handicap_dom && handicap !== handicap_dom.innerHTML) {
        handicap_dom.innerHTML = handicap
      }
    },

    /**
     * 更新滚球 比赛信息
     * **/
    updateMatch(match) {
      const match_id = match.match_id

      // 总比分
      let home = document.getElementById(`match-home-score-0-${match_id}`)
      let away = document.getElementById(`match-away-score-0-${match_id}`)

      if (match.ss && home && away) {
        let {home_score, away_score} = this.score(match.ss)

        // 如果比分变化更新比分
        if (Number(home.innerHTML) !== Number(home_score[0])) {
          console.log(`更新主队 ${match.home_name}比分:`, home_score[0])
          home.innerHTML = home_score[0]
        }
        if (Number(away.innerHTML) !== Number(away_score[0])) {
          console.log(`更新客队${match.away_name} 比分:`, away_score[0])
          away.innerHTML = away_score[0]
        }
      }
      // 计时

      // 发球方
      let home_indicator = document.getElementById(`match-home-indicator-${match_id}`)
      let away_indicator = document.getElementById(`match-away-indicator-${match_id}`)

      // 更新主队发球
      if (match.playing_indicator === '1') {
        // console.log('主队发球')
        if (home_indicator) addClass(home_indicator, 'active')
        if (away_indicator) removeClass(away_indicator, 'active')
      } else if (match.playing_indicator === '2') {
        // console.log('客队发球')
        if (home_indicator) removeClass(home_indicator, 'active')
        if (away_indicator) addClass(away_indicator, 'active')
      } else if (match.playing_indicator === 'x') {
        if (home_indicator) removeClass(home_indicator, 'active')
        if (away_indicator) removeClass(away_indicator, 'active')
      }

      // 赛盘赛局
      let current_set = document.getElementById(`match-current-set-${match_id}`)
      let current_game = document.getElementById(`match-current-game-${match_id}`)

      if (current_set && String(current_set.innerHTML) !== String(match.current_set)) {
        current_set.innerHTML = match.current_set
      }
      if (current_game && String(current_game.innerHTML) !== String(match.current_game)) {
        current_game.innerHTML = match.current_game
      }
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

    /**
     * 初始化展开联赛
     */
    initActiveCollapses() {
      let leagueIds = [...this.activeCollapses]

      let total = leagueIds.length > 7 ? 3 : 7

      for (let i = 0; i < this.list.length; i++) {
        let league = this.list[i]
        let ln = league.matches.length
        total -= ln

        if (total > 0) {
          leagueIds.push(league.id)
        } else {
          this.activeCollapses = leagueIds
          return;
        }
      }
    },

    /** 获取当前展示的 比赛ID数据*/
    getChangedMatchIds(activeCollapses = []) {
      let changeMatchIds = []

      if (this.initialList && this.initialList.length) {
        this.initialList.forEach(item => {
          if (this.activeCollapses.find(id => item.league.id === id)) {
            changeMatchIds.push(item.match.id)
          }
        })

        // 注单内容比赛id
        for (let key in this.bets) {
          changeMatchIds.push(this.bets[key].match_id)
        }

        // 去重
        changeMatchIds = [...new Set(changeMatchIds)]
      }

      return changeMatchIds
    },

    // 比较两个对象是否有变化
    compareObj(newObj, oldObj) {
      let keys = ['odds', 'is_show', 'is_suspend', 'handicap', 'name']

      let flag = false

      keys.forEach(key => {
        flag = flag || (newObj[key] !== oldObj[key])
      })

      return flag
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },

  created() {
    this.handicaps = handicaps

    this.loopTimes = 0 // 轮询次数
    this.startLoop = false // 是否监听
    this.initialList = [] // 缓存原始列表
    this.timer = null

    this.defaultParams = {
      sport: '1', // 1 足球 18 篮球
      category: 'inplay',
      page: 1,
      pageSize: 200,
      league: ''
    }

    this.params = {}

    // market 标记集合 {match_id-market_id: true}
    this.mark = {}
  },
};
