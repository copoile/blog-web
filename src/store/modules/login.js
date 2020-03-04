const state = {
  visible: false
}

const mutations = {
  CHANGE_VISIBLE: (state, value) => {
    state.visible = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
