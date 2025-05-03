import {getApps, initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  appId: "",
  authDomain: "",
  messagingSenderId: "",
  projectId: "",
  storageBucket: "",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};
