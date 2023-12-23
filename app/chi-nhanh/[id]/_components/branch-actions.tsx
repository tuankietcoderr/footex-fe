import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import { getSession } from "@/services/auth/cookie-session"
import { Flag } from "lucide-react"
import Link from "next/link"
import React from "react"

const BranchActions = async (branch: IBranch) => {
  const { isLogin } = await getSession()
  if (!isLogin) return null
  const branchId = branch?._id || ""
  return (
    <div className="flex gap-2">
      <Button className="flex-1" asChild>
        <a href={`tel:${branch.phoneNumber}`}>Liên hệ</a>
      </Button>
      <Button variant={"ghost"} asChild>
        <Link href={ROUTE.CHI_NHANH.REPORT.replace(":id", branchId)}>
          <Flag size={16} />
        </Link>
      </Button>
    </div>
  )
}

export default BranchActions
