import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 *
 *
 * hidden: true                   如果设置了true，则不在左边导航栏显示
 * alwaysShow: true               如果设置了true，则总在根菜单显示
 *
 * redirect: noRedirect           设置noRedirect，则面包屑路径不可点
 * name:'router-name'             名称在 <keep-alive> 用到，后台管理必须设置！！！
 * meta : {
    roles: ['admin','test']      页面角色控制，可多角色
    title: 'title'               标题
    icon: 'svg-name'             导航栏图标
    breadcrumb: false            false，将不显示面包屑
    activeMenu: '/example/list'  如果设置，则导航栏将高亮显示
  }
 */

/**
 * 常量路由，所有用户可见
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/index/index'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    children: [{
      path: 'info',
      name: 'Info',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '个人中心',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: 'Table',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  }
]

/**
 * 根据用户角色动态加载路由
 */
export const asyncRoutes = [
  {
    path: '/article-manage',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '文章管理',
      icon: 'nested',
      roles: ['admin']
    },
    children: [{
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/article-manage/edit'),
        meta: {
          title: '编辑',
          icon: 'form'
        }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article-manage/index'),
        meta: {
          title: '列表',
          icon: 'form'
        }
      }
    ]
  },
  // 404 页面必须放到最后！！！
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
