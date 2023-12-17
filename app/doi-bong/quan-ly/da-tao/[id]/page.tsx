import ROUTE from "@/constants/route"
import { ParamsProps } from "@/utils/params"
import { redirect } from "next/navigation"

const page = ({ params: { id } }: ParamsProps) => {
  redirect(ROUTE.DOI_BONG.MANAGE.CREATED.EDIT.replace(":id", id))
}

export default page
