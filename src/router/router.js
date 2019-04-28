import VueRouter from 'vue-router'

import home from '../view/home.vue'
import demo from '../view/test/demo.vue'
import pendingitem from '../view/pendingitem/index.vue'
import pendingitemAudit from '../view/pendingitem/pendingitemAudit.vue'
import pendingitemDetail from '../view/pendingitem/pendingitemDetail.vue'
import invitation from '../view/invitation/index.vue'
import marketnews from '../view/marketnews/index.vue'
import proxyList from '../view/proxyList/index.vue'
import proxyOpenaccount from '../view/proxyList/sub_pages/accountOpen.vue'
import groupList from '../view/group/index.vue'
import groupAdd from '../view/group/group.add.vue'

// 创建路由对象，设置路由属性
const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: home},
    {path: '/demo', component: demo},
    {path: '/pendingitem', component: pendingitem},
    {path: '/pendingitemAudit', component: pendingitemAudit},
    {path: '/pendingitemDetail', component: pendingitemDetail},
    {path: '/invitation', component: invitation},
    {path: '/marketnews', component: marketnews},
    {path: '/proxyList', component: proxyList},
    {path: '/proxyOpenaccount', component: proxyOpenaccount},
    {path: '/groupList', component: groupList},
    {path: '/groupAdd', component: groupAdd}
  ]
})

export default () => {
  return router
}
