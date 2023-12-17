import { ParamsProps } from "@/utils/params"
import React from "react"
import TeamRequests from "./_components/team-requests"
import { getTeamRequests } from "@/actions/invitement-actions"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"

const page = async ({ params: { id }, searchParams }: ParamsProps) => {
  const { success, data } = await getTeamRequests(id)
  if (!success) return <div>error</div>
  const requests = data as IInvitement[]
  const status = (searchParams?.status ?? EInvitementStatus.PENDING) as EInvitementStatus
  return (
    <div>
      <TeamRequests requests={requests} status={status} />
    </div>
  )
}

export default page
