import React, { Fragment } from "react"
import { promises as fs } from "fs"
import { marked } from "marked"
import { Button } from "@/components/ui/button"
import ConfirmDelete from "./_components/confirm-delete"

const page = async () => {
  const content = await fs.readFile(process.cwd() + "/public/md/delete-team.md", "utf-8")
  const renderContent = await marked.parse(content)
  return (
    <div className="flex h-full flex-col">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderContent }} />
      <ConfirmDelete />
    </div>
  )
}

export default page
