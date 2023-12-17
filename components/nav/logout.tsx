"use client"
import { logoutGuest } from "@/actions/auth-actions"
import React from "react"
import { DropdownMenuItem } from "../ui/dropdown-menu"

const LogoutButton = () => {
  const logout = () => {
    logoutGuest()
  }

  return (
    <DropdownMenuItem onClick={logout} className="text-destructive">
      Đăng xuất
    </DropdownMenuItem>
  )
}

export default LogoutButton
