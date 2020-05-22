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
 * 第三方登录
 * @param {Object} params
 */
export function thirdLogin(params) {
  return request({
    url: '/oauth',
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

/**
 * 更新用户（非空项更新）
 * @param {Object} data
 */
export function updateUser(data) {
  return request.post('/user/update', data)
}

/**
 * 更新密码
 * @param {Object} params
 */
export function updatePassword(params) {
  return request({
    url: '/user/password/update',
    method: 'post',
    params: params
  })
}

/**
 * 重置密码
 * @param {Object} params
 */
export function resetPassword(params) {
  return request({
    url: '/user/password/reset',
    method: 'post',
    params: params
  })
}

/**
 * 验证邮箱（发送验证链接）
 * @param {Object} params
 */
export function validateEmail(params) {
  return request({
    url: '/user/email/validate',
    method: 'post',
    params: params
  })
}

/**
 * code绑定邮箱
 * @param {Object} params
 */
export function bindEmail(params) {
  return request({
    url: '/user/email/bind',
    method: 'post',
    params: params
  })
}

/**
 * 验证原手机号
 * @param {Object} params
 */
export function validateMobile(params) {
  return request({
    url: '/user/mobile/validate',
    method: 'post',
    params: params
  })
}

/**
 * 绑定新手机号
 * @param {Object} params
 */
export function bindMobile(params) {
  return request({
    url: '/user/mobile/rebind',
    method: 'post',
    params: params
  })
}

/**
 * 分页获取用户
 * @param {Object} params
 */
export function pageUser(params) {
  return request.get('/user/page', { params })
}

/**
 * 修改用户状态
 * @param {Object} params
 */
export function updateStatus(params) {
  return request({
    url: '/user/status/update',
    method: 'post',
    params: params
  })
}
