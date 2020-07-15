import {ApiClient} from "@/http/api_client";
import {queryParamsBuilder, queryStringBuilder} from "@/helpers";

export type RangeOfIntegersType = [number, number];

export interface GetSearchIDDataInterface {
  priceRange: RangeOfIntegersType;
  ordersRange: RangeOfIntegersType;
  ratingRange: RangeOfIntegersType;
  feedbackRange: RangeOfIntegersType;
  revenueRange: RangeOfIntegersType;
  categories: Array<number>;
}

export class BlackboxRepository {
  private client = new ApiClient();

  private getNewSearchIDUrl = 'wb/blackbox/search/token/';
  private getGoodsBySearchIDUrl = 'wb/blackbox/search/';
  private findSearchIDByNameUrl = 'wb/blackbox/user/searches/{name}/';
  private searchesUrl = 'wb/blackbox/user/searches/';

  getNewSearchID(data: GetSearchIDDataInterface) {
    return this.client.sendPost(this.getNewSearchIDUrl, data);
  }

  findSearchIDByName(name: string) {
    return this.client.sendGet(queryStringBuilder(this.findSearchIDByNameUrl, {name}));
  }

  getGoodsBySearchID(searchID: string, orderType: string, pageNum: number, onPage: number) {
    const params = {searchID, orderType, pageNum, onPage} as any;
    const paramsString = queryParamsBuilder(params);

    return this.client.sendGet(`${this.getGoodsBySearchIDUrl}?${paramsString}`);
  }

  getSavedSearches() {
    return this.client.sendGet(this.searchesUrl);
  }

  saveSearch(name: string, data: GetSearchIDDataInterface) {
    const _data = {...data} as any;
    _data.name = name;

    return this.client.sendPost(this.searchesUrl, _data);
  }
}