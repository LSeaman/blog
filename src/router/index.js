import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Backstage from '../views/Backstage.vue'
import User from '../views/user/User.vue'
import Role from '../views/user/Role.vue'
import Power from '../views/user/Power.vue'
import Article from '../views/article/Article.vue'
import Articlecate from '../views/article/Articlecate.vue'
import Tagcate from '../views/article/Tagcate.vue'
import Setting from '../views/setting/Setting.vue'
// import Text from '../test/Text.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/test', component: Text },
  {
    path: '/backstage',
    component: Backstage,
    children: [
      { path: '/user', component: User },
      { path: '/role', component: Role },
      { path: '/power', component: Power },
      { path: '/article', component: Article },
      { path: '/article_cate', component: Articlecate },
      { path: '/tag_cate', component: Tagcate },
      { path: '/setting', component: Setting }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
