import { ParamsProps } from "@/utils/params"
import React from "react"
import TeamInvitements from "./_components/team-invitements"
import { getTeamInvitements } from "@/actions/invitement-actions"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import ROUTE from "@/constants/route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import InviteMember from "./_components/invite-member"

const page = async ({ params: { id }, searchParams }: ParamsProps) => {
  const { success, data } = await getTeamInvitements(id)
  if (!success) return <div>error</div>
  const invitements = data as IInvitement[]
  const status = (searchParams?.status ?? EInvitementStatus.PENDING) as EInvitementStatus
  const statuses = [
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INVITE.replace(":id", id).concat(
        `?status=${EInvitementStatus.PENDING}`
      ),
      label: "Đang chờ",
      search: EInvitementStatus.PENDING,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INVITE.replace(":id", id).concat(
        `?status=${EInvitementStatus.APPROVED}`
      ),
      label: "Đã chấp nhận",
      search: EInvitementStatus.APPROVED,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INVITE.replace(":id", id).concat(
        `?status=${EInvitementStatus.DECLINED}`
      ),
      label: "Đã từ chối",
      search: EInvitementStatus.DECLINED,
    },
  ]
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          {statuses.map(({ href, label, search }) => (
            <Button
              variant={"outline"}
              key={search}
              className={cn(search === status && "bg-gray-100")}
              asChild
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>

        <InviteMember teamId={id} />
      </div>

      <TeamInvitements invitements={invitements} status={status} />
    </div>
  )
}

export default page
