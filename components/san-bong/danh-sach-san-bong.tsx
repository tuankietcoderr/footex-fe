"use client"
import useBigFieldStore from "@/store/useBigFieldStore"
import React, { useEffect } from "react"
import SanBongItem from "./san-bong-item"
import { Skeleton } from "../ui/skeleton"

const DanhSachSanBong = () => {
  const { loadBigFields, bigFields } = useBigFieldStore()
  console.log({ bigFields })
  useEffect(() => {
    ;(async () => {
      if (bigFields === undefined) {
        await loadBigFields()
      }
    })()
  }, [])
  return (
    <div className="grid gap-4 grid-auto-fit">
      {bigFields !== undefined ? (
        bigFields !== null ? (
          bigFields.map((bigField) => <SanBongItem key={bigField._id} bigField={bigField} />)
        ) : (
          <div>Không có sân bóng nào</div>
        )
      ) : (
        Array(8)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-[240px] w-full" />)
      )}
    </div>
  )
}

export default DanhSachSanBong
