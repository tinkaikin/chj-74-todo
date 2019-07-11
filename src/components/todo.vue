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
      <div v-for="(item,index) in items" :key="index"> <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
      <!-- 下面应该切换成 2级路由 -->
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './item'
export default {
  props: ['id'],
  components: {
    item
  },
  data () {
    return {
      todo: { // 详情内容
        title: '星期一',
        count: 12,
        locked: false
      },
      items: [ // 代办单项列表
        { checked: false, text: '新的一天', isDelete: false },
        { checked: false, text: '新的一天', isDelete: false },
        { checked: false, text: '新的一天', isDelete: false }
      ],
      text: '' // 新增代办单项绑定的值
    }
  },
  methods: {
    onAdd () {
      this.text = this.text.trim()
      if (this.text.length === 0) return
      this.items.push({ checked: false, text: this.text, isDelete: false })
      this.text = ''
    }
  },
  mounted () {
    console.log(this.id)
  }
}
</script>

<style lang="less" scoped>
@import url('../a-common/style/nav.less');
@import url('../a-common/style/form.less');
@import url('../a-common/style/todo.less');
</style>
