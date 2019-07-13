<template>
  <div class="item-container">
    <el-checkbox v-model="checked" class="checkbBox fl"></el-checkbox>
    <el-input
        type="text"
        v-model="text"
        maxlength="50"
        show-word-limit
        class="fl input-text"
        :disabled="checked || locked"
      >
    </el-input>
    <el-button type="danger" icon="el-icon-delete" circle class="fl"></el-button>
  </div>
</template>

<script>
export default {
  props: ["item"],
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
    }
  },
  watch: {
    "item"(item){
      this.initData(item)
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
