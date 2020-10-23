import {
  POSITION_GETTER,
} from "@/store/modules/trackingPositions/constants";
// import { sorters } from "@/store/modules/tracking/sorters";
import { actions } from "@/store/modules/trackingPositions/actions";
// import { mutations } from "@/store/modules/trackingPositions/mutations";

export interface VuexTrackingPositionsStateGroupItemInterface {
  name: string,
  details: {
    orders: number,
    revenue: number,
    count: number,
  } | null
}

export interface VuexTrackingPositionsStateInterface {
  positions: [VuexTrackingPositionsStateGroupItemInterface]
}

export default {
  namespaced: true,
  state: (): VuexTrackingPositionsStateInterface => ({
    positions: [] as any
  }),
  getters: {
    [POSITION_GETTER](state: VuexTrackingPositionsStateInterface) {
      return state.positions.map(position => position);
    },
  },
  // mutations,
  actions
}
