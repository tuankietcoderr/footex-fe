import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import ITournament from "@/interface/ITournament"
import { getSession } from "@/services/auth/cookie-session"
import Link from "next/link"
import React from "react"

type Props = {
  tournamentId: string
}

const TournamentActions = async ({ tournamentId }: Props) => {
  const { isLogin } = await getSession()
  if (!isLogin) return null
  return (
    <Button className="flex-1" asChild>
      <Link href={ROUTE.GIAI_DAU.JOIN.replace(":id", tournamentId)}>Tham gia</Link>
    </Button>
  )
}

export default TournamentActions
