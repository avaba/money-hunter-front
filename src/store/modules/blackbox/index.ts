import actions from "@/store/modules/blackbox/actions";
import mutations from "@/store/modules/blackbox/mutations";

export interface VuexBlackBoxStateInterface {
  searchID: string | null,
  filters: Record<string, any> | null,
}

export default {
  namespaced: true,
  state: (): VuexBlackBoxStateInterface => ({
    searchID: null,
    filters: null,
  }),
  actions: actions,
  mutations: mutations,
}