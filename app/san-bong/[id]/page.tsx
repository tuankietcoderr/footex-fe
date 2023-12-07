import { ParamsProps } from "@/utils/params"
import React from "react"
import FieldId from "./_components/field-id"

const page = ({ params: { id } }: ParamsProps) => {
  return <FieldId id={id} />
}

export default page
