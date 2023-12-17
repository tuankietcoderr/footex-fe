import { getGuestById } from "@/actions/guest-actions"
import IGuest from "@/interface/IGuest"
import { LayoutParamsProps } from "@/utils/params"
import GuestMainInfo from "./_components/guest-main-info"
import { getSession } from "@/services/auth/cookie-session"

const layout = async ({ children, params: { id } }: LayoutParamsProps) => {
  const {
    session: { guest: sessionGuest },
    isLogin,
  } = await getSession()
  let guest = {} as IGuest
  if (isLogin) {
    guest = sessionGuest as IGuest
  } else {
    const { success, data, code, message } = await getGuestById(id)
    if (!success) {
      return (
        <div>
          {code} + {message}
        </div>
      )
    }
    guest = data as IGuest
  }
  return (
    <div className="mx-[5%] my-4 space-y-4">
      <GuestMainInfo {...guest} />
      {children}
    </div>
  )
}

export default layout
