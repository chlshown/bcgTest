import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'

Vue.use(Vuex)

const state = () => ({
  loadingState: false,
  listArray: []
})

const getters = {}

const actions = {
  doSearch: ({ commit, state }, data) => {
    try {
      commit('setLoading', true)
      jsonp(`https://itunes.apple.com/search?media=music&term=${data}`, {}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
          const array = Array.isArray(data.results) ? data.results : []
          commit('setList', array)
        }
        commit('setLoading', false)
      })
    } catch (err) {
      commit('setLoading', false)
      console.log(err)
    }
  }
}

const mutations = {
  setList (state, data) {
    state.listArray = data
  },
  setLoading (state, data) {
    state.loadingState = data
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
