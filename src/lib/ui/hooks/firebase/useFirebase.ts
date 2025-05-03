"use client";

import {useQuery} from "@tanstack/react-query";
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ConfigApiService} from "../../services/ConfigServiceApi.service";
import {FirebaseState, initializeFirebaseApp} from "../../store/firebaseSlice";
import {RootState} from "../../store/store";
import {useLocalStorage} from "../useLocalStorage";

type UseFirebaseData = Omit<FirebaseState, "app">;

export const useFirebase = (): UseFirebaseData => {
  const dispatch = useDispatch();
  const {app, auth, firestore, storage}: FirebaseState = useSelector(
    (state: RootState) => state.firebase
  );
  const localStorage = useLocalStorage();

  const shouldFetchFirebaseConfig =
    !app &&
    typeof window !== "undefined" &&
    (() => {
      const cachedConfig = localStorage.getItem("firebase.config");
      try {
        const parsedConfig = cachedConfig ? JSON.parse(cachedConfig) : null;

        return !parsedConfig || !parsedConfig.apiKey;
      } catch {
        return true;
      }
    })();

  const getFirebaseConfigQuery = useQuery({
    enabled: shouldFetchFirebaseConfig,
    queryFn: async () => {
      const config = await ConfigApiService.getFirebaseConfig();

      localStorage.setItem("firebase.config", JSON.stringify(config));

      return config;
    },
    queryKey: [ConfigApiService.getFirebaseConfig.name],
  });

  useEffect(() => {
    const cached =
      typeof window !== "undefined"
        ? localStorage.getItem("firebase.config")
        : null;

    const data = cached ? JSON.parse(cached) : getFirebaseConfigQuery.data;
    if (!data || !data.apiKey) return;

    dispatch(
      initializeFirebaseApp({
        apiKey: data.apiKey,
        appId: data.appId,
        authDomain: data.authDomain,
        messagingSenderId: data.messagingSenderId,
        projectId: data.projectId,
        storageBucket: data.storageBucket,
      })
    );
  }, [getFirebaseConfigQuery.data]);

  return useMemo(
    () => ({auth, firestore, storage}),
    [auth, firestore, storage]
  );
};
