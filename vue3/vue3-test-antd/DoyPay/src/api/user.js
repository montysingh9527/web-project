import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'
import md5 from 'md5'

export async function login(data) {
  data = JSON.stringify(data);
  let params = JSON.parse(data);
  params.pwd = md5(params.pwd);
  return request({
    url: '/admin/login',
    method: 'post',
    data:params,
  })
}

export function getUserInfo(accessToken) {
  const params = {
    token:accessToken
  }
  return request({
    url: '/admin/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}

export function chagnePwd(data) {
  data = JSON.stringify(data);
  let params = JSON.parse(data);
  params.old_pwd = md5(params.old_pwd);
  params.new_pwd = md5(params.new_pwd);
  params.confirm_pwd = md5(params.confirm_pwd);
  return request({
    url: '/admin/editMyLoginPwd',
    method: 'post',
    data:params
  })
}
