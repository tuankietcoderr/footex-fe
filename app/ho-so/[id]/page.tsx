import { getGuestJointTeams } from "@/actions/team-actions"
import TeamItem from "@/components/item/team-item"
import ITeam from "@/interface/ITeam"
import { ParamsProps } from "@/utils/params"
import React from "react"
import JointTeams from "./_components/joint-teams"
import { getBookedFields, getSavedFields } from "@/actions/field-actions"
import SavedFields from "./_components/saved-fields"
import IField from "@/interface/IField"
import BookedFields from "./_components/booked-fields"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success: jointSuccess, data: teams } = await getGuestJointTeams(id)
  const { success: savedSuccess, data: savedFields } = await getSavedFields(id)
  const { success: bookedSuccess, data: bookedFields } = await getBookedFields(id)
  return (
    <div className="space-y-4">
      {jointSuccess && <JointTeams jointTeams={teams as ITeam[]} />}
      {savedSuccess && <SavedFields savedFields={savedFields as IField[]} />}
      {bookedSuccess && <BookedFields bookedFields={bookedFields as IField[]} />}
    </div>
  )
}

export default page
