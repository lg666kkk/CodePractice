import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER"
}
const state = {
  isAuthencated: false, // 是否授权
  user:{} // 存储用户信息
}
const getters = {
  isAuthencated: state => state.isAuthencated,
  user: state => state.user
}
const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthencated){
    if (isAuthencated) {
      state.isAuthencated = isAuthencated
    } else {
      state.isAuthencated = false
    }
  },
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  }
}
const actions = {
  setAuthencated: ({ commit }, isAuthencated) => {
    commit(types.SET_AUTHENTICATED, isAuthencated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
