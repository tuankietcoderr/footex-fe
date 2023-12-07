import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"

const getAllFields = async () => {
  try {
    const guest = await apiInstance.get(API_ROUTE.FIELD.INDEX)
    return guest.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { getAllFields }
