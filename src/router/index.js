import Vue from 'vue'
import Router from 'vue-router'
import Rayouts from '@/components/layouts'
import Todo from '@/components/todo'
import Login from '@/view/login'
import Home from '../view/Home'
import NotFound from '@/view/404'
import Welcome from '@/view/Welcome'
// import test from '@/components/test'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { name: 'login', path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/home', name: 'welcome', component: Welcome },
        {
          path: '/todo',
          component: Rayouts,
          hildren: [
            { path: '/todo/:id', component: Todo, props: true }
          ]
        }

      ]
    },
    { path: '*', component: NotFound }
  ],
  mode: 'history'
})
// 路由-前守卫
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('token')
  if (to.path === '/login' && user) return next('/')
  if (to.path === '/login') return next()
  if (user) return next()
  next('/login')
})

export default router
