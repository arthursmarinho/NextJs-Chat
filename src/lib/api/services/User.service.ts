import { ConfigFirebaseAdminModel } from "@/lib/shared/models/ConfigFirebaseAdmin";
import { firebaseAdmin } from "@/lib/shared/config/FirebaseAdmin.config";
export class UserService {
  static async getUserConfig(
    userId: string
  ): Promise<ConfigFirebaseAdminModel> {
    const userRecord = await firebaseAdmin.auth().getUser(userId);

    return {
      name: userRecord.displayName || "",
      email: userRecord.email || "",
      photoURL: userRecord.photoURL || "",
    };
  }
}
