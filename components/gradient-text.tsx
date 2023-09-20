import React, { PropsWithChildren } from "react"

const GradientText = ({ children }: PropsWithChildren) => {
  return (
    <span className="bg-gradient-to-r from-yellow-400 to-emerald-500 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

export default GradientText
