import { getFieldsByBranchAddress } from "@/actions/field-actions"
import FieldItem from "@/components/item/field-item"
import { Separator } from "@/components/ui/separator"
import IAddress from "@/interface/IAddress"
import IField from "@/interface/IField"

type Props = {
  branchId: string
  fieldId: string
} & Omit<IAddress, "houseNumber" | "street">

const NearbyBranchFields = async ({ fieldId, branchId, city, district, ward }: Props) => {
  const { data, code, message, success } = await getFieldsByBranchAddress({
    branchId,
    city,
    district,
    ward,
  })
  if (!success)
    return (
      <div>
        {code} + {message}
      </div>
    )
  const fields = data as IField[]
  return fields.length <= 0 ? null : (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Sân bóng gần đây</h4>
      <Separator />
      <div className="mt-2 grid grid-cols-3 space-x-4">
        {fields
          .filter((f) => f._id !== fieldId)
          .map((field) => (
            <FieldItem {...field} key={field._id} />
          ))}
      </div>
    </div>
  )
}

export default NearbyBranchFields
