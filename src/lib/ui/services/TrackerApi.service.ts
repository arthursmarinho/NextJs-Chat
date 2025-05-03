import {TrackerGetLatestTagsQueryParamsDto} from "@/lib/shared/dtos/tracker/TrackerGetLatestTags.dto";
import {ApiResponse} from "@/lib/shared/types/Api.types";
import {ApiService} from "@/lib/ui/services/Api.service";

class TrackerApiService extends ApiService {
  async getLatestTags(
    args: TrackerGetLatestTagsQueryParamsDto
  ): Promise<ApiResponse<string[]>> {
    return this.request<string[], TrackerGetLatestTagsQueryParamsDto>(
      `/api/tracker/tags`,
      {
        method: "GET",
        queryParams: args,
      }
    );
  }
}

export default new TrackerApiService();
