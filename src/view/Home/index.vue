<template>
  <el-container>
    <el-header>
      <el-menu default-active="/" mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/todo">TODO</el-menu-item>
        <el-menu-item index="3" >首页</el-menu-item>
        <el-menu-item index="4" >首页</el-menu-item>
      </el-menu>
    </el-header>
    <el-main></el-main>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>

.el-main{
  background-color: #ccc;
}
</style>
