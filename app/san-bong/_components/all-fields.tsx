import IField from "@/interface/IField"
import { getAllFields } from "@/actions/field-actions"
import FieldItem from "@/components/item/field-item"

type Props = {
  searchParams?: any
}

const AllFields = async ({ searchParams }: Props) => {
  const { data, success, code, message } = await getAllFields(searchParams)
  const fields = data ?? ([] as IField[])
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
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
