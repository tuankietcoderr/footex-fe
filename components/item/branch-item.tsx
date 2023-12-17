import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import { toAddress } from "@/lib/converter"
import { AlarmClock, ArrowRight, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const BranchItem = (branch: IBranch) => {
  const { name, _id, logo, phoneNumber, openAt, closeAt } = branch
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="">
        <ServerImage
          src={logo ?? ""}
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
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ...branch })}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Phone size={16} />
            <CardDescription>{phoneNumber}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <AlarmClock size={16} />
            <CardDescription>
              {openAt}h - {closeAt}h
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant={"link"} className="transition-transform sm:hover:scale-105" asChild>
            <Link href={ROUTE.CHI_NHANH.ID.replace(":id", _id || "")}>
              Chi tiết <ArrowRight size={20} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BranchItem
