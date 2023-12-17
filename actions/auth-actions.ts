"use server"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IGuest from "@/interface/IGuest"
import { deleteSession, getSession, setSession } from "@/services/auth/cookie-session"

const loginGuest = async (data: { emailOrPhoneNumber: string; password: string }) => {
  const res = await FETCH<IGuest>(API_ROUTE.GUEST.SIGN_IN, {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { success, data: guest } = res
  if (success) {
    await setSession({
      guest: guest!,
      accessToken: res?.accessToken!,
    })
  }
  return res
}

const registerGuest = async (data: IGuest) => {
  const res = await FETCH<IGuest>(API_ROUTE.GUEST.SIGN_UP, {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { success, data: guest } = res
  if (success) {
    await setSession({
      guest: guest!,
      accessToken: res?.accessToken!,
    })
  }
  return res
}

const updateGuest = async (data: IGuest) => {
  const res = await FETCH_WITH_TOKEN<IGuest>(API_ROUTE.GUEST.INDEX, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  if (res.success) {
    const currentSession = await getSession()
    await setSession({
      ...currentSession.session,
      guest: res.data!,
    })
  }
  return res
}

const logoutGuest = async () => {
  deleteSession()
}

const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  const res = await FETCH_WITH_TOKEN(API_ROUTE.GUEST.CHANGE_PASSWORD, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return res
}

export { changePassword, loginGuest, logoutGuest, registerGuest, updateGuest }
