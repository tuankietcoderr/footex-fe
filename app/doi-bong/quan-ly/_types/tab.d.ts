import { ClassValue } from "clsx"

export type TabItem = {
  href: string
  label: string
  className?: ClassValue
  childs?: {
    canShow: boolean
    items: TabItem[]
  }
}
