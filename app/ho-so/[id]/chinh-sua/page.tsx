import NoRights from "@/components/not-yours/no-rights"
import { ParamsProps } from "@/utils/params"
import Link from "next/link"
import EditInfoForm from "./_components/edit-info-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import BackButton from "./_components/back-button"
import { Info, Key, Mail } from "lucide-react"
import EditPasswordForm from "./_components/edit-password-form"
import { getSession } from "@/services/auth/cookie-session"
import EditEmailForm from "./_components/edit-email-form"

const page = async ({ params: { id }, searchParams }: ParamsProps) => {
  const {
    isLogin,
    session: { guest },
  } = await getSession()
  if (!isLogin || id !== guest?._id) {
    return <NoRights />
  }

  const tab = searchParams?.tab ?? "info"

  const renderTab = () => {
    switch (tab) {
      case "info":
        return <EditInfoForm {...guest} />
      case "password":
        return <EditPasswordForm />
      case "email":
        return <EditEmailForm email={guest?.email!} isVerified={guest.isEmailVerified} />
    }
  }

  return (
    <div className="flex min-h-[20rem] gap-2 rounded-md border bg-white p-4 shadow-sm">
      <div className="flex w-[20rem] flex-col justify-between space-y-2">
        <div className="flex flex-col space-y-2">
          <Button
            variant={"ghost"}
            asChild
            className={cn("justify-start gap-2", tab === "info" && "bg-gray-100")}
          >
            <Link href={"?tab=info"} replace scroll={false}>
              <Info size={16} />
              Thông tin
            </Link>
          </Button>
          <Button
            variant={"ghost"}
            asChild
            className={cn("justify-start gap-2", tab === "password" && "bg-gray-100")}
          >
            <Link href={"?tab=password"} replace scroll={false}>
              <Key size={16} />
              Mật khẩu
            </Link>
          </Button>
          <Button
            variant={"ghost"}
            asChild
            className={cn("justify-start gap-2", tab === "email" && "bg-gray-100")}
          >
            <Link href={"?tab=email"} replace scroll={false}>
              <Mail size={16} />
              Email
            </Link>
          </Button>
        </div>
        <BackButton />
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="flex-1">{renderTab()}</div>
    </div>
  )
}

export default page
