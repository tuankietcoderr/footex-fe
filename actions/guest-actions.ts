"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IGuest from "@/interface/IGuest"
import CACHE_TAGS from "@/utils/cache-tag"

const getGuestById = async (id: string) => {
  const data = await FETCH<IGuest>(API_ROUTE.GUEST.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.GUEST.GET_BY_ID],
    },
  })
  return data
}

const searchGuestByEmailOrPhoneNumber = async (emailOrPhoneNumber: string) => {
  const data = await FETCH_WITH_TOKEN<IGuest>(
    API_ROUTE.GUEST.SEARCH_BY_EMAIL_OR_PHONE_NUMBER.replace(
      ":emailOrPhoneNumber",
      emailOrPhoneNumber
    )
  )
  return data
}

export { getGuestById, searchGuestByEmailOrPhoneNumber }
