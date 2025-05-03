import {FirebaseConfig} from "@/lib/shared/config/Firebase.config";
import {CreateChatBodyDto} from "@/lib/shared/dtos/chat/CreateChatBody.dto";
import {IdDto} from "@/lib/shared/dtos/Id.dto";
import {ChatModel} from "@/lib/shared/models/Chat.model";
import {ConfigFirebaseModel} from "@/lib/shared/models/ConfigFirebase.model";

import {Body, Params, Query} from "../decorators/Args";
import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";

@Controller("/chat")
export class ChatController {
  @Endpoint("POST", "/firebase")
  static async createChat(
    @Body({schema: CreateChatBodyDto}) dto: CreateChatBodyDto
  ): Promise<ChatModel> {
    return;
  }
}
