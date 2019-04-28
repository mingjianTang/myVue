import base from '../base'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

const home = {
  financialNews (params) {
    return Vue.jsonp(`${base.megarich}/News/FinancialNews`, params)
  }
}

export default home
