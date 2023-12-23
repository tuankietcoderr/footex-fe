"use client"
import Address from "@/components/address"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import ROUTE from "@/constants/route"
import { ETournamentStatus } from "@/interface/ITournament"
import { vilizeTournamentStatus } from "@/utils/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { tournamentStatuses } from "../_mock/sidebar.mock"
import toast from "react-hot-toast"

const formSchema = z.object({
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  status: z.enum(tournamentStatuses as [string, ...string[]]),
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
      status: searchParams.get("status") ?? tournamentStatuses[0],
    },
  })

  const router = useRouter()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.replace(ROUTE.GIAI_DAU.INDEX + "?" + new URLSearchParams(data).toString())
  }

  const onReset = () => {
    form.reset({
      city: "",
      district: "",
      ward: "",
      status: tournamentStatuses[0],
    })
  }

  const onSearch = () => {
    const search = searchRef.current?.value
    if (!search) {
      if (!search) {
        return toast.error("Vui lòng nhập từ khóa tìm kiếm")
      }
    }
    router.replace(ROUTE.GIAI_DAU.INDEX + "?" + new URLSearchParams({ keyword: search }).toString())
  }

  const onSearchReset = () => {
    searchRef.current!.value = ""
    router.replace(ROUTE.GIAI_DAU.INDEX)
  }

  return (
    <div className="self-start rounded-md border bg-background p-4 shadow-sm">
      <p className="mb-4 text-xl font-bold">Tìm kiếm</p>
      <div>
        <Input
          placeholder="Tìm kiếm giải đấu"
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Trạng thái</FormLabel>
                  <FormControl className="mt-2 flex flex-col">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                      value={field.value.toString()}
                    >
                      {tournamentStatuses.map((status) => (
                        <FormItem key={status} className="flex items-center gap-2">
                          <FormControl>
                            <RadioGroupItem value={status.toString()} />
                          </FormControl>
                          <FormLabel>
                            {vilizeTournamentStatus(status! as ETournamentStatus)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
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
