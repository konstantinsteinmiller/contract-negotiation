
export default {
  namespaced: true,
  state: {
    maxOffer: 0,
    minExpectation: 0
  },
  actions: {
    setMaxOffer ({ commit, state }, payload) {
      return commit('setMaxOffer', payload.value)
    },
    setMinExpectation ({ commit, state }, payload) {
      return commit('setMinExpectation', payload.value)
    }
  },
  getters: {
    getMaxOffer: state => state.maxOffer,
    getMinExpectation: state => state.minExpectation
  },
  mutations: {
    setMaxOffer(state, payload) {
      state.maxOffer = payload
    },
    setMinExpectation(state, payload) {
      state.minExpectation = payload
    }
  }
}
