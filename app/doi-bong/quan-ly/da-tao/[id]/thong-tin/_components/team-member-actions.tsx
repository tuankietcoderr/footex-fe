"use client"
import { kickMember } from "@/actions/team-actions"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useParams } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

type Props = {
  memberId: string
}

const TeamMemberActions = ({ memberId }: Props) => {
  const { id } = useParams<{
    id: string
  }>()

  const onClickKick = async () => {
    toast.loading("Đang kick", {
      duration: Infinity,
    })

    const { message, success } = await kickMember(id, memberId)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <div>
      <Button variant={"ghost"} size={"icon"} className="text-destructive" onClick={onClickKick}>
        <Trash2 size={16} />
      </Button>
    </div>
  )
}

export default TeamMemberActions
