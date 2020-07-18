import {
  ADD_GROUP_MUTATION, CLEAR_GROUPS_MUTATION,
  GROUP_NAMES_GETTER,
  GROUPS_SORTED_BY_GETTER,
  LOAD_GROUPS_ACTION
} from "@/store/modules/tracking/constants";
import {ActionContext} from "vuex";
import {TrackingService} from "@/services/tracking_service";
import {sorters} from "@/store/modules/tracking/sorters";

export interface VuexTrackingStateGroupItemInterface {
  name: string,
  details: {
    orders: number,
    revenue: number,
    count: number,
  } | null
}

export interface VuexTrackingStateInterface {
  groups: [VuexTrackingStateGroupItemInterface]
}

export default {
  namespaced: true,
  state: (): VuexTrackingStateInterface => ({
    groups: [] as any
  }),
  getters: {
    [GROUP_NAMES_GETTER](state: VuexTrackingStateInterface) {
      return state.groups.map(group => group.name);
    },
    [GROUPS_SORTED_BY_GETTER]: (state: VuexTrackingStateInterface) => (orderType: string) => {
      const direction = orderType.startsWith('-') ? 'desc' : 'asc';
      const type = (orderType.startsWith('-') ? orderType.substr(1) : orderType);
      const sortType = `sort_${type}` as 'sort_count' | 'sort_orders' | 'sort_revenue';

      if (sorters[sortType]) {
        return [...state.groups].sort(sorters[sortType](direction))
      }

      return [...state.groups];
    },
  },
  mutations: {
    [ADD_GROUP_MUTATION](state: VuexTrackingStateInterface, group: VuexTrackingStateGroupItemInterface) {
      state.groups.push(group);
    },
    [CLEAR_GROUPS_MUTATION](state: VuexTrackingStateInterface) {
      state.groups = [] as any;
    }
  },
  actions: {
    async [LOAD_GROUPS_ACTION](context: ActionContext<VuexTrackingStateInterface, any>) {
      const service = new TrackingService();
      const groups = await service.getUserGroups();

      context.commit(CLEAR_GROUPS_MUTATION);
      groups.forEach(item => {
        context.commit(ADD_GROUP_MUTATION, item);
      })
    }
  }
}
