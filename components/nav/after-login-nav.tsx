"use client"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import useGuestStore from "@/store/useGuestStore"
import { Skeleton } from "../ui/skeleton"
import AccountBadge from "./account-badge"

const AfterLoginNav = () => {
  const { guest } = useGuestStore()
  return (
    <div className={`flex items-center gap-2 ${guest ? "flex-row-reverse" : ""}`}>
      {guest !== undefined ? (
        guest === null ? (
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
      {guest === undefined && <Skeleton className="h-10 w-10 rounded-full" />}
    </div>
  )
}

export default AfterLoginNav
