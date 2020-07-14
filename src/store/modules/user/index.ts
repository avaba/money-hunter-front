import actions from "@/store/modules/user/actions";
import mutations from "@/store/modules/user/mutations";

export interface VuexUserStateInterface {
  email: string | null;
  userName: string | null;
  companyName: string | null;
  phoneNumber: string | null;
}

export default {
  namespaced: true,
  state: (): VuexUserStateInterface => ({
    email: null,
    userName: null,
    companyName: null,
    phoneNumber: null
  }),
  mutations: mutations,
  actions: actions
}