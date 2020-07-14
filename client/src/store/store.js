import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLggedIn: false,
    basket: 0
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLggedIn = true
      } else {
        state.isUserLggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setBasket (state, basket) {
      state.basket = basket
    },
    delBasket (state) {
      state.basket--
    },
    addBasket (state) {
      state.basket++
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setBasket ({ commit }, basket) {
      commit('setBasket', basket)
    },
    delBasket ({ commit }) {
      commit('delBasket')
    },
    addBasket ({ commit }) {
      commit('addBasket')
    }
  }
})
