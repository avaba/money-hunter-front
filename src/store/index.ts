import Vue from "vue";
import Vuex, {Store} from "vuex";
import user from './modules/user';
import auth from './modules/auth';
import modal from './modules/modal';
import blackbox from './modules/blackbox';
import tracking from './modules/tracking';

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
    blackbox,
    tracking
  }
});

export default store;
