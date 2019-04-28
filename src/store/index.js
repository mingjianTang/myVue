import Vue from 'vue'
import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
  strict: isDev,
  state,
  mutations,
  getters,
  actions,
  modules: {
    mA: {
      namespaced: true,
      state: {
        text: 'moduleA',
        textPlus: 'moduleAPlus'
      },
      getters: {
        textPlus (state, getters, rootState) {
          return state.textPlus + rootState.count + rootState.mB.text
        }
      },
      mutations: {
        updateText (state, text) {
          console.log('mA',state)
          state.text = text
        }
      },
      actions: {
        add ({ state, commit, rootState }) {
          // commit('updateText', rootState.count)
          commit('updateCount', { num: 56789}, { root: true})
        }
      }
    },
    mB: {
      state: {
        text: 'moduleB'
      },
      mutations: {
        updateText (state, text) {
          console.log('mB',state)
          state.text = text
        }
      }
    }
  }
})

export default store
