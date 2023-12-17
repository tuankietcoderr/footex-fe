"use client"
import ROUTE from "@/constants/route"
import { usePathname } from "next/navigation"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"

interface INav {
  title: string
  href: string
}

const NavItem = () => {
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
    {
      title: "Đội bóng",
      href: ROUTE.DOI_BONG.INDEX,
    },
  ]

  const pathname = usePathname()

  const isNavActive = (href: string) => {
    if (pathname === "/" && href === "/") return true
    if (pathname.includes(href) && href !== "/") return true
    return false
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
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
  )
}

export default NavItem
