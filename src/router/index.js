import Vue from 'vue'
import Router from 'vue-router'
import Rayouts from '@/components/layouts'
import Todo from '@/components/todo'
// import test from '@/components/test'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
