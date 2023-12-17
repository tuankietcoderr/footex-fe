import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import ITeam from "@/interface/ITeam"
import { getSession } from "@/services/auth/cookie-session"
import { Flag } from "lucide-react"
import Link from "next/link"
import React from "react"
import JoinButton from "./join-button"
import IInvitement from "@/interface/IInvitement"
import CancelButton from "./cancel-button"
import IGuest from "@/interface/IGuest"

const TeamActions = async (team: ITeam) => {
  const {
    isLogin,
    session: { guest },
  } = await getSession()
  if (!isLogin) return null
  const { _id: teamId, joinRequests, captain, members } = team
  const _joinRequests = joinRequests as IInvitement[]
  const request = _joinRequests?.find(({ from }) => from === guest?._id)
  const _captain = captain as IGuest
  const _members = members as IGuest[]
  const isGuestTeam = _captain?._id === guest?._id
  const isMember = _members?.some(({ _id }) => _id === guest?._id)
  return (
    !isGuestTeam && (
      <div className="flex space-x-2">
        <JoinButton isRequested={!!request} teamId={teamId!} isMember={isMember} />
        {!!request && <CancelButton requestId={request?._id!} />}
        <Button variant={"ghost"} asChild>
          <Link href={ROUTE.DOI_BONG.REPORT.replace(":id", teamId!)}>
            <Flag size={16} />
          </Link>
        </Button>
      </div>
    )
  )
}

export default TeamActions
