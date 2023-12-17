import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import { toAddress } from "@/lib/converter"
import { Mail, MapPin, Phone } from "lucide-react"

import IGuest from "@/interface/IGuest"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"

const GuestMainInfo = async (guest: IGuest) => {
  const { _id, name, email, phoneNumber, avatar, ...rest } = guest
  const {
    session: { guest: currentGuest },
  } = await getSession()
  return (
    <div className="grid grid-cols-[18rem_auto] space-x-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={avatar || ""}
          alt={name}
          width={400}
          height={400}
          className="max-h-[14rem] w-full object-cover p-2"
        />
      </div>
      <div className="flex justify-between space-x-2 rounded-md border p-4 shadow-sm">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold">{name}</h1>
          <div className="space-y-1">
            <div className="flex space-x-2">
              <MapPin size={16} />
              <CardDescription className="flex-1">{toAddress({ ...rest })}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Phone size={16} />
              <CardDescription>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Mail size={16} />
              <CardDescription>
                <a href={`mailto:${email}`}>{email}</a>
              </CardDescription>
            </div>
          </div>
        </div>
        {currentGuest?._id === _id && (
          <div className="self-end">
            <Button variant={"outline"} asChild>
              <Link href={ROUTE.HO_SO.EDIT.replace(":id", _id || "")} scroll={false} replace>
                Chỉnh sửa hồ sơ
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestMainInfo
