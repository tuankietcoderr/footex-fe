"use client"
import { registerGuest, updateGuest } from "@/actions/auth-actions"
import Address from "@/components/address"
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
import IGuest from "@/interface/IGuest"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z.object({
  avatar: z.string().url({ message: "Avatar không hợp lệ" }),
  phoneNumber: z
    .string()
    .refine(
      (data) => new RegExp(/^(0[1-9])+([0-9]{8})\b/).test(data),
      "Số điện thoại không hợp lệ"
    ),
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  city: z.string().nonempty({ message: "Tỉnh/thành phố không được để trống" }),
  district: z.string().nonempty({ message: "Quận/huyện không được để trống" }),
  ward: z.string().nonempty({ message: "Phường/xã không được để trống" }),
  street: z.string(),
  houseNumber: z.string(),
})

const EditInfoForm = (guest: IGuest) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      name: "",
    },
  })

  useEffect(() => {
    form.reset({
      ...guest,
    })
  }, [guest])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang cập nhật...", {
      duration: Infinity,
    })
    const { success, message } = await updateGuest(data)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit space-y-4 rounded-lg px-4">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input placeholder="https://footex.com/avatar.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Foot Văn Tex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="0123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Address showStreet showHouseNumber />

        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  )
}

export default EditInfoForm
