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

const updateEmail = async (email: string) => {
  const res = await FETCH_WITH_TOKEN<IGuest>(API_ROUTE.GUEST.EMAIL, {
    method: "PUT",
    body: JSON.stringify({ email }),
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

const sendVerifyEmail = async (email: string) => {
  const res = await FETCH_WITH_TOKEN<IGuest>(
    API_ROUTE.GUEST.SEND_VERIFY_EMAIL.concat(`?email=${email}`),
    {
      method: "POST",
    }
  )
  return res
}

const loadGuestIfVerified = async () => {
  const res = await FETCH_WITH_TOKEN<IGuest>(API_ROUTE.GUEST.INDEX)
  if (res.success) {
    if (res.data?.isEmailVerified) {
      const currentSession = await getSession()
      await setSession({
        ...currentSession.session,
        guest: res.data!,
      })
    }
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

const forgotPassword = async (email: string) => {
  const res = await FETCH(API_ROUTE.GUEST.FORGOT_PASSWORD, {
    method: "POST",
    params: {
      email,
    },
  })
  return res
}

export {
  changePassword,
  loginGuest,
  logoutGuest,
  registerGuest,
  updateGuest,
  updateEmail,
  sendVerifyEmail,
  loadGuestIfVerified,
  forgotPassword,
}
