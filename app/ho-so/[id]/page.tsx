import { getGuestJointTeams } from "@/actions/team-actions"
import TeamItem from "@/components/item/team-item"
import ITeam from "@/interface/ITeam"
import { ParamsProps } from "@/utils/params"
import React from "react"
import JointTeams from "./_components/joint-teams"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getGuestJointTeams(id)
  if (!success) return null
  const teams = data as ITeam[]
  return (
    <div>
      <JointTeams jointTeams={teams} />
    </div>
  )
}

export default page
