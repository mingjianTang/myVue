import Notification from './notification.vue'
import Notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = Notify
}
