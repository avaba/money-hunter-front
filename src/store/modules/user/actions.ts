import {
  CLEAR_USER_MUTATION,
  GET_ABOUT_ACTION,
  LOGOUT_ACTION,
  SET_USER_DETAIL_MUTATION
} from "@/store/modules/user/constants";
import {ActionContext} from "vuex";
import {UserService} from "@/services/user_service";
import router from "@/router";
import {AuthService} from "@/services/auth_service";

export default {
  async [GET_ABOUT_ACTION](context: ActionContext<any, any>) {
    const userService = new UserService();
    const response = await userService.getAbout();

    await context.commit(SET_USER_DETAIL_MUTATION, response);
  },
  async [LOGOUT_ACTION](context: any) {
    const authService = new AuthService();
    await authService.logout();

    await context.commit(CLEAR_USER_MUTATION);
    await router.push({name: 'auth.login'})
  }
}