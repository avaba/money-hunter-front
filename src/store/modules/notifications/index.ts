

export default {
  namespaced: true,
  state: {
    notification: null
  },
  getters: {
    notification(state: any) {
      return state.notification
    }
  },
  mutations: {
    ADD_NOTIFICATION(state: any, payload: Record<string, any>) {
      state.notification = payload
      setTimeout(() => {
        state.notification = null
      }, 3000);
    },
  }
}