"use client"
import { requestToJoin } from "@/actions/invitement-actions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"
import toast from "react-hot-toast"

type Props = {
  isRequested: boolean
  teamId: string
  isMember: boolean
}

const JoinButton = ({ isRequested = false, teamId, isMember }: Props) => {
  const onRequest = async () => {
    if (isRequested) return
    toast.loading("Đang gửi yêu cầu", {
      duration: Infinity,
    })
    const { success, message } = await requestToJoin({
      team: teamId,
    })
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return !isMember ? (
    <Button
      className={cn("flex-1", isRequested && "cursor-default select-none hover:opacity-100")}
      onClick={onRequest}
    >
      {isRequested ? "Đã gửi yêu cầu tham gia" : "Gửi yêu cầu tham gia"}
    </Button>
  ) : (
    <Button className={cn("flex-1 cursor-default select-none hover:opacity-100")}>
      Đã tham gia
    </Button>
  )
}

export default JoinButton
