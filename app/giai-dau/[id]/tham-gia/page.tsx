import { getCaptainTeams } from "@/actions/team-actions"
import AppAvatar from "@/components/app-avatar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ITeam from "@/interface/ITeam"
import { ParamsProps } from "@/utils/params"
import JoinButton from "./_components/join-button"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getCaptainTeams()
  if (!success) return <p>Error</p>
  const teams = data as ITeam[]
  return (
    <div className="flex flex-1 flex-col space-y-2 rounded-md border p-4 shadow-sm">
      <h4 className="font-semibold">Tham gia giải đấu</h4>
      <JoinButton tournamentId={id} teams={teams} />
    </div>
  )
}

export default page
