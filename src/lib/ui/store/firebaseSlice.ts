import {ConfigFirebaseModel} from "@/lib/shared/models/ConfigFirebase.model";
import {Plain} from "@/lib/shared/types/Instance.types";
import {FirebaseApp, initializeApp} from "@firebase/app";
import {Auth, getAuth} from "@firebase/auth";
import {Firestore, getFirestore} from "@firebase/firestore";
import {FirebaseStorage, getStorage} from "@firebase/storage";
import {createSlice} from "@reduxjs/toolkit";

export type DashboardViewMode = "account" | "creditCard";

export interface FirebaseState {
  app?: FirebaseApp;
  auth?: Auth;
  firestore?: Firestore;
  storage?: FirebaseStorage;
}

const initialState: FirebaseState = {};

const firebaseSlice = createSlice({
  initialState,
  name: "firebase",
  reducers: {
    initializeFirebaseApp(
      state,
      action: {payload: Plain<ConfigFirebaseModel>}
    ) {
      state.app = initializeApp(action.payload);
      state.auth = getAuth(state.app);
      state.firestore = getFirestore(state.app);
      state.storage = getStorage(state.app);
    },
  },
});

export const {initializeFirebaseApp} = firebaseSlice.actions;

export default firebaseSlice.reducer;
