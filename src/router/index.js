import Vue from 'vue'
import Router from 'vue-router'
import Rayouts from '@/components/layouts'
import Todo from '@/components/todo'
import Login from '@/view/login'
import Home from '../view/Home'
import NotFound from '@/view/404'
import Welcome from '@/view/Welcome'
import Images from '@/view/Images'
// import test from '@/components/test'

Vue.use(Router)

const router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login }, // 登录页-路由守卫
    { path: '/', redirect: '/home' }, // 跳转到home页
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/home', name: 'home', component: Welcome }, // 二级路由 首页
        { name: 'images', path: '/images', component: Images }
      ]
    },
    {
      path: '/todo',
      component: Rayouts,
      children: [
        { path: '/todo/:id', name: 'todo', component: Todo, props: true }
      ]
    },
    { path: '*', component: NotFound }

  ],
  mode: 'history' // 去掉#
})
// 路由-前守卫
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('token')
  if (user) {
    // 存在
    if (to.path === '/login') return next('/') // 登录页将不会被显示
    return next()
  } else {
    if (to.path === '/login') return next() // 进入登录页
    next('/login') // 其他回到登录页去
  }
})

export default router
