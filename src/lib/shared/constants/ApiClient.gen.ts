// // This file is auto-generated. Do not edit it manually.
// // It will be overwritten on the next build.
import { apiClientHelper, ApiServiceInit } from "@/lib/shared/helpers/ApiClient.helper";




export const ConfigService = {
getFirebaseConfig: () => apiClientHelper<
        typeof ConfigService.getFirebaseConfig
        >(
          "/api/config/firebase",
          "GET",
          
        )
    }
export const apiClient = {ConfigService: ConfigService,
  }