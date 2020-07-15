import {CLEAR_USER_MUTATION, SET_SUBSCRIPTION_MUTATION, SET_USER_MUTATION} from "@/store/modules/user/constants";
import {
  VuexUserStateDataInterface,
  VuexUserStateInterface,
  VuexUserStateSubscriptionInterface
} from "@/store/modules/user/index";
import moment from 'moment';

export default {
  [SET_USER_MUTATION](state: VuexUserStateInterface, payload: Record<string, any>) {
    state.data = {...payload} as VuexUserStateDataInterface;
  },
  [CLEAR_USER_MUTATION](state: VuexUserStateInterface) {
    state.data = null
  },
  [SET_SUBSCRIPTION_MUTATION](state: VuexUserStateInterface, payload: Record<string, any>) {
    state.subscription = {...payload, expDate: moment.utc(payload.expDate)} as VuexUserStateSubscriptionInterface
  }
}