import { getGuestJointTeams } from "@/actions/team-actions"
import { ParamsProps } from "@/utils/params"
import React from "react"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getGuestJointTeams(id)
  if (!success) return null
  return <div>{JSON.stringify(data)}</div>
}

export default page
