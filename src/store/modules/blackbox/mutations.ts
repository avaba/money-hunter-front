import { SET_FILTERS_MUTATION, SET_SEARCH_ID_MUTATION, SET_AGREGATED_MUTATION} from "@/store/modules/blackbox/constants";
import {VuexBlackBoxStateInterface} from "@/store/modules/blackbox/index";
import {cloneDeep} from 'lodash';

export default {
  [SET_SEARCH_ID_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.searchID = payload.searchID;
  },
  [SET_FILTERS_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.filters = cloneDeep(payload);
  },
  [SET_AGREGATED_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.agregated = cloneDeep(payload);
  },
}