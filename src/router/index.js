import Vue from 'vue'
import Router from 'vue-router'
import {getUserSig } from '../utils/auth'
Vue.use(Router)
export const constantRoutes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    name:'login',
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    name:'index',
    path: '/index',
    component: () => import('@/views/index/index'),
  },
  {
    path: '/404',
    component: () => import('@/views/404/index'),
  },
 { path: '*', redirect: '/404', hidden: true }
  ]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  base: '/admin-chat',
  routes: constantRoutes
})

const router = createRouter()


// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 未登录
  if (to.name !== 'login' && !getUserSig()) {
    next({ name: 'login' })
  }
  else if(to.name == 'login' && getUserSig()) {
    await store.dispatch('login')
    next({name: 'index'})
  }else if(getUserSig()) {
    await store.dispatch('login')
    next()
  }
 else {
    next()
  }
})
// router.afterEach((to, from) => {
//   if (from.path == '/login') {
//     router.go(0);
//   }
// });
export default router
