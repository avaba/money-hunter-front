import {ApiClient} from "@/http/api_client";
import {queryStringBuilder} from "@/helpers";

export class TrackingRepository {
  private client = new ApiClient();

  private getBrandsUrl = 'wb/tracking/brands/';
  private getUserGroupsUrl = 'wb/tracking/user/groups/';
  private createUpdateGroup = 'wb/tracking/user/groups/';
  private groupDataUrl = 'wb/tracking/user/groups/{groupName}/';
  private getRatingAndSizesUrl = 'wb/tracking/{groupName}/{articul}/';
  private getProductInfoByArticulUrl = 'wb/tracking/product/info/{articul}/';

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
    const url = queryStringBuilder(this.groupDataUrl, {groupName, orderType});
    return this.client.sendGet(url);
  }

  updateGroupName(groupName: string, newName: string) {
    const url = queryStringBuilder(this.groupDataUrl, {groupName});
    return this.client.sendPut(url, {newName});
  }

  deleteGroup(groupName: string) {
    const url = queryStringBuilder(this.groupDataUrl, {groupName});
    return this.client.sendDelete(url);
  }

  getRatingAndSizes(groupName: string, articul: string) {
    const url = queryStringBuilder(this.getRatingAndSizesUrl, {groupName, articul});
    return this.client.sendGet(url);
  }

  getProductInfoByArticul(articul: string) {
    return this.client.sendGet(queryStringBuilder(this.getProductInfoByArticulUrl, {articul}));
  }
}