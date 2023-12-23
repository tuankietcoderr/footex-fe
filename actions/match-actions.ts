"use server"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IMatch from "@/interface/IMatch"
import CACHE_TAGS from "@/utils/cache-tag"
import { revalidatePath } from "next/cache"

const getMatchById = async (id: string) => {
  const res = await FETCH<IMatch>(API_ROUTE.MATCH.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.MATCH.GET_BY_ID],
    },
    cache: "no-store",
  })
  return res
}

export { getMatchById }
