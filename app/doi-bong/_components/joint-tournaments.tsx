import GuestItem from "@/components/item/guest-item"
import TournamentItem from "@/components/item/tournament-item"
import { Separator } from "@/components/ui/separator"
import IGuest from "@/interface/IGuest"
import ITournament from "@/interface/ITournament"
import React from "react"

type Props = {
  jointTournaments: ITournament[]
}

const JointTournaments = ({ jointTournaments = [] }: Props) => {
  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Giải đấu đã tham gia</h4>
      <Separator />
      {jointTournaments.length > 0 ? (
        <div className="mt-2 grid grid-cols-4 gap-4">
          {jointTournaments.map((tournament) => (
            <TournamentItem {...tournament} key={tournament._id} />
          ))}
        </div>
      ) : (
        <p className="mt-2 text-center text-sm text-muted-foreground">Chưa tham gia giải đấu nào</p>
      )}
    </div>
  )
}

export default JointTournaments
