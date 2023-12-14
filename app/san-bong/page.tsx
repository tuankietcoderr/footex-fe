import AllFields from "@/app/san-bong/_components/all-fields"
import Sidebar from "./_components/sidebar"
import { ParamsProps } from "@/utils/params"

const page = (props: ParamsProps) => {
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
