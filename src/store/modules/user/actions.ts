import {
  CLEAR_USER_MUTATION,
  GET_PROFILE_ACTION,
  LOGOUT_ACTION,
  SET_USER_MUTATION
} from "@/store/modules/user/constants";
import {ActionContext} from "vuex";
import {UserService} from "@/services/user_service";
import router from "@/router";
import {AuthService} from "@/services/auth_service";

export default {
  async [GET_PROFILE_ACTION](context: ActionContext<any, any>) {
    const userService = new UserService();
    const response = await userService.getProfile();

    await context.commit(SET_USER_MUTATION, response);
  },
  async [LOGOUT_ACTION](context: ActionContext<any, any>) {
    const authService = new AuthService();
    await authService.logout();

    context.commit(CLEAR_USER_MUTATION);
    await router.push({name: 'auth.login'})
  }
}