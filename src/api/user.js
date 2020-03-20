import request from '@/utils/request'

/**
 * 账号登录
 * @param {Object} params
 */
export function accountLogin(params) {
  return request({
    url: '/account/login',
    headers: {
      'Authorization': 'Basic cGM6MTIzNDU2'
    },
    method: 'post',
    params: params
  })
}

/**
 * 手机号验证码登录
 * @param {Object} params
 */
export function codeLogin(params) {
	return request({
	  url: '/mobile/login',
	  headers: {
	    'Authorization': 'Basic cGM6MTIzNDU2'
	  },
	  method: 'post',
	  params: params
	})
}


/**
 * @description 获取用户信息
 * @param {String} token
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

/**
 * 用户注册
 * @param {Object} data
 */
export function register(data) {
  return request.post('/user/register', data)
}
