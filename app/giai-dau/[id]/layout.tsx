import { getTournamentById } from "@/actions/tournament-actions"
import { Separator } from "@/components/ui/separator"
import { LayoutParamsProps, ParamsProps } from "@/utils/params"
import { PropsWithChildren } from "react"
import TournamentMainInfo from "./_components/tournament-main-info"
import ITournament from "@/interface/ITournament"
import TournamentMatches from "./_components/tournament-matches"

const layout = async ({ children, params: { id } }: LayoutParamsProps) => {
  const { success, data, code, message } = await getTournamentById(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const tournament = data as ITournament
  return (
    <div className="mx-[5%] my-4 space-y-4">
      <TournamentMainInfo {...tournament} />
      {children}
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{tournament.description}</p>
      </div>
      <TournamentMatches tournamentId={id} />
    </div>
  )
}

export default layout
