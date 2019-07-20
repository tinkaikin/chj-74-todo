<template>
  <div class="Welcome">
    <!-- s=轮播图 -->
      <!-- indicator-position="outside" 指示器的位置 outside/none -->
      <!-- interval 自动切换的时间间隔，单位为毫秒 -->
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    <!-- e=轮播图 -->

    <!-- s=分页器 -->
      <el-pagination
        @current-change='handleCurrentChange'
        background
        layout="total, prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    <!-- e=分页器 -->
    <!-- s=上传图片 -->
      <el-upload
        list-type="picture-card"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    <!-- e=上传图片 -->
    <!-- s=测试 -->
      <el-dialog :visible.sync="dialogVisible">
          <img width="500" src="../../assets/images/timg.jpg" alt="">
      </el-dialog>
    <!-- e=测试 -->

  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      dialogVisible: false, // 关闭对话框
      dialogImageUrl: null // 上传图片地址
    }
  },
  methods: {
    // 文件列表移除文件时的钩子
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 上传图片前
    handlePictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
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
