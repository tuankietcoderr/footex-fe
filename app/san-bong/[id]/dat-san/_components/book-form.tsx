"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z
  .object({
    bookedBy: z.string(),
    startAt: z.date(),
    endAt: z.date(),
  })
  .refine((data) => data.startAt < data.endAt, {
    message: "Thời gian kết thúc phải sau thời gian bắt đầu",
    path: ["endAt"],
  })

const BookForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookedBy: "",
      startAt: new Date(),
      endAt: new Date(),
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    const sendData: IFieldBookedQueue = {
      ...data,
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[30rem] space-y-4">
        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Thời gian đặt</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(!field.value && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? formatVietnameseDate(field.value, "dd/MM/yyyy hh:mm")
                        : "Chọn thời gian đặt"}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endAt"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Thời gian kết thúc</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(!field.value && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? formatVietnameseDate(field.value, "dd/MM/yyyy hh:mm")
                        : "Chọn thời gian kết thúc"}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right" disabled={loading}>
          {!loading ? "Tạo" : "Đang tạo..."}
        </Button>
      </form>
    </Form>
  )
}

export default BookForm
