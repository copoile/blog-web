import Vue from 'vue'

// 消除各浏览器差异
import 'normalize.css/normalize.css'

// ElementUI 按需加载
import './element-ui.js'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// 点击复制
import VueClipboard from 'vue-clipboard2'

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

Vue.use(VueQuillEditor)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
