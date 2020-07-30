import {UserRepository} from "@/repositories/user_repository";
import {AuthService} from "@/services/auth_service";

export class UserService {
  private authService = AuthService.getInstance();
  private repo = new UserRepository();

  async getProfile() {
    try {
      const response = await this.authService.refreshWrapper(this.repo.getProfile.bind(this.repo));
      return response.data;
    } catch (e) {
      console.log(e)
    }
  }

  async postProfile(user: any) {
    try {
      const response = await this.authService.refreshWrapper(this.repo.postProfile.bind(this.repo, user));
      return response.status === 201;
    } catch (e) {
      return false;
    }
  }

  async getSubscription() {
    try {
      return (await this.authService.refreshWrapper(this.repo.getSubscription.bind(this.repo))).data;
    } catch (e) {
      console.log(e);
    }
  }
}