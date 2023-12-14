"use server"
import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import { COMMON } from "@/constants/common"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import CACHE_TAGS from "@/utils/cache-tag"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const getFieldBookedQueue = async (fieldId: string) => {
  const url = API_ROUTE.FIELD_BOOKED_QUEUE.FIELD.replace(":id", fieldId)
  const data = await FETCH<IFieldBookedQueue[]>(url, {
    next: {
      tags: [CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE],
    },
  })
  return data
}

const bookField = async (data: IFieldBookedQueue) => {
  const res = await FETCH<IFieldBookedQueue[]>(API_ROUTE.FIELD_BOOKED_QUEUE.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: "Bearer " + cookies().get(COMMON.ACCESS_TOKEN)?.value,
    },
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE)
  }
  return res
}

const removeFieldBookedQueue = async (id: string) => {
  const res = await FETCH<IFieldBookedQueue[]>(API_ROUTE.FIELD_BOOKED_QUEUE.ID.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + cookies().get(COMMON.ACCESS_TOKEN)?.value,
    },
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE)
  }
  return res
}

export { getFieldBookedQueue, bookField, removeFieldBookedQueue }
