/**

 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  usr:'',
  permissions: [],
  wsUrl:'',
  permissionsTree:''
})
const getters = {
  accessToken: (state) => state.accessToken, 
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  usr: (state) => state.usr,
  wsUrl:(state) => state.wsUrl,
  permissionsTree:(state) => state.permissionsTree,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setUsr(state, usr) {
    state.usr = usr
  },
  setWsUrl(state, wsUrl) {
    state.wsUrl = wsUrl
  },
  setpermissionsTree(state, permissionsTree) {
    state.permissionsTree = permissionsTree
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    localStorage.setItem('needGaSecret',data.data.needGaSecret)
    const accessToken = data['code']
    if (accessToken == 0) {
      commit('setAccessToken', data.data['API-SID'])
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `${data.msg}...`,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    const data = await getUserInfo(state.accessToken)
    if(data.code == 0) {
      let permissions = (data.data.role.privs).split(',')
      if(data.data.isKefu) {
        permissions.push('kefu')
      }
      commit('setPermissions', permissions)
      commit('setUsername', data.data.name)
      commit('setUsr', data.data.usr)
      commit('setWsUrl',data.data.wsUrl)
      commit('setpermissionsTree',data.data.permissions)
      commit('setAvatar', data.data.avatar)
      return permissions
    }else{
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
