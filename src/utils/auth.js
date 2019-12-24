import Cookies from 'js-cookie'

const AccessTokenKey = 'access_token'

export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}

export function setAccessToken(token) {
  return Cookies.set(AccessTokenKey, token)
}

export function removeAccessToken() {
  return Cookies.remove(AccessTokenKey)
}
