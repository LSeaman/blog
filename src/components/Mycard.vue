<template>
  <div id="my-card" class="my-card" :style="{ width: this.cardWidth + '%', height: this.cardHeight + '%' }">
    <button class="my-card-title" @click="handleExpand" :style="{ transform: iconRotate ? 'translateX(-50%) rotate(90deg)' : 'translateX(-50%)' }">
      +
    </button>
    <slot name="header"></slot>
    <slot name="container"></slot>
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
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,0,0,.4);
  .my-card-title {
    position: absolute;
    top: -20px;
    left: 50%;
    // transform: ;
    background-color: #910000;
    width: 48px;
    height: 48px;
    box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    font-size: 32px;
  }
}
</style>
