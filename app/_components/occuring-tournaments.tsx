import { getHappeningTournaments } from "@/actions/tournament-actions"
import TournamentItem from "@/components/item/tournament-item"
import ITournament from "@/interface/ITournament"
import React from "react"

const OccuringTournaments = async () => {
  const { data, code, message, success } = await getHappeningTournaments()
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const tournaments = data as ITournament[]
  return (
    tournaments.length > 0 && (
      <div>
        <h2 className="mb-2 text-center text-2xl font-bold">Các giải đấu đang diễn ra</h2>
        <div className="grid min-h-[20rem] grid-cols-4 gap-4">
          {tournaments.map((tournament) => (
            <TournamentItem {...tournament} key={tournament._id} />
          ))}
        </div>
      </div>
    )
  )
}

export default OccuringTournaments
