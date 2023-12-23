import { getTournamentById } from "@/actions/tournament-actions"
import { Separator } from "@/components/ui/separator"
import { LayoutParamsProps, ParamsProps } from "@/utils/params"
import { PropsWithChildren } from "react"
import TournamentMainInfo from "./_components/tournament-main-info"
import ITournament from "@/interface/ITournament"
import TournamentMatches from "./_components/tournament-matches"
import TournamentJointTeams from "./_components/tournament-joint-teams"
import ITeam from "@/interface/ITeam"
import IMatch from "@/interface/IMatch"

const page = async ({ params: { id } }: ParamsProps) => {
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
    <>
      <TournamentMainInfo {...tournament} />
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{tournament.description}</p>
      </div>
      <TournamentJointTeams teams={tournament.teams as ITeam[]} />
      <TournamentMatches tournamentId={id} matches={tournament.matches as IMatch[]} />
    </>
  )
}

export default page
