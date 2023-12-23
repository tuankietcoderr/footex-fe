import AppAvatar from "@/components/app-avatar"
import ROUTE from "@/constants/route"
import IGuest from "@/interface/IGuest"
import { getSession } from "@/services/auth/cookie-session"
import Link from "next/link"
import React from "react"

type Props = {
  member: IGuest
  actions?: React.ReactNode
}

const TeamMemberItem = async ({ member, actions = [] }: Props) => {
  const {
    session: { guest },
  } = await getSession()
  return (
    <div>
      <div className="flex items-center justify-between gap-4 rounded-md border p-2 shadow-sm">
        <AppAvatar src={member?.avatar!} alt={member?.name} className="self-start" />
        <div className="flex flex-1 flex-col justify-between">
          <Link href={ROUTE.HO_SO.ID.replace(":id", member?._id!)} className="font-semibold">
            {member.name} {guest?._id === member?._id ? "(Bạn)" : ""}
          </Link>
        </div>
        {actions}
      </div>
    </div>
  )
}

export default TeamMemberItem
