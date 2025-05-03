import { CreateChatBodyDto } from "@/lib/shared/dtos/message/CreateChatBody.dto";
import { ChatModel } from "@/lib/shared/models/Chat.model";

export class ChatService {
  async createChat(dto: CreateChatBodyDto): Promise<ChatModel> {}
}
