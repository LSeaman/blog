<template lang="">
  <div class="user-page">
    <my-card>
      <template v-slot:container>
        <div>2</div>
      </template>
    </my-card>
  </div>
</template>

<script>
import MyCard from '../../components/Mycard'
export default {
  components: {
    MyCard
  },
  created() {
    /* 获取用户数据 */
  }
}
</script>

<style lang="less" scoped>
.user-page {
  width: 100%;
  height: 100%;
}
</style>
