"use client"
import React from "react"
import { Button } from "../ui/button"
import { Bookmark } from "lucide-react"
import toast from "react-hot-toast"
import { saveField } from "@/actions/field-actions"

type Props = {
  isSaved?: boolean
  fieldId: string
}

const SaveButton = ({ isSaved, fieldId }: Props) => {
  async function handleSave() {
    toast.loading(isSaved ? "Đang bỏ lưu" : "Đang lưu...", { duration: Infinity })
    const { success, message } = await saveField(fieldId)
    toast.dismiss()
    if (success) {
      toast.success((!isSaved ? "Lưu" : "Bỏ lưu") + " sân bóng thành công")
    } else {
      toast.error(message)
    }
  }
  return (
    <Button variant={"outline"} size={"icon"} onClick={handleSave}>
      <Bookmark size={20} fill={isSaved ? "black" : "transparent"} />
    </Button>
  )
}

export default SaveButton
