import { Controller } from "../decorators/Controller.decorator";
import { Endpoint } from "../decorators/Endpoint.decorator";
import { Body } from "../decorators/Args";
import { CreateMessageBodyDto } from "@/lib/shared/dtos/message/CreateMessageBodyDto";
import { MessageModel } from "@/lib/shared/models/Message.model";
import { MessageService } from "../services/Messages.service";

@Controller("/chat")
export class MessageController {
  @Endpoint("POST", "/")
  static async createMessage(
    @Body({ schema: CreateMessageBodyDto }) dto: CreateMessageBodyDto
  ): Promise<MessageModel> {
    return MessageService.createMessage(dto);
  }
}
