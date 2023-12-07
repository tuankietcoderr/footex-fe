import { EFieldStatus } from "@/interface/IField"

const fieldStatuses = ["all", EFieldStatus.ACTIVE, EFieldStatus.BUSY]
const fieldTypes = [0, 5, 7, 11]
const pricesRanges = [
  [0, 0],
  [0, 100000],
  [100000, 200000],
  [200000, 300000],
  [300000, 400000],
  [400000, 500000],
  [500000, 10000000],
]

export { fieldStatuses, fieldTypes, pricesRanges }
