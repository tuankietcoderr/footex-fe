import { create } from "zustand"
import IBranch from "@/interface/IBranch"
import { getAllBranches, getBranchById } from "@/services/branch"

interface BranchStore {
  branches: IBranch[] | null | undefined
  branch: IBranch | null | undefined
  setBranches: (branches: IBranch[]) => void
  loadBranches: () => Promise<void>
  loadBranch: (id: string) => Promise<void>
}

const useBranchStore = create<BranchStore>((set, get) => ({
  branches: undefined,
  branch: undefined,
  setBranches: (branches) => set({ branches }),
  loadBranches: async () => {
    const res = await getAllBranches()
    if (res.success) {
      set({ branches: res.data })
    } else {
      set({ branches: null })
      Promise.reject(res.message)
    }
  },
  loadBranch: async (id) => {
    const res = await getBranchById(id)
    if (res.success) {
      set({ branch: res.data })
    } else {
      set({ branch: null })
      Promise.reject(res.message)
    }
  },
}))

export default useBranchStore
