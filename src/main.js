import Vue from 'vue'

// 消除各浏览器差异
import 'normalize.css/normalize.css'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

// 全局样式
import '@/styles/index.scss'

import App from './App'

// vuex
import store from './store'

// 路由
import router from './router'

// 图标
import '@/icons'

// 权限控制
import '@/permission'

// mock测试数据，生产环境请移除！！！
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
