import Vue from 'vue'
import Router from 'vue-router'
import Rayouts from '@/components/layouts'
import Todo from '@/components/todo'
import Login from '@/view/login'
// import test from '@/components/test'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layouts',
      component: Rayouts,
      children: [{
        path: '/todo/:id',
        name: 'todo',
        component: Todo,
        props: true
      }]
    },
    { name: 'login', path: '/login', component: Login }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('token')
  if (to.path === '/login' && user) return next('/')
  if (to.path === '/login') return next()
  if (user) return next()
  next('/login')
})

export default router
