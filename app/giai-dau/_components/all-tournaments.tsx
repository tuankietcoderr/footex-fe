import { getAllTournaments } from "@/actions/tournament-actions"
import ITournament from "@/interface/ITournament"
import TournamentItem from "./tournament-item"

type Props = {
  searchParams?: any
}

const AllTournaments = async ({ searchParams }: Props) => {
  const { data, success } = await getAllTournaments(searchParams)
  const tournaments = data ?? ([] as ITournament[])
  if (!success) {
    return <div>Không có giải đấu nào</div>
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {tournaments.length > 0 ? (
        tournaments.map((field) => <TournamentItem key={field._id} {...field} />)
      ) : (
        <div>Không có giải đấu nào</div>
      )}
    </div>
  )
}

export default AllTournaments