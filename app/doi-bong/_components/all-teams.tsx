import { getAllTeams } from "@/actions/team-actions"
import TeamItem from "@/components/item/team-item"
import ITeam from "@/interface/ITeam"
import { ParamsProps } from "@/utils/params"

const AllTeams = async ({ searchParams }: ParamsProps) => {
  const { data, success, code, message } = await getAllTeams(searchParams)
  const teams = data ?? ([] as ITeam[])
  console.log({ teams })
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {teams.length > 0 ? (
        teams.map((team) => <TeamItem key={team._id} {...team} />)
      ) : (
        <div>Không có đội bóng nào</div>
      )}
    </div>
  )
}

export default AllTeams
