"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { EFieldStatus } from "@/interface/IField"
import { toDot } from "@/lib/converter"
import { vilizeFieldStatus } from "@/utils/status"
import React, { useRef, useState } from "react"
import { fieldStatuses, fieldTypes, pricesRanges } from "../_mock/sidebar.mock"
import Address from "@/components/address"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import ROUTE from "@/constants/route"
import toast from "react-hot-toast"

const formSchema = z.object({
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  status: z.enum(fieldStatuses as [string, ...string[]]),
  type: z.string(),
  price: z.string(),
})

const Sidebar = () => {
  const searchRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      district: "",
      ward: "",
      price: pricesRanges[0].toString(),
      status: fieldStatuses[0],
      type: fieldTypes[0].toString(),
    },
  })

  const router = useRouter()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.replace(ROUTE.SAN_BONG.INDEX + "?" + new URLSearchParams(data).toString())
  }

  const onReset = () => {
    form.reset()
  }

  const onSearch = () => {
    const search = searchRef.current?.value
    if (!search) {
      return toast.error("Vui lòng nhập từ khóa tìm kiếm")
    }
    router.replace(ROUTE.SAN_BONG.INDEX + "?" + new URLSearchParams({ keyword: search }).toString())
  }

  const onSearchReset = () => {
    searchRef.current!.value = ""
    router.replace(ROUTE.SAN_BONG.INDEX)
  }

  return (
    <div className="self-start rounded-md border bg-background p-4 shadow-sm">
      <p className="mb-4 text-xl font-bold">Tìm kiếm</p>
      <div>
        <Input
          placeholder="Tìm kiếm sân bóng"
          ref={searchRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSearch()
            }
          }}
        />
        <div className="mt-2 grid grid-cols-2 items-center space-x-2">
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
                      {fieldStatuses.map((status) => (
                        <FormItem key={status} className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={status.toString()} />
                          </FormControl>
                          <FormLabel>{vilizeFieldStatus(status! as EFieldStatus)}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Loại sân</FormLabel>
                  <FormControl className="mt-2 flex flex-col">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                      value={field.value.toString()}
                    >
                      {fieldTypes.map((type) => (
                        <FormItem key={type} className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={type.toString()} />
                          </FormControl>
                          <FormLabel>{type === 0 ? "Tất cả" : `${type} người`}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Giá</FormLabel>
                  <FormControl className="mt-2 flex flex-col">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                      value={field.value.toString()}
                    >
                      {pricesRanges.map(([min, max]) => (
                        <FormItem key={`${min}-${max}`} className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={[min, max].toString()} />
                          </FormControl>
                          <FormLabel>
                            {min === 0 && max === 0
                              ? "Tất cả"
                              : `${toDot(min)} - ${toDot(max)} VNĐ`}
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
            <div className="grid grid-cols-2 space-x-2">
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
