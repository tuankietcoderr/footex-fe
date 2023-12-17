import { getBranchById } from "@/actions/branch-actions"
import Rating from "@/components/rating"
import { Separator } from "@/components/ui/separator"
import IBranch from "@/interface/IBranch"
import { ERate } from "@/interface/IRate"
import { ParamsProps } from "@/utils/params"
import { PropsWithChildren } from "react"
import BranchMainInfo from "./_components/branch-main-info"
import BranchFields from "./_components/branch-fields"
import BranchTournaments from "./_components/branch-tournaments"

type Props = ParamsProps & PropsWithChildren

const layout = async ({ children, params: { id } }: Props) => {
  const { success, data, code, message } = await getBranchById(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const branch = data as IBranch
  return (
    <div className="mx-[5%] my-4 space-y-4">
      <BranchMainInfo {...branch} />
      {children}
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{branch.description}</p>
      </div>
      <BranchFields branchId={id} />
      <BranchTournaments branchId={id} />
      <Rating objectId={id} objectType={ERate.BRANCH} />
    </div>
  )
}

export default layout
