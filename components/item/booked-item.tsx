import { removeFieldBookedQueue } from "@/actions/field-booked-queue-actions"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import React from "react"
import { Event } from "react-big-calendar"
import toast from "react-hot-toast"

type Props = {
  event: Event
  guest: IGuest
}

const BookedItem = ({ event: { title, resource }, guest }: Props) => {
  const onRemove = () => {
    const id = resource?._id
    if (!id) return
    toast.promise(removeFieldBookedQueue(id), {
      loading: "Đang hủy sân...",
      success: ({ success }) => {
        return "Hủy sân thành công"
      },
      error: "Hủy sân thất bại",
    })
  }

  return (
    <HoverCard>
      <HoverCardTrigger>{title}</HoverCardTrigger>
      {resource?.bookedBy?._id === guest?._id &&
        resource.status === EFieldBookedQueueStatus.PENDING && (
          <HoverCardContent className="flex w-fit justify-end">
            <Button variant="destructive" className="flex items-center gap-2" onClick={onRemove}>
              Hủy sân
            </Button>
          </HoverCardContent>
        )}
    </HoverCard>
  )
}

export default BookedItem
