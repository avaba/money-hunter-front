import {AuthService} from "@/services/auth_service";
import {TrackingRepository} from "@/repositories/tracking_repository";

export class TrackingService {
  private authService = new AuthService();
  private repo = new TrackingRepository();

  async getBrands(): Promise<[string] | []> {
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
}