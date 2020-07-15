import {SET_SEARCH_ID_MUTATION} from "@/store/modules/blackbox/constants";
import {VuexBlackBoxStateInterface} from "@/store/modules/blackbox/index";

export default {
  [SET_SEARCH_ID_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.searchID = payload.searchID;
  }
}