import { getTeamById } from "@/actions/team-actions"
import { Separator } from "@/components/ui/separator"
import ITeam from "@/interface/ITeam"
import { LayoutParamsProps } from "@/utils/params"
import TeamMainInfo from "./_components/team-main-info"
import Rating from "@/components/rating"
import { ERate } from "@/interface/IRate"
import Members from "../_components/members"
import IGuest from "@/interface/IGuest"
import JointTournaments from "../_components/joint-tournaments"
import ITournament from "@/interface/ITournament"

const layout = async ({ children, params: { id } }: LayoutParamsProps) => {
  const { success, data, code, message } = await getTeamById(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const team = data as ITeam
  const members = (team?.members ?? []) as IGuest[]
  const jointTournaments = (team?.jointTournaments ?? []) as ITournament[]
  return (
    <div className="mx-[5%] my-4 space-y-4">
      <TeamMainInfo {...team} />
      {children}
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{team.description}</p>
      </div>
      <Members members={members} />
      <JointTournaments jointTournaments={jointTournaments} />
      <Rating objectId={id} objectType={ERate.TEAM} />
    </div>
  )
}

export default layout
