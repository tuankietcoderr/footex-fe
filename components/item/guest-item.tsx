import React from "react"
import ServerImage from "../server-image"
import IGuest from "@/interface/IGuest"
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { toAddress } from "@/lib/converter"
import { Button } from "../ui/button"
import Link from "next/link"
import ROUTE from "@/constants/route"

const GuestItem = (guest: IGuest) => {
  const { avatar, email, phoneNumber, name, _id } = guest
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="">
        <ServerImage
          src={avatar ?? ""}
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
            <CardDescription className="flex-1">{toAddress({ ...guest })}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Phone size={16} />
            <CardDescription>{phoneNumber}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Mail size={16} />
            <CardDescription>{email}</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant={"link"} className="transition-transform sm:hover:scale-105" asChild>
            <Link href={ROUTE.HO_SO.ID.replace(":id", _id || "")}>
              Chi tiết <ArrowRight size={20} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default GuestItem
