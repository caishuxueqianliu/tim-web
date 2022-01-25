import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'https://www.glaya.shop:9070/admin/api/base/login',
    method: 'post',
    data
  })
}
export function getUserSig(userId,token) {
  return request({
    url: 'https://www.glaya.shop:8083/kitchen/api/v2/im/getUserSig/' + userId,
    method: 'get',
    headers:{token}
  })
}

export function getListEuipment(userId,token) {
  return request({
    url: 'https://www.glaya.shop:9070/admin/api/equipment/listEuipment/' + userId,
    method: 'get',
    headers:{token}
  })
}


export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

