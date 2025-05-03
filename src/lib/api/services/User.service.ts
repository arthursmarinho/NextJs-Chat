import {firebaseAdmin} from "@/lib/shared/config/FirebaseAdmin.config";
import {UserModel} from "@/lib/shared/models/User.model";

export class UserService {
  static async getAllUsers(): Promise<UserModel[]> {
    const list = await firebaseAdmin.auth().listUsers(1000);

    return list.users.map((userRecord) => ({
      email: userRecord.email || "",
      id: userRecord.uid,
      name: userRecord.displayName || "",
      photoUrl: userRecord.photoURL || "",
    }));
  }
  static async getMe(userId: string): Promise<UserModel> {
    const userRecord = await firebaseAdmin.auth().getUser(userId);

    return {
      email: userRecord.email || "",
      id: userRecord.uid,
      name: userRecord.displayName || "",
      photoUrl: userRecord.photoURL || "",
    };
  }
}
