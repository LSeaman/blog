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
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="email" v-if="worriedTips">
            <div>邮箱</div>
            <input type="text" placeholder="Email" v-model="registeredFormData.email" @blur="checkReview($event.target.placeholder)" />
            <span class="available-tag" v-if="reuseFlag.email === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="reuseFlag.email === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
        </transition>
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="username" v-if="worriedTips">
            <div><i>昵称</i><i>(用于在社区展示)</i></div>
            <input type="text" placeholder="Nickname" v-model="registeredFormData.nickname" @blur="checkReview($event.target.placeholder)" />
            <span class="available-tag" v-if="reuseFlag.nickname === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="reuseFlag.nickname === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
        </transition>
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="username" v-if="worriedTips">
            <div>手机号码</div>
            <input type="text" placeholder="PhoneNumber" v-model="registeredFormData.phone" @blur="checkReview($event.target.placeholder)" />
            <span class="available-tag" v-if="reuseFlag.phone === 1">
              <i class="el-icon-success"></i>
            </span>
            <span class="unavailable-tag" v-if="reuseFlag.phone === 2">
              <i class="el-icon-error"></i>
            </span>
          </div>
        </transition>
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="password" v-if="worriedTips">
            <div>密码</div>
            <input type="password" placeholder="Password" v-model="registeredFormData.password" />
          </div>
        </transition>
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="rePassword" v-if="worriedTips">
            <div>确认密码</div>
            <input type="password" placeholder="Confirm Password" v-model="registeredFormData.cPassword" @blur="handleComfirePw" />
          </div>
        </transition>
        <transition enter-active-class="animated shake" leave-active-class="animated shake">
          <div class="identityCode" v-if="worriedTips">
            <div>邮箱验证码</div>
            <input type="text" placeholder="Code" v-model="registeredFormData.identityCode" />
            <span class="sendEmailCode" @click="sendEmailCode()" v-if="!codeDisAble">获取验证码</span>
          </div>
        </transition>
        <div class="registered-btn">
          <div @click="handleRegistered()">确认</div>
          <div @click="toggleCard()">返回</div>
        </div>
      </div>
    </transition>

    <!-- 验证码 -->
    <el-dialog :visible.sync="showCode" width="360px" center>
      <slide-verify :l="42" :r="10" :w="310" :h="160" :imgs="verifyImg" slider-text="向右滑动" @success="verifiedSuccess()" @fail="verifiedFail()" @refresh="onRefresh"></slide-verify>
    </el-dialog>
  </div>
</template>

<script>
import img1 from '../assets/img/verify/img1.jpg'
import img2 from '../assets/img/verify/img2.jpg'
import img3 from '../assets/img/verify/img3.jpg'
import img4 from '../assets/img/verify/img4.jpg'
import img5 from '../assets/img/verify/img5.jpg'
const emailReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
const nameReg = /^[a-zA-Z0-9_-]{4,16}$/
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/
const phoneReg = /^1[34578]\d{9}$/
export default {
  data() {
    return {
      // 获取盒子节点
      loginBox: null,
      registeredBox: null,
      // 显示验证码
      showCode: false,
      // 验证图片
      verifyImg: [img1, img2, img3, img4, img5],
      // 登陆时 , 有任意一项错误激活动画
      worriedTips: true,
      // 切换至注册
      registeredFlag: false,
      // 验证失败
      verifyFlag: true,
      // 检查可用性
      reuseFlag: {
        email: 0,
        nickname: 0,
        phone: 0
      },
      // 获取验证码 禁用 标志
      codeDisAble: false,
      randomCode: '',
      loginFormData: {
        email: '', // admin@qq.com
        password: '' // 123
      },
      registeredFormData: {
        ip: '',
        email: 'flvp@qq.com',
        nickname: 'Larmal',
        password: 'Flp0513?',
        cPassword: 'Flp0513?',
        phone: '13575098799',
        identityCode: null
      }
    }
  },

  methods: {
    /* 延时 */
    delayTiming() {
      this.worriedTips = false
      window.setTimeout(() => {
        this.worriedTips = true
      }, 100)
    },

    /* 格式验证 */
    verifyLogin(cemail, cpassword, reg) {
      const password = cpassword.trim()
      if (!reg.test(cemail) || cemail === '' || cemail === null || password.length < 6) {
        this.$notification.error({
          title: '错误',
          message: '账号或密码格式有误'
        })
        this.delayTiming()
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
      this.verifyLogin(email, password, emailReg)
    },

    /* 切换 登录 与 注册 */
    async toggleCard() {
      this.registeredFlag = !this.registeredFlag
    },

    /* 验证成功 */
    async verifiedSuccess() {
      if (!this.registeredFlag) {
        const res = await this.$http.get('/blog/user/userLogin', {
          params: {
            user_email: this.loginFormData.email,
            user_password: this.loginFormData.password
          }
        })
        if (res.data.status === 200) {
          this.$notification.success({
            title: '成功',
            message: '欢迎回来'
          })
          window.localStorage.setItem('TOKEN', res.data.token)
          this.$router.push('./backstage')
        } else {
          this.showCode = false
          this.$notification.error({
            title: '错误',
            message: '账号或密码错误'
          })
        }
        console.log(res)
      } else {
        const { ip, email, nickname, password, phone, identityCode } = this.registeredFormData
        const res = await this.$http.get('/blog/user/register', {
          params: {
            user_ip: ip,
            user_email: email,
            user_name: nickname,
            user_password: password,
            user_telephone_number: phone,
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
            const res = await this.$http.get('/blog/user/userLogin', {
              params: {
                user_email: this.registeredFormData.email,
                user_password: this.registeredFormData.password
              }
            })
            if (res.data.status === 200) {
              this.$notification.success({
                title: '成功',
                message: '欢迎回来'
              })
              window.localStorage.setItem('TOKEN', res.data.token)
              this.$router.push('./backstage')
            }
          }, 3000)
        }
      }
    },

    /* 验证失败 */
    failSuccess() {},

    /* 刷新验证码 */
    onRefresh() {},

    /* 注册验证 */
    verifyregiter() {
      const { email, nickname, password, cPassword, phone, identityCode } = this.registeredFormData
      if (!email || !nickname || !password || !phone || !cPassword || !identityCode) {
        this.$notification.error({
          title: '错误',
          message: '必填项不能为空'
        })
        this.delayTiming()
        return false
      } else if (!emailReg.test(email)) {
        this.$notification.error({
          title: '错误',
          message: '邮箱格式不正确'
        })
        this.delayTiming()
        return false
      } else if (!nameReg.test(nickname)) {
        this.$notification.error({
          title: '错误',
          message: '用户名为4到16位包括（字母，数字，下划线，减号）'
        })
        this.delayTiming()
        return false
      } else if (!passwordReg.test(password)) {
        this.$notification.error({
          title: '错误',
          message: '密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
        })
        this.delayTiming()
        return false
      } else if (!phoneReg.test(phone)) {
        this.$notification.error({
          title: '错误',
          message: '手机号码格式不正确'
        })
        this.delayTiming()
        return false
      } else {
        /* 显示验证码 */
        this.showCode = true
      }
    },

    /* 注册事件 */
    handleRegistered() {
      for (const key in this.reuseFlag) {
        if (this.reuseFlag[key] === 2) {
          return false
        }
      }
      this.verifyregiter()
    },

    /* 确认两次密码是否相同 */
    handleComfirePw() {
      const { password, cPassword } = this.registeredFormData
      if (password !== cPassword) {
        this.$notification.error({
          title: '错误',
          message: '两次输入的密码不一致'
        })
      }
    },

    /* 检查邮箱 \ 昵称和手机是否可用 */
    async checkReview(e) {
      const { email, nickname, phone } = this.registeredFormData
      switch (e) {
        case 'Email':
          {
            const { data: res } = await this.$http.get('/blog/user/queryUserEmail', {
              params: {
                user_email: email
              }
            })
            this.handleCheckReview(res.status, 'email')
          }
          break
        case 'Nickname':
          {
            const { data: res } = await this.$http.get('/blog/user/queryUserName', {
              params: {
                user_name: nickname
              }
            })
            this.handleCheckReview(res.status, 'nickname')
          }
          break
        case 'PhoneNumber':
          {
            const { data: res } = await this.$http.get('/blog/user/queryUserTel', {
              params: {
                user_telephone_number: phone
              }
            })
            this.handleCheckReview(res.status, 'phone')
          }
          break
        default:
          break
      }
    },

    /* 状态改变，渲染页面，显示页面是否可用 */
    handleCheckReview(status, data) {
      if (status === 1) {
        this.reuseFlag[data] = 1
      } else {
        this.reuseFlag[data] = 2
      }
    },

    /* 发送验证码 */
    async sendEmailCode() {
      this.codeDisAble = true
      this.checkReview('Email')
      if (this.reuseFlag.email === 2) {
        this.$notification.error({
          title: '错误',
          message: '邮箱不可用'
        })
        return false
      }
      const { data: res } = await this.$http.get('/blog/user/getCheckCode', {
        params: {
          user_email: this.registeredFormData.email
        }
      })
      if (res === 1) {
        this.$notification.error({
          title: '错误',
          message: '验证码发送成功'
        })
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

    > div {
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
    height: 560px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
    transition: all 1s;

    > div {
      position: relative;
      height: 56px;
      width: 300px;
      margin-bottom: 10px;
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
  .el-dialog__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
