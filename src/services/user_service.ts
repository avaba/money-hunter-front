import {UserRepository} from "@/repositories/user_repository";
import {AuthService} from "@/services/auth_service";

export class UserService {
  private userRepository = new UserRepository();

  async getAbout() {
    try {
      const authService = new AuthService();

      const response = await authService.refreshWrapper(this.userRepository.getAbout.bind(this.userRepository));
      return response.data;
    } catch (e) {
      console.log(e)
    }
  }
}