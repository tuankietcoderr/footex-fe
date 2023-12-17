import React from "react"
import EditInfoForm from "./_components/edit-info-form"
import { ParamsProps } from "@/utils/params"
import { getTeamById } from "@/actions/team-actions"
import ITeam from "@/interface/ITeam"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getTeamById(id)
  if (!success) return <div>error</div>
  const team = data as ITeam
  return <EditInfoForm {...team} />
}

export default page
