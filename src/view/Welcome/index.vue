<template>
  <div class="Welcome">
    <!-- indicator-position="outside" 指示器的位置 outside/none -->
    <!-- interval 自动切换的时间间隔，单位为毫秒 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!-- s=分页器 -->
    <el-pagination
      @current-change='handleCurrentChange'
      background
      layout="total, prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
    <!-- e=分页器 -->
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    handleCurrentChange (npage) {
      const data = {
        userId: 1111111,
        token: 4545454554,
        page: npage - 1
      }

      // 发送请求
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
// 文字样式
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
