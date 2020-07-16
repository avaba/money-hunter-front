import {AuthRepository} from "@/repositories/auth_repository";
import {TokenService, TokenType} from "@/services/token_service";
import {AxiosError, AxiosResponse} from "axios";
import router from "@/router";
import store from "@/store";
import {LOGIN_MUTATION, LOGOUT_MUTATION} from "@/store/modules/auth/constants";
import {LOGOUT_ACTION} from "@/store/modules/user/constants";

export class AuthService {
  private authRepo = new AuthRepository();

  private errorsMap = {
    401: 'Неверный Email или пароль',
    400: 'Email занят',
  };

  async authorize(email: string, password: string): Promise<boolean | string> {
    try {
      const response = await this.authRepo.obtainToken(email, password);
      const tokens = response.data as Record<string, string>;

      const tokenService = new TokenService();
      tokenService.persistToken(TokenType.ACCESS_TOKEN, tokens['access']);
      tokenService.persistToken(TokenType.REFRESH_TOKEN, tokens['refresh']);

      store.commit('auth/' + LOGIN_MUTATION, {
        [TokenType.ACCESS_TOKEN]: tokens['access'],
        [TokenType.REFRESH_TOKEN]: tokens['refresh']
      });

      return true;
    } catch (e) {
      const _e = e as AxiosError;
      if (_e.response && _e.response.status === 401) {
        return this.errorsMap[401];
      }

      return e;
    }
  }

  async register(email: string, password: string): Promise<boolean | string> {
    try {
      const response = await this.authRepo.register(email, password);
      return response.status === 201;
    } catch (e) {
      const _e = e as AxiosError;

      if (_e.response && _e.response.status === 400) {
        return this.errorsMap[400];
      }

      return false;
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const tokenService = new TokenService();
      if (tokenService.hasToken(TokenType.REFRESH_TOKEN)) {
        const response = await this.authRepo.refreshToken(tokenService.getToken(TokenType.REFRESH_TOKEN)) as AxiosResponse;
        tokenService.persistToken(TokenType.ACCESS_TOKEN, response.data['access']);

        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  async logout(): Promise<void> {
    const tokenService = new TokenService();
    tokenService.clear();

    store.commit(`auth/${LOGOUT_MUTATION}`);
  }

  async refreshWrapper(cb: () => Promise<AxiosResponse>) {
    try {
      return await cb();
    } catch (e) {
      const _e = e as AxiosError;
      if (_e.response && _e.response.status === 401) {
        try {
          await this.refreshToken();
          return await cb();
        } catch (e) {

          const tokenService = new TokenService();
          tokenService.clear();

          await store.commit(`auth/${LOGOUT_ACTION}`);
          await router.push(({name: 'auth.login'}));

          throw e;
        }
      }

      throw e;
    }
  }
}