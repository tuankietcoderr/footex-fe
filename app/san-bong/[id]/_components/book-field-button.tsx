"use client"
import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import { useAuthModalContext } from "@/context/AuthModalContext"
import { Flag } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  fieldId: string
}

const FieldActions = ({ fieldId }: Props) => {
  const { openModal } = useAuthModalContext()
  const router = useRouter()
  const onClickBookField = () => {
    openModal()
    router.push(ROUTE.SAN_BONG.BOOK.replace(":id", fieldId))
  }

  return (
    <div className="flex space-x-2">
      <Button onClick={onClickBookField} className="flex-1">
        Đặt sân
      </Button>
      <Button variant={"ghost"}>
        <Flag size={16} />
      </Button>
    </div>
  )
}

export default FieldActions
