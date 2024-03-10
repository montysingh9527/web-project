import request from '@/utils/request'

export function getImgCaptcha(params) {
  return request({
    url: '/secure/imgCaptcha',
    method: 'get',
    params
  })
}

export function loginCaptcha(params) {
  return request({
    url: '/admin/loginCofig',
    method: 'get',
    params
  })
}


