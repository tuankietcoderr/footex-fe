import AllFields from "@/app/san-bong/_components/all-fields"
import React, { Suspense } from "react"
import Sidebar from "./_components/sidebar"

const page = (props: any) => {
  return (
    <div className="mx-[5%] mt-4 grid grid-cols-[16rem_auto] space-x-4">
      <Sidebar />
      <div>
        <AllFields searchParams={props.searchParams} />
      </div>
    </div>
  )
}

export default page
