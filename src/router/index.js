import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 *
 *
 * hidden: true                   如果设置了true，则不在左边导航栏显示,即不是后台管理的页面
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
    path: '/tag',
    component: () => import('@/views/tag/index'),
    hidden: true
  },

  {
    path: '/category',
    component: () => import('@/views/category/index'),
    hidden: true
  },
  
  {
    path: '/archives',
    component: () => import('@/views/archives/index'),
    hidden: true
  },
  
  {
    path: '/message',
    component: () => import('@/views/message/index'),
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
      component: () => import('@/views/user/index'),
      meta: {
        title: '基本信息',
        icon: 'user'
      }
    }]
  },

  {
    path: '/collect',
    component: Layout,
    children: [{
      path: 'index',
      name: 'collect',
      component: () => import('@/views/collect-manage/index'),
      meta: {
        title: '我的收藏',
        icon: 'collect-manage'
      }
    }]
  }
]

/**
 * 根据用户角色动态加载路由
 */
export const asyncRoutes = [

  {
    path: '/user-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'UserManage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: '用户管理',
        icon: 'user-manage',
        roles: ['admin']
      }
    }]
  },

  {
    path: '/art-manage',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '文章管理',
      icon: 'art-manage',
      roles: ['admin']
    },
    children: [{
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/article-manage/edit'),
        meta: {
          title: '编辑',
          icon: 'art-edit'
        }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article-manage/list'),
        meta: {
          title: '列表',
          icon: 'art-list'
        }
      }
    ]
  },

  {
    path: '/recommend',
    component: Layout,
    children: [{
      path: 'index',
      name: 'RecommendManage',
      component: () => import('@/views/recommend-manage/index'),
      meta: {
        title: '推荐管理',
        icon: 'recommend-manage',
        roles: ['admin']
      }
    }]
  },

  {
    path: '/tag-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'TagManage',
      component: () => import('@/views/tag-manage/index'),
      meta: {
        title: '标签管理',
        icon: 'tag-manage',
        roles: ['admin']
      }
    }]
  },

  {
    path: '/category-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'CategoryManage',
      component: () => import('@/views/category-manage/index'),
      meta: {
        title: '分类管理',
        icon: 'category-manage',
        roles: ['admin']
      }
    }]
  },

  {
    path: '/friend-chain/manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'FriendChainManage',
      component: () => import('@/views/friend-chain-manage/index'),
      meta: {
        title: '友链管理',
        icon: 'friend-chain-manage',
        roles: ['admin']
      }
    }]
  },

  {
    path: '/client',
    component: Layout,
    children: [{
      path: 'index',
      name: 'client',
      component: () => import('@/views/client-manage/index'),
      meta: {
        title: '客户端管理',
        icon: 'client-manage',
        roles: ['admin']
      }
    }]
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
