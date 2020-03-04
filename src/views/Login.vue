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
        <form>
          <transition enter-active-class="animated shake" leave-active-class="animated shake">
            <div class="username" v-if="worriedTips">
              <div>邮箱</div>
              <input type="text" placeholder="Email" v-model="loginFormData.email" />
            </div>
          </transition>
          <transition enter-active-class="animated shake" leave-active-class="animated shake">
            <div class="password" v-if="worriedTips">
              <div>密码</div>
              <input type="password" placeholder="Password" v-model="loginFormData.password" autocomplete />
            </div>
          </transition>
        </form>
        <div class="login-btn">
          <div @click="toggleCard()">前往注册</div>
          <div @click="handleLogin()" v-loading.fullscreen.lock="fullscreenLoading">登入</div>
        </div>
      </div>
    </transition>
    <!-- 注册盒子 -->
    <form>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div id="registered-box" class="registered-box" v-if="registeredFlag">
          <div class="email" v-if="worriedTips">
            <div>邮箱</div>
            <input type="text" placeholder="Email" v-model="registeredFormData.email.value" @blur="checkReview($event.target.placeholder)" />
            <span class="available-tag" v-if="registeredFormData.email.flag === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="registeredFormData.email.flag === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
          <div class="username" v-if="worriedTips">
            <div><i>昵称</i><i>(用于在社区展示)</i></div>
            <input type="text" placeholder="Nickname" v-model="registeredFormData.nickname.value" @blur="checkReview($event.target.placeholder)" />
            <span class="available-tag" v-if="registeredFormData.nickname.flag === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="registeredFormData.nickname.flag === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
          <div class="username" v-if="worriedTips">
            <div>手机号码</div>
            <input type="text" placeholder="PhoneNumber" v-model="registeredFormData.phone.value" @blur="checkReview($event.target.placeholder)" />
            <span class="available-tag" v-if="registeredFormData.phone.flag === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="registeredFormData.phone.flag === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
          <div class="password" v-if="worriedTips">
            <div>密码</div>
            <input type="password" placeholder="Password" v-model="registeredFormData.password.value" @blur="checkReview($event.target.placeholder)" autocomplete="new-password" />
            <span class="available-tag" v-if="registeredFormData.password.flag === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="registeredFormData.password.flag === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
          <div class="rePassword" v-if="worriedTips">
            <div>确认密码</div>
            <input type="password" placeholder="Confirm Password" v-model="registeredFormData.cPassword.value" @blur="handleComfirePw" autocomplete="new-password" />
            <span class="available-tag" v-if="registeredFormData.cPassword.flag === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="registeredFormData.cPassword.flag === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
          <div class="identityCode" v-if="worriedTips">
            <div>邮箱验证码</div>
            <input type="text" placeholder="Code" v-model="registeredFormData.identityCode" />
            <span class="sendEmailCode" @click="sendEmailCode()" v-if="!codeDisAble">获取验证码</span>
          </div>
          <div class="registered-btn">
            <div @click="handleRegistered()">确认</div>
            <div @click="toggleCard()">返回</div>
          </div>
        </div>
      </transition>
    </form>

    <!-- 验证码 -->
    <el-dialog :visible.sync="showCode" width="360px" center>
      <slide-verify :l="42" :r="10" :w="310" :h="160" :imgs="[]" slider-text="向右滑动" @success="verifiedSuccess()" @fail="verifiedFail()" @refresh="onRefresh"></slide-verify>
    </el-dialog>

    <!-- 登录弹框 -->
  </div>
</template>

<script>
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const nameReg = /^[a-zA-Z0-9_-]{4,16}$/
const passwordReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/
const phoneReg = /^1[34578]\d{9}$/
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
      // 获取验证码 禁用 标志
      codeDisAble: false,
      // 加载 标志
      fullscreenLoading: false,
      // 登录表单
      loginFormData: {
        email: '', // admin@qq.com
        password: '' // 123
      },
      // 注册表单
      registeredFormData: {
        ip: '',
        email: {
          value: '',
          flag: 0
        },
        nickname: {
          value: '',
          flag: 0
        },
        password: {
          value: '',
          flag: 0
        },
        cPassword: {
          value: '',
          flag: 0
        },
        phone: {
          value: '',
          flag: 0
        },
        identityCode: null
      }
    }
  },

  methods: {
    /* 延时 */
    delayTiming(flag) {
      flag = false
      window.setTimeout(() => {
        flag = true
      }, 100)
    },

    /* 格式验证 */
    verifyLogin(cemail, cpassword) {
      if (!emailReg.test(cemail) || !passwordReg.test(cpassword)) {
        this.$notification.error({
          title: '错误',
          message: '账号或密码格式有误'
        })
        this.delayTiming(this.worriedTips)
        return false
      } else {
        /* 显示验证码 */
        this.showCode = true
      }
    },

    /* 登录事件 */
    handleLogin() {
      const email = this.loginFormData.email
      const password = this.loginFormData.password
      /* 验证函数 */
      this.verifyLogin(email, password)
    },

    /* 发起登陆请求 */
    async xhrLogin(formData) {
      const res = await this.$http.get('/user/userLogin', {
        params: {
          user_email: formData.email,
          user_password: formData.password
        }
      })
      if (res.data.code === 200) {
        this.$notification.success({
          title: '成功',
          message: '欢迎回来'
        })
        window.localStorage.setItem('TOKEN', res.data.token)
        window.localStorage.setItem('USERINFO', JSON.stringify(res.data))
        this.$router.push('./backstage')
      } else {
        this.showCode = false
        this.$notification.error({
          title: '错误',
          message: '账号或密码错误'
        })
      }
    },

    /* 切换 登录 与 注册 */
    async toggleCard() {
      this.registeredFlag = !this.registeredFlag
    },

    /* 验证成功 */
    async verifiedSuccess() {
      this.fullscreenLoading = true
      this.showCode = false
      if (!this.registeredFlag) {
        await this.xhrLogin(this.loginFormData)
        this.fullscreenLoading = false
      } else {
        const { ip, email, nickname, password, phone, identityCode } = this.registeredFormData
        const res = await this.$http.get('/user/register', {
          params: {
            user_ip: ip,
            user_email: email.value,
            user_name: nickname.value,
            user_password: password.value,
            user_telephone_number: phone.value,
            code: identityCode
          }
        })
        if (res.data.status === 200) {
          this.showCode = false
          const h = this.$createElement
          this.$notification({
            title: '注册成功',
            message: h('i', { style: 'color: teal' }, '将在3秒后登录')
          })
          window.setTimeout(async () => {
            this.xhrLogin(this.registeredFormData)
          }, 3000)
        }
      }
    },

    /* 验证失败 */
    failSuccess() {},

    /* 刷新验证码 */
    onRefresh() {},

    /*  注册验证提示 */
    verifyregiterNode(reg, fromNode, title) {
      if (!reg.test(fromNode.value)) {
        this.$notification.error({
          title: '错误',
          message: title
        })
        fromNode.flag = 2
        return false
      } else {
        fromNode.flag = 1
        return true
      }
    },

    /* 注册事件 */
    handleRegistered() {
      for (const key in this.registeredFormData) {
        if (this.registeredFormData[key] === 2) {
          return false
        }
      }
      const { email, nickname, password, cPassword, phone, identityCode } = this.registeredFormData
      if (!email || !nickname || !password || !phone || !cPassword || !identityCode) {
        this.$notification.error({
          title: '错误',
          message: '必填项不能为空'
        })
        return false
      }
      this.verifyregiterNode(emailReg, email, '邮箱格式不正确')
      this.verifyregiterNode(nameReg, nickname, '用户名为4到16位包括（字母，数字，下划线，减号）')
      this.verifyregiterNode(passwordReg, password, '密码最少6位，大写字母，小写字母，数字，特殊字符其中两种组合')
      this.verifyregiterNode(phoneReg, phone, '手机号码格式不正确')

      /* 显示验证码 */
      this.showCode = true
    },

    /* 确认两次密码是否相同 */
    handleComfirePw() {
      const { password, cPassword } = this.registeredFormData
      if (cPassword.value.trim().length === 0) {
        this.$notification.error({
          title: '错误',
          message: '请填写确认密码'
        })
        cPassword.flag = 2
      } else if (password.value !== cPassword.value) {
        this.$notification.error({
          title: '错误',
          message: '两次输入的密码不一致'
        })
        cPassword.flag = 2
      } else {
        cPassword.flag = 1
      }
    },

    /* 检查邮箱 \ 昵称和手机是否可用 */
    async checkReview(e) {
      const { email, nickname, phone, password } = this.registeredFormData
      switch (e) {
        case 'Email':
          {
            if (!this.verifyregiterNode(emailReg, email, '  ')) return false
            const { data: res } = await this.$http.get('/user/queryUserEmail', {
              params: {
                user_email: email.value
              }
            })
            console.log(res)
            this.handleCheckReview(res.status, 'email')
          }
          break
        case 'Nickname':
          {
            if (!this.verifyregiterNode(nameReg, nickname, '用户名为4到16位包括（字母，数字，下划线，减号）')) return false
            const { data: res } = await this.$http.get('/user/queryUserName', {
              params: {
                user_name: nickname.value
              }
            })
            this.handleCheckReview(res.status, 'nickname')
          }
          break
        case 'PhoneNumber':
          {
            if (!this.verifyregiterNode(phoneReg, phone, '手机号码格式不正确')) return false
            const { data: res } = await this.$http.get('/user/queryUserTel', {
              params: {
                user_telephone_number: phone.value
              }
            })
            this.handleCheckReview(res.status, 'phone')
          }
          break
        case 'Password':
          this.verifyregiterNode(passwordReg, password, '密码最少6位，大写字母，小写字母，数字，特殊字符其中两种组合')
          break
        default:
          break
      }
    },

    /* 联网检测 */
    handleCheckReview(status, params) {
      if (status === 200) {
        this.registeredFormData[params].flag = 1
      } else {
        this.registeredFormData[params].flag = 2
      }
    },

    /* 发送验证码 */
    async sendEmailCode() {
      const { email } = this.registeredFormData
      this.verifyregiterNode(emailReg, email, '邮箱格式不正确')
      if (email.flag === 1) {
        this.codeDisAble = false
        const { data: res } = await this.$http.get('/user/getCheckCode', {
          params: { user_email: this.registeredFormData.email.value }
        })
        if (res.status === 200) {
          this.codeDisAble = true
          this.$notification.success({
            title: '成功',
            message: '验证码发送成功'
          })
        } else {
          this.codeDisAble = false
          this.$notification.error({
            title: '错误',
            message: res.msg
          })
        }
      }
    }
  },

  created() {
    this.registeredFormData.ip = window.localStorage.getItem('IP')
  },
  mounted() {},
  watch: {}
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
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 360px;
    height: max-content;
    padding: 30px;
    padding-top: 0;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
    transition: all 1s;
    form {
      box-sizing: border-box;
      width: 100%;
      > div {
        margin-bottom: 20px;
      }
    }
    > div {
      width: 100%;
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
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 360px;
    height: max-content;
    background-color: #fff;
    padding: 30px;
    border-radius: 6px;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
    transition: all 1s;
    form {
      box-sizing: border-box;
      width: 100%;
    }
    > div {
      position: relative;
      height: 56px;
      width: 100%;
      margin-bottom: 20px;
      span {
        position: absolute;
        right: 0;
        bottom: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        width: max-content;
        color: #fff;
        font-size: 12px;
        transition: all 0.5s;
        cursor: pointer;
        font-size: 18px;
      }
      .available-tag {
        color: #409eff;
      }
      .unavailable-tag {
        color: #f56c6c;
      }
      .sendEmailCode {
        padding: 0 3px;
        font-size: 14px;
        background-color: #910000;
        border-radius: 3px;
      }
      input:hover {
        background-color: #eee;
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
      margin: 30px 0 0 0;
      height: max-content;
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
  .el-dialog__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
