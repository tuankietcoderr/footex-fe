import { getGuestJointTeams } from "@/actions/team-actions"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { getSession } from "@/services/auth/cookie-session"
import React from "react"
import ManageTeamItem from "../_components/manage-team-item"

const page = async () => {
  const {
    session: { guest },
  } = await getSession()
  const { success, data } = await getGuestJointTeams(guest?._id || "")
  const teams = data as ITeam[]
  if (!success || teams.length === 0) return <div>Bạn chưa tham gia đội bóng nào</div>
  return (
    <div className="grid grid-cols-1 gap-4">
      {teams.map((team) => (
        <ManageTeamItem key={team._id} team={team} isCaptain={false} />
      ))}
    </div>
  )
}

export default page
