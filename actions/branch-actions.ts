"use server"

import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IBranch from "@/interface/IBranch"
import IField from "@/interface/IField"
import ITournament from "@/interface/ITournament"
import CACHE_TAGS from "@/utils/cache-tag"

const getAllBranches = async (queries?: any) => {
  const urlWithQueries = API_ROUTE.BRANCH.INDEX + "?" + new URLSearchParams(queries).toString()
  const data = await FETCH<IBranch[]>(urlWithQueries, {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_ALL],
    },
    cache: "no-store",
  })
  return data
}

const getBranchById = async (id: string) => {
  const data = await FETCH<IBranch>(API_ROUTE.BRANCH.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_BY_ID],
    },
  })
  return data
}

const getBranchFields = async (id: string) => {
  const data = await FETCH<IField[]>(API_ROUTE.FIELD.BRANCH.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_FIELD],
    },
  })
  return data
}

const getBranchTournaments = async (id: string) => {
  const data = await FETCH<ITournament[]>(API_ROUTE.TOURNAMENT.BRANCH.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_TOURNAMENT],
    },
  })
  return data
}

export { getAllBranches, getBranchById, getBranchFields, getBranchTournaments }
