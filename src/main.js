import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueJsonp from 'vue-jsonp'

import createRouter from './router/router'
import api from './api'
import filters from './js/filters/myFilters'
import App from './app.vue'
import store from './store'
import Common from './js/common/index.js'
import AdvanceSearch from './components/advanceSearch'
import Notification from './components/notification'

import './assets/css/font.css'
import './assets/iconfont/iconfont.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/basic.less'
import './assets/css/style.less'
import './js/directives/myDirctives.js'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueJsonp)
Vue.use(AdvanceSearch)
Vue.use(Notification)

// 接口
Vue.prototype.$api = api
// 公共方法
Vue.prototype.common = Common
// 过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const router = createRouter()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// Vue.use({
//   vRouter
// })
