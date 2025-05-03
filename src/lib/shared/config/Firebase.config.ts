import env from "env-var";

import {ConfigFirebaseModel} from "../models/ConfigFirebase.model";

export const FirebaseConfig = new ConfigFirebaseModel(
  env.get("FIREBASE_API_KEY").required().asString(),
  env.get("FIREBASE_APP_ID").required().asString(),
  env.get("FIREBASE_AUTH_DOMAIN").required().asString(),
  env.get("FIREBASE_MESSAGING_SENDER_ID").required().asString(),
  env.get("FIREBASE_PROJECT_ID").required().asString(),
  env.get("FIREBASE_STORAGE_BUCKET").required().asString()
);
