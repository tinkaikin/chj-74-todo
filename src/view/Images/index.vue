<template>
  <div class="img">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>图片素材</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <div>
      <!-- 左边按钮组 -->
      <!-- 右边普通按钮组 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Images'
}
</script>

<style>

</style>
