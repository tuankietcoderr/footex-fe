import AppAvatar from "@/components/app-avatar"
import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import { toAddress } from "@/lib/converter"
import { AlarmClock, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import BranchActions from "./branch-actions"

const BranchMainInfo = (branch: IBranch) => {
  const { _id, name, closeAt, openAt, logo, phoneNumber } = branch
  return (
    <div className="grid grid-cols-[18rem_auto] gap-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={logo || ""}
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
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ...branch })}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Phone size={16} />
            <CardDescription>{phoneNumber}</CardDescription>
          </div>
          <div className="flex gap-2">
            <AlarmClock size={16} />
            <CardDescription>
              {openAt}h - {closeAt}h
            </CardDescription>
          </div>
        </div>
        <BranchActions {...branch} />
      </div>
    </div>
  )
}

export default BranchMainInfo
