import IField from "@/interface/IField"
import FieldItem from "./field-item"
import { getAllFields } from "@/actions/field-actions"

type Props = {
  searchParams?: any
}

const AllFields = async ({ searchParams }: Props) => {
  const { data, success } = await getAllFields(searchParams)
  const fields = data ?? ([] as IField[])
  if (!success) {
    return <div>Không có sân bóng nào</div>
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {fields.length > 0 ? (
        fields.map((field) => <FieldItem key={field._id} {...field} />)
      ) : (
        <div>Không có sân bóng nào</div>
      )}
    </div>
  )
}

export default AllFields
