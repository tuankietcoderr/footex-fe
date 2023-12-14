"use server"

import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IAddress from "@/interface/IAddress"
import IField from "@/interface/IField"
import CACHE_TAGS from "@/utils/cache-tag"

const getAllFields = async (queries: any) => {
  const urlWithQueries = API_ROUTE.FIELD.INDEX + "?" + new URLSearchParams(queries).toString()
  const data = await FETCH<IField[]>(urlWithQueries, {
    next: {
      tags: [CACHE_TAGS.FIELD.GET_ALL],
    },
  })
  return data
}

const getFieldById = async (id: string) => {
  const url = API_ROUTE.FIELD.ID.replace(":id", id)
  const data = await FETCH<IField>(url, {
    next: {
      tags: [CACHE_TAGS.FIELD.GET_BY_ID],
    },
    cache: "no-store",
  })
  return data
}

const getFieldsByBranchAddress = async ({
  branchId,
  city,
  district,
  ward,
}: IAddress & {
  branchId: string
}) => {
  const url =
    API_ROUTE.FIELD.NEAR_BY.replace(":id", branchId) +
    `?city=${city}&district=${district}&ward=${ward}`
  const data = await FETCH<IField[]>(url, {
    next: {
      tags: [CACHE_TAGS.FIELD.GET_BY_ADDRESS],
    },
    cache: "no-store",
  })
  return data
}

export { getAllFields, getFieldById, getFieldsByBranchAddress }
