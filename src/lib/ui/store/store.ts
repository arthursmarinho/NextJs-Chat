import {configureStore} from "@reduxjs/toolkit";

import firebaseReducer from "./firebaseSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          "firebase.app",
          "firebase.auth",
          "firebase.firestore",
          "firebase.storage",
        ],
      },
    }),
  reducer: {
    firebase: firebaseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
