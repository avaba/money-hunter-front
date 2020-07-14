import {CLEAR_USER_MUTATION, SET_USER_MUTATION} from "@/store/modules/user/constants";
import {VuexUserStateInterface} from "@/store/modules/user/index";

export default {
  [SET_USER_MUTATION](state: VuexUserStateInterface, payload: Record<string, any>) {
    state.email = payload.email;
    state.userName = payload.userName;
    state.companyName = payload.companyName;
    state.phoneNumber = payload.phoneNumber;
  },
  [CLEAR_USER_MUTATION](state: any) {
    state.email = null;
    state.userName = null;
    state.companyName = null;
    state.phoneNumber = null;
  }
}