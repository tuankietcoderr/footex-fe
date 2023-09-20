"use client"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import useUserStore from "@/store/useUserStore"
import { Skeleton } from "../ui/skeleton"
import AccountBadge from "./account-badge"

const AfterLoginNav = () => {
  const { user } = useUserStore()
  return (
    <div className={`flex items-center gap-2 ${user ? "flex-row-reverse" : ""}`}>
      {user !== undefined ? (
        user === null ? (
          <>
            <Button asChild size={"sm"} className="rounded-full px-8">
              <Link href={"/dang-nhap"}>Đăng nhập</Link>
            </Button>
            <Button variant={"outline"} size={"sm"} asChild className="rounded-full px-8">
              <Link href={"/dang-ky"}>Đăng ký</Link>
            </Button>
          </>
        ) : (
          <AccountBadge />
        )
      ) : (
        <>
          <Skeleton className="h-9 w-20 rounded-full px-8" />
          <Skeleton className="h-9 w-20 rounded-full px-8" />
        </>
      )}
      <Button variant={"link"} asChild>
        <Link href={"/chu-san-bong"} className="font-bold text-green-500 underline">
          Dành cho chủ sân bóng
        </Link>
      </Button>
      {user === undefined && <Skeleton className="h-10 w-10 rounded-full" />}
    </div>
  )
}

export default AfterLoginNav
