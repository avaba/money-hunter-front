import {ApiClient} from "@/http/api_client";

export class TrackingRepository {
  private client = new ApiClient();

  private getBrandsUrl = 'wb/tracking/brands/';
  private getUserGroupsUrl = 'wb/tracking/user/groups/';

  getBrands() {
    return this.client.sendGet(this.getBrandsUrl);
  }

  getUserGroups() {
    return this.client.sendGet(this.getUserGroupsUrl);
  }
}