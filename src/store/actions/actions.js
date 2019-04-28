// actions 提交的是 mutation，而不是直接变更状态
// actions 可以包含任意异步操作
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
        store.commit('updateCount', {
            num: data.num
        })
    }, data.time)
  }
}