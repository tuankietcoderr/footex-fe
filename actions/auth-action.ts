"use server"
import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import { COMMON } from "@/constants/common"
import IGuest from "@/interface/IGuest"
import { cookies } from "next/headers"

const loginGuest = async (data: { emailOrPhoneNumber: string; password: string }) => {
  const res = await FETCH<IGuest>(API_ROUTE.GUEST.SIGN_IN, {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { success } = res
  if (success) {
    cookies().set(COMMON.ACCESS_TOKEN, res.accessToken || "")
  }
  return res
}

const registerGuest = async (data: IGuest) => {
  const res = await FETCH<IGuest>(API_ROUTE.GUEST.SIGN_UP, {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { success } = res
  if (success) {
    cookies().set(COMMON.ACCESS_TOKEN, res.accessToken || "")
  }
  return res
}

const loadGuest = async () => {
  const res = await FETCH<IGuest>(API_ROUTE.GUEST.INDEX, {
    headers: {
      Authorization: `Bearer ${cookies().get(COMMON.ACCESS_TOKEN)?.value}`,
    },
  })
  return res
}

const logoutGuest = async () => {
  cookies().delete(COMMON.ACCESS_TOKEN)
}

export { loginGuest, registerGuest, loadGuest, logoutGuest }
