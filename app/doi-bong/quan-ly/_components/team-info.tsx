import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import React from "react"
import AppAvatar from "@/components/app-avatar"
import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import { toAddress } from "@/lib/converter"
import { Gamepad, MapPin, Users } from "lucide-react"
import Link from "next/link"

const TeamInfo = (team: ITeam) => {
  const { name, logo, jointTournaments, members, captain } = team
  const _captain = captain as IGuest
  return (
    <div className="grid grid-cols-[10rem_auto] gap-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={logo || ""}
          alt={name}
          width={600}
          height={800}
          className="max-h-[10rem] w-full object-contain p-2"
        />
      </div>
      <div className="flex flex-col justify-between space-y-2 rounded-md border p-4 shadow-sm">
        <Link
          href={ROUTE.HO_SO.ID.replace(":id", _captain?._id || "")}
          className="flex items-center gap-2"
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
          <div className="flex gap-2">
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ..._captain })}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Users size={16} />
            <CardDescription>
              <span className="font-semibold">{members?.length || 0}</span> thành viên
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Gamepad size={16} />
            <CardDescription>
              <span className="font-semibold">{jointTournaments?.length || 0}</span> giải đấu đã
              tham gia
            </CardDescription>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamInfo
