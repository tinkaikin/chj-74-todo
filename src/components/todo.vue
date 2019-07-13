<template>
  <div class="page lists-show"><!--最外层容器-->
    <nav><!--容器上半部分-->
      <div class="nav-group"> <!--移动端的菜单图标-->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <!-- 显示标题和数字模块 -->
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
        <span class="count-list">{{todo.count}}</span><!-- 数目-->
      </h1>
      <div class="nav-group right"><!-- 右边的删除，锁定图标容器-->
        <div class="options-web">
          <a class=" nav-item"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item"><!-- 删除图标-->
            <span class="icon-trash">
            </span>
          </a>
        </div>
      </div>
      <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
      <div class=" form todo-new input-symbol">
         <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!-- <p>{{id}}</p>   测试id能正常传过来 -->
      <!--容器下半部分-->
      <Item v-for="(item,index) in items" :key="index" :item="item"></Item>
      <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
      <!-- <div v-for="(item,index) in items" :key="index">
      </div> -->
    </div>
  </div>
</template>

<script>
import Item from './item'
import {getTodo, addRecord} from '../api/api.js'
export default {
  props: ['id'],
  components: {
    Item
  },
  data () {
    return {
      todo: {},
      // todo: { // 详情内容
      //   title: '星期一',
      //   count: 12,
      //   locked: false
      // },
      items: [ // 代办单项列表
        // { checked: false, text: '新的一天', isDelete: false },
        // { checked: false, text: '新的一天', isDelete: false },
        // { checked: false, text: '新的一天', isDelete: false }
      ],
      text: '' // 新增代办单项绑定的值
    }
  },
  created () {
    this.init()
  },
  methods: {
    onAdd () {
      // 添加一条 代办项目 没关联到数据库
      this.text = this.text.trim()
      if (this.text.length === 0) return
      // this.items.push({ checked: false, text: this.text, isDelete: false })
      // 调用 接口 参数是对象 字节 id text
      addRecord({
        id: this.id,
        text: this.text
      }).then(res => {
        // 成功后放回的结果
        console.log(res)
        this.text = ''
        this.init()
      })
    },
    init () {
      // 根据 id 值 获取对应的 todo内容
      getTodo({id: this.id}).then(res => {
        const {status, data} = res
        if (status === 200) {
          this.todo = data.todo
          this.items = data.todo.record
        }
      })
    }
  },
  watch: {
    'id' () {
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../a-common/style/nav.less');
@import url('../a-common/style/form.less');
@import url('../a-common/style/todo.less');
</style>
