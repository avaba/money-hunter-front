import actions from "@/store/modules/user/actions";
import mutations from "@/store/modules/user/mutations";

export default {
  namespaced: true,
  state: () => ({
    detail: null
  }),
  mutations: mutations,
  actions: actions
}