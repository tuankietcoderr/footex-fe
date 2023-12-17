import { getGuestJointTeams } from "@/actions/team-actions"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { getSession } from "@/services/auth/cookie-session"
import React from "react"

const page = async () => {
  const {
    session: { guest },
  } = await getSession()
  const { success, data } = await getGuestJointTeams(guest?._id || "")
  const teams = data as ITeam[]
  if (!success || teams.length === 0) return <div>Bạn chưa tham gia đội bóng nào</div>
  return <div>JointTeams</div>
}

export default page
