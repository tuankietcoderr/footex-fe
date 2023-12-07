import ServerImage from "@/components/server-image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import IPrize from "@/interface/IPrize"
import ITournament from "@/interface/ITournament"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { colorizeTournamentStatus, vilizeTournamentStatus } from "@/utils/status"
import PrizeItem from "./prize-item"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ROUTE from "@/constants/route"
import { ArrowRight } from "lucide-react"

const TournamentItem = (tournament: ITournament) => {
  const { name, _id, images = [], teams = [], startAt, endAt, prize, status } = tournament
  const _prize = (prize ?? {}) as IPrize

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      <Card className="border-none shadow-none">
        <CardHeader className="grid place-items-center">
          {images?.length > 0 ? (
            <ServerImage
              src={images[0]}
              width={300}
              height={300}
              alt={name}
              className="h-[10rem]  w-[10rem] rounded-full bg-slate-200 object-contain "
            />
          ) : (
            <FootballGoalSemi fill="var(--primary)" className="fill-primary" />
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{name}</p>
            <p className={cn("text-xs", colorizeTournamentStatus(status!))}>
              {vilizeTournamentStatus(status!)}
            </p>
            <p>
              <b>{teams?.length ?? 0}</b> đội đã tham gia thi đấu
            </p>
            <p className="text-xs">
              Diễn ra từ ngày{" "}
              <span className="font-semibold">
                {formatVietnameseDate(new Date(startAt), "dd/MM/yyyy")}
              </span>{" "}
              đến ngày{" "}
              <span className="font-semibold">
                {formatVietnameseDate(new Date(endAt), "dd/MM/yyyy")}
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <CardDescription>
            Giải thưởng:{" "}
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
          <Button
            variant={"link"}
            className="self-end transition-transform sm:hover:scale-105"
            asChild
          >
            <Link href={`${ROUTE.GIAI_DAU.ID.replace(":id", _id || "")}`}>
              Chi tiết <ArrowRight size={20} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TournamentItem
