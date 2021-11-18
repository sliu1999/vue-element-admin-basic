import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 分配给所有角色
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
   {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * 分配给role
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'
}
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role/role-list', 
    alwaysShow: true, 
    name: 'System', 
    meta: {title: '系统管理',icon: 'documentation',roles: ['2018113009']},
    children: [
      
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'role',
        redirect:'/system/role/role-list',
        meta: { title: '角色管理',roles: ['2018113009'],affix: true},
        children:[
          {
            path: 'role-list',
            hidden:true,
            component: () => import('@/views/system/role/manage/list'),
            name: 'role-list',
            meta: { title: '角色列表',roles: ['2018113009'],affix: true},
          },
          {
            path: 'role-detail',
            hidden: true, 
            component: () => import('@/views/system/role/manage/detail'),
            name: 'role-detail',
            meta: {title: '角色详情',roles: ['2018113009'],affix: true}
          },
        ]
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/list'),
        name: 'user',
        meta: {title: '用户管理',roles: ['2018113009'],affix: true}
      },
    ]
  },{
    path: '/park',
    component: Layout,
    redirect: '/park/park-manage/park-list', 
    alwaysShow: true, 
    name: 'park', 
    meta: {title: '停车场管理',icon: 'documentation',roles: ['2018113009']},
    children: [
      {
        path: 'park-manage',
        component: () => import('@/views/park/manage/index'),
        name: 'park-manage',
        redirect: '/park/park-manage/park-list', 
        meta: {title: '基本信息管理',roles: ['2018113009'],affix: true},
        children:[{
          path: 'park-list',
          hidden:true,
          component: () => import('@/views/park/manage/park-manage/list'),
          name: 'park-list',
          meta: {title: '',roles: ['2018113009'],affix: true},
        },{
          path: 'park-add',
          hidden:true,
          component: () => import('@/views/park/manage/park-manage/add'),
          name: 'park-add',
          meta: {title: '停车场新增',roles: ['2018113009'],affix: true},
        },{
          path: 'park-edit',
          hidden:true,
          component: () => import('@/views/park/manage/park-manage/edit'),
          name: 'park-edit',
          meta: {title: '停车场修改',roles: ['2018113009'],affix: true},
        },{
          path: 'park-detail',
          hidden:true,
          component: () => import('@/views/park/manage/park-manage/add'),
          name: 'park-detail',
          meta: {title: '停车场详情',roles: ['2018113009'],affix: true},
        }]
      },
      {
        path: 'park-user',
        component: () => import('@/views/park/user/list'),
        name: 'park-user',
        meta: {title: '充值用户信息',roles: ['2018113009'],affix: true},
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
