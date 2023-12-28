import FieldItem from "@/components/item/field-item"
import { Separator } from "@/components/ui/separator"
import IField from "@/interface/IField"
import React from "react"

type Props = {
  bookedFields: IField[]
}

const BookedFields = ({ bookedFields = [] }: Props) => {
  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Sân bóng đã đặt</h4>
      <Separator />
      <div className="mt-2 grid grid-cols-4 gap-4">
        {bookedFields.length > 0 ? (
          bookedFields.map((team) => <FieldItem {...team} key={team._id} />)
        ) : (
          <p className="col-span-4 mt-2 text-center text-sm text-muted-foreground">
            Không có sân bóng nào
          </p>
        )}
      </div>
    </div>
  )
}

export default BookedFields
