import { getTeamById } from "@/actions/team-actions"

import Link from "next/link"
import IGuest from "@/interface/IGuest"
import { ParamsProps } from "@/utils/params"
import ITeam from "@/interface/ITeam"
import TeamInfo from "../../../_components/team-info"
import TeamMembers from "./_components/team-members"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getTeamById(id)
  if (!success) return <p>Error</p>

  const team = data as ITeam

  return (
    <div className="space-y-4">
      <TeamInfo {...team} />
      <TeamMembers members={team.members as IGuest[]} />
    </div>
  )
}

export default page
