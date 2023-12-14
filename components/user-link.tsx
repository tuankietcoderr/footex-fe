"use client"
import ROUTE from "@/constants/route"
import useGuestStore from "@/store/useGuestStore"
import Link from "next/link"
import React, { PropsWithChildren } from "react"

const UserLink = ({ id, children }: { id: string } & PropsWithChildren) => {
  const { guest } = useGuestStore()
  const href = id === guest?._id ? ROUTE.HO_SO.INDEX : ROUTE.HO_SO.ID.replace(":id", id)
  return <Link href={href}>{children}</Link>
}

export default UserLink
