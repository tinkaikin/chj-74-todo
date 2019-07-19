<template>
  <div class='fans-container' v-loading="loading">
    <el-card>
    <!-- s=头部 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
    <!-- e=头部 -->
    <!-- s=tab切换 -->
      <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick"> -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
        <!-- s=粉丝列表 -->
          <ul class="fans-List">
            <li v-for="item in fansImgList" :key="item.id">
              <!-- {id: 1112715153402495000, name: "18801185985", photo: "htt -->
              <div class="item-img">
                <img :src="item.photo" alt="">
              </div>
              <p>{{item.name}}</p>
                <el-button plain type="primary" icon="el-icon-plus" size="small">关注</el-button>
            </li>
          </ul>
          <el-pagination
            @current-change="currentChange"
            background
            :page-size="20"
            :current-page="fansList.page"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        <!-- e=粉丝列表 -->
        </el-tab-pane>
        <el-tab-pane label="粉丝管理" name="second">
        <!-- s=粉丝列表 -->
          这是粉丝管理
        <!-- e=粉丝列表 -->
        </el-tab-pane>
      </el-tabs>
    <!-- e=tab切换 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 加载动画
      activeName: 'list', // tab切换名
      fansList: {
        page: 1 // 第几页
        // per_page: 10 // 一页几条数据
      },
      fansImgList: [], // 粉丝头像集合
      total: 0 // 总条数
    }
  },
  created () {
    if (this.activeName === 'list') {
      this.getFansList()
    } else {
      console.log('粉丝管理')
    }
  },
  methods: {
    // 分页
    currentChange (nowPage) {
      this.fansList.page = nowPage
      this.getFansList()
    },
    // 请求粉丝列表
    async getFansList () {
      this.loading = true
      const {data: {data}} = await this.$http.get('followers', {params: this.fansList})
      this.fansImgList = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>
.fans-List{
  overflow: hidden;
  li{
    width: 120px;
    height: 160px;
    text-align: center;
    padding: 10px;
    float: left;
    border: 1px dashed #ddd;
    margin: 0 15px 15px;
    p{
      font-size: 12px;
    }
    .item-img{
      width: 70px;
      height: 70px;
      margin: 10px auto;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%
      }
    }
  }
}
</style>
