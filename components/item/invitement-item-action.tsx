"use client"
import { deleteInvitement, updateInvitementStatus } from "@/actions/invitement-actions"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import React from "react"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Check, Trash2, X } from "lucide-react"

type Props = {
  invitement: IInvitement
  isCaptainSent: boolean
}

const InvitementItemAction = ({ invitement, isCaptainSent }: Props) => {
  const status = invitement.status

  const onClickWithStatus = async (status: EInvitementStatus) => {
    toast.loading("Đang xử lý...", {
      duration: Infinity,
    })

    const { success, message } = await updateInvitementStatus(invitement?._id!, status)
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
    toast.loading("Đang xóa", {
      duration: Infinity,
    })
    const { message, success } = await deleteInvitement(invitement?._id!)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="flex gap-2">
      {!isCaptainSent && status === EInvitementStatus.PENDING && (
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
  )
}

export default InvitementItemAction
