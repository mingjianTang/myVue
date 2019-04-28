// mutations 必须是同步函数  更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
export default {
  updateCount: (state, {num, num2}) => {
    state.count = num
  }
}