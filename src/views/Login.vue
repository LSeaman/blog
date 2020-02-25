<template>
  <div class="login-page">
    <!-- 背景模糊层 -->
    <div class="filter_blur"></div>
    <!-- 登录盒子 -->
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div id="login-box" class="login-box" v-if="!registeredFlag">
        <div class="login-pic">
          <img src="../assets/img/logo.png" alt="" />
        </div>
        <!-- 动画包裹 -->
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="username" v-if="worriedTips">
            <div>邮箱</div>
            <input type="text" placeholder="Email" v-model="loginFormData.email" />
          </div>
        </transition>
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="password" v-if="worriedTips">
            <div>密码</div>
            <input type="password" placeholder="Password" v-model="loginFormData.password" />
          </div>
        </transition>
        <div class="login-btn">
          <!-- <div @click="setRandomCode()" :style="{ 'border-bottom': showCode }">
            <s-identify :randomCode="randomCode" :contentWidth="120" :contentHeight="48" v-if="showCode"></s-identify>
          </div> -->
          <div @click="toggleCard()">前往注册</div>
          <div @click="handleLogin()">登入</div>
        </div>
      </div>
    </transition>
    <!-- 注册盒子 -->
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div id="registered-box" class="registered-box" v-if="registeredFlag">
        <div class="email">
          <div>邮箱</div>
          <input type="text" placeholder="Email" v-model="registeredFormData.email" />
          <span @click="handleCheck()">是否可用</span>
        </div>
        <div class="username">
          <div><i>昵称</i><i>(用于在社区展示)</i></div>
          <input type="text" placeholder="Nickname" v-model="registeredFormData.nickname" />
          <span @click="handleCheck()">是否可用</span>
        </div>
        <div class="username">
          <div>手机号码</div>
          <input type="text" placeholder="PhoneNumber" v-model="registeredFormData.nickname" />
          <span @click="handleCheck()">是否可用</span>
        </div>
        <div class="password">
          <div>密码</div>
          <input type="text" placeholder="Password" v-model="registeredFormData.password" />
        </div>
        <div class="rePassword">
          <div>确认密码</div>
          <input type="text" placeholder="Confirm Password" v-model="registeredFormData.cPassword" />
        </div>
        <div class="registered-btn">
          <!-- <div @click="setRandomCode()" :style="{ 'border-bottom': showCode }">
            <s-identify :randomCode="randomCode" :contentWidth="120" :contentHeight="48" v-if="showCode"></s-identify>
          </div> -->
          <div @click="handleRegistered()">确认</div>
          <div @click="toggleCard()">返回</div>
        </div>
      </div>
    </transition>

    <!-- 验证码 -->
    <div class="v-mask" v-if="showCode" @click="closeSlide"></div>
    <div class="slide-verify-box" v-if="showCode">
      <slide-verify :l="42" :r="10" :w="310" :h="160" slider-text="向右滑动" @success="verifiedSuccess()" @fail="verifiedFail()"
        @refresh="onRefresh"></slide-verify>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取盒子节点
      loginBox: null,
      registeredBox: null,
      // 显示验证码
      showCode: false,
      // 登陆时 , 有任意一项错误激活动画
      worriedTips: true,
      // 切换至注册
      registeredFlag: false,
      // 验证失败
      verifyFlag: true,
      randomCode: '',
      loginFormData: {
        email: '', // admin@qq.com
        password: '' // 123
      },
      registeredFormData: {
        email: '',
        nickname: '',
        password: '',
        cPassword: '',
        phone: '',
        identityCode: null
      }
    }
  },

  methods: {
    /* 延时 */
    delayTiming() {
      window.setTimeout(() => {
        this.worriedTips = true
      }, 100)
    },

    /* 登录事件 */
    handleLogin() {
      const email = this.loginFormData.email
      const password = this.loginFormData.password
      const emailReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
      /* 验证函数 */
      this.verifyFormat(email, password, emailReg)
    },

    /* 格式验证 */
    verifyFormat(email, password, reg) {
      if (!reg.test(email) || email === '' || email === null || password.length < 6) {
        this.$notification.error({
          title: '错误',
          message: '账号或密码格式有误'
        })
        this.worriedTips = false
        this.delayTiming()
        return false
      } else {
        /* 显示验证码 */
        this.showCode = true
      }
    },

    /* 切换 登录 与 注册 */
    toggleCard() {
      this.registeredFlag = !this.registeredFlag
    },

    /* 点击遮罩层关闭验证码 */
    closeSlide() {
      this.showCode = false
    },

    /* 验证成功 */
    async verifiedSuccess() {
      const res = await this.$http.get('blog/user/userLogin', {
        params: {
          email: this.loginFormData.email,
          password: this.loginFormData.password
        }
      })
      if (res.data.status === 200) {
        this.$notification.success({
          title: '成功',
          message: '欢迎回来'
        })
        this.$router.push('./backstage')
      } else {
        this.showCode = false
        this.$notification.error({
          title: '错误',
          message: '账号或密码错误'
        })
      }
      console.log(res)
    },

    /* 验证失败 */
    failSuccess() {},

    /* 刷新验证码 */
    onRefresh() {},

    /* 注册事件 */
    handleRegistered() {
      this.$http.get()
    },

    /* 检查邮箱或者昵称是否可用 */
    handleCheck() {}
  },

  created() {},

  mounted() {
    this.loginBox = document.getElementById('login-box')
    this.registeredBox = document.getElementById('registered-box')
  }
}
</script>

<style lang="less" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    font-weight: 700;
    overflow: hidden;

    .filter_blur {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: url('../assets/img/login_bc.jpg');
      background-size: cover;
      -webkit-filter: blur(100px) brightness(110%);
      filter: blur(100px) brightness(110%);
    }

    .login-box {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      width: 360px;
      height: 400px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
      transition: all 1s;

      >div {
        width: 300px;
        margin-bottom: 10px;

        input:hover {
          background-color: #eee;
        }
      }

      .login-pic {
        width: 100%;
        height: 120px;
        text-align: center;
        line-height: 120px;
        font-size: 32px;
        color: #fff;
        background-size: cover;

        img {
          width: 120px;
          height: 120px;
        }
      }

      .login-btn {
        margin-top: 40px;

        :nth-child(1) {
          float: left;
        }

        :nth-child(2) {
          float: right;
        }

        :nth-child(n) {
          cursor: pointer;
          width: 120px;
          height: 48px;
          line-height: 48px;

          background-color: #910000;
          color: #fff;
          border-radius: 6px;
          text-align: center;
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }

    .registered-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 360px;
      height: 480px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
      transition: all 1s;

      >div {
        position: relative;
        height: 56px;
        width: 300px;
        margin-bottom: 10px;

        input:hover {
          background-color: #eee;
        }
      }

      > :nth-child(-n + 3) {
        span {
          position: absolute;
          right: 0;
          bottom: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 24px;
          width: 56px;
          background-color: #f3f3f3;
          color: #708183;
          font-size: 12px;
          transition: all 0.5s;
          cursor: pointer;
        }
      }

      .registered-pic {
        width: 100%;
        height: 120px;
        text-align: center;
        line-height: 120px;
        font-size: 32px;
        color: #fff;
        background-size: cover;

        img {
          width: 120px;
          height: 120px;
        }
      }

      .registered-btn {
        margin-top: 40px;

        :nth-child(n) {
          cursor: pointer;
          width: 120px;
          height: 48px;
          line-height: 48px;

          background-color: #910000;
          color: #fff;
          border-radius: 6px;
          text-align: center;
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }

        :nth-child(1) {
          float: left;
        }

        :nth-child(2) {
          float: right;
        }
      }
    }

    /* 验证码遮罩层 */
    .v-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }

    .slide-verify-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 320px;
      height: 236px;
      z-index: 99;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      transition: all 0.5s;
    }
  }
</style>
