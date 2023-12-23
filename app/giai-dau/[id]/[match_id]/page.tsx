import IMatch from "@/interface/IMatch"
import React from "react"
import MatchInfo from "./_components/match-info"
import { ParamsProps } from "@/utils/params"
import { getMatchById } from "@/actions/match-actions"

const page = async ({ params: { match_id } }: ParamsProps) => {
  const { success, data } = await getMatchById(match_id)
  if (!success) return <div>Không tìm thấy trận đấu</div>
  const match = data as IMatch
  return (
    <div>
      <MatchInfo match={match} />
    </div>
  )
}

export default page
