"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import AccountBadge from "./account-badge"
import { Skeleton } from "../ui/skeleton"
import useGuestStore from "@/store/useGuestStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Menu } from "lucide-react"
import { OwnerURL } from "@/lib/url"
import ROUTE from "@/constants/route"
interface INav {
  title: string
  href: string
}

const NavigationBar = () => {
  const staticNav: INav[] = [
    {
      title: "Trang chủ",
      href: ROUTE.BASE,
    },
    {
      title: "Sân bóng",
      href: ROUTE.SAN_BONG.INDEX,
    },
    {
      title: "Giải đấu",
      href: ROUTE.GIAI_DAU.INDEX,
    },
    {
      title: "Chi nhánh",
      href: ROUTE.CHI_NHANH.INDEX,
    },
  ]

  const pathname = usePathname()
  const { guest } = useGuestStore()

  const isNavActive = (href: string) => {
    if (pathname === "/" && href === "/") return true
    if (pathname.includes(href) && href !== "/") return true
    return false
  }

  return (
    <div
      className={`z-[99] flex items-center justify-between bg-white px-4 py-4 shadow-sm md:px-[5%]`}
    >
      <Link href={"/"}>
        <Image src={"/next.svg"} alt={"Next.js"} width={100} height={100} />
      </Link>
      <div className="flex gap-4 md:hidden">
        {guest && (
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
                  <Link href={nav.href} className={`${isNavActive(nav.href) ? "underline" : ""}`}>
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
            {
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
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {staticNav.map((nav) => (
          <Button key={nav.href} asChild variant={"link"} className="line-clamp-1 w-max">
            <Link
              href={nav.href}
              className={`${
                isNavActive(nav.href) ? "underline" : ""
              } line-clamp-1 text-center font-semibold`}
            >
              {nav.title}
            </Link>
          </Button>
        ))}
      </div>
      <div className={`hidden items-center gap-2 md:flex`}>
        <Button variant={"link"} className="hidden md:block" asChild>
          <Link href={OwnerURL} className="text-center font-bold text-green-500 underline">
            Dành cho chủ sân bóng
          </Link>
        </Button>
        {guest === null ? (
          <Button variant={"outline"} size={"sm"} className="w-max" asChild>
            <Link href={"/dang-ky"} className="line-clamp-1 text-center">
              Đăng ký
            </Link>
          </Button>
        ) : (
          <AccountBadge />
        )}
      </div>
    </div>
  )
}

export default NavigationBar
