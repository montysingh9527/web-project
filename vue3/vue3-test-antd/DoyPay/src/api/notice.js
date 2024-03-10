import request from '@/utils/request'

export function getNoticeList(params) {
  return request({
    url: '/notice/index',
    method: 'get',
    params
  })
}

export function noticeAdd(data) {
  return request({
    url: '/notice/addNotice',
    method: 'post',
    data
  })
}

export function noticeEdit(data) {
  return request({
    url: '/notice/editNotice',
    method: 'post',
    data
  })
}

export function noticeDel(data) {
  return request({
    url: '/notice/delNotice',
    method: 'post',
    data
  })
}