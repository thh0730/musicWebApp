import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  /*
  // 保存全局共享数据
  state: {
    isFullScreen: false
  },
  // 保存修改全局共享数据的方法
  mutations: {
    changeFullScreen (state, flag) {
      state.isFullScreen = flag
    }
  },
  // 保存触发mutations中保存的方法的方法
  actions: {
    setFullScreen ({ commit }, flag) {
      commit('changeFullScreen', flag)
    }
  },
  getters: {
    isFullScreen (state) {
      return state.isFullScreen
    }
  }
   */
  // 防止vuex中代码冗余的写法, 分别创建js文件保存各个代码, 方便维护
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
})
