import React from "react"
import Sidebar from "./_components/sidebar"
import AllTeams from "./_components/all-teams"
import { ParamsProps } from "@/utils/params"

const page = (props: ParamsProps) => {
  return (
    <div className="grid grid-cols-[16rem_auto] gap-4">
      <Sidebar />
      <div>
        <AllTeams {...props} />
      </div>
    </div>
  )
}

export default page
