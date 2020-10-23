import {
  LOAD_POSITIONS_ACTION
} from "@/store/modules/trackingPositions/constants";
import { ActionContext } from "vuex";
import { TrackingPositionsService } from "@/services/tracking_positions_service";
import { VuexTrackingPositionsStateInterface } from "@/store/modules/trackingPositions/index";

export const actions = {
  async [LOAD_POSITIONS_ACTION](context: ActionContext<VuexTrackingPositionsStateInterface, any>) {
    const service = new TrackingPositionsService();
    const positions = await service.getUserPositions();
    
    console.log(positions)

    // context.commit(CLEAR_GROUPS_MUTATION);
    // groups.forEach(item => {
    //   context.commit(ADD_GROUP_MUTATION, item);
    // })
  },
};