import { getFieldById } from "@/actions/field-actions"
import ServerImage from "@/components/server-image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import IField from "@/interface/IField"
import { toDot } from "@/lib/converter"
import { cn } from "@/lib/utils"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import Link from "next/link"
import React from "react"
import NearbyBranchFields from "./nearby-branch-fields"
import BookFieldButton from "./book-field-button"

type Props = {
  id: string
}

const FieldId = async ({ id }: Props) => {
  const { success, data, code, message } = await getFieldById(id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const field = data as IField
  const branch = field.branch as IBranch
  return (
    <div className="mx-[20%] flex flex-col space-y-4">
      <ServerImage src={field.image || ""} alt={field.name} width={800} height={600} />
      <div className="flex items-center justify-between space-x-4">
        <div className="">
          <h1 className="text-4xl font-bold">{field.name}</h1>
          <p className="mt-2 text-red-400">{toDot(field.price)} VND</p>
          <p className={cn("mt-2", colorizeFieldStatus(field.status!))}>
            {vilizeFieldStatus(field.status!)}
          </p>
        </div>
        <BookFieldButton />
      </div>
      <Link
        href={ROUTE.CHI_NHANH.INDEX}
        className="flex items-center space-x-2 rounded-md border border-border p-4 transition-colors hover:bg-gray-50"
      >
        <Avatar>
          <AvatarFallback>{branch.name.substring(0, 2)}</AvatarFallback>
          <AvatarImage src={branch.logo} alt={branch.name} />
        </Avatar>
        <h2 className="font-semibold">{branch.name}</h2>
      </Link>
      <div className="rounded-md border border-border p-4">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{field.description}</p>
      </div>
      <div className="rounded-md border border-border p-4">
        <h4 className="font-semibold">Đánh giá</h4>
        <Separator />
        <p className="mt-2">Chưa có đánh giá nào</p>
      </div>
      <NearbyBranchFields branchId={branch?._id || ""} {...branch} />
    </div>
  )
}

export default FieldId
