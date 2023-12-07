"use server"

import API_ROUTE from "@/constants/api-route"
import FETCH from "@/api/fetch"
import ITournament from "@/interface/ITournament"
import CACHE_TAGS from "@/utils/cache-tag"

const PATH = API_ROUTE.TOURNAMENT.INDEX

const getAllTournaments = async (queries?: any) => {
  const urlWithQueries = PATH + "?" + new URLSearchParams(queries).toString()
  const data = await FETCH<ITournament[]>(urlWithQueries, {
    next: {
      tags: [CACHE_TAGS.TOURNAMENT.GET_ALL],
    },
    cache: "no-store",
  })
  return data
}

export { getAllTournaments }