import SaveButton from "@/components/item/save-button"
import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"
import Link from "next/link"

type Props = {
  fieldId: string
  isSaved?: boolean
}

const FieldActions = async ({ fieldId, isSaved = false }: Props) => {
  const { isLogin } = await getSession()
  if (!isLogin) return null
  return (
    <div className="flex items-center gap-2">
      <Button className="flex-1" asChild>
        <Link href={ROUTE.SAN_BONG.BOOK.replace(":id", fieldId)}>Đặt sân</Link>
      </Button>
      <SaveButton fieldId={fieldId} isSaved={isSaved} />
    </div>
  )
}

export default FieldActions
