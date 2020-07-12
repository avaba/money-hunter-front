import {ApiClient} from "@/http/api_client";

export class UserRepository {
  private aboutUrl = 'user/about';

  async getAbout() {
    const client = new ApiClient();

    return await client.sendGet(this.aboutUrl);
  }
}