import {
  CLEAR_USER_MUTATION,
  DECREASE_BLACKBOX_SEARCHES_MUTATION,
  SET_SUBSCRIPTION_MUTATION,
  SET_USER_MUTATION
} from "@/store/modules/user/constants";
import {
  VuexUserStateDataInterface,
  VuexUserStateInterface,
  VuexUserStateSubscriptionInterface
} from "@/store/modules/user/index";

export default {
  [SET_USER_MUTATION](state: VuexUserStateInterface, payload: Record<string, any>) {
    state.data = {...payload} as VuexUserStateDataInterface;
  },
  [CLEAR_USER_MUTATION](state: VuexUserStateInterface) {
    state.data = null;
    state.subscription = null;
  },
  [SET_SUBSCRIPTION_MUTATION](state: VuexUserStateInterface, payload: Record<string, any>) {
    state.subscription = {...payload} as VuexUserStateSubscriptionInterface
  },
  [DECREASE_BLACKBOX_SEARCHES_MUTATION](state: VuexUserStateInterface, payload = 1) {
    if (state.subscription !== null) {
      state.subscription.blackBoxSearches -= payload;
    }
  }
}