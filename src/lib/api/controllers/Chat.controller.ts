import {CreateChatBodyDto} from "@/lib/shared/dtos/chat/CreateChatBodyDto";
import {IdDto} from "@/lib/shared/dtos/Id.dto";
import {ChatModel} from "@/lib/shared/models/Chat.model";

import {Body, Params, Query, UserId} from "../decorators/Args";
import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";
import {ChatService} from "../services/Chat.service";

@Controller("/chat")
export class ChatController {
  @Endpoint("POST", "/")
  static async createChat(
    @Body({schema: CreateChatBodyDto}) dto: CreateChatBodyDto
  ): Promise<ChatModel> {
    return ChatService.createChat(dto);
  }
  @Endpoint("POST", "/me/:id")
  static async getChatWithUser(
    @UserId() myId: string,
    @Params({schema: IdDto}) params: IdDto
  ) {
    return ChatService.getChatWithUser(myId, params.id);
  }

  @Endpoint("GET", "/")
  static async getUserChats(@UserId() userId: string): Promise<ChatModel[]> {
    return ChatService.getChat(userId);
  }
}
