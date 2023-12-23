"use server"

import API_ROUTE from "@/constants/api-route"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import ITeam from "@/interface/ITeam"
import CACHE_TAGS from "@/utils/cache-tag"
import { revalidateTag } from "next/cache"

const getAllTeams = async (queries?: any) => {
  const urlWithQueries = API_ROUTE.TEAM.INDEX + "?" + new URLSearchParams(queries).toString()
  const res = await FETCH<ITeam[]>(urlWithQueries, {
    next: {
      tags: [CACHE_TAGS.TEAM.GET_ALL],
    },
    cache: "no-store",
  })
  return res
}

const getGuestJointTeams = async (id: string) => {
  const res = await FETCH<ITeam[]>(API_ROUTE.TEAM.GUEST.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.TEAM.GET_GUEST_JOINT],
    },
    cache: "no-store",
  })
  return res
}

const getCaptainTeams = async () => {
  const res = await FETCH_WITH_TOKEN<ITeam[]>(API_ROUTE.TEAM.CAPTAIN, {
    next: {
      tags: [CACHE_TAGS.TEAM.GET_BY_CAPTAIN],
    },
  })
  return res
}

const getTeamById = async (id: string) => {
  const res = await FETCH<ITeam>(API_ROUTE.TEAM.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.TEAM.GET_BY_ID],
    },
    cache: "no-store",
  })
  return res
}

const createTeam = async (data: ITeam) => {
  const res = await FETCH_WITH_TOKEN<ITeam>(API_ROUTE.TEAM.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_CAPTAIN)
  }
  return res
}

const updateTeam = async (id: string, data: ITeam) => {
  const res = await FETCH_WITH_TOKEN<ITeam>(API_ROUTE.TEAM.ID.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return res
}

const kickMember = async (id: string, memberId: string) => {
  const res = await FETCH_WITH_TOKEN<ITeam>(API_ROUTE.TEAM.KICK.replace(":id", id), {
    method: "DELETE",
    body: JSON.stringify({
      member: memberId,
    }),
  })

  if (res.success) {
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_ID)
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_CAPTAIN)
    revalidateTag(CACHE_TAGS.TEAM.GET_GUEST_JOINT)
  }

  return res
}

export {
  getAllTeams,
  getGuestJointTeams,
  getTeamById,
  getCaptainTeams,
  createTeam,
  updateTeam,
  kickMember,
}
