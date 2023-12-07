import BlurElement from "@/components/blur-element"
import RatingStar from "@/components/rating-star"
import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import IField from "@/interface/IField"
import { toDot } from "@/lib/converter"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const FieldItem = ({ name, _id, description, status, price, type, image }: IField) => {
  return (
    <BlurElement visible={_id === undefined}>
      <div className="min-w-[300px] rounded-lg border border-border shadow-sm">
        <div className="">
          <ServerImage
            src={image ?? ""}
            width={400}
            height={400}
            alt={name}
            className="w-full rounded-t-md object-cover"
          />
        </div>
        <div>
          <Card className="border-none shadow-none">
            <CardHeader>
              <RatingStar rating={2} />
            </CardHeader>
            <CardContent>
              {name && <p className="text-xl font-semibold">{name}</p>}
              <span className={colorizeFieldStatus(status!)}>{vilizeFieldStatus(status!)}</span>
              <CardDescription>
                Sân <b>{type}</b>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <CardDescription className="font-semibold text-red-400">
                {toDot(price ?? 0)}VND/giờ
              </CardDescription>
              <Button variant={"link"} className="transition-transform sm:hover:scale-105" asChild>
                <Link href={ROUTE.SAN_BONG.ID.replace(":id", _id || "")}>
                  Chi tiết <ArrowRight size={20} />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </BlurElement>
  )
}

export default FieldItem
