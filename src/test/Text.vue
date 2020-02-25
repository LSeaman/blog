<template>
  <div>
    <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="verified" @fail="onFail" @refresh="onRefresh"></slide-verify>
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    verified() {
      this.$router.push('./home')
    },
    onFail() {
      this.msg = ''
    },
    onRefresh() {
      this.msg = ''
    }
  }
}
</script>
