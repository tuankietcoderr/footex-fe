import TeamItem from "@/components/item/team-item"
import { Separator } from "@/components/ui/separator"
import ITeam from "@/interface/ITeam"
import React from "react"

type Props = {
  jointTeams: ITeam[]
}

const JointTeams = ({ jointTeams = [] }: Props) => {
  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Đội bóng đã tham gia</h4>
      <Separator />
      <div className="mt-2 grid grid-cols-4 gap-4">
        {jointTeams.length > 0 ? (
          jointTeams.map((team) => <TeamItem {...team} key={team._id} />)
        ) : (
          <p className="col-span-4 mt-2 text-center text-sm text-muted-foreground">
            Không có đội bóng nào
          </p>
        )}
      </div>
    </div>
  )
}

export default JointTeams
