import request from '@/utils/request'

/**
 * 账号登录
 * @param {用户名} username
 * @param {密码} password
 */
export function accountLogin(username, password) {
  return request({
    url: '/account/login',
    headers: {
      'Authorization': 'Basic cGM6MTIzNDU2'
    },
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
