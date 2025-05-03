import {CreateMessageBodyDto} from "@/lib/shared/dtos/message/CreateMessageBodyDto";
import {MessageModel} from "@/lib/shared/models/Message.model";

import {Body} from "../decorators/Args";
import {Controller} from "../decorators/Controller.decorator";
import {Endpoint} from "../decorators/Endpoint.decorator";
import {MessageService} from "../services/Messages.service";

@Controller("/messages")
export class MessageController {
  @Endpoint("POST", "/")
  static async createMessage(
    @Body({schema: CreateMessageBodyDto}) dto: CreateMessageBodyDto
  ): Promise<MessageModel> {
    return MessageService.createMessage(dto);
  }
}
