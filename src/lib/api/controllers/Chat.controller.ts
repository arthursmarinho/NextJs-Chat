import { Controller } from "../decorators/Controller.decorator";
import { Endpoint } from "../decorators/Endpoint.decorator";
import { ChatService } from "../services/Chat.service";
import { ChatModel } from "@/lib/shared/models/Chat.model";
import { Body, UserId } from "../decorators/Args";
import { CreateChatBodyDto } from "@/lib/shared/dtos/chat/CreateChatBodyDto";

@Controller("/chat")
export class ChatController {
  @Endpoint("GET", "/")
  static async getUserChats(@UserId() userId: string): Promise<ChatModel[]> {
    return ChatService.getChatConfig(userId);
  }
  @Endpoint("POST", "/")
  static async createChat(
    @Body({ schema: CreateChatBodyDto }) dto: CreateChatBodyDto
  ): Promise<ChatModel> {
    return ChatService.createChat(dto);
  }
}
