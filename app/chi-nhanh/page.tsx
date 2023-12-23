import { ParamsProps } from "@/utils/params"
import React from "react"
import Sidebar from "./_components/sidebar"
import AllBranches from "./_components/all-branches"

const page = (props: ParamsProps) => {
  return (
    <div className="mx-[5%] mt-4 grid grid-cols-[16rem_auto] gap-4">
      <Sidebar />
      <div>
        <AllBranches {...props} />
      </div>
    </div>
  )
}
export default page
