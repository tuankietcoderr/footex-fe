import { getAllBranches } from "@/actions/branch-actions"
import BranchItem from "@/components/item/branch-item"
import IBranch from "@/interface/IBranch"
import { ParamsProps } from "@/utils/params"

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
    <div className="grid grid-cols-4 gap-4">
      {branches.length > 0 ? (
        branches.map((branch) => <BranchItem key={branch._id} {...branch} />)
      ) : (
        <div className="col-span-4">Không có chi nhánh nào</div>
      )}
    </div>
  )
}

export default AllBranches
