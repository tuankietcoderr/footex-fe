import { COMMON } from "@/constants/common"
import ROUTE from "@/constants/route"
import IGuest from "@/interface/IGuest"
import { getSession } from "@/services/auth/cookie-session"
import { ParamsProps } from "@/utils/params"
import { redirect } from "next/navigation"

const page = async () => {
  const {
    isLogin,
    session: { guest },
  } = await getSession()
  if (isLogin) {
    redirect(ROUTE.HO_SO.ID.replace(":id", guest?._id || ""))
  } else {
    redirect(ROUTE.AUTH.SIGN_IN.concat(`?${COMMON.REDIRECT}=${ROUTE.HO_SO.INDEX}`))
  }
}

export default page
