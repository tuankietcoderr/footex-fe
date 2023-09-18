import React from "react"

const page = ({ params }: { params: { id: string } }) => {
  return <div>Sân {params.id}</div>
}

export default page
