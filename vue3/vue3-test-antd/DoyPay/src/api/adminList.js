import request from '@/utils/request'
import md5 from 'md5'
export function getList(params) {
  return request({
    url: '/admin/adminList',
    method: 'get',
    params
  })
}

export function doAdd(data) {
  data.pwd = md5(data.pwd);
  return request({
    url: '/admin/addAdmin',
    method: 'post',
    data,
  })
}

export function editAdmin(data) {
  if(data.pwd) {
    data.pwd = md5(data.pwd);
  }
  return request({
    url: '/admin/editAdmin',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  // data.old_pwd = md5(data.old_pwd);
  data.new_pwd = md5(data.new_pwd);
  return request({
    url: '/admin/editOtherLoginPwd',
    method: 'post',
    data,
  })
}

export function doOffline(data) {
  return request({
    url: '/admin/kickOffAdmin',
    method: 'post',
    data,
  })
}

export function getRoleList(data) {
  return request({
    url: '/admin/roleList',
    method: 'get',
  })
}

export function delRole(data) {
  return request({
    url: '/admin/delRole',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/admin/addRole',
    method: 'post',
    data
  })
}

export function roleList(data) {
  return request({
    url: '/admin/roleList',
    method: 'get',
  })
}

export function editRole(data) {
  return request({
    url: '/admin/editRole',
    method: 'post',
    data
  })
}

//删除管理员
export function delAdmin(data) {
  return request({
    url: '/admin/delAdmin',
    method: 'post',
    data
  })
}


//禁用角色
export function editRoleStatus(data) {
  return request({
    url: '/admin/editRoleStatus',
    method: 'post',
    data
  })
}


//禁用管理员
export function editAdminStatus(data) {
  return request({
    url: '/admin/editAdminStatus',
    method: 'post',
    data
  })
}

//自己谷歌验证码
export function editMyGaCaptcha(data) {
  return request({
    url: '/admin/editMyGaCaptcha',
    method: 'post',
    data
  })
}

//他人谷歌验证码
export function editOtherGaCaptcha(data) {
  return request({
    url: '/admin/editOtherGaCaptcha',
    method: 'post',
    data
  })
}

export function allMenuList(data) {
  return request({
    url: 'system/allMenuList',
    method: 'get',
    data
  })
}