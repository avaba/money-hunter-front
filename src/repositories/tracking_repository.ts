import {ApiClient} from "@/http/api_client";
import {queryStringBuilder} from "@/helpers";

export class TrackingRepository {
  private client = new ApiClient();

  private getBrandsUrl = 'wb/tracking/brands/';
  private getUserGroupsUrl = 'wb/tracking/user/groups/';
  private createUpdateGroup = 'wb/tracking/user/groups/';
  private getGroupGoodsUrl = 'wb/tracking/user/groups/{groupName}';

  getBrands() {
    return this.client.sendGet(this.getBrandsUrl);
  }

  getUserGroups() {
    return this.client.sendGet(this.getUserGroupsUrl);
  }

  addGoodsPosition(groupName: string, items: [string], addBrands: boolean) {
    return this.client.sendPost(this.createUpdateGroup, {groupName, items, addBrands});
  }

  getGroupGoods(groupName: string, orderType: string) {
    const url = queryStringBuilder(this.getGroupGoodsUrl, {groupName, orderType});
    return this.client.sendGet(url);
  }
}