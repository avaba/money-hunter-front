import {AuthService} from "@/services/auth_service";
import {TrackingRepository} from "@/repositories/tracking_repository";
import {VuexTrackingStateGroupItemInterface} from "@/store/modules/tracking";
import {AxiosError} from "axios";

export class TrackingService {
  private authService = AuthService.getInstance();
  private repo = new TrackingRepository();

  async getBrands(): Promise<[{ brand: string }] | []> {
    try {
      const cached = localStorage.getItem('brands');
      if (cached) {
        return JSON.parse(cached);
      } else {
        const data = (await this.authService.refreshWrapper(this.repo.getBrands.bind(this.repo))).data.brands;
        localStorage.setItem('brands', JSON.stringify(data));

        return data;
      }

    } catch (e) {
      return [];
    }
  }

  async getUserGroups(): Promise<[VuexTrackingStateGroupItemInterface] | []> {
    try {
      return (await this.authService.refreshWrapper(this.repo.getUserGroups.bind(this.repo))).data.groups;
    } catch (e) {
      return [];
    }
  }

  async createUpdateGroup(groupName: string, items: [string], addBrands: boolean) {
    try {
      const response = await this.authService.refreshWrapper(this.repo.addGoodsPosition.bind(this.repo, groupName, items, addBrands));
      return response.status === 201;
    } catch (e) {
      return false;
    }
  }

  async getGroupGoods(groupName: string, orderType: string) {
    try {
      return (await this.authService.refreshWrapper(this.repo.getGroupGoods.bind(this.repo, groupName, orderType))).data.detail;
    } catch (e) {
      return [];
    }
  }

  async updateGroupName(groupName: string, newName: string): Promise<boolean | string> {
    try {
      const response = await this.authService.refreshWrapper(this.repo.updateGroupName.bind(this.repo, groupName, newName));
      return response.status === 200;
    } catch (e) {
      const _e = e as AxiosError;

      return _e.response?.data.detail;
    }
  }

  async deleteGroup(groupName: string) {
    try {
      const response = await this.authService.refreshWrapper(this.repo.deleteGroup.bind(this.repo, groupName));
      return response.status === 200;
    } catch (e) {
      const _e = e as AxiosError;

      return _e.response?.data.detail;
    }
  }

  async getRatingAndSizes(groupName: string, articul: string) {
    try {
      return (await this.authService.refreshWrapper(this.repo.getRatingAndSizes.bind(this.repo, groupName, articul))).data;
    } catch (e) {
      const _e = e as AxiosError;

      return _e.response?.data.detail;
    }
  }
}