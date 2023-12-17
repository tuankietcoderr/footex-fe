"use client"
import React, { useEffect, useState } from "react"
import AppAvatar from "../app-avatar"
import RatingStar from "./rating-star"
import { Textarea } from "../ui/textarea"
import { ERate } from "@/interface/IRate"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createRate } from "@/actions/rate-actions"
import IGuest from "@/interface/IGuest"

type Props = {
  objectId: string
  objectType: ERate
  guest: IGuest
}

const formSchema = z.object({
  description: z.string().min(1, "Vui lòng nhập đánh giá"),
  rateValue: z.number(),
})

const RatingBox = ({ objectId, objectType, guest }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      rateValue: 5,
    },
  })
  const { setValue } = form
  const [isFocused, setIsFocused] = useState(false)

  const onSend = async (data: z.infer<typeof formSchema>) => {
    const sendData = {
      description: data.description,
      rateValue: data.rateValue,
      refPath: objectType,
      object: objectId,
    }

    toast.loading("Đang gửi đánh giá", {
      duration: Infinity,
    })
    const { success, message } = await createRate(sendData)
    toast.dismiss()
    if (success) {
      toast.success(message)
      form.reset()
      setIsFocused(false)
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    if (!isFocused) {
      form.reset({
        description: "",
        rateValue: 5,
      })
    }
  }, [isFocused])

  return (
    <div className="mt-2 flex space-x-2">
      <AppAvatar
        src={guest?.avatar || ""}
        alt={guest?.name!}
        fallback={guest?.name?.substring(0, 2)}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSend)} className="flex flex-1 flex-col space-y-2">
          {isFocused && (
            <FormField
              control={form.control}
              name="rateValue"
              render={() => (
                <FormItem>
                  <FormControl>
                    <RatingStar defaultValue={5} onChange={(v) => setValue("rateValue", v)} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    onFocus={() => setIsFocused(true)}
                    placeholder="Nhập đánh giá của bạn..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isFocused && (
            <div className="space-x-2 self-end">
              <Button variant={"ghost"} type="button" onClick={() => setIsFocused(false)}>
                Hủy
              </Button>
              <Button type="submit">Gửi đánh giá</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}

export default RatingBox
