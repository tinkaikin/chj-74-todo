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
  ]
})
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('token')	//步骤9
  if(to.path === '/login' && user) return next('/')
  if (to.path === '/login') return next()	//步骤8当目标是到/login 放行
  if (user) return next()
  next('/login')			//步骤10
})

export default router