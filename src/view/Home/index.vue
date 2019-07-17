<template>
  <el-container>
    <el-header>
      <el-menu
      default-active="$route.path"
      mode="horizontal"
      router
      background-color="#315481"
      text-color="#fff"
      active-text-color="#409EFF"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/article">内容管理</el-menu-item>
        <el-menu-item index="/material">素材管理</el-menu-item>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/comment">评论管理</el-menu-item>
        <el-menu-item index="/fans">粉丝管理</el-menu-item>
        <el-menu-item index="/todo">其他</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
/**
 * .导航菜单
 * 1.开启路由功能
 * 2.点击谁谁显示功能
 */
export default {}
</script>

<style lang="less" scoped>
.el-header{
  width: 100%;
  padding: 0;
}
</style>
