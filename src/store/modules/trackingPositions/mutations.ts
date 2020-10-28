import { ADD_POSITIONS_MUTATION, CLEAR_POSITIONS_MUTATION, LOAD_CURRENT_POSITION_MUTATION, CLEAR_CURRENT_POSITION_MUTATION } from "@/store/modules/trackingPositions/constants";
import { VuexTrackingPositionsStateInterface, VuexTrackingPositionsStateGroupItemInterface } from "@/store/modules/trackingPositions/index";

export const mutations = {
  [ADD_POSITIONS_MUTATION](state: VuexTrackingPositionsStateInterface, position: VuexTrackingPositionsStateGroupItemInterface) {
    state.positions.push(position);
  },
  [CLEAR_POSITIONS_MUTATION](state: VuexTrackingPositionsStateInterface) {
    state.positions = [] as any;
  },
  [LOAD_CURRENT_POSITION_MUTATION](state: VuexTrackingPositionsStateInterface, data: any) {
    state.positions.find(item => item.articul === data.articul).data.push(data.item)
  },
  [CLEAR_CURRENT_POSITION_MUTATION](state: VuexTrackingPositionsStateInterface, articul: string) {
    state.positions.find(item => item.articul === articul).data = []
  }
};