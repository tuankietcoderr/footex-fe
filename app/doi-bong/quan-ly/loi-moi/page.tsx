import { getGuestInvitements } from "@/actions/invitement-actions"
import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import { cn } from "@/lib/utils"
import { ParamsProps } from "@/utils/params"
import Link from "next/link"
import React from "react"
import GuestInvitements from "./_components/guest-invitements"

const page = async ({ params: { id }, searchParams }: ParamsProps) => {
  const { success, data } = await getGuestInvitements()
  if (!success) return <p>Error</p>
  const invitements = data as IInvitement[]
  const status = (searchParams?.status ?? EInvitementStatus.PENDING) as EInvitementStatus
  const statuses = [
    {
      href: ROUTE.DOI_BONG.MANAGE.INVITEMENTS.concat(`?status=${EInvitementStatus.PENDING}`),
      label: "Đang chờ",
      search: EInvitementStatus.PENDING,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.INVITEMENTS.concat(`?status=${EInvitementStatus.APPROVED}`),
      label: "Đã chấp nhận",
      search: EInvitementStatus.APPROVED,
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.INVITEMENTS.concat(`?status=${EInvitementStatus.DECLINED}`),
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
      </div>

      <GuestInvitements invitements={invitements} status={status} />
    </div>
  )
}

export default page
