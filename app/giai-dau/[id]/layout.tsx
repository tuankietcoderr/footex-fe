import React, { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
  return <div className="mx-[5%] my-4 space-y-4">{children}</div>
}

export default layout
