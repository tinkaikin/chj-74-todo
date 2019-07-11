<template>
  <div>{{id}}1231323</div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      myId: ''
    }
  },
  watch: {
    'id' (idd) {
      console.log(idd)
    }
  }
}
</script>

<style>

</style>
