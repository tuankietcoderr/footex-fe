"use client"
import { joinTournament } from "@/actions/tournament-actions"
import AppAvatar from "@/components/app-avatar"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ROUTE from "@/constants/route"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  tournamentId: string
  teams: ITeam[]
}

const JoinButton = ({ tournamentId, teams }: Props) => {
  const [teamId, setTeamId] = useState<string | null>(null)
  const router = useRouter()
  // const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  // const selectedTeam = teams.find((team) => team._id === teamId)

  // const headers = ["STT", "Thành viên", "Chọn để tham gia"]
  // const columns: ColumnProps<IGuest>[] = [
  //   {
  //     headRef: "STT",
  //     render: (row, index) => index + 1,
  //   },
  //   {
  //     headRef: "Thành viên",
  //     render: (row) => (
  //       <Link
  //         href={ROUTE.HO_SO.ID.replace(":id", row?._id!)}
  //         className="flex items-center justify-center gap-2"
  //       >
  //         <AppAvatar src={row?.avatar!} alt={row.name} className="h-6 w-6" />
  //         <p>{row.name}</p>
  //       </Link>
  //     ),
  //   },
  //   {
  //     headRef: "Chọn để tham gia",
  //     render: (row) => (
  //       <Checkbox
  //         onCheckedChange={(v) => {
  //           if (v) {
  //             setSelectedMembers((prev) => [...prev, row?._id!])
  //           } else {
  //             setSelectedMembers((prev) => prev.filter((memberId) => memberId !== row?._id!))
  //           }
  //         }}
  //       />
  //     ),
  //   },
  // ]

  const onClickJoin = async () => {
    if (!teamId) {
      return toast.error("Vui lòng chọn đội để tham gia!")
    }

    // if (selectedMembers.length === 0) {
    //   return toast.error("Vui lòng chọn thành viên để tham gia!")
    // }

    toast.loading("Đang xử lý", {
      duration: Infinity,
    })
    const { success, message } = await joinTournament(tournamentId, teamId!)
    toast.dismiss()
    if (success) {
      toast.success(message)
      router.back()
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-4">
        <Select onValueChange={setTeamId}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn đội để tham gia" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem value={team?._id!} key={team._id}>
                <div className="flex items-center gap-2">
                  <AppAvatar src={team.logo} alt={team.name} className="h-6 w-6" />
                  <p>{team.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* {selectedTeam && (
          <Table
            headers={headers}
            columns={columns}
            data={selectedTeam.members as IGuest[]}
            className="border"
          />
        )} */}
      </div>
      <div className="flex gap-2 self-end">
        <Button className="self-end" variant={"ghost"} asChild>
          <Link href={ROUTE.GIAI_DAU.ID.replace(":id", tournamentId)}>Hủy</Link>
        </Button>
        <Button className="self-end" onClick={onClickJoin} disabled={!teamId}>
          Tham gia
        </Button>
      </div>
    </div>
  )
}

export default JoinButton
