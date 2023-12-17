import { getCaptainTeams } from "@/actions/team-actions"
import ITeam from "@/interface/ITeam"
import React from "react"
import ManageTeamItem from "../_components/manage-team-item"
import { Button } from "@/components/ui/button"

const page = async () => {
  const { success, data } = await getCaptainTeams()

  if (!success) return <div>error</div>

  const teams = data as ITeam[]

  if (teams.length <= 0) return <div>Bạn chưa tạo đội bóng nào</div>

  return (
    <div className="grid grid-cols-1 gap-4">
      {teams.map((team) => (
        <ManageTeamItem key={team._id} {...team} />
      ))}
    </div>
  )
}

export default page
