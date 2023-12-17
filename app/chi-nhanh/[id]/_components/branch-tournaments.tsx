import { getBranchTournaments } from "@/actions/branch-actions"
import TournamentItem from "@/components/item/tournament-item"
import { Separator } from "@/components/ui/separator"
import ITournament from "@/interface/ITournament"

const BranchTournaments = async ({ branchId: id }: { branchId: string }) => {
  const { success, data } = await getBranchTournaments(id)
  if (!success) return null
  const tournaments = data as ITournament[]
  return tournaments.length <= 0 ? null : (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Giải đấu của chi nhánh</h4>
      <Separator />
      <div className="mt-2 grid grid-cols-4 space-x-4">
        {tournaments.map((field) => (
          <TournamentItem {...field} key={field._id} />
        ))}
      </div>
    </div>
  )
}

export default BranchTournaments
