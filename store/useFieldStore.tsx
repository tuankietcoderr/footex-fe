import { create } from "zustand"
import IField from "@/interface/IField"
import { getAllFields } from "@/services/field"

interface FieldStore {
  fields: IField[] | null | undefined
  setFields: (fields: IField[]) => void
  loadFields: () => Promise<void>
}

const useFieldStore = create<FieldStore>((set, get) => ({
  fields: undefined,
  field: undefined,
  setFields: (fields) => set({ fields }),
  loadFields: async () => {
    const res = await getAllFields()
    if (res.success) {
      set({ fields: res.data })
    } else {
      set({ fields: null })
      Promise.reject(res.message)
    }
  },
}))

export default useFieldStore
