"use client"
import { useAuthModalContext } from "@/context/AuthModalContext"
import { EUserRole } from "@/interface/IUser"
import useUserStore from "@/store/useUserStore"
import React from "react"
import { Button } from "../ui/button"

const Dashboard = () => {
  const { user } = useUserStore()
  const { openModal, showModal, setFallbackUrl } = useAuthModalContext()
  const open = () => {
    openModal()
    // setFallbackUrl("/chu-san-bong")
  }
  return (
    <div>
      {user && user.role === EUserRole.OWNER ? <p>Join</p> : <p>Cut</p>}
      <Button onClick={open}>Open</Button>
    </div>
  )
}

export default Dashboard
