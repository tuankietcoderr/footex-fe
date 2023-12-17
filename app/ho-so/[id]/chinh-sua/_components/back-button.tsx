"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const BackButton = () => {
  const pathname = usePathname()

  return (
    <Button variant={"ghost"} className="justify-start gap-2" asChild>
      <Link href={pathname.replace("/chinh-sua", "")}>
        <ArrowLeft size={20} />
        Trở về
      </Link>
    </Button>
  )
}

export default BackButton
