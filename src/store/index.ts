import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user';
import auth from './modules/auth';
import modal from './modules/modal';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    modal
  }
});

export default store;
