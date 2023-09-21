"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import AfterLoginNav from "./after-login-nav"
import { usePathname } from "next/navigation"
import AccountBadge from "./account-badge"
import { Skeleton } from "../ui/skeleton"
import useUserStore from "@/store/useUserStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Menu } from "lucide-react"
import { OwnerURL } from "@/lib/url"
interface INav {
  title: string
  href: string
}

const NavigationBar = () => {
  const staticNav: INav[] = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Sân bóng",
      href: "/san-bong",
    },
    {
      title: "Giải đấu",
      href: "/giai-dau",
    },
  ]

  const pathname = usePathname()
  const { user } = useUserStore()
  return (
    <div
      className={`sticky top-[-1px] z-[99] flex items-center justify-between bg-white px-4 py-4 shadow-sm md:px-[5%]`}
    >
      <Link href={"/"}>
        <Image src={"/next.svg"} alt={"Next.js"} width={100} height={100} />
      </Link>
      <div className="flex gap-4 md:hidden">
        {user && (
          <div className="block md:hidden">
            <AccountBadge />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[101] -translate-x-4">
            {staticNav.map((nav) => (
              <DropdownMenuItem key={nav.href} asChild>
                <Button asChild variant={"link"}>
                  <Link href={nav.href} className={`${pathname === nav.href ? "underline" : ""}`}>
                    {nav.title}
                  </Link>
                </Button>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button variant={"link"} asChild>
                <Link href={OwnerURL} className="font-bold text-green-500 underline">
                  Dành cho chủ sân bóng
                </Link>
              </Button>
            </DropdownMenuItem>
            {user !== undefined ? (
              <>
                <DropdownMenuItem asChild>
                  <div className="flex w-full flex-col gap-2">
                    <Button asChild size={"sm"} className="w-full rounded-full px-8">
                      <Link href={"/dang-nhap"} className="text-center">
                        Đăng nhập
                      </Link>
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="w-full rounded-full px-8"
                      asChild
                    >
                      <Link href={"/dang-ky"} className="text-center">
                        Đăng ký
                      </Link>
                    </Button>
                  </div>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Skeleton className="h-9 w-20" />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Skeleton className="h-9 w-20" />
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {staticNav.map((nav) => (
          <Button key={nav.href} asChild variant={"link"}>
            <Link
              href={nav.href}
              className={`${pathname === nav.href ? "underline" : ""} text-center font-semibold`}
            >
              {nav.title}
            </Link>
          </Button>
        ))}
      </div>
      <div className={`items-center gap-2 ${user ? "flex-row-reverse" : ""} hidden md:flex`}>
        {user !== undefined ? (
          user === null ? (
            <>
              <Button asChild size={"sm"} className="rounded-full px-8">
                <Link href={"/dang-nhap"} className="text-center font-semibold">
                  Đăng nhập
                </Link>
              </Button>
              <Button variant={"outline"} size={"sm"} className="rounded-full px-8" asChild>
                <Link href={"/dang-ky"} className="text-center font-semibold">
                  Đăng ký
                </Link>
              </Button>
            </>
          ) : (
            <AccountBadge />
          )
        ) : (
          <>
            <Skeleton className="h-9 w-20 rounded-full px-8" />
            <Skeleton className="h-9 w-20 rounded-full px-8" />
          </>
        )}
        <Button variant={"link"} className="hidden md:block" asChild>
          <Link href={OwnerURL} className="text-center font-bold text-green-500 underline">
            Dành cho chủ sân bóng
          </Link>
        </Button>
        {user === undefined && <Skeleton className="h-10 w-10 rounded-full" />}
      </div>
    </div>
  )
}

export default NavigationBar
