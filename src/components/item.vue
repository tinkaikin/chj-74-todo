<template>
  <div class="item-container">
    <el-checkbox v-model="checked" class="checkbBox fl" @change='onupRecord'></el-checkbox>
    <el-input
        type="text"
        v-model="text"
        maxlength="50"
        show-word-limit
        class="fl input-text"
        :disabled="checked || locked"
        @blur="onupRecord"
      >
    </el-input>
    <el-button type="danger" icon="el-icon-delete" circle class="fl" @click='deleItem'></el-button>
  </div>
</template>

<script>
import { upRecord } from '../api/api.js'
export default {
  // :item="item" :todoId="id" :itemIndex='index' :init='init'
  //以后要做类型检查  
  props: ["item",'todoId', 'itemIndex', 'woquFn'],
  data() {
    return {
      text: '',
      checked: true,
      locked:false
    }
  },
  created() {
    this.initData(this.item)
  },
  methods: {
    initData(itemObj){
      this.text = itemObj.text
      this.checked = itemObj.checked
    },
    deleItem(){
      console.log('todo 删除')
    },

    //这里是把修改后的内容发送后台 (失去焦点后触发)
    onupRecord(){
      //1.获取修改后的数据 后 拼接成 新的record{ text: '',checked: true,locked:false}
      const newRecord = {
        text: this.text,
        checked: this.checked,
        locked:this.locked
      }
    //2.获取 id index的值
      // console.log(this.todoId)
      // console.log(this.itemIndex)
        // console.log(this.woquFn)
    //3.调用请求
      upRecord({
        id:this.todoId,
        record:newRecord,
        index:this.itemIndex
      }).then(res=>{
        this.woquFn()
      })
    }





  },
  watch: {
    "item"(item){
      this.initData(item)
    },
    'itemIndex'(id){
      console.log(id)
    }
  },
  
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
