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


/**
 * @description 获取用户信息
 * @param {Object} token
 */
export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

/**
 * @description 退出
 * @param {Object} params
 */
export function logout(params) {
  return request({
    url: '/logout',
    headers: {
      'Authorization': 'Basic cGM6MTIzNDU2'
    },
    method: 'delete',
    params: params
  })
}
