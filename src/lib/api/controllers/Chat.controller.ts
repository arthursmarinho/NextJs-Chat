import { FirebaseConfig } from "@/lib/shared/config/Firebase.config";
import { ConfigFirebaseModel } from "@/lib/shared/models/ConfigFirebase.model";

import { Controller } from "../decorators/Controller.decorator";
import { Endpoint } from "../decorators/Endpoint.decorator";
import { Body, Params, Query } from "../decorators/Args";
import { IdDto } from "@/lib/shared/dtos/Id.dto";
import { CreateChatBodyDto } from "@/lib/shared/dtos/message/CreateChatBody.dto";
import { ChatModel } from "@/lib/shared/models/Chat.model";

@Controller("/chat")
export class ChatController {
  @Endpoint("POST", "/firebase")
  static async createChat(
    @Body({ schema: CreateChatBodyDto }) dto: CreateChatBodyDto
  ): Promise<ChatModel> {
    return;
  }
}
