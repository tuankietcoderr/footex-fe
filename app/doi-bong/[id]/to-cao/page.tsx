import ReportForm from "@/components/report"
import { ParamsProps } from "@/utils/params"
import React from "react"

const page = ({ params: { id } }: ParamsProps) => {
  return <ReportForm objectType="teams" objectId={id} />
}

export default page
