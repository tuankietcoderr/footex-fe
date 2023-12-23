"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import toast from "react-hot-toast"

const ConfirmLeave = () => {
  const [value, setValue] = React.useState("")

  const onSubmit = () => {
    if (value === "Xác nhận rời khỏi đội bóng") {
      console.log("delete")
    } else {
      toast.error("Văn bản không trùng nhau!")
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <div>
        <p>
          Nhập{" "}
          <span className="select-none font-semibold text-destructive">
            Xác nhận rời khỏi đội bóng đội bóng
          </span>{" "}
          để thực thi hành động
        </p>
        <Input
          className="my-2 focus-visible:ring-destructive"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button variant={"destructive"} onClick={onSubmit}>
        Xác nhận
      </Button>
    </div>
  )
}

export default ConfirmLeave
