import {firebaseAdmin} from "@/lib/shared/config/FirebaseAdmin.config";
import {CreateMessageBodyDto} from "@/lib/shared/dtos/message/CreateMessageBodyDto";
import {MessageModel} from "@/lib/shared/models/Message.model";

const db = firebaseAdmin.firestore();

export class MessageService {
  static async createMessage(dto: CreateMessageBodyDto): Promise<MessageModel> {
    const chatRef = db.collection("chat").doc(dto.chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      throw new Error("Chat not found");
    }

    const newMessage = {
      content: dto.message,
      id: db.collection("messages").doc().id,
      sender: dto.user,
      timestamp: dto.timestamp,
    };

    await chatRef.update({
      messages: firebaseAdmin.firestore.FieldValue.arrayUnion(newMessage),
    });

    return newMessage;
  }
}
