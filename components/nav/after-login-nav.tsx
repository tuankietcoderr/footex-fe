"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";
import { Skeleton } from "../ui/skeleton";
import AccountBadge from "./account-badge";

const AfterLoginNav = () => {
  const { user } = useUserStore();
  return (
    <div
      className={`flex gap-2 items-center ${user ? "flex-row-reverse" : ""}`}
    >
      {user !== undefined ? (
        user === null ? (
          <>
            <Button asChild size={"sm"}>
              <Link href={"/dang-nhap"}>Đăng nhập</Link>
            </Button>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href={"/dang-ky"}>Đăng ký</Link>
            </Button>
          </>
        ) : (
          <AccountBadge />
        )
      ) : (
        <>
          <Skeleton className="w-20 h-9" />
          <Skeleton className="w-20 h-9" />
        </>
      )}
      <Button variant={"link"} asChild>
        <Link href={"/dang-ky"} className="text-green-500 font-bold">
          Dành cho chủ sân bóng
        </Link>
      </Button>
      {user === undefined && <Skeleton className="w-10 h-10 rounded-full" />}
    </div>
  );
};

export default AfterLoginNav;
