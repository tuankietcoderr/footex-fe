import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IBranch, { EFootballShopStatus } from "@/interface/IBranch"

const getAllBranches = async () => {
  try {
    const res = await apiInstance.get(API_ROUTE.BRANCH.INDEX)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getOwnerBranches = async () => {
  try {
    const res = await apiInstance.get(API_ROUTE.BRANCH.OWNER)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getBranchById = async (id: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.BRANCH.ID.replace(":id", id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { getAllBranches, getOwnerBranches, getBranchById }
