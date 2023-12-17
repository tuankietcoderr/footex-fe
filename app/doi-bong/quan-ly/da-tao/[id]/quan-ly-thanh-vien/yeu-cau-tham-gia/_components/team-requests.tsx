import InvitementItem from "@/components/item/invitement-item"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import React from "react"

type Props = {
  requests: IInvitement[]
  status: EInvitementStatus
}

const TeamRequests = ({ requests, status }: Props) => {
  const statusRequests = requests.filter((request) => request.status === status)
  return statusRequests.length > 0 ? (
    <div className="space-y-2">
      {statusRequests.map((request) => (
        <InvitementItem key={request._id} {...request} />
      ))}
    </div>
  ) : (
    <div>Không có yêu cầu nào</div>
  )
}

export default TeamRequests
