"use client"

import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"
import Tabs from "./tabs"
import { TabItem } from "../_types/tab"
import { EInvitementStatus } from "@/interface/IInvitement"

const Sidebar = () => {
  const { id } = useParams<{
    id: string
  }>()
  const tabs: TabItem[] = [
    {
      href: ROUTE.DOI_BONG.MANAGE.JOINED,
      label: "Đội bóng đã tham gia",
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.INDEX,
      label: "Đội bóng đã tạo",
      childs: {
        canShow: !!id,
        items: [
          {
            href: ROUTE.DOI_BONG.MANAGE.CREATED.EDIT.replace(":id", id),
            label: "Thông tin chung",
          },
          {
            href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INDEX.replace(":id", id),
            label: "Quản lý thành viên",
            childs: {
              canShow: !!id,
              items: [
                {
                  href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INVITE.replace(":id", id),
                  label: "Mời thành viên",
                },
                {
                  href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.REQUEST.replace(":id", id),
                  label: "Yêu cầu tham gia",
                },
              ],
            },
          },
          {
            href: ROUTE.DOI_BONG.MANAGE.CREATED.DELETE.replace(":id", id),
            label: "Xóa đội bóng",
            className: "text-destructive hover:bg-destructive hover:text-white",
          },
        ],
      },
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.INVITEMENTS,
      label: "Lời mời",
    },
  ]

  return (
    <div className="flex flex-col space-y-2">
      <Tabs items={tabs} />
    </div>
  )
}

export default Sidebar
