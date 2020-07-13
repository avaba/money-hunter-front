import {GET_ABOUT_ACTION, SET_USER_DETAIL_ACTION} from "@/store/modules/user/constants";
import {ActionContext} from "vuex";
import {UserService} from "@/services/user_service";

export default {
  async [GET_ABOUT_ACTION](context: ActionContext<any, any>) {
    const userService = new UserService();
    const response = await userService.getAbout();

    await context.commit(SET_USER_DETAIL_ACTION, response);
  }
}