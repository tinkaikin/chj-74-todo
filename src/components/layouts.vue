<template>
  <section class="container">
    <!--最外层容器-->
    <section class="menu">
      <!--左边的容器-->
      <menus></menus>
    </section>
    <section class="content-container">
      <!-- 右边的容器-->
      <!-- <todo></todo> 切换成 路由模式-->
      <router-view></router-view>
    </section>
  </section>
</template>
<script>
import menus from './menus'
// import todo from './todo'
export default {
  components: {
    menus
    // todo
  }
}
</script>
<style lang="less">
@import "../a-common/style/layouts.less";
</style>
