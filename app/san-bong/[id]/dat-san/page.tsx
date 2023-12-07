import { ParamsProps } from "@/utils/params"
import React from "react"
import { useForm } from "react-hook-form"
import BookForm from "./_components/book-form"

const page = ({ params: { id } }: ParamsProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <BookForm />
    </div>
  )
}

export default page
