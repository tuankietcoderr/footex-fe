import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import ROUTE from "@/constants/route"
import ITeam from "@/interface/ITeam"
import { Dot, Gamepad, Loader, MoreHorizontal, Users } from "lucide-react"
import Link from "next/link"
import React from "react"

const ManageTeamItem = (team: ITeam) => {
  const { logo, name, members, jointTournaments, joinRequests } = team

  const actions = [
    {
      label: "Chỉnh sửa",
      href: ROUTE.DOI_BONG.MANAGE.CREATED.EDIT.replace(":id", team._id || ""),
    },
    {
      label: "Quản lý thành viên",
      href: ROUTE.DOI_BONG.MANAGE.CREATED.MEMBER.INDEX.replace(":id", team._id || ""),
    },
  ]

  return (
    <div className="flex min-h-[10rem] space-x-2 rounded-md border shadow-sm">
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
        <div className="flex space-x-2">
          <Users size={16} />
          <CardDescription>
            <span className="font-semibold">{members?.length || 0}</span> thành viên
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Gamepad size={16} />
          <CardDescription>
            <span className="font-semibold">{jointTournaments?.length || 0}</span> giải đấu đã tham
            gia
          </CardDescription>
        </div>
        <div className="flex space-x-2">
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
              {actions.map(({ label, href }) => (
                <Button variant={"ghost"} className="justify-start" size={"sm"} key={href} asChild>
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
              <Separator />
              <Button
                variant={"ghost"}
                className="justify-start text-destructive"
                size={"sm"}
                asChild
              >
                <Link href={ROUTE.DOI_BONG.MANAGE.CREATED.DELETE.replace(":id", team._id || "")}>
                  Xóa
                </Link>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default ManageTeamItem
