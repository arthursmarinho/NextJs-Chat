"use client";

import {useQuery} from "@tanstack/react-query";
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ConfigApiService} from "../../services/ConfigServiceApi.service";
import {FirebaseState, initializeFirebaseApp} from "../../store/firebaseSlice";
import {RootState} from "../../store/store";

type UseFirebaseData = Omit<FirebaseState, "app">;

export const useFirebase = (): UseFirebaseData => {
  const dispatch = useDispatch();
  const {app, auth, firestore, storage}: FirebaseState = useSelector(
    (state: RootState) => state.firebase
  );

  const shouldFetchFirebaseConfig =
    !app &&
    typeof window !== "undefined" &&
    !localStorage.getItem("financeapp:firebase.config");

  const getFirebaseConfigQuery = useQuery({
    enabled: shouldFetchFirebaseConfig,
    queryFn: async () => {
      const config = await ConfigApiService.getFirebaseConfig();
      localStorage.setItem(
        "financeapp:firebase.config",
        JSON.stringify(config)
      );
      return config;
    },
    queryKey: [ConfigApiService.getFirebaseConfig.name],
  });

  useEffect(() => {
    const cached =
      typeof window !== "undefined"
        ? localStorage.getItem("financeapp:firebase.config")
        : null;

    const data = cached ? JSON.parse(cached) : getFirebaseConfigQuery.data;
    if (!data) return;

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

  console.log("useFirebase", shouldFetchFirebaseConfig);

  return useMemo(
    () => ({auth, firestore, storage}),
    [auth, firestore, storage]
  );
};
