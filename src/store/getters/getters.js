// getters简单的理解成computed
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}