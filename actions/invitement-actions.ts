"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IGuest from "@/interface/IGuest"
import IInvitement, { EInvitementStatus } from "@/interface/IInvitement"
import { deleteSession, setSession } from "@/services/auth/cookie-session"
import CACHE_TAGS from "@/utils/cache-tag"
import { revalidateTag } from "next/cache"

const requestToJoin = async (data: IInvitement) => {
  const res = await FETCH_WITH_TOKEN<IInvitement>(API_ROUTE.INVITEMENT.REQUEST, {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (res.success) {
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_ID)
  }
  return res
}

const cancelRequest = async (id: string) => {
  const res = await FETCH_WITH_TOKEN<IInvitement>(
    API_ROUTE.INVITEMENT.REQUEST_ID.replace(":id", id),
    {
      method: "DELETE",
    }
  )
  if (res.success) {
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_ID)
  }
  return res
}

const getTeamRequests = async (id: string) => {
  const res = await FETCH<IGuest[]>(API_ROUTE.INVITEMENT.TEAM_REQUEST.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.INVITEMENT.GET_TEAM_REQUEST],
    },
    cache: "no-store",
  })
  return res
}

const getTeamInvitements = async (id: string) => {
  const res = await FETCH<IGuest[]>(API_ROUTE.INVITEMENT.TEAM.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.INVITEMENT.GET_BY_TEAM],
    },
    cache: "no-store",
  })
  return res
}

const updateInvitementStatus = async (id: string, status: EInvitementStatus) => {
  const res = await FETCH_WITH_TOKEN<IInvitement>(API_ROUTE.INVITEMENT.STATUS.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.TEAM.GET_BY_CAPTAIN)
    revalidateTag(CACHE_TAGS.INVITEMENT.GET_TEAM_REQUEST)
  }
  return res
}

export { requestToJoin, cancelRequest, getTeamRequests, updateInvitementStatus, getTeamInvitements }
