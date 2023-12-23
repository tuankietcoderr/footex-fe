import IGuest from "@/interface/IGuest"
import React from "react"
import { Button } from "@/components/ui/button"
import TeamMemberItem from "@/components/item/team-member-item"
import TeamMemberActions from "./team-member-actions"
import ITournament from "@/interface/ITournament"
import TournamentItem from "@/components/item/tournament-item"

type Props = {
  tournaments: ITournament[]
}

const TeamTournaments = ({ tournaments }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Giải đấu đã tham gia</h3>
      {tournaments.length > 0 ? (
        <div className="grid grid-cols-3 space-y-2">
          {tournaments.map((tournament) => (
            <TournamentItem {...tournament} key={tournament._id} />
          ))}
        </div>
      ) : (
        <p>Chưa tham gia giải đấu nào</p>
      )}
    </div>
  )
}

export default TeamTournaments
