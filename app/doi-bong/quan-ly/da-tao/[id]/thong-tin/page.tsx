import React from "react"
import TeamMembers from "./_components/team-members"
import { getTeamById } from "@/actions/team-actions"
import { ParamsProps } from "@/utils/params"
import ITeam from "@/interface/ITeam"
import TeamInfo from "../../../_components/team-info"
import IGuest from "@/interface/IGuest"
import TeamTournaments from "./_components/team-tournaments"
import ITournament from "@/interface/ITournament"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getTeamById(id)
  if (!success) return <p>Error</p>

  const team = data as ITeam

  return (
    <div className="space-y-4">
      <TeamInfo {...team} />
      <TeamMembers members={team.members as IGuest[]} />
      <TeamTournaments tournaments={team.jointTournaments as ITournament[]} />
    </div>
  )
}

export default page
