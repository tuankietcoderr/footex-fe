import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"
import Link from "next/link"

type Props = {
  fieldId: string
}

const FieldActions = async ({ fieldId }: Props) => {
  const { isLogin } = await getSession()
  if (!isLogin) return null
  return (
    <Button className="flex-1" asChild>
      <Link href={ROUTE.SAN_BONG.BOOK.replace(":id", fieldId)}>Đặt sân</Link>
    </Button>
  )
}

export default FieldActions
