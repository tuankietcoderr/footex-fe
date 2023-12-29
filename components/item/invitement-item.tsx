import ROUTE from "@/constants/route"
import IGuest from "@/interface/IGuest"
import IInvitement from "@/interface/IInvitement"
import ITeam from "@/interface/ITeam"
import { formatVietnameseDate } from "@/lib/date"
import Link from "next/link"
import AppAvatar from "../app-avatar"
import InvitementItemAction from "./invitement-item-action"
import { getSession } from "@/services/auth/cookie-session"

const InvitementItem = async (invitement: IInvitement) => {
  const {
    session: { guest },
  } = await getSession()
  const { from, to, team, isJoinRequest, _id, createdAt, status } = invitement
  const fromGuest = from as IGuest
  const toGuest = to as IGuest
  const _team = team as ITeam
  const isCaptainSent = guest?._id === (_team.captain as IGuest)._id

  const renderInvitementText = () => {
    if (isJoinRequest)
      return (
        <p>
          <Link href={ROUTE.HO_SO.ID.replace(":id", fromGuest?._id!)} className="font-semibold">
            {fromGuest?.name}
          </Link>{" "}
          đã yêu cầu tham gia đội bóng
        </p>
      )

    if (isCaptainSent)
      return (
        <p>
          đã mời{" "}
          <Link href={ROUTE.HO_SO.ID.replace(":id", toGuest?._id!)} className="font-semibold">
            {toGuest?.name}
          </Link>{" "}
          tham gia đội bóng
        </p>
      )

    return (
      <p>
        <Link href={ROUTE.HO_SO.ID.replace(":id", fromGuest?._id!)} className="font-semibold">
          {fromGuest?.name}
        </Link>{" "}
        đã mời bạn tham gia đội bóng{" "}
        <Link href={ROUTE.DOI_BONG.ID.replace(":id", _team?._id!)} className="font-semibold">
          {_team?.name}
        </Link>
      </p>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-2 shadow-sm">
      <AppAvatar src={_team?.logo!} alt={_team?.name} className="self-start" />
      <div className="flex flex-1 flex-col justify-between">
        {renderInvitementText()}
        <p className="text-sm font-light">
          lúc {formatVietnameseDate(new Date(createdAt!), "HH:mm dd/MM/yyyy")}
        </p>
      </div>
      <InvitementItemAction invitement={invitement} isCaptainSent={isCaptainSent} />
    </div>
  )
}

export default InvitementItem
