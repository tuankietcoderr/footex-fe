import { getFieldById } from "@/actions/field-actions"
import { Separator } from "@/components/ui/separator"
import IField from "@/interface/IField"
import { LayoutParamsProps, ParamsProps } from "@/utils/params"
import FieldMainInfo from "./_components/field-main-info"
import NearbyBranchFields from "./_components/nearby-branch-fields"
import IBranch from "@/interface/IBranch"
import Rating from "@/components/rating"
import { ERate } from "@/interface/IRate"

const layout = async ({ children, params: { id } }: LayoutParamsProps) => {
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
      <NearbyBranchFields branchId={branch?._id!} fieldId={field?._id!} {...branch} />
    </div>
  )
}

export default layout
