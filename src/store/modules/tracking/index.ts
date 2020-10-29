import {
  GROUP_NAMES_GETTER,
  GROUPS_SORTED_BY_GETTER,
} from "@/store/modules/tracking/constants";
import {sorters} from "@/store/modules/tracking/sorters";
import {actions} from "@/store/modules/tracking/actions";
import {mutations} from "@/store/modules/tracking/mutations";

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
  mutations,
  actions
}
