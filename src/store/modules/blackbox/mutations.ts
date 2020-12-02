import { SET_FILTERS_MUTATION, SET_SEARCH_ID_MUTATION, SET_AGREGATED_MUTATION, SAVE_FILTERS_LOCAL_MUTATION, SAVE_SEARCH_RESULTS_LOCAL_MUTATION} from "@/store/modules/blackbox/constants";
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
  [SAVE_FILTERS_LOCAL_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.myLocalFilters = payload
  },
  [SAVE_FILTERS_LOCAL_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.myLocalFilters = payload
  },
  [SAVE_SEARCH_RESULTS_LOCAL_MUTATION](state: VuexBlackBoxStateInterface, payload: Record<string, any>) {
    state.myLocalSearchResults = payload
  }
}