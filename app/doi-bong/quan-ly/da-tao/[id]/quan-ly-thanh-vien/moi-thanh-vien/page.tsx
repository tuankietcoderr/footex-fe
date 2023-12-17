import { ParamsProps } from "@/utils/params"
import React from "react"
import TeamInvitements from "./_components/team-invitements"
import { getTeamInvitements } from "@/actions/invitement-actions"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import ROUTE from "@/constants/route"

const page = async ({ params: { id }, searchParams }: ParamsProps) => {
  const { success, data } = await getTeamInvitements(id)
  if (!success) return <div>error</div>
  const invitements = data as IInvitement[]
  const status = (searchParams?.status ?? EInvitementStatus.PENDING) as EInvitementStatus
  const statuses = [
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.REQUEST.replace(":id", id).concat(
        `?request_status=${EInvitementStatus.PENDING}`
      ),
      label: "Đang chờ",
      search: EInvitementStatus.PENDING,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.REQUEST.replace(":id", id).concat(
        `?request_status=${EInvitementStatus.APPROVED}`
      ),
      label: "Đã chấp nhận",
      search: EInvitementStatus.APPROVED,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.REQUEST.replace(":id", id).concat(
        `?request_status=${EInvitementStatus.DECLINED}`
      ),
      label: "Đã từ chối",
      search: EInvitementStatus.DECLINED,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.REQUEST.replace(":id", id).concat(
        `?request_status=${EInvitementStatus.DELETED}`
      ),
      label: "Đã xóa",
      search: EInvitementStatus.DELETED,
    },
  ]
  return (
    <div>
      <TeamInvitements invitements={invitements} status={status} />
    </div>
  )
}

export default page
