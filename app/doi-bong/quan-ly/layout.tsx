import NoRights from "@/components/not-yours/no-rights"
import { Separator } from "@/components/ui/separator"
import { getSession } from "@/services/auth/cookie-session"
import { PropsWithChildren } from "react"
import Sidebar from "./_components/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ROUTE from "@/constants/route"

const layout = async ({ children }: PropsWithChildren) => {
  const { isLogin } = await getSession()
  if (!isLogin) {
    return <NoRights />
  }
  return (
    <div className="flex min-h-[80vh] gap-4 rounded-md border bg-white p-4 shadow-sm">
      <div className="flex w-[16rem] flex-col justify-between space-y-2">
        <Sidebar />
        <Button asChild>
          <Link href={ROUTE.DOI_BONG.MANAGE.CREATE}>Tạo đội bóng</Link>
        </Button>
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default layout
