"use server"

import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IGuest from "@/interface/IGuest"
import CACHE_TAGS from "@/utils/cache-tag"

const getGuestById = async (id: string) => {
  const data = await FETCH<IGuest>(API_ROUTE.GUEST.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.GUEST.GET_BY_ID],
    },
    cache: "force-cache",
  })
  return data
}

export { getGuestById }
