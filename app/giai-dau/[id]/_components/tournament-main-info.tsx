import AppAvatar from "@/components/app-avatar"
import ServerImage from "@/components/server-image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import IPrize from "@/interface/IPrize"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import { toAddress } from "@/lib/converter"
import { formatVietnameseDate } from "@/lib/date"
import { Circle, Clock12, Clock7, MapPin, Trophy, Users } from "lucide-react"
import Link from "next/link"
import React from "react"
import { CardDescription } from "@/components/ui/card"
import TournamentActions from "./tournament-actions"
import { cn } from "@/lib/utils"
import { colorizeTournamentStatus, vilizeTournamentStatus } from "@/utils/status"
import PrizeItem from "@/components/item/prize-item"

const TournamentMainInfo = (tournament: ITournament) => {
  const { name, branch, prize, images, startAt, endAt, teams, status } = tournament
  const _prize = (prize ?? {}) as IPrize
  const _branch = (branch ?? {}) as IBranch
  return (
    <div className="grid grid-cols-[18rem_auto] gap-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={images?.[0] || ""}
          alt={name}
          width={600}
          height={800}
          className="max-h-[14rem] w-full object-cover p-2"
        />
      </div>
      <div className="flex flex-col justify-between space-y-2 rounded-md border p-4 shadow-sm">
        <Link
          href={ROUTE.CHI_NHANH.ID.replace(":id", _branch?._id || "")}
          className="flex items-center gap-2"
        >
          <AppAvatar
            src={_branch?.logo || ""}
            alt={_branch.name}
            className="md:h-6 md:w-6 md:text-xs"
          />
          <span className="text-sm text-muted-foreground">{_branch.name}</span>
        </Link>
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="space-y-1">
          <div className="flex gap-2">
            <Circle size={16} />
            <p className={cn("text-sm", colorizeTournamentStatus(status!))}>
              {vilizeTournamentStatus(status!)}
            </p>
          </div>
          <div className="flex gap-2">
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ..._branch })}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Users size={16} />
            <CardDescription>
              <b>{teams?.length ?? 0}</b> đội đã tham gia thi đấu
            </CardDescription>
          </div>
          <div className="flex flex-1 gap-2">
            <Clock7 size={16} />
            <CardDescription>
              {formatVietnameseDate(new Date(startAt), "dd/MM/yyyy")}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Clock12 size={16} />
            <CardDescription>{formatVietnameseDate(new Date(endAt), "dd/MM/yyyy")}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Trophy size={16} />
            <div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <CardDescription className="cursor-pointer font-semibold underline">
                    {_prize?.name}
                  </CardDescription>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div>
                    <PrizeItem {..._prize} />
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        {status === ETournamentStatus.UPCOMING && (
          <TournamentActions tournamentId={tournament?._id || ""} />
        )}
      </div>
    </div>
  )
}

export default TournamentMainInfo
