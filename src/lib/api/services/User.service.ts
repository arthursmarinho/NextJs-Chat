import {firebaseAdmin} from "@/lib/shared/config/FirebaseAdmin.config";
import {UserModel} from "@/lib/shared/models/User.model";

export class UserService {
  static async getUser(userId: string): Promise<UserModel> {
    const userRecord = await firebaseAdmin.auth().getUser(userId);

    return {
      email: userRecord.email || "",
      name: userRecord.displayName || "",
      photoUrl: userRecord.photoURL || "",
      socialId: "",
    };
  }
}
