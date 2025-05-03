// // This file is auto-generated. Do not edit it manually.
// // It will be overwritten on the next build.
import { apiClientHelper, ApiServiceInit } from "@/lib/ui/services/ApiClient.helper";


import { CreateChatBodyDto } from "@/lib/shared/dtos/chat/CreateChatBodyDto";
import { CreateMessageBodyDto } from "@/lib/shared/dtos/message/CreateMessageBodyDto";


export const ChatService = {
getUserChats: () => apiClientHelper<
        typeof ChatService.getUserChats
        >(
          "/api/chat/",
          "GET",
          
        ),
createChat: (args: ApiServiceInit<CreateChatBodyDto, undefined, undefined>) => apiClientHelper<
        typeof ChatService.createChat, 
        CreateChatBodyDto, 
        undefined, 
        undefined
        
        >(
          "/api/chat/",
          "POST",
          args
        )
    }
export const ConfigService = {
getFirebaseConfig: () => apiClientHelper<
        typeof ConfigService.getFirebaseConfig
        >(
          "/api/config/firebase",
          "GET",
          
        )
    }
export const MessageService = {
createMessage: (args: ApiServiceInit<CreateMessageBodyDto, undefined, undefined>) => apiClientHelper<
        typeof MessageService.createMessage, 
        CreateMessageBodyDto, 
        undefined, 
        undefined
        
        >(
          "/api/chat/",
          "POST",
          args
        )
    }
export const UserService = {
getUser: () => apiClientHelper<
        typeof UserService.getUser
        >(
          "/api/user/me",
          "GET",
          
        )
    }
export const apiClient = {ChatService: ChatService,ConfigService: ConfigService,MessageService: MessageService,UserService: UserService,
  }