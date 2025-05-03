// services/Chat.service.ts
import {firebaseAdmin} from "@/lib/shared/config/FirebaseAdmin.config";
import {CreateChatBodyDto} from "@/lib/shared/dtos/chat/CreateChatBodyDto";
import {ChatModel} from "@/lib/shared/models/Chat.model";

const db = firebaseAdmin.firestore();

export class ChatService {
  static async createChat(dto: CreateChatBodyDto): Promise<ChatModel> {
    const chatData = {
      createdAt: new Date().toISOString(),
      messages: [],
      users: dto.users,
    };

    const docRef = await db.collection("chat").add(chatData);

    return {
      id: docRef.id,
      messages: [],
      users: [],
    };
  }

  static async getChatWithUser(
    myId: string,
    userId: string
  ): Promise<ChatModel> {
    const snapshot = await db
      .collection("chat")
      .where("users", "array-contains", myId)
      .get();

    const chatDoc = snapshot.docs.find((doc) => {
      const data = doc.data();

      return data.users.includes(userId);
    });

    if (!chatDoc) {
      return await this.createChat({
        users: [myId, userId],
      });
    }

    const data = chatDoc.data();

    return {
      id: chatDoc.id,
      messages: data.messages || [],
      users: data.users,
    };
  }

  static async getUserChats(userId: string): Promise<ChatModel[]> {
    const snapshot = await db
      .collection("chat")
      .where("users", "array-contains", userId)
      .get();

    const chats: ChatModel[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      chats.push({
        id: doc.id,
        messages: data.messages || [],
        users: data.users,
      });
    });

    return chats;
  }
}
