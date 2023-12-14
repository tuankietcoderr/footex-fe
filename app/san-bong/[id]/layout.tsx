import { getFieldById } from "@/actions/field-actions"
import IBranch from "@/interface/IBranch"
import IField from "@/interface/IField"
import { ParamsProps } from "@/utils/params"
import React, { PropsWithChildren } from "react"
import FieldMainInfo from "./_components/field-main-info"
import NearbyBranchFields from "./_components/nearby-branch-fields"
import { Separator } from "@/components/ui/separator"
import Rating from "@/components/rating"
import { ERate } from "@/interface/IRate"

type Props = ParamsProps & PropsWithChildren

const layout = async ({ children, params: { id } }: Props) => {
  const { success, data, code, message } = await getFieldById(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const field = data as IField
  const branch = field.branch as IBranch
  return (
    <div className="mx-[5%] my-4 space-y-4">
      <FieldMainInfo {...field} />
      {children}
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{field.description}</p>
      </div>
      <Rating objectId={id} objectType={ERate.FIELD} />
      <NearbyBranchFields branchId={branch?._id || ""} {...branch} fieldId={id} />
    </div>
  )
}

export default layout
