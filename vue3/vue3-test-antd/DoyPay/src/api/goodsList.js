import request from '@/utils/request'
export function getbuyList(params) {
  return request({
    url: '/tradeOrder/getList',
    method: 'get',
    params
  })
}

export function coinLogList(params) {
  return request({
    url: '/tradeOrder/coinLogList',
    method: 'get',
    params
  })
}


export function doDelete(data) {
  return request({
    url: '/tradeOrder/cancelOrder',
    method: 'post',
    data
  })
}

export function editOrderRemark(data) {
  return request({
    url: '/tradeOrder/editOrderRemark',
    method: 'post',
    data
  })
}

export function reportList(params) {
  return request({
    url: '/stat/index',
    method: 'get',
    params
  })
}

export function editCoinLogRemark(data) {
  return request({
    url: '/tradeOrder/editCoinLogRemark',
    method: 'post',
    data
  })
}


export function getTranList(params) {
  return request({
    url: '/order/getTranList',
    method: 'get',
    params
  })
}

export function handleOrder(data) {
  return request({
    url: '/tradeOrder/handleOrder',
    method: 'post',
    data
  })
}

