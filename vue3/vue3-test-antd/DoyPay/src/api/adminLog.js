import request from '@/utils/request'

export function getAdminLog(params) {
  return request({
    url: '/admin/adminLog',
    method: 'get',
    params
  })
}

export function doEdit(data) {
  return request({
    url: '/adminLog/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/adminLog/doDelete',
    method: 'post',
    data,
  })
}


export function getAdminLogin(params) {
  return request({
    url: '/admin/loginList',
    method: 'get',
    params
  })
}