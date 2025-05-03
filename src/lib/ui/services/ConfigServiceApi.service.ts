import {ConfigFirebaseModel} from "@/lib/shared/models/ConfigFirebase.model";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {ApiService} from "@/lib/ui/services/Api.service";

export class ConfigApiService extends ApiService {
  static async getFirebaseConfig(): Promise<ApiResponse<ConfigFirebaseModel>> {
    return this.request<ConfigFirebaseModel>(`/api/config/firebase`, {
      method: "GET",
    });
  }
}
