import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ROUTE from "@/constants/route"
import ICardFine, { ECard } from "@/interface/ICardFine"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { vilizeCardFine } from "@/utils/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { RectangleVertical } from "lucide-react"
import Link from "next/link"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

type Props = {
  leftTeam: ITeam
  rightTeam: ITeam
  fines: ICardFine[]
  matchId: string
}

const Fines = ({ fines, leftTeam, rightTeam, matchId }: Props) => {
  const [_fines, setFines] = React.useState<ICardFine[]>(fines)

  useEffect(() => {
    setFines(fines)
  }, [fines])

  const teams = [leftTeam, rightTeam]
  const players = teams.flatMap((team) => team.members as IGuest[])

  const headers = ["Thẻ phạt", "Cầu thủ"]
  const columns: ColumnProps<ICardFine>[] = [
    {
      headRef: "Thẻ phạt",
      render: ({ cards, _id }) => (
        <div className="flex flex-wrap justify-center gap-1">
          {cards.map((card, index) => (
            <RectangleVertical
              key={card + index}
              size={30}
              className={
                card === ECard.RED ? "fill-red-400 text-red-400" : "fill-yellow-200 text-yellow-200"
              }
            />
          ))}
        </div>
      ),
    },
    {
      headRef: "Cầu thủ",
      render: (fine) => (
        <Link href={ROUTE.HO_SO.ID.replace(":id", (fine.player as IGuest)?._id!)}>
          {(fine.player as IGuest).name}
        </Link>
      ),
    },
  ]

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const filteredFines = fines.filter((fine) => {
      const scoreBy = (fine.player as IGuest).name
      return scoreBy.includes(value)
    })
    setFines(filteredFines)
  }

  function onChangeCard(value: string) {
    const filteredFines = fines.filter((fine) => fine.cards.includes(value as ECard))
    setFines(filteredFines)
  }

  function onReset() {
    setFines(fines)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm bàn thắng..." onChange={onSearch} />
        <Select onValueChange={onChangeCard}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Loại thẻ" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {Object.values(ECard).map((card) => (
              <SelectItem key={card} value={card}>
                {vilizeCardFine(card)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={onReset}>Đặt lại</Button>
      </div>
      <Table headers={headers} columns={columns} data={_fines} className="border shadow-sm" />
    </div>
  )
}

export default Fines
