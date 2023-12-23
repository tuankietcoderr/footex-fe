import { ParamsProps } from "@/utils/params"
import AllTournaments from "./_components/all-tournaments"
import Sidebar from "./_components/sidebar"

const page = ({ searchParams }: ParamsProps) => {
  return (
    <div className="mx-[5%] mt-4 grid grid-cols-[16rem_auto] gap-4">
      <Sidebar />
      <div>
        <AllTournaments searchParams={searchParams} />
      </div>
    </div>
  )
}

export default page
