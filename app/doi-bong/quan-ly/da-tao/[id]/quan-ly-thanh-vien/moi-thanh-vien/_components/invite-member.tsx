"use client"
import { searchGuestByEmailOrPhoneNumber } from "@/actions/guest-actions"
import { inviteMember } from "@/actions/invitement-actions"
import AppAvatar from "@/components/app-avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import IGuest from "@/interface/IGuest"
import { Search } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  teamId: string
}

const InviteMember = ({ teamId }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null)
  const [searchResult, setSearchResult] = useState<IGuest | null>(null)

  const handleSearch = async () => {
    const search = searchRef.current?.value
    if (!search) return toast.error("Vui lòng nhập email hoặc SĐT")

    toast.loading("Đang tìm kiếm...", {
      duration: Infinity,
    })
    const { message, success, data } = await searchGuestByEmailOrPhoneNumber(search)
    toast.dismiss()
    if (!success) return toast.error(message)
    console.log(data)
    setSearchResult(data as IGuest)
  }

  const invite = async () => {
    if (!searchResult) {
      return toast.error("Không tìm thấy người dùng.")
    }
    const { _id } = searchResult
    toast.loading("Đang mời thành viên", {
      duration: Infinity,
    })
    const { success, message } = await inviteMember({ to: _id, team: teamId })
    toast.dismiss()
    if (success) {
      return toast.success(message)
    }
    return toast.error(message)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Mời thành viên</Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[10rem] translate-x-[-4rem] space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Nhập email hoặc SĐT"
            className="w-full"
            ref={searchRef}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant={"ghost"} className="min-w-fit" onClick={handleSearch}>
            <Search size={16} />
          </Button>
        </div>
        {searchResult && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <AppAvatar
                src={searchResult.avatar || ""}
                alt={searchResult.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-1 flex-col justify-between">
                <span className="font-semibold">{searchResult.name}</span>
                <span className="text-sm text-gray-500">{searchResult.email}</span>
              </div>
            </div>
            <Button variant={"outline"} onClick={invite}>
              Mời
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default InviteMember
