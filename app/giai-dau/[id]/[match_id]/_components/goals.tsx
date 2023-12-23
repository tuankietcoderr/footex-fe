"use client"
import AppAvatar from "@/components/app-avatar"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ROUTE from "@/constants/route"
import IGoalDetail from "@/interface/IGoalDetail"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import Link from "next/link"
import React, { useEffect } from "react"

type Props = {
  leftTeam: ITeam
  rightTeam: ITeam
  goals: IGoalDetail[]
  matchId: string
}
const Goals = ({ goals, leftTeam, rightTeam, matchId }: Props) => {
  const [_goals, setGoals] = React.useState<IGoalDetail[]>(goals)

  useEffect(() => {
    setGoals(goals)
  }, [goals])

  const teams = [leftTeam, rightTeam]

  const headers = ["Đội", "Phút", "Cầu thủ"]
  const columns: ColumnProps<IGoalDetail>[] = [
    {
      headRef: "Đội",
      render: (goal) => (
        <div className="flex justify-center">
          <AppAvatar src={(goal.team as ITeam).logo} alt={(goal.team as ITeam).name} />
        </div>
      ),
    },
    {
      headRef: "Phút",
      render: (goal) => <div>{goal.scoreAtMinute}</div>,
    },
    {
      headRef: "Cầu thủ",
      render: (goal) => (
        <Link href={ROUTE.HO_SO.ID.replace(":id", (goal.scoreBy as IGuest)?._id!)}>
          {(goal.scoreBy as IGuest).name}
        </Link>
      ),
    },
  ]

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const filteredGoals = goals.filter((goal) => {
      const scoreBy = (goal.scoreBy as IGuest).name
      const team = (goal.team as ITeam).name
      return scoreBy.includes(value) || team.includes(value)
    })
    setGoals(filteredGoals)
  }

  function onChangeTeam(value: string) {
    const filteredGoals = goals.filter((goal) => (goal.team as ITeam)?._id! === value)
    setGoals(filteredGoals)
  }

  function onReset() {
    setGoals(goals)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm bàn thắng..." onChange={onSearch} />
        <Select onValueChange={onChangeTeam}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Đội" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {teams.map((team) => (
              <SelectItem key={team.name} value={team?._id!}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={onReset}>Đặt lại</Button>
      </div>
      <Table headers={headers} columns={columns} data={_goals} className="border shadow-sm" />
    </div>
  )
}

export default Goals
