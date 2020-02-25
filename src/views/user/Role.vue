<template lang="">
  <div class="user-page">
    <my-card></my-card>
  </div>
</template>

<script>
import MyCard from '../../components/Mycard'
export default {
  components: {
    MyCard
  }
}
</script>

<style lang="less" scoped>
.user-page {
  width: 100%;
  height: 100%;
}
</style>
