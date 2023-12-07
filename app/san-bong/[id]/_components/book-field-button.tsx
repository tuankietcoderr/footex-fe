"use client"
import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import { useAuthModalContext } from "@/context/AuthModalContext"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  fieldId: string
}

const BookFieldButton = ({ fieldId }: Props) => {
  const { openModal } = useAuthModalContext()
  const router = useRouter()
  const onClickBookField = () => {
    openModal()
    router.push(ROUTE.SAN_BONG.BOOK.replace(":id", fieldId))
  }

  return <Button onClick={onClickBookField}>Đặt sân</Button>
}

export default BookFieldButton
