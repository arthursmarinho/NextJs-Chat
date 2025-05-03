import { Controller } from "../decorators/Controller.decorator";
import { Endpoint } from "../decorators/Endpoint.decorator";
import { ChatService } from "../services/Chat.service";
import { ChatModel } from "@/lib/shared/models/Chat.model";
import { Body, Params, Query, UserId } from "../decorators/Args";
import { CreateChatBodyDto } from "@/lib/shared/dtos/chat/CreateChatBodyDto";
import { IdDto } from "@/lib/shared/dtos/Id.dto";

@Controller("/chat")
export class ChatController {
  @Endpoint("POST", "/")
  static async createChat(
    @Body({ schema: CreateChatBodyDto }) dto: CreateChatBodyDto
  ): Promise<ChatModel> {
    return ChatService.createChat(dto);
  }
  @Endpoint("POST", "/me/:userId")
  static async getChatWithUser(
    @UserId() myId: string,
    @Params({ schema: IdDto }) params: IdDto
  ) {
    console.log("getChatWithUser", myId, params);
    return ChatService.getChatWithUser(myId, params.id);
  }

  @Endpoint("GET", "/")
  static async getUserChats(@UserId() userId: string): Promise<ChatModel[]> {
    return ChatService.getChat(userId);
  }
}
