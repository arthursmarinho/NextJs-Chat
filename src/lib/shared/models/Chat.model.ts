import {MessageModel} from "./Message.model";

export interface ChatModel {
  id: string;
  messages: MessageModel[];
  users: string[];
}
