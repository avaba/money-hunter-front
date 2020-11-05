import {LOGIN_MUTATION, LOGOUT_MUTATION} from "@/store/modules/auth/constants";
import {LoginMutationInterface} from "@/store/modules/auth/interfaces";
import {TokenService, TokenType} from "@/services/token_service";

export interface VuexAuthStateInterface {
  isLoggedIn: boolean,
  access_token: string | null,
  refresh_token: string | null
}

export default {
  namespaced: true,
  state: (): VuexAuthStateInterface => {
    const tokenService = new TokenService();

    return {
      isLoggedIn: tokenService.isLoggedIn(),
      access_token: tokenService.getToken(TokenType.ACCESS_TOKEN),
      refresh_token: tokenService.getToken(TokenType.REFRESH_TOKEN),
    }
  },
  mutations: {
    [LOGIN_MUTATION](state: VuexAuthStateInterface, payload: LoginMutationInterface) {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.isLoggedIn = true;
    },
    [LOGOUT_MUTATION](state: VuexAuthStateInterface) {
      state.access_token = null;
      state.refresh_token = null;
      state.isLoggedIn = false;
    }
  },
  actions: {}
}