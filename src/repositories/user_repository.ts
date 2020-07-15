import {ApiClient} from "@/http/api_client";

export class UserRepository {
  private profileUrl = 'user/profile/';
  private client = new ApiClient();


  getProfile() {
    return this.client.sendGet(this.profileUrl);
  }

  postProfile(data: any){
    return this.client.sendPost(this.profileUrl, data);
  }
}