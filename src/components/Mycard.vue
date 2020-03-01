<template>
  <div id="my-card" class="my-card" :style="{ width: this.cardWidth + '%', height: this.cardHeight + '%' }">
    <slot name="header">
      <div class="my-card-header" v-if="header">{{ headerContent }}</div>
    </slot>
    <slot name="container" class="my-card-container"></slot>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  data() {
    return {
      nodeParent: 0,
      iconRotate: false
    }
  },
  props: {
    cardWidth: {
      type: Number,
      default: 100
    },
    cardHeight: {
      type: Number,
      default: 100
    },
    header: {
      type: Boolean,
      default: true
    },
    headerContent: {
      type: String,
      default: '标题'
    }
  },
  methods: {
    handleExpand() {
      this.iconRotate = !this.iconRotate
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.my-card {
  box-sizing: border-box;
  position: relative;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.4);
  .my-card-title {
    position: absolute;
    top: -20px;
    left: 50%;
    background-color: #910000;
    width: 48px;
    height: 48px;
    box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    font-size: 32px;
  }
  .my-card-header {
    width: 100%;
    height: 20%;
    font-size: 20px;
    font-weight: 700;
  }
  .my-card-container {
    height: 200px;
  }
}
</style>
