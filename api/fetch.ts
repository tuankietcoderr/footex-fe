"server-only"

import API_ROUTE from "@/constants/api-route"
import { FetchResponse } from "./response-helper"

const FETCH = async <T extends any>(
  url: string,
  // eslint-disable-next-line no-undef
  options?: RequestInit
): Promise<FetchResponse<T>> => {
  const opts = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
  }
  try {
    const res = await fetch(`${API_ROUTE.BASE_URL}${url}`, opts)
    return {
      ...(await res.json()),
      code: res.status,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.message ?? error?.message,
      code: error?.status,
    } as FetchResponse<T>
  }
}

export default FETCH
