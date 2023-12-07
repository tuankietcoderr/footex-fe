import { COMMON } from "@/constants/common"
import IGuest from "@/interface/IGuest"
import { getGuest, loginGuest, registerGuest } from "@/services/guest"
import { create } from "zustand"

interface GuestStore {
  guest: IGuest | null | undefined
  setGuest: (guest: IGuest | null) => void
  login: (data: { emailOrPhoneNumber: string; password: string }) => Promise<void>
  logout: () => void
  loadGuest: () => Promise<void>
  registerGuest: (data: IGuest) => Promise<void>
}

const useGuestStore = create<GuestStore>((set) => ({
  guest: undefined,
  setGuest: (guest) => set({ guest }),
  login: async (data) => {
    const guest = await loginGuest(data)
    if (guest.success) {
      set({ guest: guest.data })
      localStorage.setItem(COMMON.ACCESS_TOKEN, guest.accessToken)
    } else {
      set({ guest: null })
      localStorage.removeItem(COMMON.ACCESS_TOKEN)
      return Promise.reject(guest.message)
    }
  },
  logout: () => {
    set({ guest: null })
    localStorage.removeItem(COMMON.ACCESS_TOKEN)
  },
  loadGuest: async () => {
    const guest = await getGuest()
    if (guest.success) {
      set({ guest: guest.data })
    } else {
      set({ guest: null })
      localStorage.removeItem(COMMON.ACCESS_TOKEN)
    }
  },
  registerGuest: async (data) => {
    const newGuest = await registerGuest(data)
    if (newGuest.success) {
      set({ guest: newGuest.data })
      localStorage.setItem(COMMON.ACCESS_TOKEN, newGuest.accessToken)
    } else {
      set({ guest: null })
      return Promise.reject(newGuest.message)
    }
  },
}))

export default useGuestStore
