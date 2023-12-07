import API_ROUTE from "@/constants/api-route"
import { COMMON } from "@/constants/common"
import axios from "axios"

let apiInstance = axios.create({
  baseURL: API_ROUTE.BASE_URL,
})

apiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(COMMON.ACCESS_TOKEN)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export default apiInstance
