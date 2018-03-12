import Vue from 'vue'
import Vuex from 'vuex'
import negotiation from './modules/negotiation'
Vue.use(Vuex)

export default new Vuex.Store({
  root: true,
  modules: {
    negotiation
  }
})
