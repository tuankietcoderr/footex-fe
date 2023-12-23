import IGuest from "@/interface/IGuest"
import React from "react"
import { Button } from "@/components/ui/button"
import TeamMemberItem from "@/components/item/team-member-item"
import TeamMemberActions from "./team-member-actions"

type Props = {
  members: IGuest[]
}

const TeamMembers = ({ members }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Thành viên</h3>
      {members.length > 0 ? (
        <div className="space-y-2">
          {members.map((member) => (
            <TeamMemberItem
              member={member}
              key={member._id}
              actions={<TeamMemberActions memberId={member?._id!} />}
            />
          ))}
        </div>
      ) : (
        <p>Không có thành viên nào</p>
      )}
    </div>
  )
}

export default TeamMembers
