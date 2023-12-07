import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IGuest from "@/interface/IGuest"

const getGuest = async () => {
  try {
    const guest = await apiInstance.get(API_ROUTE.GUEST.INDEX)
    return guest.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const loginGuest = async (data: { emailOrPhoneNumber: string; password: string }) => {
  try {
    const guest = await apiInstance.post(API_ROUTE.GUEST.SIGN_IN, data)
    return guest.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const registerGuest = async (data: IGuest) => {
  try {
    const guest = await apiInstance.post(API_ROUTE.GUEST.SIGN_UP, data)
    return guest.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { getGuest, loginGuest, registerGuest }
