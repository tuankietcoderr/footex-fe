import AppAvatar from "@/components/app-avatar"
import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import IField from "@/interface/IField"
import { toAddress, toDot } from "@/lib/converter"
import { cn } from "@/lib/utils"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import { Circle, CircleDollarSign, MapPin, Users } from "lucide-react"
import Link from "next/link"
import React from "react"
import FieldActions from "./field-actions"
import { getSession } from "@/services/auth/cookie-session"

const FieldMainInfo = async (field: IField) => {
  const {
    session: { guest },
  } = await getSession()
  const { image, price, type, status, name, saves } = field
  const branch = field.branch as IBranch
  const isSaved = (saves as string[])?.includes(guest?._id ?? "")
  return (
    <div className="grid grid-cols-[18rem_auto] gap-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={image || ""}
          alt={name}
          width={600}
          height={800}
          className="max-h-[14rem] w-full object-cover p-2"
        />
      </div>
      <div className="flex flex-col justify-between space-y-2 rounded-md border p-4 shadow-sm">
        <Link
          href={ROUTE.CHI_NHANH.ID.replace(":id", branch?._id || "")}
          className="flex items-center gap-2"
        >
          <AppAvatar
            src={branch?.logo || ""}
            alt={branch.name}
            className="md:h-6 md:w-6 md:text-xs"
          />
          <span className="text-sm text-muted-foreground">{branch.name}</span>
        </Link>
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="space-y-1">
          <div className="flex gap-2">
            <Circle size={16} />
            <span className={cn(colorizeFieldStatus(status!), "text-sm")}>
              {vilizeFieldStatus(status!)}
            </span>
          </div>
          <div className="flex gap-2">
            <Users size={16} />
            <CardDescription>
              Sân <b>{type}</b>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ...branch })}</CardDescription>
          </div>
          <div className="flex gap-2">
            <CircleDollarSign size={16} />
            <CardDescription>
              <span className="font-semibold">{toDot(price ?? 0)}</span> VND/giờ
            </CardDescription>
          </div>
        </div>
        <FieldActions fieldId={field?._id!} isSaved={isSaved} />
      </div>
    </div>
  )
}

export default FieldMainInfo
