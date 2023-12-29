"use client"
import { deleteTeam } from "@/actions/team-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ROUTE from "@/constants/route"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

type Props = {
  teamId: string
}

const ConfirmDelete = ({ teamId }: Props) => {
  const [value, setValue] = React.useState("")
  const router = useRouter()
  const onSubmit = async () => {
    if (value === "Xác nhận xóa đội bóng") {
      toast.loading("Đang xử lý...", {
        duration: Infinity,
      })
      const { success, message } = await deleteTeam(teamId)
      toast.dismiss()
      if (success) {
        toast.success(message)
        router.replace(ROUTE.DOI_BONG.MANAGE.CREATED.INDEX)
      } else {
        toast.error(message)
      }
    } else {
      toast.error("Văn bản không trùng nhau!")
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <div>
        <p>
          Nhập{" "}
          <span className="select-none font-semibold text-destructive">Xác nhận xóa đội bóng</span>{" "}
          để thực thi hành động
        </p>
        <Input
          className="my-2 focus-visible:ring-destructive"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button variant={"destructive"} onClick={onSubmit}>
        Xác nhận xóa
      </Button>
    </div>
  )
}

export default ConfirmDelete
