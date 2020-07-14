import {ApiClient} from "@/http/api_client";

export class AuthRepository {
  private tokenObtainUrl = 'user/token/obtain/';
  private tokenRefreshUrl = 'user/token/refresh/';
  private registerUrl = 'user/register/';

  refreshToken(token: string): Promise<any> {
    const client = new ApiClient();

    return client.refreshToken(this.tokenRefreshUrl, token);
  }

  obtainToken(email: string, password: string) {
    const client = new ApiClient();

    return client.sendPost(this.tokenObtainUrl, {email, password});
  }

  async register(email: string, password: string) {
    const client = new ApiClient();

    return await client.sendPost(this.registerUrl, {email, password});
  }
}