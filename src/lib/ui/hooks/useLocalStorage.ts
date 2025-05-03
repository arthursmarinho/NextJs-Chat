"use client";

const PREFIX = "chat";

export const useLocalStorage = () => {
  const getItem = (key: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(`${PREFIX}:${key}`);
    }

    return null;
  };

  const setItem = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`${PREFIX}:${key}`, value);
    }
  };

  const removeItem = (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`${PREFIX}:${key}`);
    }
  };

  return {getItem, removeItem, setItem};
};
