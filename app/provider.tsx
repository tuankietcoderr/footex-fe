"use client"
import useGuestStore from "@/store/useGuestStore"
import React, { PropsWithChildren, useEffect } from "react"

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { loadGuest, guest } = useGuestStore()
  useEffect(() => {
    ;(async () => {
      await loadGuest()
    })()
  }, [])
  return children
}

export default AuthProvider
