import ROUTE from "@/constants/route"
import { ParamsProps } from "@/utils/params"
import { redirect } from "next/navigation"
import React from "react"

const page = ({ params: { id } }: ParamsProps) => {
  redirect(ROUTE.DOI_BONG.MANAGE.JOINED.INFO.replace(":id", id))
}

export default page
