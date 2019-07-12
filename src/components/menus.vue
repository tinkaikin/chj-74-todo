<template>
  <div class="list-todos">
    <!--菜单容器-->
    <a class="list-todo activeListClass list" v-for="(item, index) in items" :key="index" @click='goList(item.id)' :class='{"active":item.id === todoId}'>
      <!--单个菜单容器-->
      <span class="icon-lock" v-if="item.locked"></span>
      <!--锁的图标-->
      <span class="count-list" v-if="item.count >= 0">{{item.count}}</span>
      <!--数字-->
      {{item.title}}
      <!--菜单内容-->
    </a>
    <a class="link-list-new" @click.prevent="addTodoList">
      <!--新增菜单-->
      <span class="icon-plus"></span>
      新增
    </a>
  </div>
</template>
<script>
import { getTodoList, addTodo } from '../api/api.js'
export default {
  data () {
    return {
      items: [
        // 菜单的模拟数据
        // { title: '星期一', count: 0, locked: true },
        // { title: '星期二', count: 2, locked: true },
        // { title: '星期三', count: 3, locked: false }
      ],
      todoId: ''
    }
  },
  created () {
    // 初始化数据
    this.getTodo()
  },
  methods: {
    // 点击那个,那个高亮
    goList (ID) {
      this.todoId = ID
    },
    // 请求 数据库里面所有代办目录 并渲染
    getTodo () {
      getTodoList({}).then(res => {
        if (res.status === 200) {
          this.items = res.data.todos
          this.todoId = res.data.todos[0].id
        } else {
          console.log('请求失败')
        }
      })
    },
    // 添加 一条目录 并重新渲染直接选中新添加的那一项
    addTodoList () {
      addTodo({}).then(data => {
        getTodoList({}).then(res => {
          if (res.status === 200) {
            this.items = res.data.todos
            // 新添加的高亮
            this.todoId = res.data.todos[res.data.todos.length - 1].id
          } else {
            console.log('请求失败')
          }
        })
      })
    }
  },
  watch: {
    'todoId' (Id) {
      this.$router.push({name: 'todo', params: { id: Id }})
    }
  }
}
</script>
<style lang="less">
@import "../a-common/style/menu.less";
</style>
