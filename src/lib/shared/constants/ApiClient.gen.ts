// // This file is auto-generated. Do not edit it manually.
// // It will be overwritten on the next build.
import { apiClientHelper, ApiServiceInit } from "@/lib/shared/helpers/ApiClient.helper";


import { CreateChatBodyDto } from "@/lib/shared/dtos/chat/CreateChatBody.dto";


export const ConfigService = {
createChat: (args: ApiServiceInit<CreateChatBodyDto, undefined, undefined>) => apiClientHelper<
        typeof ConfigService.createChat, 
        CreateChatBodyDto, 
        undefined, 
        undefined
        
        >(
          "/api/chat/firebase",
          "POST",
          args
        ),
getFirebaseConfig: () => apiClientHelper<
        typeof ConfigService.getFirebaseConfig
        >(
          "/api/config/firebase",
          "GET",
          
        )
    }
export const apiClient = {ConfigService: ConfigService,
  }