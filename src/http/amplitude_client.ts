import store from "@/store";
import Axios from 'axios';

export class AmplitudeClient {
  private endpoint = 'https://api.amplitude.com/2/httpapi';
  private apiKey = '6e4372b0b68aa3c175a6f0f2379b9867';

  private getEmail = () => store.getters[`user/getEmail`];

  blackBoxSearch(search_data: Record<string, any>) {
    this.sendEvent({
      'event_type': 'BlackBox_search',
      search_data
    })
  }

  blackBoxSearchSave(search_data: Record<string, any>, search_name: string) {
    this.sendEvent({
      'event_type': 'BlackBox_search_save',
      search_data,
      search_name
    })
  }

  blackBoxOnPageData(on_page: number) {
    this.sendEvent({
      'event_type': 'BlackBox_onpage_data',
      on_page
    })
  }

  blackBoxOrdering(order_type: string) {
    this.sendEvent({
      'event_type': 'BlackBox_ordering',
      order_type
    })
  }

  pageLoad(page: string) {
    this.sendEvent({
      'event_type': 'Page_load',
      page
    })
  }

  trackingSave(type: string, data: [string]) {
    this.sendEvent({
      'event_type': 'Tracking_save',
      type,
      data
    })
  }

  tutorial(page: string, type: string) {
    this.sendEvent({
      'event_type': 'Tutorial',
      page,
      type
    })
  }

  profileInfo(data: Record<string, any>) {
    this.sendEvent({
      'event_type': 'Profile_info',
      data
    })
  }

  subscription(type: string) {
    this.sendEvent({
      'event_type': 'Subscription',
      type
    })
  }

  private async sendEvent(data: Record<string, any>) {
    const axios = Axios.create();

    try {
      return await axios.post(
        this.endpoint,
        {
          events: [{
            ...{user_id: this.getEmail(), ...data}
          }],
          api_key: this.apiKey
        }
      )
    } catch (e) {
      return Promise.resolve(false);
    }
  }
}