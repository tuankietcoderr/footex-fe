import GuestItem from "@/components/item/guest-item"
import { Separator } from "@/components/ui/separator"
import IGuest from "@/interface/IGuest"
import React from "react"

type Props = {
  members: IGuest[]
}

const Members = ({ members = [] }: Props) => {
  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Thành viên</h4>
      <Separator />
      {members.length > 0 ? (
        <div className="mt-2 grid grid-cols-4 gap-4">
          {members.map((guest) => (
            <GuestItem {...guest} key={guest._id} />
          ))}
        </div>
      ) : (
        <p className="mt-2 text-center text-sm text-muted-foreground">Không có thành viên nào</p>
      )}
    </div>
  )
}

export default Members
