import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import IField from "@/interface/IField"
import { toAddress, toDot } from "@/lib/converter"
import { cn } from "@/lib/utils"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import { ArrowRight, Circle, CircleDollarSign, MapPin, Users } from "lucide-react"
import Link from "next/link"

const FieldItem = ({ name, _id, description, status, price, type, image, branch }: IField) => {
  const _branch = (branch ?? {}) as IBranch
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="">
        <ServerImage
          src={image ?? ""}
          width={400}
          height={400}
          alt={name}
          className="w-full rounded-t-md object-cover p-2"
        />
      </div>
      <Card className="flex flex-1 flex-col justify-between border-none shadow-none">
        <CardContent className="flex flex-1 flex-col gap-2">
          {name && <p className="text-xl font-semibold">{name}</p>}
          <div className="flex space-x-2">
            <Circle size={16} />
            <span className={cn(colorizeFieldStatus(status!), "text-sm")}>
              {vilizeFieldStatus(status!)}
            </span>
          </div>
          <div className="flex space-x-2">
            <Users size={16} />
            <CardDescription>
              Sân <b>{type}</b>
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ..._branch })}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <CircleDollarSign size={16} />
            <CardDescription>
              <span className="font-semibold">{toDot(price ?? 0)}</span> VND/giờ
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant={"link"} className="transition-transform sm:hover:scale-105" asChild>
            <Link href={ROUTE.SAN_BONG.ID.replace(":id", _id || "")}>
              Chi tiết <ArrowRight size={20} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FieldItem
