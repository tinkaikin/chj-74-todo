<template>
  <div class='publish-container'>
    <el-card>
      <div slot="header">发布文章</div>
      <!--  -->
      <el-form label-width="100px">
        <el-form-item label='标题'>
          <el-input style="width:400px" v-model="queryData.title"></el-input>
        </el-form-item>
        <el-form-item label='内容'>
          <span>富文本区</span>
        </el-form-item>
        <el-form-item>
          <el-radio-group  v-model="queryData.cover.type">
            <el-radio :label='1'>单图</el-radio>
            <el-radio :label='3'>三图</el-radio>
            <el-radio :label='0'>无图</el-radio>
            <el-radio :label='-1'>自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="queryData.cover.type===1">
          <!-- 封装插件 -->
          <my-image v-model="queryData.cover.images[0]"></my-image>
        </el-form-item>
        <el-form-item v-if="queryData.cover.type===3" class="type3">
          <!-- 封装插件 -->
          <my-image v-model="queryData.cover.images[0]"></my-image>
          <my-image v-model="queryData.cover.images[1]"></my-image>
          <my-image v-model="queryData.cover.images[2]"></my-image>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="queryData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表文章</el-button>
          <el-button type="success" plain>发表草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      queryData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 封面
          type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null // 文章所属频道id
      }
    }
  },
  created () {
    console.log(this.queryData)
  }
}
</script>

<style scoped lang='less'>
</style>
