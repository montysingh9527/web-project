import request from '@/utils/request'

export function getSetting(data) {
  return request({
    url: '/chat/settings',
    method: 'get',
  })
}

export function updateSetting(data) {
  return request({
    url: '/chat/updateSettings',
    method: 'post',
    data:{
      settings:data
    }
  })
}

export function logList(params) {
  return request({
    url: '/chat/logList',
    method: 'get',
    params
  })
}
export function kefuList(params) {
  return request({
    url: '/chat/kefuLogList',
    method: 'get',
    params
  })
}
export function userList(params) {
  return request({
    url: '/chat/userList',
    method: 'get',
    params
  })
}

export function addCustomerService(data) {
  return request({
    url: '/chat/addKefu',
    method: 'post',
    data
  })
}
export function delKefu(data) {
  return request({
    url: '/chat/delKefu',
    method: 'post',
    data
  })
}


export function talkList(params) {
  return request({
    url: '/chat/talkList',
    method: 'get',
    params
  })
}

export function logDetail(params) {
  return request({
    url: '/chat/logDetail',
    method: 'get',
    params
  })
}

export function chatTemplateList(params) {
  return request({
    url: 'chat/chatTemplateList',
    method: 'get',
    params
  })
}

export function addChatTemplate(data) {
  return request({
    url: '/chat/addChatTemplate',
    method: 'post',
    data
  })
}

export function delChatTemplate(data) {
  return request({
    url: '/chat/delChatTemplate',
    method: 'post',
    data
  })
}

export function getkefuList(params) {
  return request({
    url: '/chat/kefuList',
    method: 'get',
    params
  })
}
export function editChatTemplate(data) {
  return request({
    url: '/chat/editChatTemplate',
    method: 'post',
    data
  })
}

export function editKefu(data) {
  return request({
    url: '/chat/editKefu',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return request({
    url: '/chat/getUserInfo',
    method: 'get',
    params
  })
}

export function editKefuDuteStatus(data) {
  return request({
    url: '/chat/editKefuDuteStatus',
    method: 'post',
    data
  })
}

export function getKefuInfo(params) {
  return request({
    url: '/chat/getKefuInfo',
    method: 'get',
    params
  })
}

