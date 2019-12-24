import { accountLogin, logout, getUserInfo } from '@/api/user'
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getAccessToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  /**
   * 账号登录
   */
  accountLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      accountLogin(username.trim(), password.trim()).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setAccessToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('获取用户信息失败，请重新登录')
        }

        const { roles, nickname, avatar } = data

        // 角色列表校验
        if (!roles || roles.length <= 0) {
          reject('角色列表要求非null列表')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 退出
   */
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeAccessToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 重置
   */
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeAccessToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
