"use client";
import useUserStore from "@/store/useUserStore";
import React, { PropsWithChildren, useEffect } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { loadUser, user } = useUserStore();
  console.log({ user });
  useEffect(() => {
    (async () => {
      await loadUser();
    })();
  }, []);
  return children;
};

export default AuthProvider;
