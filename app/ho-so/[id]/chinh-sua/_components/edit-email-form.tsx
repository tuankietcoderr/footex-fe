"use client"
import {
  loadGuestIfVerified,
  sendVerifyEmail,
  updateEmail,
  updateGuest,
} from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

type Props = {
  email: string
  isVerified?: boolean
}

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
})

type FormSchema = z.infer<typeof formSchema>

const EditEmailForm = ({ email, isVerified = false }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
    },
  })

  const { getValues } = form

  const onSubmit = async (data: FormSchema) => {
    if (email === data.email) {
      return toast.error("Email không có gì thay đổi!")
    }
    toast.loading("Đang cập nhật", {
      duration: Infinity,
    })

    const { success, message } = await updateEmail(data.email)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const onSendEmail = async () => {
    toast.loading("Đang gửi email xác thực", {
      duration: Infinity,
    })

    const { success, message } = await sendVerifyEmail(getValues("email"))
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const onCheck = async () => {
    toast.loading("Đang kiểm tra", {
      duration: Infinity,
    })
    const { success, data } = await loadGuestIfVerified()
    toast.dismiss()
    if (!success || !data?.isEmailVerified) {
      toast.error("Email chưa được xác thực!")
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <div className="flex gap-2">
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập email của bạn" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <div className="self-end">
                  {isVerified ? (
                    <Button variant={"ghost"} className="text-green-500" type="button" disabled>
                      Đã xác thực
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={onSendEmail} type="button">
                        Xác thực email
                      </Button>
                      <Button variant="ghost" onClick={onCheck} type="button">
                        Kiểm tra
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          />
          <Button>Cập nhật</Button>
        </form>
      </Form>
    </div>
  )
}

export default EditEmailForm
