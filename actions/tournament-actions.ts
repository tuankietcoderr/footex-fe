"use server"

import API_ROUTE from "@/constants/api-route"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import ITournament from "@/interface/ITournament"
import CACHE_TAGS from "@/utils/cache-tag"
import { revalidateTag } from "next/cache"

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

const getHappeningTournaments = async () => {
  const data = await FETCH<ITournament[]>(API_ROUTE.TOURNAMENT.HAPPENING, {
    next: {
      tags: [CACHE_TAGS.TOURNAMENT.GET_HAPPENING],
    },
    cache: "no-store",
  })
  return data
}

const getTournamentById = async (id: string) => {
  const data = await FETCH<ITournament>(API_ROUTE.TOURNAMENT.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.TOURNAMENT.GET_BY_ID],
    },
    cache: "no-store",
  })
  return data
}

const getTournamentMatches = async (id: string) => {}

const joinTournament = async (tournamentId: string, teamId: string) => {
  const res = await FETCH_WITH_TOKEN<ITournament>(
    API_ROUTE.TOURNAMENT.JOIN.replace(":id", tournamentId),
    {
      method: "POSt",
      body: JSON.stringify({ teamId }),
    }
  )
  if (res.success) {
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_ID)
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_CAPTAIN)
    revalidateTag(CACHE_TAGS.TEAM.GET_ALL)
  }
  return res
}

export {
  getAllTournaments,
  getHappeningTournaments,
  getTournamentById,
  joinTournament,
  getTournamentMatches,
}
