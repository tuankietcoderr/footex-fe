import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import IPrize from "@/interface/IPrize"
import ITournament from "@/interface/ITournament"
import { toAddress } from "@/lib/converter"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { colorizeTournamentStatus, vilizeTournamentStatus } from "@/utils/status"
import { ArrowRight, Circle, Clock12, Clock7, MapPin, Trophy, Users } from "lucide-react"
import Link from "next/link"
import PrizeItem from "./prize-item"

const TournamentItem = (tournament: ITournament) => {
  const { name, _id, images = [], teams = [], startAt, endAt, prize, status, branch } = tournament
  const _prize = (prize ?? {}) as IPrize
  const _branch = (branch ?? {}) as IBranch

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="">
        <ServerImage
          src={images?.[0] ?? ""}
          width={400}
          height={400}
          alt={name}
          className="h-[10rem] w-full rounded-t-md object-contain p-2"
        />
      </div>
      <Card className="flex flex-1 flex-col justify-between border-none shadow-none">
        <CardContent className="flex flex-1 flex-col gap-2">
          <p className="text-xl font-semibold">{name}</p>
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
            <CardDescription>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span className="cursor-pointer font-semibold underline">{_prize?.name}</span>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div>
                    <PrizeItem {..._prize} />
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant={"link"} className="transition-transform sm:hover:scale-105" asChild>
            <Link href={ROUTE.GIAI_DAU.ID.replace(":id", _id || "")}>
              Chi tiết <ArrowRight size={20} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TournamentItem
