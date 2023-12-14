"use client"
import { loadGuest } from "@/actions/auth-action"
import useGuestStore from "@/store/useGuestStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"
import toast from "react-hot-toast"

const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const { setGuest } = useGuestStore()
  useEffect(() => {
    ;(async () => {
      const { message, success, data } = await loadGuest()
      if (success) {
        return setGuest(data!)
      } else {
        toast.error(message)
        setGuest(null)
      }
    })()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}

export default AuthProvider
