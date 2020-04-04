import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getAccessToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加请求头
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 0) {
      // 凭证无效或过期
      if (res.code === 1006 || res.code === 1009) {
        store.dispatch('user/resetToken')
        MessageBox.confirm('登录信息已过期', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.reload()
        }).catch(() => {
          location.reload()
        })  
      } else {
        // 其他
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
