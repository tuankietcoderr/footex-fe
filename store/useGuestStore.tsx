import IGuest from "@/interface/IGuest"
import { create } from "zustand"

interface GuestStore {
  guest: IGuest | null | undefined
  setGuest: (guest: IGuest | null) => void
}

const useGuestStore = create<GuestStore>((set) => ({
  guest: undefined,
  setGuest: (guest) => set({ guest }),
}))

export default useGuestStore
