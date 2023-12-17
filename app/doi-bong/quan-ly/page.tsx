import ROUTE from "@/constants/route"
import { redirect } from "next/navigation"

const page = () => {
  redirect(ROUTE.DOI_BONG.MANAGE.JOINED)
}

export default page
