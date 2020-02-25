import Vue from 'vue'
import {
  Message,
  Notification,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification
