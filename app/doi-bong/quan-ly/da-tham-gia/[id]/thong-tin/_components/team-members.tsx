import GuestItem from "@/components/item/guest-item"
import IGuest from "@/interface/IGuest"
import React from "react"
import { Button } from "@/components/ui/button"
import TeamMemberItem from "@/components/item/team-member-item"

type Props = {
  members: IGuest[]
}

const TeamMembers = ({ members }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Thành viên</h3>
      <div className="space-y-2">
        {members.map((member) => (
          <TeamMemberItem member={member} key={member._id} />
        ))}
      </div>
    </div>
  )
}

export default TeamMembers
