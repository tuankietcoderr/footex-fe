import { getFieldsByBranchAddress } from "@/actions/field-actions"
import IAddress from "@/interface/IAddress"
import IField from "@/interface/IField"
import React from "react"

type Props = {
  branchId: string
} & Omit<IAddress, "houseNumber" | "street">

const NearbyBranchFields = async ({ branchId, city, district, ward }: Props) => {
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
    <div className="rounded-md border border-border p-4">
      <h4 className="font-semibold">Sân bóng gần đây</h4>
      {fields.map((field) => (
        <div key={field._id} className="flex items-center justify-between space-x-4">
          <div className="">
            <h1 className="text-4xl font-bold">{field.name}</h1>
            <p className="mt-2 text-red-400">{field.price} VND</p>
            <p className="mt-2">{field.description}</p>
          </div>
          <button className="rounded-md bg-primary px-4 py-2 text-white">Đặt sân</button>
        </div>
      ))}
    </div>
  )
}

export default NearbyBranchFields
