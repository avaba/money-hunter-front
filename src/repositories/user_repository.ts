import {ApiClient} from "@/http/api_client";

export class UserRepository {
  private profileUrl = 'user/profile/';
  private subscriptionUrl = 'user/subscription/';
  private paymentLink = 'user/payment/';
  private client = new ApiClient();

  getProfile() {
    return this.client.sendGet(this.profileUrl);
  }

  postProfile(data: any) {
    return this.client.sendPost(this.profileUrl, data);
  }

  getSubscription() {
    return this.client.sendGet(this.subscriptionUrl);
  }

  getPaymentLink(data: any) {
    return this.client.sendPost(this.paymentLink, { email: data.user.email, subscriptionType: data.subscriptionType });
  }
}