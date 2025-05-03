import { MessageModel } from "./Message.model";

export class ChatModel {
  id: string;
  messages: MessageModel[];
  users: UserModel[];
}
