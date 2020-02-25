<template>
  <div class="home-page">
    <!-- nav -->
    <div class="nav-top">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <div class="home-btn">
        <button>首页</button>
        <button>文章</button>
        <button>搜索</button>
      </div>
    </div>
    <!-- 第1页盒子 -->
    <div class="home-page-box-1" v-if="pageIndex === 1">
      <div class="slogan">
        <div class="slogan-text">
          <div>Coding The World</div>
          <button class="join-us">加入我们</button>
        </div>
      </div>
    </div>
    <!-- 第2页盒子 -->
    <div class="home-page-box-2" v-if="pageIndex === 2"></div>
    <!-- 第3页盒子 -->
    <div class="home-page-box-3" v-if="pageIndex === 3"></div>
    <!-- 页码 -->
    <div class="default-pages" :style="{ width: screenWidth + 'px' }">
      <div class="default-page active-page"></div>
      <div class="default-page"></div>
      <div class="default-page"></div>
    </div>
    <!-- 下一页按钮 -->
    <div class="next-btn" @click="handleNextEvent()">
      Next Page
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenHeight: document.body.clientHeight,
      screenWidth: document.body.clientWidth,
      pageIndex: 1
    }
  },
  methods: {
    handleNextEvent() {
      this.pageIndex++
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      that.screenHeight = document.body.clientHeight
      that.screenWidth = document.body.clientWidth
    }
  },
  created() {},
  watch: {
    screenHeight(val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
}
/* 导航栏 */
.nav-top {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  padding: 0 8%;
  width: 100%;
  height: 72px;
  border-bottom: #910000 2px solid;
  .logo {
    float: left;
    width: 72px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .home-btn {
    height: 100%;
    float: left;
    button {
      width: 72px;
      height: 100%;
      background-color: transparent;
      border: none;
      color: #910000;
      transition: all 0.5s;
      font-size: 16px;
    }
    button:hover {
      background-color: rgba(0, 0, 0, 0.1);
      font-size: 18px;
    }
  }
}
/* 第一个盒子 */
.home-page-box-1 {
  height: 100%;
  width: 100%;
  background-size: cover;
  .slogan {
    .slogan-text {
      height: 120px;
      position: absolute;
      top: 36%;
      right: 8%;
      font-size: 48px;
      font-family: 'Fira Code';
      color: #910000;
      .join-us {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 0;
        font-size: 24px;
        text-align: center;
        transition: all 0.5s;
        color: #1D1E22;
      }
      .join-us:hover {
        font-size: 26px;
      }
    }
  }
  .slogan-pic {
    float: right;
    background-color: #000000;
  }
}
/* 页码导航 */
.default-pages {
  position: absolute;
  bottom: 0;
  right: 0;
  .default-page {
    float: left;
    background-color: #910000;
    height: 6px;
    width: 33.33%;
  }
}
/* 活动页面 */
.active-page {
  background-color: rgb(172, 160, 160) !important;
}
/* 下一页按钮 */
.next-btn {
  position: absolute;
  bottom: 8%;
  left: 8%;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #910000;
}
</style>
