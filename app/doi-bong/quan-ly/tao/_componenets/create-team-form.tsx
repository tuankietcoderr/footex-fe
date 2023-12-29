"use client"
import { createTeam, updateTeam } from "@/actions/team-actions"
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
import { Textarea } from "@/components/ui/textarea"
import ITeam from "@/interface/ITeam"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z.object({
  logo: z.string().url({ message: "Logo không hợp lệ" }),
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  description: z.string().min(2, { message: "Mô tả phải có ít nhất 2 ký tự" }),
})

const CreateTeamForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang tạo...", {
      duration: Infinity,
    })
    const { success, message } = await createTeam({
      ...data,
    })
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
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="https://example.com/logo.png" {...field} />
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
              <FormLabel>Tên đội bóng</FormLabel>
              <FormControl>
                <Input placeholder="Foot Văn Tex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="Viết mô tả đội bóng" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Tạo</Button>
      </form>
    </Form>
  )
}

export default CreateTeamForm
