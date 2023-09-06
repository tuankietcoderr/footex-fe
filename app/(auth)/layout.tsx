"use client";
import useUserStore from "@/store/useUserStore";
import React, { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

const Layout = ({ children }: PropsWithChildren) => {
  const { user } = useUserStore();
  if (user) {
    return redirect("/");
  }
  return <div className="flex justify-center mt-8">{children}</div>;
};

export default Layout;
