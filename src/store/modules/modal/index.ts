import {HIDE_MODAL_MUTATION, SET_MODAL_RESPONSE_MUTATION, SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";

export interface VuexModalStateInterface {
  isShow: boolean;
  component: Record<string, any> | null;
  nested: any;
  componentResponse: any | null;
}

export default {
  namespaced: true,
  state: (): VuexModalStateInterface => ({
    isShow: false,
    component: null,
    nested: null,
    componentResponse: null,
  }),
  mutations: {
    [SHOW_MODAL_MUTATION](state: VuexModalStateInterface, payload: Record<string, any>) {
      state.component = payload.component;
      state.nested = payload.data;
      state.isShow = true;
      state.componentResponse = null;
    },
    [HIDE_MODAL_MUTATION](state: VuexModalStateInterface) {
      state.isShow = false;
      state.component = null;
      state.nested = null;
    },
    [SET_MODAL_RESPONSE_MUTATION](state: VuexModalStateInterface, payload: any) {
      state.componentResponse = payload;
    }
  },
  actions: {}
}