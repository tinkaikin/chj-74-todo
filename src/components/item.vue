<template>
  <div class="item-container" v-show="!item.isDelete">
    <el-checkbox v-model="item.checked" class="checkbBox fl" @change='onupRecord'></el-checkbox>
    <el-input
        type="text"
        v-model="item.text"
        maxlength="50"
        show-word-limit
        class="fl input-text"
        :disabled="item.checked || item.locked"
        @blur="onupRecord"
      >
    </el-input>
    <el-button type="danger" icon="el-icon-delete" circle class="fl" @click='item.isDelete=true;item.checked=true;onupRecord()'></el-button>
  </div>
</template>

<script>
import { upRecord } from '../api/api.js'
export default {
  // :item="item" :todoId="id" :itemIndex='index' :init='init'
  // 以后要做类型检查
  props: ['itemlala', 'todoId', 'itemIndex', 'woquFn'],
  data () {
    return {
      item: this.itemlala
      // text: '',
      // checked: true,
      // locked:false,
      // isDelete:false
    }
  },
  created () {
    this.initData(this.itemlala)
  },
  methods: {
    initData (itemObj) {
      this.item = itemObj
    },

    // 这里是把修改后的内容发送后台 (失去焦点后触发)
    onupRecord () {
      // 1.获取修改后的数据 后 拼接成 新的record{ text: '',checked: true,locked:false}
      // const newRecord = {
      //   text: this.text,
      //   checked: this.checked,
      //   locked:this.locked,
      //   isDelete:this.isDelete
      // }
      // 2.获取 id index的值
      // console.log(this.todoId)
      // console.log(this.itemIndex)
      // console.log(this.woquFn)
      // 3.调用请求
      upRecord({
        id: this.todoId,
        record: this.item,
        index: this.itemIndex
      }).then(res => {
        this.woquFn()
      })
    }

  },
  watch: {
    'itemlala' (item) {
      this.initData(item)
    }
  }

}
</script>

<style lang="less" scoped>
  .item-container{
    width: 100%;
    height: 40px;
    padding: 10px 0;
    .checkbBox{
      margin: 0 15px;
      line-height: 40px;
    }
    .input-text{
      width: 80%;
      margin-right: 20px;
    }
    .fl{
      float: left;
    }
  }
</style>
