import AppAvatar from "@/components/app-avatar"
import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { toAddress, toDot } from "@/lib/converter"
import { cn } from "@/lib/utils"
import { Circle, CircleDollarSign, Gamepad, MapPin, Users } from "lucide-react"
import Link from "next/link"
import React from "react"
import TeamActions from "./team-actions"

const TeamMainInfo = (team: ITeam) => {
  const { name, description, logo, captain, jointTournaments, members, joinRequests } = team
  const _captain = captain as IGuest
  return (
    <div className="grid grid-cols-[18rem_auto] space-x-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={logo || ""}
          alt={name}
          width={600}
          height={800}
          className="max-h-[14rem] w-full object-contain p-2"
        />
      </div>
      <div className="flex flex-col justify-between space-y-2 rounded-md border p-4 shadow-sm">
        <Link
          href={ROUTE.HO_SO.ID.replace(":id", _captain?._id || "")}
          className="flex items-center space-x-2"
        >
          <AppAvatar
            src={_captain?.avatar || ""}
            alt={_captain.name}
            className="md:h-6 md:w-6 md:text-xs"
          />
          <span className="text-sm text-muted-foreground">{_captain.name}</span>
        </Link>
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="space-y-1">
          <div className="flex space-x-2">
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ..._captain })}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Users size={16} />
            <CardDescription>
              <span className="font-semibold">{members?.length || 0}</span> thành viên
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Gamepad size={16} />
            <CardDescription>
              <span className="font-semibold">{jointTournaments?.length || 0}</span> giải đấu đã
              tham gia
            </CardDescription>
          </div>
        </div>
        <TeamActions {...team} />
      </div>
    </div>
  )
}

export default TeamMainInfo
