import { ParamsProps } from "@/utils/params"
import React from "react"

const page = ({ params: { id } }: ParamsProps) => {
  return <div>{id}</div>
}

export default page
