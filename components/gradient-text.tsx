import React, { PropsWithChildren } from "react"

const GradientText = ({ children }: PropsWithChildren) => {
  return (
    <span className="bg-gradient-to-r from-black to-emerald-500 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

export default GradientText
