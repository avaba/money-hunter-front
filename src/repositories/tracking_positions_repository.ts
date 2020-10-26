import { ApiClient } from "@/http/api_client";
import { queryStringBuilder } from "@/helpers";

export class TrackingPositionsRepository {
  private client = new ApiClient();
  private getUserPositionsUrl = 'wb/positions_tracker/products/'
  private getPositionUrl = 'wb/positions_tracker/products/'
  private setPositionsUrl = 'wb/positions_tracker/products/'

  getUserPositions() {
    return this.client.sendGet(this.getUserPositionsUrl);
  }

  getPosition(articul: string) {
    return this.client.sendGet(`${this.getPositionUrl}${articul}/`);
  }

  setPositions(articules: Array<string>) {
    return this.client.sendPost(this.setPositionsUrl, articules);
  }
}