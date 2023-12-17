"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

const ConfirmDelete = () => {
  const [value, setValue] = React.useState("")

  const onSubmit = () => {
    if (value === "Xác nhận xóa đội bóng") {
      console.log("delete")
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
