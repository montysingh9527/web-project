import request from '@/utils/request'

export function getIndex(data) {
  return request({
    url: '/home/index',
    method: 'get',
  })
}

