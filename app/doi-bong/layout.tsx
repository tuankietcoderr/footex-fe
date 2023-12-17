import React, { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
  return <div className="mx-[5%] mt-4">{children}</div>
}

export default layout
