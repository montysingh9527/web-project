import request from '@/utils/request'

export function getSetting(params) {
  return request({
    url: '/system/settings',
    method: 'get',
    params
  })
}

export function updateSetting(data) {
  return request({
    url: '/system/updateSettings',
    method: 'post',
    data:{
      settings:data
    }
  })
}

