import {ApiClient} from "@/http/api_client";

export class AuthRepository {
  private client = new ApiClient();

  private tokenObtainUrl = 'user/token/obtain/';
  private tokenRefreshUrl = 'user/token/refresh/';
  private registerUrl = 'user/register/';
  private sendPasswordResetLinkUrl = 'user/password/message/';
  private setPasswordUrl = 'user/password/set/';

  refreshToken(token: string): Promise<any> {
    return this.client.refreshToken(this.tokenRefreshUrl, token);
  }

  obtainToken(email: string, password: string) {
    return this.client.sendPost(this.tokenObtainUrl, {email, password});
  }

  async register(email: string, password: string, name: string, phoneNumber: string) {
    return await this.client.sendPost(this.registerUrl, {email, password, name, phoneNumber});
  }

  sendPasswordResetLink(email: string) {
    return this.client.sendPost(this.sendPasswordResetLinkUrl, {email});
  }

  setPassword(newPassword: string, uidb64: string, token: string) {
    return this.client.sendPost(
      this.setPasswordUrl,
      {newPassword, uidb64, token}
    );
  }
}