import Vue from "vue";
import Vuex, {Store} from "vuex";
import user from './modules/user';
import auth from './modules/auth';
import modal from './modules/modal';
import blackbox from './modules/blackbox';

Vue.use(Vuex);

export interface VuexRootState extends Store<{}> {

}

export const store = new Vuex.Store<VuexRootState>({
  state: () => {
    return {} as VuexRootState
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    modal,
    blackbox
  }
});

export default store;
