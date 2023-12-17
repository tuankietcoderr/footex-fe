import { getBranchFields } from "@/actions/branch-actions"
import FieldItem from "@/components/item/field-item"
import { Separator } from "@/components/ui/separator"
import IField from "@/interface/IField"
import { ParamsProps } from "@/utils/params"
import React from "react"

const BranchFields = async ({ branchId: id }: { branchId: string }) => {
  const { success, data } = await getBranchFields(id)
  if (!success) return null
  const fields = data as IField[]
  return fields.length <= 0 ? null : (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Sân bóng của chi nhánh</h4>
      <Separator />
      <div className="mt-2 grid grid-cols-4 space-x-4">
        {fields.map((field) => (
          <FieldItem {...field} key={field._id} />
        ))}
      </div>
    </div>
  )
}

export default BranchFields
