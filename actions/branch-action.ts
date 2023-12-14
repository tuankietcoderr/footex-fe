"use server"

import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IBranch from "@/interface/IBranch"
import CACHE_TAGS from "@/utils/cache-tag"

const getAllBranches = async (queries?: any) => {
  const urlWithQueries = API_ROUTE.BRANCH.INDEX + "?" + new URLSearchParams(queries).toString()
  const data = await FETCH<IBranch[]>(urlWithQueries, {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_ALL],
    },
  })
  return data
}

export { getAllBranches }
