<template>
  <div class="backstage-page">
    <el-container class="container-max">
      <el-aside :width="isCollapse ? '65px' : '160px'">
        <div class="control-collapse" @click="handleCollapse()">
          <i class="el-icon-menu"></i>
        </div>
        <el-menu
          :unique-opened="true"
          router
          background-color="#F2F5F7"
          text-color="#7E8791"
          active-text-color="#910000"
          default-active="2"
          class="el-menu-vertical"
          :collapse-transition="false"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户设置</span>
            </template>
            <el-menu-item index="user">用户列表</el-menu-item>
            <el-menu-item index="role">角色管理</el-menu-item>
            <el-menu-item index="power">权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章设置</span>
            </template>
            <el-menu-item index="article">文章列表</el-menu-item>
            <el-menu-item index="article_cate">文章分类</el-menu-item>
            <el-menu-item index="tag_cate">标签管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>网站管理</span>
            </template>
            <el-menu-item index="setting">系统设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 当前路由 -->
          <div class="current-router-box">
            {{ currentRouter }}
          </div>
          <!-- 顶部其他项目 -->
          <div>
            <div class="search-box">
              <input type="text" placeholder="Search..." :style="{ width: showSearch ? '200px' : 0 }" />
              <button class="el-icon-search" @click="showSearchBox"></button>
            </div>
            <div class="info-box">
              <button class="el-icon-s-custom"></button>
            </div>
            <div class="info-box">
              <button class="el-icon-bell"></button>
            </div>
          </div>
        </el-header>
        <el-main>
          <transition enter-active-class="animated zoomIn"> <router-view /> </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRouter: '主面板',
      showSearch: false,
      isCollapse: false
    }
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    /* 显示搜索栏 */
    showSearchBox() {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style lang="less" scoped>
.backstage-page {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  color: #7e8791;
  .container-max {
    width: 100%;
    height: 100%;
    .el-header {
      .current-router-box {
        width: max-content;
        height: 60px;
        float: left;
        padding: 0 6px;
        line-height: 60px;
      }
      button {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        color: #7e8791;
        font-size: 18px;
        box-shadow: none;
      }
      button:hover {
        background-color: #dfdfdf;
      }
      > :nth-child(2) {
        > div {
          display: flex;
          align-items: center;
          height: 60px;
          float: right;
          margin-left: 10px;
        }
        .search-box {
          position: relative;
          min-width: 40px;
          width: max-content;
          input {
            margin-right: 40px;
          }
          button {
            position: absolute;
            right: 0;
          }
        }
        .info-box {
          float: right;
        }
      }
    }
    .el-aside {
      overflow: hidden;
      background-color: #f2f5f7;
      box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
      transition: all 0.5s;
      .el-menu {
        border: none;
      }
      .control-collapse {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        width: 100%;
        color: #910000;
      }
    }
  }
}
.el-icon-menu {
  font-size: 30px;
}
</style>
