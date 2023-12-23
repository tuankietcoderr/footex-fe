"use client"
import { bookField } from "@/actions/field-booked-queue-actions"
import BigCalendar from "@/components/big-calendar"
import BookedItem from "@/components/item/booked-item"
import { Button } from "@/components/ui/button"
import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import { cn } from "@/lib/utils"
import { colorizeFieldBookedQueueStatus, vilizeFieldBookedQueueStatus } from "@/utils/status"
import { Info } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Event, SlotInfo } from "react-big-calendar"
import toast from "react-hot-toast"

type Props = {
  bookedFields: IFieldBookedQueue[]
  fieldId: string
  guest: IGuest
}

const BookForm = ({ bookedFields, fieldId, guest }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const events: Event[] = bookedFields.map((field) => ({
    start: new Date(field.startAt),
    end: new Date(field.endAt),
    title: vilizeFieldBookedQueueStatus(field?.status!),
    resource: field,
  }))

  const [event, setEvent] = useState<Event | null>(null)

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo
    if (start < new Date()) return toast.error("Không thể đặt sân vào quá khứ")
    const startHour = start.getHours()
    const endHour = end.getHours()
    if (endHour - startHour > 3) {
      return toast.error("Bạn chỉ có thể đặt sân tối đa 3 tiếng")
    }
    const existingEvents = events.filter((e) => {
      const _start = (e.start || new Date()).getTime()
      const _end = (e.end || new Date()).getTime()
      const slotStart = start.getTime()
      const slotEnd = end.getTime()
      return (
        (_start >= slotStart && _start < slotEnd) ||
        (_end > slotStart && _end <= slotEnd) ||
        (_start <= slotStart && _end >= slotEnd)
      )
    })
    if (existingEvents.length > 0) return toast.error("Khung giờ này đã có người đặt")
    setEvent({
      start,
      end,
      title: "Đặt sân",
      resource: {} as IFieldBookedQueue,
    })
  }

  const onBook = async () => {
    if (!event) return
    const data: IFieldBookedQueue = {
      startAt: event?.start!,
      endAt: event?.end!,
      field: fieldId,
      status: EFieldBookedQueueStatus.PENDING,
    }
    toast.loading("Đang đặt sân...", {
      duration: Infinity,
    })
    const { success, message } = await bookField(data)
    toast.dismiss()
    if (success) {
      toast.success("Đặt sân thành công")
      setEvent(null)
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <BigCalendar
        views={["week"]}
        defaultView="week"
        onSelectSlot={onSelectSlot}
        events={event ? [...events, event] : events}
        eventPropGetter={(event) => {
          const fieldBookedQueue = event.resource as IFieldBookedQueue
          const bookedBy = fieldBookedQueue?.bookedBy as IGuest
          return {
            style: {
              backgroundColor: colorizeFieldBookedQueueStatus(fieldBookedQueue?.status!, true),
              borderWidth: bookedBy?._id === guest?._id ? 2 : 1,
            },
          }
        }}
        step={60}
        components={{
          week: {
            event: ({ event }) => <BookedItem event={event} guest={guest} />,
          },
        }}
      />
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-1 text-muted-foreground">
          <Info size={16} />
          <p className="text-sm">Những khung giờ bạn đã đặt sẽ có viền đậm hơn.</p>
        </div>
        <Button
          size="sm"
          onClick={() => router.replace(pathname.replace("/dat-san", ""))}
          variant={"ghost"}
          className="self-end"
        >
          Hủy
        </Button>
        <Button
          size={"sm"}
          className={cn(!event && "opacity-50", "self-end")}
          disabled={!event}
          onClick={onBook}
        >
          Đặt sân
        </Button>
      </div>
    </div>
  )
}

export default BookForm
