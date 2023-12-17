import InvitementItem from "@/components/item/invitement-item"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import React from "react"

type Props = {
  invitements: IInvitement[]
  status: EInvitementStatus
}

const TeamInvitements = ({ invitements, status }: Props) => {
  const statusInvitements = invitements.filter((request) => request.status === status)
  return statusInvitements.length > 0 ? (
    <div className="space-y-2">
      {statusInvitements.map((request) => (
        <InvitementItem key={request._id} {...request} />
      ))}
    </div>
  ) : (
    <div>Không có yêu cầu nào</div>
  )
}

export default TeamInvitements
