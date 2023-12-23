"use client"

import ROUTE from "@/constants/route"
import { useParams, usePathname } from "next/navigation"
import { TabItem } from "../_types/tab"
import Tabs from "./tabs"

const Sidebar = () => {
  const { id } = useParams<{
    id: string
  }>()

  const pathname = usePathname()

  const tabs: TabItem[] = [
    {
      href: ROUTE.DOI_BONG.MANAGE.JOINED.INDEX,
      label: "Đội bóng đã tham gia",
      childs: {
        canShow: !!id && pathname.includes(ROUTE.DOI_BONG.MANAGE.JOINED.INDEX),
        items: [
          {
            label: "Xem thông tin",
            href: ROUTE.DOI_BONG.MANAGE.JOINED.INFO.replace(":id", id),
          },
          {
            label: "Rời đội bóng",
            href: ROUTE.DOI_BONG.MANAGE.JOINED.LEAVE.replace(":id", id),
            className: "text-destructive hover:bg-destructive hover:text-white",
          },
        ],
      },
    },
    {
      href: ROUTE.DOI_BONG.MANAGE.CREATED.INDEX,
      label: "Đội bóng đã tạo",
      childs: {
        canShow: !!id && pathname.includes(ROUTE.DOI_BONG.MANAGE.CREATED.INDEX),
        items: [
          {
            label: "Xem thông tin",
            href: ROUTE.DOI_BONG.MANAGE.CREATED.INFO.replace(":id", id),
          },
          {
            href: ROUTE.DOI_BONG.MANAGE.CREATED.EDIT.replace(":id", id),
            label: "Chỉnh sửa thông tin",
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
