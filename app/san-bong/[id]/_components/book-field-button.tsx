"use client"
import { Button } from "@/components/ui/button"
import { useAuthModalContext } from "@/context/AuthModalContext"
import React from "react"

const BookFieldButton = () => {
  const { openModal } = useAuthModalContext()
  const onClickBookField = () => {
    openModal()
  }

  return <Button onClick={onClickBookField}>Đặt sân</Button>
}

export default BookFieldButton
