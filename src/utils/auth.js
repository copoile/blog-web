import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'

const AccessTokenKey = 'access_token'
const UsernameKey = 'username'
const PasswordKey = 'password'
const RememberKey = 'remember'
/**
 * 获取 accessToken
 */
export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}

/**
 * 设置 accessToken
 * @param {String} token
 */
export function setAccessToken(token) {
  return Cookies.set(AccessTokenKey, token, { expires: 2/24 })
}

/**
 * 移除 accessToken
 */
export function removeAccessToken() {
  return Cookies.remove(AccessTokenKey)
}

/**
 * 设置用户名
 * @param {String} username
 */
export function setUsername(username) {
  return Cookies.set(UsernameKey, escape(username), { expires: 15 })
}

/**
 * 获取用户名
 */
export function getUsername() {
  return unescape(Cookies.get(UsernameKey))
}

/**
 * 移除 用户名
 */
export function removeUsername() {
  return Cookies.remove(UsernameKey)
}

/**
 * 设置密码
 * @param {String} password
 */
export function setPassword(password) {
  return Cookies.set(PasswordKey, Base64.encode(password), { expires: 15 })
}

/**
 * 获取密码
 */
export function getPassword() {
  return Base64.decode(Cookies.get(PasswordKey))
}

/**
 * 移除 密码
 */
export function removePassword() {
  return Cookies.remove(PasswordKey)
}

/**
 * 设置记住密码
 */
export function setRemember(checked) {
  return Cookies.set(RememberKey, checked, { expires: 15 })
}

/**
 * 获取记住密码
 */
export function getRemember() {
  return Cookies.get(RememberKey)
}
