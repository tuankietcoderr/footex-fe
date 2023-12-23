"use client"
import Address from "@/components/address"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import ROUTE from "@/constants/route"
import { ETournamentStatus } from "@/interface/ITournament"
import { vilizeTournamentStatus } from "@/utils/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  openAt: z.number().min(0).max(24),
  closeAt: z.number().min(0).max(24),
})

const Sidebar = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      district: "",
      ward: "",
      openAt: 7,
      closeAt: 22,
    },
  })

  const router = useRouter()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const paramsData = {
      ...data,
      openAt: data.openAt.toString(),
      closeAt: data.closeAt.toString(),
    }
    router.replace(ROUTE.CHI_NHANH.INDEX + "?" + new URLSearchParams(paramsData).toString())
  }

  const onReset = () => {
    form.reset({
      city: "",
      district: "",
      ward: "",
      openAt: 7,
      closeAt: 22,
    })
  }

  const onSearch = () => {
    const search = searchRef.current?.value
    if (!search) {
      return toast.error("Vui lòng nhập từ khóa tìm kiếm")
    }
    router.replace(
      ROUTE.CHI_NHANH.INDEX + "?" + new URLSearchParams({ keyword: search }).toString()
    )
  }

  const onSearchReset = () => {
    searchRef.current!.value = ""
    router.replace(ROUTE.CHI_NHANH.INDEX)
  }

  return (
    <div className="self-start rounded-md border bg-background p-4 shadow-sm">
      <p className="mb-4 text-xl font-bold">Tìm kiếm</p>
      <div>
        <Input
          placeholder="Tìm kiếm chi nhánh"
          ref={searchRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSearch()
            }
          }}
        />
        <div className="mt-2 grid grid-cols-2 items-center  gap-2">
          <Button type="reset" onClick={onSearchReset} variant={"outline"} size={"sm"}>
            Đặt lại
          </Button>
          <Button size={"sm"} onClick={onSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>
      <Separator className="mt-4" />
      <p className="my-4 text-xl font-bold">Bộ lọc</p>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-[auto_2px_auto] gap-2">
              <Label className="col-span-3">Giờ hoạt động</Label>
              <FormField
                control={form.control}
                name="openAt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={24}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Separator orientation="vertical" />
              <FormField
                control={form.control}
                name="closeAt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={24}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <Address />
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <Button type="reset" onClick={onReset} variant={"outline"} size={"sm"}>
                Đặt lại
              </Button>

              <Button type="submit" size={"sm"}>
                Lọc
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Sidebar
