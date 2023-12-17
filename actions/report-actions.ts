"use server"

import { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IReport from "@/interface/IReport"

const createReport = async (data: IReport) => {
  const response = await FETCH_WITH_TOKEN<IReport>(API_ROUTE.REPORT.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response
}

export { createReport }
