"use client"
import IFootballShop from "@/interface/IFootballShop"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type Props = {
  bigField: IFootballShop
}

const SanBongItem = ({ bigField }: Props) => {
  return (
    <div>
      <Avatar className="w-[200px] rounded-none">
        <AvatarImage src={bigField?.images?.[0]} alt={bigField.name} />
        <AvatarFallback className="rounded-none">{bigField.name}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default SanBongItem
