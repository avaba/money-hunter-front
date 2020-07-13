import {CLEAR_USER_MUTATION, SET_USER_DETAIL_MUTATION} from "@/store/modules/user/constants";

export default {
  [SET_USER_DETAIL_MUTATION](state: any, payload: Record<string, any>) {
    state.detail = payload.detail;
  },
  [CLEAR_USER_MUTATION](state: any) {
    state.detail = null;
  }
}