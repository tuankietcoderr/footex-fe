import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import ROUTE from "@/constants/route"
import ITeam from "@/interface/ITeam"
import { cn } from "@/lib/utils"
import { Dot, Gamepad, Loader, MoreHorizontal, Users } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
  team: ITeam
  isCaptain?: boolean
}

const ManageTeamItem = ({ team, isCaptain = true }: Props) => {
  const { logo, name, members, jointTournaments, joinRequests } = team

  const actions = isCaptain
    ? [
        {
          label: "Xem thông tin",
          href: ROUTE.DOI_BONG.MANAGE.CREATED.INFO.replace(":id", team._id || ""),
        },
        {
          label: "Chỉnh sửa",
          href: ROUTE.DOI_BONG.MANAGE.CREATED.EDIT.replace(":id", team._id || ""),
        },
        {
          label: "Quản lý thành viên",
          href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INDEX.replace(":id", team._id || ""),
        },
        {
          label: "Xóa",
          href: ROUTE.DOI_BONG.MANAGE.CREATED.DELETE.replace(":id", team._id || ""),
          isDanger: true,
        },
      ]
    : [
        {
          label: "Xem thông tin",
          href: ROUTE.DOI_BONG.MANAGE.JOINED.INFO.replace(":id", team._id || ""),
        },
        {
          label: "Rời đội bóng",
          href: ROUTE.DOI_BONG.MANAGE.JOINED.LEAVE.replace(":id", team._id || ""),
          isDanger: true,
        },
      ]

  return (
    <div className="flex min-h-[10rem] gap-2 rounded-md border shadow-sm">
      <div className="grid w-[10rem] place-items-center">
        <ServerImage
          src={logo}
          alt={name}
          width={200}
          height={200}
          className="w-full object-cover p-2"
        />
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="flex flex-1 flex-col justify-between p-2">
        <p className="text-xl font-semibold">{name}</p>
        <div className="flex gap-2">
          <Users size={16} />
          <CardDescription>
            <span className="font-semibold">{members?.length || 0}</span> thành viên
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Gamepad size={16} />
          <CardDescription>
            <span className="font-semibold">{jointTournaments?.length || 0}</span> giải đấu đã tham
            gia
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Loader size={16} />
          <CardDescription>
            <span className="font-semibold">{joinRequests?.length || 0}</span> yêu cầu tham gia đang
            chờ
          </CardDescription>
        </div>
        <div className="flex justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <MoreHorizontal size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-max translate-x-[-4rem] flex-col space-y-1">
              {actions.map(({ label, href, isDanger }) => (
                <Button
                  variant={"ghost"}
                  className={cn("justify-start", isDanger && "text-destructive")}
                  size={"sm"}
                  key={href}
                  asChild
                >
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default ManageTeamItem
