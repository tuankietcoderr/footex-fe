import { getAllTournaments } from "@/actions/tournament-actions"
import TournamentItem from "@/components/item/tournament-item"
import ITournament from "@/interface/ITournament"

type Props = {
  searchParams?: any
}

const AllTournaments = async ({ searchParams }: Props) => {
  const { data, success, code, message } = await getAllTournaments(searchParams)
  const tournaments = data ?? ([] as ITournament[])
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {tournaments.length > 0 ? (
        tournaments.map((field) => <TournamentItem key={field._id} {...field} />)
      ) : (
        <div className="grid-cols-4">Không có giải đấu nào</div>
      )}
    </div>
  )
}

export default AllTournaments
