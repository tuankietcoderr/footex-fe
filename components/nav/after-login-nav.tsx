"use server"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import AccountBadge from "./account-badge"
import { OwnerURL } from "@/lib/url"
import AuthButton from "./auth-button"
import { getSession } from "@/services/auth/cookie-session"

const AfterLoginNav = async () => {
  const { isLogin } = await getSession()
  return (
    <div className={`flex flex-wrap items-center gap-2`}>
      {/* <Button variant={"link"} className="" asChild>
        <Link href={OwnerURL} className="text-center font-bold text-green-500 underline">
          Dành cho chủ sân bóng
        </Link>
      </Button> */}
      {!isLogin ? <AuthButton /> : <AccountBadge />}
    </div>
  )
}

export default AfterLoginNav
