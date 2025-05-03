import { UserModel } from "./User.model";

export class MessageModel {
  id: string;
  user: string;
  message: string;
  timestamp: number;
}
