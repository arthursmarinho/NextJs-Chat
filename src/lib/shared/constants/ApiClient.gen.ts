// // This file is auto-generated. Do not edit it manually.
// // It will be overwritten on the next build.
import { apiClientHelper, ApiServiceInit } from "@/lib/ui/services/ApiClient.helper";


import { IdDto } from "@/lib/shared/dtos/Id.dto";
import { CreateChatBodyDto } from "@/lib/shared/dtos/chat/CreateChatBodyDto";
import { CreateMessageBodyDto } from "@/lib/shared/dtos/message/CreateMessageBodyDto";


export const ChatService = {
createChat: (args: ApiServiceInit<CreateChatBodyDto, undefined, undefined>) => apiClientHelper<
        typeof ChatService.createChat, 
        CreateChatBodyDto, 
        undefined, 
        undefined
        
        >(
          "/api/chat/",
          "POST",
          args
        ),
getChatWithUser: (args: ApiServiceInit<undefined, undefined, IdDto>) => apiClientHelper<
        typeof ChatService.getChatWithUser, 
        undefined, 
        undefined, 
        IdDto
        
        >(
          "/api/chat/me/:id",
          "POST",
          args
        ),
getUserChats: () => apiClientHelper<
        typeof ChatService.getUserChats
        >(
          "/api/chat/",
          "GET",
          
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
getAllUsers: () => apiClientHelper<
        typeof UserService.getAllUsers
        >(
          "/api/users/",
          "GET",
          
        ),
getMe: () => apiClientHelper<
        typeof UserService.getMe
        >(
          "/api/users/me",
          "GET",
          
        )
    }
export const apiClient = {ChatService: ChatService,ConfigService: ConfigService,MessageService: MessageService,UserService: UserService,
  }