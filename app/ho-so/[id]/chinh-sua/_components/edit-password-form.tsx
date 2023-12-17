"use client"
import { changePassword, registerGuest } from "@/actions/auth-actions"
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
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, {
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      })
      .max(20, {
        message: "Mật khẩu không được quá 20 ký tự",
      }),
    newPassword: z
      .string()
      .min(6, {
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      })
      .max(20, {
        message: "Mật khẩu không được quá 20 ký tự",
      })
      .refine(
        (data) =>
          new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).test(data),
        "Mật khẩu không hợp lệ, phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
      ),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmNewPassword"],
  })

const EditPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang đổi mật khẩu...", {
      duration: Infinity,
    })
    const { success, message } = await changePassword({ ...data })
    toast.dismiss()
    if (success) {
      toast.success(message)
      form.reset()
    } else {
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit space-y-4 rounded-lg px-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mật khẩu cũ của bạn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mật khẩu mới của bạn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormControl>
                <Input placeholder="Nhập lại mật khẩu mới của bạn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Đổi mật khẩu</Button>
      </form>
    </Form>
  )
}

export default EditPasswordForm
