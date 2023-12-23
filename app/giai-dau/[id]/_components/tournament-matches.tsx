"use client"
import AppAvatar from "@/components/app-avatar"
import BigCalendar from "@/components/big-calendar"
import { Separator } from "@/components/ui/separator"
import ROUTE from "@/constants/route"
import IMatch from "@/interface/IMatch"
import ITeam from "@/interface/ITeam"
import { useRouter } from "next/navigation"
import { Event } from "react-big-calendar"

type Props = {
  tournamentId: string
  matches: IMatch[]
}

const TournamentMatches = ({ tournamentId, matches }: Props) => {
  const events = matches.map((match) => ({
    title: (
      <div className="flex items-center gap-2">
        <AppAvatar src={(match?.leftTeam as ITeam).logo} alt={(match?.leftTeam as ITeam).name} />
        <span>vs</span>
        <AppAvatar src={(match?.rightTeam as ITeam).logo} alt={(match?.rightTeam as ITeam).name} />
      </div>
    ),
    start: new Date(match.startAt),
    end: new Date(match.endAt),
    resource: match,
  })) as Event[]

  const router = useRouter()

  const onSelectEvent = (event: Event) => {
    router.push(
      ROUTE.GIAI_DAU.MATCH.replace(":id", tournamentId).replace(":matchId", event.resource._id)
    )
  }

  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Những trận đấu của giải đấu</h4>
      </div>
      <Separator className="my-2" />
      <BigCalendar
        events={events}
        views={["week", "agenda"]}
        defaultView="week"
        onSelectEvent={onSelectEvent}
      />
    </div>
  )
}

export default TournamentMatches
