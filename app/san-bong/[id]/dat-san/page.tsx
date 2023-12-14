import { ParamsProps } from "@/utils/params"
import React from "react"
import BookForm from "./_components/book-form"
import { getFieldBookedQueue } from "@/actions/field-booked-queue-actions"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"

const page = async ({ params: { id } }: ParamsProps) => {
  const { code, message, success, data } = await getFieldBookedQueue(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }

  const bookedFields = data as IFieldBookedQueue[]
  return (
    <div className="mt-4 rounded-md border bg-white p-4 shadow-sm">
      <BookForm bookedFields={bookedFields} fieldId={id} />
    </div>
  )
}

export default page
