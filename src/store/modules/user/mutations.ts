import {SET_USER_DETAIL_ACTION} from "@/store/modules/user/constants";

export default {
  [SET_USER_DETAIL_ACTION](state: any, payload: Record<string, any>) {
    state.detail = payload.detail;
  }
}