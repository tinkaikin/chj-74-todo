<template>
  <div class="img-container" v-loading="loading">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <!-- 组按钮 -->
        <el-radio-group size="small" v-model="queryData.collect" @change="collectChange">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 右边普通按钮 -->
        <el-button type="success" size="small" style="float:right"  @click="dialogVisible = true">上传素材</el-button>
      </div>
      <ul>
        <li v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt="">
          <div class="fot">
            <!-- 收藏和删除 -->
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="changeCollected(item)"></span>
            <span class="el-icon-delete-solid" @click="deleteImg(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :page='queryData.page'
        :page-size="queryData.per_page"
        :total="total"
        @current-change="pageChange"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      width="300px">
      <span>这是一段信息</span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Images',
  data () {
    return {
      queryData: {
        collect: false,
        page: 1,
        per_page: 10
      },
      imgList: [],
      loading: false, // 加载动画
      total: 0, // 总条数
      dialogVisible: false // 上传素材对话框
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    // 删除
    async deleteImg (id) {
      await this.$http.delete('user/images/' + id)
      this.getImgList()
    },
    // 分页切换
    pageChange (nowPage) {
      this.queryData.page = nowPage
      this.getImgList()
    },
    // 切换收藏
    async changeCollected (item) {
      // Path： /mp/v1_0/user/images/:target   PUT    target   collect
      // 1请求 参数 id 和 collect  返回
      await this.$http.put('user/images/' + item.id, {collect: !item.is_collected})
      // 不在发送更新请求
      item.is_collected = !item.is_collected
    },
    // 切换收藏
    collectChange () {
      this.queryData.page = 1
      this.getImgList()
    },
    // 获取数据
    async getImgList () {
      // Path： /mp/v1_0/user/images
      // Method： GET
      this.loading = true
      const {data: {data}} = await this.$http.get('user/images', {params: this.queryData})
      this.imgList = data.results
      // this.is_collected = data.results.is_collected  total_count
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-container{
  ul{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li{
      position: relative;
      width: 160px;
      height: 160px;
      margin:15px 30px;
      padding: 5px;
      border: 1px dashed #ddd;
      .fot{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: rgba(0,0,0,.5);
        span{
          color: #fff;
          cursor: pointer;
          margin: 0 10px;
          &.red{
            color: red;
          }
        }
      }
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

}
</style>
