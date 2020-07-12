import {AuthRepository} from "@/repositories/auth_repository";
import {TokenService, TokenType} from "@/services/token_service";
import {AxiosError, AxiosResponse} from "axios";

export class AuthService {
  private authRepo = new AuthRepository();

  async authorize(email: string, password: string): Promise<boolean | string> {
    try {
      const response = await this.authRepo.obtainToken(email, password);
      const tokens = response.data as Record<string, string>;

      const tokenService = new TokenService();
      tokenService.persistToken(TokenType.ACCESS_TOKEN, tokens['access']);
      tokenService.persistToken(TokenType.REFRESH_TOKEN, tokens['refresh']);

      return true;
    } catch (e) {
      const _e = e as AxiosError;
      if (_e.response && _e.response.status === 401) {
        return _e.response.data['detail'];
      }

      return e;
    }
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.authRepo.register(email, password);
      return response.status === 201;
    } catch (e) {
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

  async refreshWrapper(cb: () => Promise<AxiosResponse>) {
    try {
      return await cb();
    } catch (e) {
      console.log('refresh wrapper catch', e);
      const _e = e as AxiosError;
      if (_e.response && _e.response.status === 401 && await this.refreshToken()) {
        return await cb();
      }

      throw e;
    }
  }
}