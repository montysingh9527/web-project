import request from '@/utils/request'

export function getPayList(params) {
  return request({
    url: '/order/getPayList',
    method: 'get',
    params
  })
}

export function patchNotice(params) {
  return request({
    url: '/order/patchPayNotice',
    method: 'get',
    params
  })
}


export function merchantInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

