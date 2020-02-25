import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import './assets/css/common.css'
import 'font-awesome/css/font-awesome.css'
import './plugins/element.js'
import 'animate.css'
/* 验证码组件 */
import SlideVerify from 'vue-monoplasty-slide-verify'

/* 将 axios 放入 Vue 原型 */
Vue.prototype.$http = Axios
/* 配置 axios BaseURL */
Vue.prototype.$http.default.baseURL = 'http://localhost:8081/'

Vue.use(SlideVerify)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
