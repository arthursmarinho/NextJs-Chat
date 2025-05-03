import {configureStore} from "@reduxjs/toolkit";

import accountsReducer from "./accountsSlice";
import dashboardReducer from "./dashboardSlice";
import firebaseReducer from "./firebaseSlice";
import trackerReducer from "./trackerSlice";
import transactionCategoriesReducer from "./transactionCategoriesSlice";
import transactionsReducer from "./transactionsSlice";

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
    // accounts: accountsReducer,
    // dashboard: dashboardReducer,
    firebase: firebaseReducer,
    // tracker: trackerReducer,
    // transactionCategories: transactionCategoriesReducer,
    // transactions: transactionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
