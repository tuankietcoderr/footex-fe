"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import IReport from "@/interface/IReport"
import { Textarea } from "../ui/textarea"
import toast from "react-hot-toast"
import { createReport } from "@/actions/report-actions"
import { usePathname, useRouter } from "next/navigation"
import ROUTE from "@/constants/route"
import Link from "next/link"

type Props = {
  objectType: string
  objectId: string
}

const formSchema = z.object({
  reason: z.string().nonempty({ message: "Vui lòng nhập lý do" }),
  title: z.string().nonempty({ message: "Vui lòng nhập tiêu đề" }),
})

const ReportForm = ({ objectId, objectType }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      title: "",
    },
  })

  const router = useRouter()
  const pathname = usePathname()

  const onCancel = () => {
    router.replace(pathname.replace("/to-cao", ""))
  }

  const onSend = async (data: z.infer<typeof formSchema>) => {
    const sendData: IReport = {
      reason: data.reason,
      title: data.title,
      refPath: objectType,
      reported: objectId,
    }

    toast.loading("Đang gửi báo cáo", {
      duration: Infinity,
    })

    const { success, message } = await createReport(sendData)

    toast.dismiss()

    if (success) {
      toast.success(message)
      form.reset()
      onCancel()
    } else {
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSend)}
        className="flex flex-1 flex-col space-y-2 rounded-md border p-4 shadow-sm"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lý do</FormLabel>
              <FormControl>
                <Textarea placeholder="Nhập lý do báo cáo..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 self-end">
          <Button onClick={onCancel} variant={"ghost"} type="button">
            Hủy
          </Button>
          <Button type="submit">Gửi</Button>
        </div>
      </form>
    </Form>
  )
}

export default ReportForm
