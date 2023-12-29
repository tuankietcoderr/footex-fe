"use client"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import Image, { ImageProps } from "next/image"
import React, { memo } from "react"

const ServerImage = (props: ImageProps) => {
  const { src, alt } = props
  return src ? (
    <Image {...props} alt={alt} loader={({ src, width }) => `${src}?w=${width}`} />
  ) : (
    <div className="h-auto w-full">
      <FootballGoalSemi
        fill="var(--primary)"
        className="fill-primary"
        height={160}
        width={"100%"}
      />
    </div>
  )
}

export default memo(ServerImage)
