"server-only"

import API_ROUTE from "@/constants/api-route"
import { FetchResponse } from "./response-helper"

const FETCH = async <T extends any>(
  url: string,
  // eslint-disable-next-line no-undef
  options?: RequestInit
): Promise<FetchResponse<T>> => {
  try {
    const res = await fetch(`${API_ROUTE.BASE_URL}${url}`, {
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(options?.body),
      ...options,
    })
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
