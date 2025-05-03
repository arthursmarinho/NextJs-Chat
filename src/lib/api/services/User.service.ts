import { firebaseAdmin } from "@/lib/shared/config/FirebaseAdmin.config";
import { UserModel } from "@/lib/shared/models/User.model";

export class UserService {
  static async getAllUsers(): Promise<UserModel[]> {
    const list = await firebaseAdmin.auth().listUsers(1000); // máximo permitido por chamada

    return list.users.map((userRecord) => ({
      email: userRecord.email || "",
      name: userRecord.displayName || "",
      photoUrl: userRecord.photoURL || "",
      socialId: "",
    }));
  }
  static async getMe(userId: string): Promise<UserModel> {
    const userRecord = await firebaseAdmin.auth().getUser(userId);

    return {
      email: userRecord.email || "",
      name: userRecord.displayName || "",
      photoUrl: userRecord.photoURL || "",
      socialId: "",
    };
  }
}
