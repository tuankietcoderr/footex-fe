"use client"
import AuthModal from "@/components/auth-modal"
import { EUserRole } from "@/interface/IUser"
import useUserStore from "@/store/useUserStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useState } from "react"

interface IAuthModalContext {
  visible: boolean
  openModal: () => void
  closeModal: () => void
  fallbackUrl: string
  setFallbackUrl: (url: string) => void
}

export const AuthModalContext = createContext<IAuthModalContext>({
  visible: false,
  openModal: () => {},
  closeModal: () => {},
  fallbackUrl: "/",
  setFallbackUrl: () => {},
})

export const AuthModalProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false)
  const { user } = useUserStore()
  const [fallbackUrl, setFallbackUrl] = useState<string>("/")
  const pathName = usePathname()
  const openModal = () => {
    if (visible) return
    setVisible(true)
    setFallbackUrl(pathName)
  }

  const closeModal = () => {
    setVisible(false)
  }
  return (
    <AuthModalContext.Provider
      value={{
        visible,
        openModal,
        closeModal,
        fallbackUrl,
        setFallbackUrl,
      }}
    >
      {children}
      <AuthModal isOpen={visible && !user} onClose={closeModal} />
    </AuthModalContext.Provider>
  )
}

export const useAuthModalContext = () => {
  return useContext(AuthModalContext)
}
