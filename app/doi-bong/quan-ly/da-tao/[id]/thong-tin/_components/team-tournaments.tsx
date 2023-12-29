import TournamentItem from "@/components/item/tournament-item"
import ITournament from "@/interface/ITournament"

type Props = {
  tournaments: ITournament[]
}

const TeamTournaments = ({ tournaments }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Giải đấu đã tham gia</h3>
      {tournaments.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {tournaments.map((tournament) => (
            <TournamentItem {...tournament} key={tournament._id} />
          ))}
        </div>
      ) : (
        <p className="col-span-4 mt-2 text-center text-sm text-muted-foreground">
          Chưa tham gia giải đấu nào
        </p>
      )}
    </div>
  )
}

export default TeamTournaments
