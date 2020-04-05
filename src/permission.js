import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getAccessToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import pathToRegexp from 'path-to-regexp'

NProgress.configure({ showSpinner: false })
// 免登录白名单
const whiteList = ['/', '/tag', '/category', '/archives',
'/message', '/friend-link', '/article/:id', '/reset-password', '/about', '/search', '/terms', '/privacy']

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 页面标题
  document.title = getPageTitle(to.meta.title)

  // 获取AccessToken，判断是否已登录
  const hasAccessToken = getAccessToken()

  if (hasAccessToken) {
      // 获取角色，判断是否已调获取用户信息接口
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户线信息，从用户信息中获取角色
          const { roles } = await store.dispatch('user/getUserInfo')

          // 根据角色动态加载路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加动态路由
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户信息失败重置登录信息
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 跳回首页
          next(`/`)
          NProgress.done()
        }
      }
  } else {

    // 未登录，并且路径存在免登录白名单中
    const included = whiteList.some( ele => pathToRegexp(ele).exec(to.path) )
    if (included) {
      next()
    } else {
      // 跳回首页
      next(`/`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
