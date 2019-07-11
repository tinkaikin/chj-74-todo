import Vue from 'vue'
import Router from 'vue-router'
import layouts from '@/components/layouts'
import todo from '@/components/todo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layouts',
      component: layouts,
      children: [
        { path: '/todo/:id', name: 'todo', component: todo, props: true }
      ]
    }
  ]
})
