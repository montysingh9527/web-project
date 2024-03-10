import request from '@/utils/request'
import md5 from 'md5'

export function getList(params) {
  return request({
    url: '/user/userList',
    method: 'get',
    params,
  })
}

export function loginList(params) {
  return request({
    url: '/user/loginList',
    method: 'get',
    params,
  })
}

export function operationLogList(params) {
  return request({
    url: '/user/actionList',
    method: 'get',
    params,
  })
}

export function bankList(params) {
  return request({
    url: '/user/bankList',
    method: 'get',
    params,
  })
}

/* export function doEdit(data) {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}
 */

//删除会员
export function doDelete(data) {
  return request({
    url: '/user/delUser',
    method: 'post',
    data,
  })
}

//踢会员下线
export function kickOff(data) {
  return request({
    url: '/user/kickOff',
    method: 'post',
    data,
  })
}

//修改会员基本资料
export function editUser(data) {
  return request({
    url: '/user/editUser',
    method: 'post',
    data,
  })
}

//修改会员登录密码
export function changeLoginPwd(data) {
  data.new_pwd = md5(data.new_pwd);
  return request({
    url: '/user/changeLoginPwd',
    method: 'post',
    data,
  })
}

//修改会员提款密码
export function changeFundPwd(data) {
  data.new_pwd = md5(data.new_pwd);
  return request({
    url: '/user//changeFundPwd',
    method: 'post',
    data,
  })
}

//评价
export function getCommentList(params) {
  return request({
    url: '/user/commentList',
    method: 'get',
    params
  })
}

//删除银行
export function delBankAll(data) {
  return request({
    url: '/user/delBankAll',
    method: 'post',
    data,
  })
}

//开通商户
export function applyMerchant(params) {
  return request({
    url: 'user/applyMerchant',
    method: 'get',
    params,
  })
}

//编辑银行
export function editBank(data) {
  return request({
    url: '/user/editBank',
    method: 'post',
    data,
  })
}


export function getBank(params) {
  return request({
    url: '/system/bankList',
    method: 'get',
    params
  })
}
//删除单个银行
export function delBank(data) {
  return request({
    url: '/user/delBank',
    method: 'post',
    data,
  })
}

export function delSystemBank(params) {
  return request({
    url: '/system/delBank',
    method: 'get',
    params
  })
}

export function addBank(data) {
  return request({
    url: '/system/addBank',
    method: 'post',
    data
  })
}

export function changeBank(data) {
  return request({
    url: '/system/editBank',
    method: 'post',
    data
  })
}

export function changeBalanceFun(data) {
  return request({
    url: '/user/changeBalance',
    method: 'post',
    data
  })
}

export function changeCurMer(data) {
  return request({
    url: '/user/changeCurMer',
    method: 'post',
    data
  })
}

export function editMer(data) {
  return request({
    url: '/user/editMer',
    method: 'post',
    data
  })
}

export function cancelMerLoginLimit(data) {
  return request({
    url: '/user/cancelMerLoginLimit',
    method: 'post',
    data
  })
}

export function cancleCurMer(data) {
  return request({
    url: '/user/cancelCurMer',
    method: 'post',
    data
  })
}

export function getMerLoginLimitList(data) {
  return request({
    url: '/user/getMerLoginLimitList',
    method: 'post',
    data
  })
}

export function editComment(params) {
  return request({
    url: '/user/editComment',
    method: 'get',
    params
  })
}