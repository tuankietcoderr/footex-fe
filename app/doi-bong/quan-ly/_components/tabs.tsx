"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MinusSquare, PlusSquare } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { TabItem } from "../_types/tab"

type Props = {
  items: TabItem[]
}

const Tabs = ({ items }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [expand, setExpand] = useState(true)

  const onExpand = () => {
    setExpand((prev) => !prev)
  }

  return items.map(({ href, label, childs, className }) => (
    <div key={href} className="relative flex w-full flex-col space-y-2">
      <div className="flex items-center space-x-1">
        {childs && childs.canShow && expand && (
          <div className="absolute -left-1 bottom-0 top-0 w-[1px] bg-gray-400" />
        )}
        <Button
          variant={"ghost"}
          asChild
          className={cn(
            "flex-1 justify-start gap-2",
            pathname.includes(href) && "bg-gray-100",
            className
          )}
        >
          <Link href={href} replace scroll={false}>
            {label}
          </Link>
        </Button>
        {childs && childs.canShow && (
          <Button variant={"ghost"} onClick={onExpand}>
            {expand ? <MinusSquare size={16} /> : <PlusSquare size={16} />}
          </Button>
        )}
      </div>
      {expand && childs && childs.canShow && (
        <div className="ml-2 space-y-2">
          <Tabs items={childs.items} />
        </div>
      )}
    </div>
  ))
}

export default Tabs
