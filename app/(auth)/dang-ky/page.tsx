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
import { useToast } from "@/components/ui/use-toast";
import IUser, { EUserRole } from "@/interface/IUser";
import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z
  .object({
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
      })
      .refine(
        (data) =>
          new RegExp(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
          ).test(data),
        "Mật khẩu không hợp lệ, phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
      ),
    confirm: z.string(),
    name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
    isOwner: z.boolean(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu không khớp",
    path: ["confirm"],
  });

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      confirm: "",
      isOwner: false,
    },
  });

  const { registerUser } = useUserStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const processedData: IUser = {
      name: data.name,
      username: data.username,
      password: data.password,
      role: data.isOwner ? EUserRole.OWNER : EUserRole.GUEST,
    };
    console.log({ processedData });
    setLoading(true);
    registerUser(processedData)
      .then(() => {
        toast({
          title: "Đăng ký thành công",
          description: "Chào mừng bạn đến với Footex",
        });
      })
      .catch((err) => {
        toast({
          title: "Đăng ký thất bại",
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
        <h1 className="text-2xl font-semibold text-center">Đăng ký</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="footex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input placeholder="123456789aA" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="123456789aA" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isOwner"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    {...field}
                    id="isOwner"
                    value={"OWNER"}
                    className="h-4 w-4 border-gray-300 rounded-sm text-primary-500 focus:ring-emerald-300 accent-primary"
                  />
                  <label
                    htmlFor="isOwner"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Tôi là chủ sân bóng
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {!loading ? "Đăng ký" : "Đang đăng ký..."}
        </Button>
      </form>
    </Form>
  );
};

export default Page;