import $http from './http'

export function getLotteryList() {
    const url = '/mobile/static/data/getCateTypes'
    return $http.get(url, {}, {loading: false, cache: false})
}
