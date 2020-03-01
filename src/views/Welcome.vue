<template>
  <div class="welcome-page">
    <div class="welcome-slogan">欢迎</div>
    <el-row :gutter="12">
      <el-col :span="12"
        ><my-card :cardWidth="100" :cardHeight="100" :header="false">
          <template v-slot:container>
            <div class="current-user-info-box">
              <div class="user_avant">
                <img src="" alt="" />
              </div>
              <div class="user_avant">
                <div>用户名：</div>
                <div>邮箱：</div>
                <div>手机：</div>
              </div>
            </div>
          </template>
        </my-card></el-col
      >
      <el-col :span="12"> <my-card :cardWidth="100" :cardHeight="100" :header="false"> </my-card></el-col>
    </el-row>
  </div>
</template>

<script>
import MyCard from '../components/Mycard.vue'
export default {
  components: {
    MyCard
  }
}
</script>

<style lang="less" scoped>
.welcome-page {
  width: 100%;
  height: 100%;
  .el-row {
    height: 280px;
  }
  .welcome-slogan {
    box-sizing: border-box;
    margin-bottom: 20px;
    width: 100%;
    height: 100px;
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.4);
    line-height: 76px;
    font-size: 24px;
  }
  .current-user-info-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div {
      height: 50%;
      width: 100%;
      > img {
        display: block;
        border-radius: 6px;
        background-color: #ccc;
        height: 120px;
        width: 120px;
      }
    }
    > :nth-child(2) {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  [class*='el-col-'] {
    height: 280px;
  }
}
</style>
