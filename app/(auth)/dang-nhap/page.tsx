"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Tên đăng nhập phải có ít nhất 2 ký tự",
    })
    .max(20, {
      message: "Tên đăng nhập không được quá 20 ký tự",
    })
    .refine(
      (data) => new RegExp("^\\w[\\w.]{2,18}\\w$").test(data),
      "Tên đăng nhập không hợp lệ"
    ),
  password: z
    .string()
    .min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    })
    .max(20, {
      message: "Mật khẩu không được quá 20 ký tự",
    }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useUserStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    login(data)
      .then(() => {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn đến với Footex",
        });
      })
      .catch((err) => {
        toast({
          title: "Đăng nhập thất bại",
          description: err,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px] shadow-lg p-6 rounded-lg h-fit"
      >
        <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input placeholder="footex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="123456789aA@" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {!loading ? "Đăng nhập" : "Đang đăng nhập..."}
        </Button>
      </form>
    </Form>
  );
};

export default Page;