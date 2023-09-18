"use client"
import AuthModal from "@/components/auth-modal"
import useUserStore from "@/store/useUserStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useState } from "react"

interface IAuthModalContext {
  showModal: boolean
  openModal: () => void
  closeModal: () => void
  fallbackUrl: string
  setFallbackUrl: (url: string) => void
}

export const AuthModalContext = createContext<IAuthModalContext>({
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  fallbackUrl: "/",
  setFallbackUrl: () => {},
})

export const AuthModalProvider = ({ children }: PropsWithChildren) => {
  const [showModal, setShowModal] = useState(false)
  const { user } = useUserStore()
  const [fallbackUrl, setFallbackUrl] = useState<string>("/")
  const pathName = usePathname()
  const openModal = () => {
    if (user) return
    setShowModal(true)
    setFallbackUrl(pathName)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <AuthModalContext.Provider
      value={{
        showModal,
        openModal,
        closeModal,
        fallbackUrl,
        setFallbackUrl,
      }}
    >
      {children}
      <AuthModal isOpen={showModal} onClose={closeModal} />
    </AuthModalContext.Provider>
  )
}

export const useAuthModalContext = () => {
  return useContext(AuthModalContext)
}
