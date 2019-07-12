<template>
  <div>{{'abc'}}</div>
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
