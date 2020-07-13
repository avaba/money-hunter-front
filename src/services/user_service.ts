import {UserRepository} from "@/repositories/user_repository";
import {AuthService} from "@/services/auth_service";

export class UserService {
  async getAbout() {
    const repo = new UserRepository();

    try {
      const authService = new AuthService();

      const response = await authService.refreshWrapper(repo.getAbout.bind(repo));
      return response.data;
    } catch (e) {
      console.log(e)
    }
  }
}