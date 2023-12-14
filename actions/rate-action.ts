"use server"

import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import { COMMON } from "@/constants/common"
import IField from "@/interface/IField"
import IRate, { ERate } from "@/interface/IRate"
import CACHE_TAGS from "@/utils/cache-tag"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const getObjectRates = async (objectType: ERate, objectId: string) => {
  const data = await FETCH<IRate[]>(
    API_ROUTE.RATE.OBJECT.replace(":objectType", objectType).replace(":objectId", objectId),
    {
      next: {
        tags: [CACHE_TAGS.RATE.OBJECT],
      },
    }
  )
  return data
}

const createRate = async (data: IRate) => {
  const res = await FETCH<IRate<IField>>(API_ROUTE.RATE.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: "Bearer " + cookies().get(COMMON.ACCESS_TOKEN)?.value,
    },
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.RATE.OBJECT)
  }
  return res
}

export { getObjectRates, createRate }
