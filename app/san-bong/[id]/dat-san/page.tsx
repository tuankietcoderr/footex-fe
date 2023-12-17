import { ParamsProps } from "@/utils/params"
import React from "react"
import BookForm from "./_components/book-form"
import { getFieldBookedQueue } from "@/actions/field-booked-queue-actions"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import { getSession } from "@/services/auth/cookie-session"

const page = async ({ params: { id } }: ParamsProps) => {
  const {
    isLogin: guestSuccess,
    session: { guest: guestData },
  } = await getSession()
  if (!guestSuccess) return null
  const { code, message, success, data } = await getFieldBookedQueue(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }

  const bookedFields = data as IFieldBookedQueue[]
  const guest = guestData as IGuest

  return (
    <div className="mt-4 rounded-md border bg-white p-4 shadow-sm">
      <BookForm bookedFields={bookedFields} fieldId={id} guest={guest} />
    </div>
  )
}

export default page
