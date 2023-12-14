import { getAllBranches } from "@/actions/branch-action"
import IBranch from "@/interface/IBranch"
import { ParamsProps } from "@/utils/params"
import BranchItem from "./branch-item"

const AllBranches = async ({ searchParams }: ParamsProps) => {
  const { data, success, code, message } = await getAllBranches(searchParams)
  const branches = data ?? ([] as IBranch[])
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {branches.length > 0 ? (
        branches.map((branch) => <BranchItem key={branch._id} {...branch} />)
      ) : (
        <div>Không có chi nhánh nào</div>
      )}
    </div>
  )
}

export default AllBranches
