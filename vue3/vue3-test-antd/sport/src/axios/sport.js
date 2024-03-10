import $http from './http'
import Cookie from "js-cookie";

/**
 * 获取所有体育类型
 * 分类（选填）。默认inplay。today=今天; upcoming=早盘；inplay=滚球；favorite=收藏
 **/
export function getSportCategory(category = 'today') {
    const url = `/mobile/sports/category?category=${category}`;

    return $http.get(url, {},{ loading: false, cache: false})
}

/**
 * 获取所有国家分类
 **/
export function getCountries() {
    const url = '/mobile/sports/country';

    return $http.get(url, {},{ loading: true, cache: true, cacheTime: 1000 * 10})
}

/**
 * 获取比赛列表
 * sport 体育类型
 * country 国家
 * day 日期 2020 07 20
 * league 联赛ID（选填)
 * category 分类 (today=今天; upcoming=早盘；inplay=滚球；favorite=收藏)
 **/
export function getMatches(data = {sport: '0'}, loading) {
    const url = '/mobile/sports/matches';

    return $http.get(url, data,{ loading })
}

/**
 *  比赛详情
 **/
export function getMatchInfo(id) {
    const url = `/mobile/sports/match?id=${id}`;

    return $http.get(url, {}, { loading: false, cacheTime: 1000 })   //2019/05/30
}

/**
 *  比赛详情
 **/
export function getHomeInplayMatches(loading) {
    const url = `/mobile/sports/homeInplayMatches`;

    return $http.get(url, {}, { loading, cacheTime: 1000 })   //2019/05/30
}

/**
 *  投注
 *  category 投注类型（选填）。默认=single。single=单式；multiple=复式
 *  betInfo Array [{
 *      matchId: 比赛ID,
 *      marketId: 玩法ID,
 *      odds 赔率
 *      money 投注金额
 *  }]
 *  amount 投注总金额
 **/

export function submitBet(params) {
    const url = `/mobile/sports/bet`;
    return $http.post(url, params, { loading: false })
}

/**
 * 收藏
 **/
export function favorite(data = {}) {
    const url = `/mobile/sports/favorite`;
    return $http.post(url, data, { loading: false })
}

/**
 * 滚动通告
 *  client 客户端（选填）。默认=pc。pc=PC端；mobile=手机端
 *  limit 消息条数 默认5
 **/
export function getScrollNotices({limit = 5, client = 'pc'} = {}) {
    const url = `/mobile/sports/scrollNotices`;
    return $http.get(url, {limit, client}, { loading: false })
}

/**
 * 通告列表
 *  client 客户端（选填）。默认=pc。pc=PC端；mobile=手机端
 *  startDate yyyy-MM-dd
 *  endDate yyyy-MM-dd
 **/
export function getNotices(data = {}) {
    const url = `/mobile/sports/notices`;
    return $http.get(url, data, { loading: false })
}

/**
 * 热门赛事
 * client 客户端（选填）。默认=pc。pc=PC端；mobile=手机端
 * startDate yyyy-MM-dd
 * endDate yyyy-MM-dd
 **/
export function getHotInplayMatches(sportId = '0') {
    const url = `/mobile/sports/hotInplayMatches?sport=${sportId}&limit=10`;
    return $http.post(url, {}, { loading: false })
}

/**
 * 精选赛事
 *  client 客户端（选填）。默认=pc。pc=PC端；mobile=手机端
 *  startDate yyyy-MM-dd
 *  endDate yyyy-MM-dd
 **/
export function getHotMatches(params) {
    const lang = localStorage.getItem('lang');
    const url = `/mobile/sports/recommendMatches`;
    return $http.get(url, {...params, limit: 20, languageCode: lang}, { loading: false })
}

/**
 * 获取联赛下所有比赛
 *  league 联赛ID
 **/
export function getleagueMatches(leagueId) {
    const url = `/mobile/sports/leagueMatches?league=${leagueId}`;
    return $http.get(url, {}, { loading: false })
}

/**
 * 定时请求获取 比赛玩法变动
 *  比赛ID
 **/
export function getMatchMarkets(matchId) {
    const url = `/mobile/sports/matchMarkets`;
    return $http.get(url, {languageCode: localStorage.getItem('lang'), id: matchId}, { loading: false })
}

/**
 * 定时请求获取 比赛结果变动
 *  比赛ID
 **/
export function getMatchResult(matchId) {
    const url = `/mobile/sports/matchResult?id=${matchId}`;
    return $http.get(url, {}, { loading: false })
}

/**
 * 定时请求获取 玩法变动
 **/
export function getMarketChanges(match_ids = '') {
    const url = `/mobile/sports/marketChanges`;
    return $http.get(url, {match_ids, languageCode: localStorage.getItem('lang')}, { loading: false })
}

/**
 * 定时请求获取 比赛结果变动
 **/
export function getMatchChanges(ids) {
    const url = `/mobile/sports/matchChanges?match_ids=${ids}`;
    return $http.get(url, {}, { loading: false })
}

/**
 * 未结算注单
 **/
export function getUnsettledBets(query = {}) {
    const url = `/mobile/sports/unsettledBets`;
    return $http.get(url, query, { loading: false })
}

/**
 * 已结注单
 * start_date 起始时间 2020-07-24
 * end_date 结束时间 2020-07-26
 * page
 * pageSize
 **/
export function getBetHistory(params = {}) {
    const url = `/mobile/sports/betHistory`;
    return $http.get(url, params, { loading: false })
}

/**
 * 比赛赛果
 * startDate 起始时间 2020-07-24
 * endDate 结束时间 2020-07-26
 * league 联赛ID
 * sport 运动ID
 * page
 * pageSize
 **/
export function getMatchHistory(params = {}, loading) {
    const url = `/mobile/sports/matchHistory`;
    return $http.get(url, params, { loading })
}

/**
 * 搜索
 * keywords 关键字
 **/
export function search(keywords = '', loading) {
    const url = `/mobile/sports/search?keywords=${keywords}`;
    return $http.get(url, {}, { loading })
}

/**
 * 玩法分组列表
 **/
export function getMarketGroups(id = 1) {
    const url = `/mobile/sports/bet365SportMarketGroups?sport=${id}`;
    return $http.get(url, {}, { loading: false })
}

/**
 * bet365模板-根据玩法分组获取国家联赛列表【公用】
 * market_group_code
 * country
 **/
export function getLeaguesByMarketGroup(params) {
    const url = `/mobile/sports/bet365LeaguesByMarketGroup`;
    return $http.get(url, {...params}, { loading: false })
}

/**
 * bet365模板-早盘赛事列表
 * market_group_code 玩法组
 * league 联赛ID
 **/
export function getUpcomingMatches(params, loading) {
    const url = `/mobile/sports/bet365UpcomingMatches`;
    return $http.get(url, {...params}, { loading })
}

/**
 * bet365模板-国家联赛列表
 * country 国家编码C
 **/
export function getCountryLeagues(country) {
    const url = `/mobile/sports/leagues?sport=1&country=${country}`;
    return $http.get(url, {}, { loading: false })
}

/**
 * bet365模板-国家联赛列表
 * country 国家编码C
 **/
export function getHomeGames() {
    const token = Cookie.get('loginsessid');
    const url = `/wjapp/api.php?c=game&a=homeGames&token=${token}`;
    return $http.get(url, {}, { loading: false })
}

/**
 * 获取语言列表
 * */
export function getLanguages() {
    let url = '/wjapp/api.php?c=language&a=getconfigs';

    return $http.get(url)
}

/**
 * 切换语言
 * */
export function changeLanguage(lang = 'zh-cn') {
    const url = '/language/changeTo';
    const token = Cookie.get('logintoken');
    const param = {languageCode: lang }
    if(token) param.token = token;

    return $http.post(url, param)
}

/**
 * 获取排行榜
 * */
export function getPlayerRanking() {
    const url = '/mobile/sports/ranking'
    return $http.get(url)
}

/**
 * 撤销注单
 * */
export function cancelBet(betId = '') {
    const url = '/mobile/sports/cancelBet'
    return $http.post(url, {id: betId})
}