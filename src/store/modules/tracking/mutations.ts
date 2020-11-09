import {ADD_GROUP_MUTATION, CLEAR_GROUPS_MUTATION} from "@/store/modules/tracking/constants";
import {VuexTrackingStateGroupItemInterface, VuexTrackingStateInterface} from "@/store/modules/tracking/index";

export const mutations = {
  [ADD_GROUP_MUTATION](state: VuexTrackingStateInterface, group: VuexTrackingStateGroupItemInterface) {
    state.groups.push(group);
  },
  [CLEAR_GROUPS_MUTATION](state: VuexTrackingStateInterface) {
    state.groups = [] as any;
  }
};