"use client";

import {
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {useCallback, useMemo} from "react";

import {useFirebase} from "./useFirebase";

interface UseAuthenticationData {
  getCurrentUser: () => null | User;
  signInWithGoogle: () => Promise<null | User>;
  signOut: () => Promise<void>;
}

export const useAuthentication = (): UseAuthenticationData => {
  const {auth} = useFirebase();

  const signInWithGoogle = useCallback(async (): Promise<null | User> => {
    if (!auth) return null;

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return result.user;
  }, [auth]);

  const signOut = useCallback(async (): Promise<void> => {
    if (!auth) return;

    await firebaseSignOut(auth);
  }, [auth]);

  const getCurrentUser = useCallback((): null | User => {
    return auth?.currentUser ?? null;
  }, [auth]);

  console.log("useAuthentication");

  return useMemo(
    () => ({
      getCurrentUser,
      signInWithGoogle,
      signOut,
    }),
    [getCurrentUser, signInWithGoogle, signOut]
  );
};
