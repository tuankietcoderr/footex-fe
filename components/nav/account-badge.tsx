"use server"
import IGuest from "@/interface/IGuest"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import LogoutButton from "./logout"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"
import AppAvatar from "../app-avatar"

const AccountBadge = async () => {
  const {
    isLogin,
    session: { guest },
  } = await getSession()

  if (!isLogin) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AppAvatar src={guest?.avatar!} alt={guest?.name!} className="h-8 w-8 md:h-10 md:w-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[101] -translate-x-8">
        <DropdownMenuLabel>{guest?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTE.HO_SO.ID.replace(":id", guest?._id || "")}>Hồ sơ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ROUTE.DOI_BONG.MANAGE.JOINED.INDEX}>Đội bóng của tôi</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountBadge
