import {HIDE_MODAL_MUTATION, SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";

export interface VuexModalStateInterface {
  isShow: boolean,
  component: Record<string, any> | null
}

export default {
  namespaced: true,
  state: (): VuexModalStateInterface => ({
    isShow: false,
    component: null
  }),
  mutations: {
    [SHOW_MODAL_MUTATION](state: VuexModalStateInterface, payload: Record<string, any>) {
      state.component = payload.component;
      state.isShow = true;
    },
    [HIDE_MODAL_MUTATION](state: VuexModalStateInterface) {
      state.isShow = false;
      state.component = null;
    }
  },
  actions: {}
}