"use client"
import { cancelRequest, requestToJoin } from "@/actions/invitement-actions"
import { Button } from "@/components/ui/button"
import { UserX } from "lucide-react"
import React from "react"
import toast from "react-hot-toast"

type Props = {
  requestId: string
}

const CancelButton = ({ requestId }: Props) => {
  const onCancel = async () => {
    toast.loading("Đang hủy yêu cầu", {
      duration: Infinity,
    })
    const { success, message } = await cancelRequest(requestId)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <Button variant={"outline"} onClick={onCancel} title="Hủy yêu cầu">
      <UserX size={16} />
    </Button>
  )
}

export default CancelButton
