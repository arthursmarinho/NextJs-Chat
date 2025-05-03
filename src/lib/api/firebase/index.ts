import {cert, getApps, initializeApp, ServiceAccount} from "firebase-admin/app";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve(
  "./src/lib/api/firebase/service_account_key.secret.json"
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!serviceAccount.private_key || !serviceAccount.client_email) {
  throw new Error(
    "Firebase Admin: Variáveis de ambiente estão ausentes ou mal formatadas."
  );
}

const admin =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      })
    : getApps()[0];

export {admin};
