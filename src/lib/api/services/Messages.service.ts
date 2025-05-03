import { firebaseAdmin } from "@/lib/shared/config/FirebaseAdmin.config";
import { CreateMessageBodyDto } from "@/lib/shared/dtos/message/CreateMessageBodyDto";
import { MessageModel } from "@/lib/shared/models/Message.model";

const db = firebaseAdmin.firestore();

export class MessageService {
  static async createMessage(dto: CreateMessageBodyDto): Promise<MessageModel> {
    const messageRef = db.collection("messages").doc();

    const messageData: MessageModel = {
      user: dto.user,
      id: messageRef.id,
      message: dto.message,
      timestamp: dto.timestamp,
    };

    await messageRef.set(messageData);

    return messageData;
  }
}
