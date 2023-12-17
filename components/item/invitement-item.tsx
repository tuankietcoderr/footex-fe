"use client"

import IGuest from "@/interface/IGuest"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import ITeam from "@/interface/ITeam"
import React from "react"
import AppAvatar from "../app-avatar"
import { formatVietnameseDate } from "@/lib/date"
import { Button } from "../ui/button"
import { Check, Trash2, X } from "lucide-react"
import Link from "next/link"
import ROUTE from "@/constants/route"
import toast from "react-hot-toast"
import { updateInvitementStatus } from "@/actions/invitement-actions"

const InvitementItem = (invitement: IInvitement) => {
  const { from, to, team, isJoinRequest, _id, createdAt, status } = invitement
  const fromGuest = from as IGuest
  const toGuest = to as IGuest
  const _team = team as ITeam

  const onClickWithStatus = async (status: EInvitementStatus) => {
    toast.loading("Đang xử lý...", {
      duration: Infinity,
    })

    const { success, message } = await updateInvitementStatus(_id!, status)
    toast.dismiss()

    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const onClickAccept = async () => {
    await onClickWithStatus(EInvitementStatus.APPROVED)
  }

  const onClickDecline = async () => {
    await onClickWithStatus(EInvitementStatus.DECLINED)
  }

  const onClickDelete = async () => {
    await onClickWithStatus(EInvitementStatus.DELETED)
  }

  const renderInvitementText = isJoinRequest
    ? "đã gửi yêu cầu tham gia đội bóng"
    : "đã mời bạn tham gia đội bóng"

  return (
    <div className="flex items-center justify-between space-x-4 rounded-md border p-2 shadow-sm">
      <AppAvatar src={fromGuest?.avatar!} alt={fromGuest?.name} className="self-start" />
      <div className="flex flex-1 flex-col justify-between">
        <p>
          <Link href={ROUTE.HO_SO.ID.replace(":id", fromGuest?._id!)} className="font-semibold">
            {fromGuest?.name}
          </Link>
          <span> {renderInvitementText} </span>
          <Link href={ROUTE.DOI_BONG.ID.replace(":id", _team?._id!)} className="font-semibold">
            {_team?.name}
          </Link>
        </p>
        <p className="text-sm font-light">
          lúc {formatVietnameseDate(new Date(createdAt!), "HH:mm dd/MM/yyyy")}
        </p>
      </div>
      <div className="flex space-x-2">
        {status === EInvitementStatus.PENDING && (
          <>
            <Button
              onClick={onClickAccept}
              className="text-green-500"
              variant={"ghost"}
              size={"icon"}
              title="Chấp nhận"
            >
              <Check size={16} />
            </Button>
            <Button
              onClick={onClickDecline}
              className="text-"
              variant={"ghost"}
              size={"icon"}
              title="Từ chối"
            >
              <X size={16} />
            </Button>
          </>
        )}
        {(status === EInvitementStatus.PENDING || status === EInvitementStatus.DECLINED) && (
          <Button
            onClick={onClickDelete}
            className="text-destructive"
            variant={"ghost"}
            size={"icon"}
            title="Xóa"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}

export default InvitementItem
