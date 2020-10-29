import {
  ADD_GROUP_MUTATION,
  CLEAR_GROUPS_MUTATION, DELETE_GROUP,
  LOAD_GROUPS_ACTION,
  UPDATE_GROUP_NAME_ACTION
} from "@/store/modules/tracking/constants";
import {ActionContext} from "vuex";
import {TrackingService} from "@/services/tracking_service";
import {VuexTrackingStateInterface} from "@/store/modules/tracking/index";

export const actions = {
  async [LOAD_GROUPS_ACTION](context: ActionContext<VuexTrackingStateInterface, any>) {
    const service = new TrackingService();
    const groups = await service.getUserGroups();

    context.commit(CLEAR_GROUPS_MUTATION);
    groups.forEach(item => {
      context.commit(ADD_GROUP_MUTATION, item);
    })
  },
  async [UPDATE_GROUP_NAME_ACTION](context: ActionContext<VuexTrackingStateInterface, any>, payload: Record<string, string>) {
    const service = new TrackingService();

    const result = await service.updateGroupName(payload.groupName, payload.newName);

    if (typeof result === 'boolean' && result) {
      await context.dispatch(LOAD_GROUPS_ACTION);
      return true;
    }

    return result;
  },
  async [DELETE_GROUP](context: ActionContext<VuexTrackingStateInterface, any>, groupName: string) {
    const service = new TrackingService();

    const result = await service.deleteGroup(groupName);

    if (typeof result === 'boolean' && result) {
      await context.dispatch(LOAD_GROUPS_ACTION);
      return true
    }

    return false;
  }
};